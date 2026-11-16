import { Hono } from "hono";
import { cors } from "hono/cors";

import {
  discover,
  computeCompleteness,
  searchCancerTypes,
  type DataType,
  type AccessModel,
  type DiscoveryQuery,
  type Repository,
} from "@oncograph/core";
import { GENOMIC_DATASETS, CANCER_BIOMARKERS } from "@oncograph/genomics";
import { IMAGING_DATASETS } from "@oncograph/imaging";
import { KEY_DRUGS, DRUG_SENSITIVITY_DATASETS } from "@oncograph/drugs";
import { CLINICAL_DATASETS } from "@oncograph/clinical";
import { CancerSearchIndex } from "@oncograph/search";
import { analyzePathways } from "@oncograph/pathways";
import { getSurvival, getSurvivalComparison } from "@oncograph/survival";

import { createRegistry } from "./registry-setup";
import { openApiSpec } from "./openapi";

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

const VALID_DATA_TYPES = new Set<string>([
  "genomic", "transcriptomic", "proteomic", "epigenomic",
  "imaging", "histopathology", "clinical", "drug-sensitivity",
  "cell-line", "epidemiological", "biomarker", "trial",
  "pharmacogenomic", "functional",
]);

const VALID_ACCESS_MODELS = new Set<string>(["open", "controlled", "federated", "commercial"]);

const MAX_QUERY_LENGTH = 200;
const MAX_GENES = 50;
const DEFAULT_LIMIT = 100;

function sanitizeString(input: string, maxLen = MAX_QUERY_LENGTH): string {
  return input.slice(0, maxLen).trim();
}

function validateDataTypes(raw: string): DataType[] | undefined {
  const types = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const valid = types.filter((t) => VALID_DATA_TYPES.has(t));
  return valid.length > 0 ? valid as DataType[] : undefined;
}

function validateAccessModels(raw: string): AccessModel[] | undefined {
  const models = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const valid = models.filter((m) => VALID_ACCESS_MODELS.has(m));
  return valid.length > 0 ? valid as AccessModel[] : undefined;
}

function validateGenes(raw: string): string[] {
  return raw
    .split(",")
    .map((g) => g.trim())
    .filter((g) => g.length > 0 && g.length <= 20 && /^[A-Za-z0-9\-\/]+$/.test(g))
    .slice(0, MAX_GENES);
}

function parsePagination(c: { req: { query: (k: string) => string | undefined } }): { limit: number; offset: number } {
  const limit = Math.min(Math.max(parseInt(c.req.query("limit") ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT, 1), 500);
  const offset = Math.max(parseInt(c.req.query("offset") ?? "0", 10) || 0, 0);
  return { limit, offset };
}

function paginate<T>(items: T[], limit: number, offset: number): { items: T[]; total: number; limit: number; offset: number } {
  return { items: items.slice(offset, offset + limit), total: items.length, limit, offset };
}

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter
// ---------------------------------------------------------------------------

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 120;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT_MAX;
}

// Periodic cleanup of expired entries
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, RATE_LIMIT_WINDOW_MS);

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

const registry = createRegistry();

// Pre-built search index (singleton — built once at startup)
const searchIndex = new CancerSearchIndex();
for (const ds of [...GENOMIC_DATASETS, ...IMAGING_DATASETS, ...CLINICAL_DATASETS, ...DRUG_SENSITIVITY_DATASETS]) {
  searchIndex.addDataset(ds);
}
for (const bm of CANCER_BIOMARKERS) searchIndex.addBiomarker(bm);
for (const drug of KEY_DRUGS) searchIndex.addDrug(drug);

// Pre-combined dataset array (avoid re-spreading on each request)
const ALL_DATASETS = [...GENOMIC_DATASETS, ...IMAGING_DATASETS, ...CLINICAL_DATASETS, ...DRUG_SENSITIVITY_DATASETS];

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export const app = new Hono();

// CORS — restrict origins in production, allow all in development
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") ?? ["*"];
app.use("*", cors({
  origin: allowedOrigins.length === 1 && allowedOrigins[0] === "*"
    ? "*"
    : allowedOrigins,
  maxAge: 600,
}));

// Rate limiting middleware
app.use("*", async (c, next) => {
  const ip = c.req.header("x-forwarded-for") ?? c.req.header("x-real-ip") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return c.json({ error: "Too many requests. Please try again later." }, 429);
  }
  await next();
});

// Global error handler — sanitize error messages in production
app.onError((_err, c) => {
  if (process.env.NODE_ENV !== "production") {
    console.error("[api]", _err);
  }
  return c.json({ error: "Internal server error" }, 500);
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/** GET /health — liveness probe */
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    version: "0.1.1",
    packages: 11,
    timestamp: Date.now(),
  });
});

