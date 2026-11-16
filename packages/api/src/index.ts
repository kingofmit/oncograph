import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

import {
  discover,
  computeCompleteness,
  type DataType,
  type AccessModel,
  type DiscoveryQuery,
} from "@oncograph/core";
import { GENOMIC_DATASETS, CANCER_BIOMARKERS } from "@oncograph/genomics";
import { IMAGING_DATASETS } from "@oncograph/imaging";
import { KEY_DRUGS } from "@oncograph/drugs";
import { CancerSearchIndex } from "@oncograph/search";
import { analyzePathways } from "@oncograph/pathways";
import { getSurvival, getSurvivalComparison } from "@oncograph/survival";

import { createRegistry } from "./registry-setup";

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

const registry = createRegistry();

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export const app = new Hono();

// Middleware
app.use("*", cors());

// Global error handler
app.onError((err, c) => {
  console.error("[api]", err);
  return c.json({ error: err.message ?? "Internal server error" }, 500);
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/** GET /health — liveness probe */
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    version: "0.1.0",
    packages: 9,
    timestamp: Date.now(),
  });
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
    cancerType: cancer,
    dataTypes: dataTypesRaw
      ? (dataTypesRaw.split(",").map((s) => s.trim()) as DataType[])
      : undefined,
    accessModel: accessModelRaw
      ? (accessModelRaw.split(",").map((s) => s.trim()) as AccessModel[])
      : undefined,
  };

  const result = discover(query, registry);
  return c.json(result);
});

/** GET /biomarkers/:cancerType — biomarkers for a cancer type */
app.get("/biomarkers/:cancerType", (c) => {
  const cancerType = c.req.param("cancerType");
  const biomarkers = registry.findBiomarkers(cancerType);
  return c.json({ cancerType, biomarkers });
});

/** GET /drugs/:target — drugs targeting a specific gene / target */
app.get("/drugs/:target", (c) => {
  const target = c.req.param("target").toUpperCase();
  const drugs = KEY_DRUGS.filter((d) =>
    d.targets.some((t) => t.toUpperCase() === target),
  );
  return c.json({ target, drugs });
});

/** GET /trials — clinical trials (placeholder) */
app.get("/trials", (c) => {
  const cancer = c.req.query("cancer");
  if (!cancer) {
    return c.json({ error: "Missing required query parameter: cancer" }, 400);
  }

  const trials = registry.findTrials(cancer);
  return c.json({
    cancer,
    biomarker: c.req.query("biomarker") ?? null,
    trials,
    note: "Pre-populated trial data is limited. Use the ClinicalTrials.gov client from @oncograph/clinical for live queries.",
  });
});

/** GET /datasets/:repository — datasets for a repository */
app.get("/datasets/:repository", (c) => {
  const repositoryId = c.req.param("repository");
  const allDatasets = [...GENOMIC_DATASETS, ...IMAGING_DATASETS];
  const datasets = allDatasets.filter((d) => d.repositoryId === repositoryId);
  return c.json({ repositoryId, datasets });
});

/** GET /search — full-text search across all data */
app.get("/search", (c) => {
  const q = c.req.query("q");
  if (!q) {
    return c.json({ error: "Missing required query parameter: q" }, 400);
  }

  const index = new CancerSearchIndex();
  for (const ds of [...GENOMIC_DATASETS, ...IMAGING_DATASETS]) {
    index.addDataset(ds);
  }
  for (const bm of CANCER_BIOMARKERS) index.addBiomarker(bm);
  for (const drug of KEY_DRUGS) index.addDrug(drug);

  const results = index.search(q);
  return c.json({ query: q, results, total: results.length });
});

/** GET /pathways — pathway analysis for mutated genes */
app.get("/pathways", (c) => {
  const genesRaw = c.req.query("genes");
  if (!genesRaw) {
    return c.json({ error: "Missing required query parameter: genes" }, 400);
  }

  const genes = genesRaw.split(",").map((g) => g.trim());
  const analysis = analyzePathways(genes);
  return c.json(analysis);
});

/** GET /survival — survival statistics */
app.get("/survival", (c) => {
  const cancer = c.req.query("cancer");
  if (!cancer) {
    return c.json({ error: "Missing required query parameter: cancer" }, 400);
  }

  const biomarker = c.req.query("biomarker");

  if (biomarker) {
    const comparison = getSurvivalComparison(cancer, biomarker);
    if (!comparison) {
      return c.json({ error: "No survival data found for the given cancer type and biomarker" }, 404);
    }
    return c.json(comparison);
  }

  const data = getSurvival(cancer);
  if (!data) {
    return c.json({ error: "No survival data found for the given cancer type" }, 404);
  }
  return c.json(data);
});

/** GET /completeness/:cancerType — data completeness score */
app.get("/completeness/:cancerType", (c) => {
  const cancerType = c.req.param("cancerType");
  const score = computeCompleteness(cancerType, registry);
  return c.json(score);
});

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------

const port = parseInt(process.env.PORT ?? "3737", 10);

serve({ fetch: app.fetch, port }, () => {
  console.log(`OncoGraph API server running on http://localhost:${port}`);
});

export default app;