/** GET /openapi.json — OpenAPI 3.0 specification */
app.get("/openapi.json", (c) => {
  return c.json(openApiSpec);
});

/** GET /discover — multi-modal cancer data discovery */
app.get("/discover", (c) => {
  const cancer = c.req.query("cancer");
  if (!cancer) {
    return c.json({ error: "Missing required query parameter: cancer" }, 400);
  }

  const dataTypesRaw = c.req.query("dataTypes");
  const accessModelRaw = c.req.query("accessModel");

  const query: DiscoveryQuery = {
    cancerType: sanitizeString(cancer),
    dataTypes: dataTypesRaw ? validateDataTypes(dataTypesRaw) : undefined,
    accessModel: accessModelRaw ? validateAccessModels(accessModelRaw) : undefined,
  };

  const result = discover(query, registry);
  return c.json(result);
});

/** GET /biomarkers/:cancerType — biomarkers for a cancer type */
app.get("/biomarkers/:cancerType", (c) => {
  const cancerType = sanitizeString(c.req.param("cancerType"));
  const biomarkers = registry.findBiomarkers(cancerType);
  const { limit, offset } = parsePagination(c);
  return c.json({ cancerType, ...paginate(biomarkers, limit, offset) });
});

/** GET /drugs/:target — drugs targeting a specific gene / target */
app.get("/drugs/:target", (c) => {
  const target = sanitizeString(c.req.param("target"), 50).toUpperCase();
  const drugs = KEY_DRUGS.filter((d) =>
    d.targets.some((t) => t.toUpperCase() === target),
  );
  const { limit, offset } = parsePagination(c);
  return c.json({ target, ...paginate(drugs, limit, offset) });
});

/** GET /trials — clinical trials (placeholder) */
app.get("/trials", (c) => {
  const cancer = c.req.query("cancer");
  if (!cancer) {
    return c.json({ error: "Missing required query parameter: cancer" }, 400);
  }

  const trials = registry.findTrials(sanitizeString(cancer));
  const { limit, offset } = parsePagination(c);
  return c.json({
    cancer: sanitizeString(cancer),
    biomarker: c.req.query("biomarker") ? sanitizeString(c.req.query("biomarker")!) : null,
    ...paginate(trials, limit, offset),
    note: "Pre-populated trial data is limited. Use the ClinicalTrials.gov client from @oncograph/clinical for live queries.",
  });
});

/** GET /datasets/:repository — datasets for a repository */
app.get("/datasets/:repository", (c) => {
  const repositoryId = sanitizeString(c.req.param("repository"), 50);
  const datasets = ALL_DATASETS.filter((d) => d.repositoryId === repositoryId);
  const { limit, offset } = parsePagination(c);
  return c.json({ repositoryId, ...paginate(datasets, limit, offset) });
});

/** GET /search — full-text search across all data */
app.get("/search", (c) => {
  const q = c.req.query("q");
  if (!q) {
    return c.json({ error: "Missing required query parameter: q" }, 400);
  }

  const { limit, offset } = parsePagination(c);
  const allResults = searchIndex.search(sanitizeString(q));
  const paged = paginate(allResults, limit, offset);
  return c.json({ query: sanitizeString(q), results: paged.items, total: paged.total });
});

/** GET /pathways — pathway analysis for mutated genes */
app.get("/pathways", (c) => {
  const genesRaw = c.req.query("genes");
  if (!genesRaw) {
    return c.json({ error: "Missing required query parameter: genes" }, 400);
  }

  const genes = validateGenes(genesRaw);
  if (genes.length === 0) {
    return c.json({ error: "No valid gene names provided" }, 400);
  }

  const analysis = analyzePathways(genes);
  return c.json(analysis);
});

/** GET /survival — survival statistics */
app.get("/survival", (c) => {
  const cancer = c.req.query("cancer");
  if (!cancer) {
    return c.json({ error: "Missing required query parameter: cancer" }, 400);
  }

  const matched = searchCancerTypes(sanitizeString(cancer));
  const cancerName = matched.length > 0 ? matched[0].name : sanitizeString(cancer);

  const biomarker = c.req.query("biomarker");

  if (biomarker) {
    const comparison = getSurvivalComparison(cancerName, sanitizeString(biomarker));
    if (!comparison) {
      return c.json({ error: "No survival data found for the given cancer type and biomarker" }, 404);
    }
    return c.json(comparison);
  }

  const data = getSurvival(cancerName);
  if (!data) {
    return c.json({ error: "No survival data found for the given cancer type" }, 404);
  }
  return c.json(data);
});

/** GET /completeness/:cancerType — data completeness score */
app.get("/completeness/:cancerType", (c) => {
  const cancerType = sanitizeString(c.req.param("cancerType"));
  const score = computeCompleteness(cancerType, registry);
  return c.json(score);
});
