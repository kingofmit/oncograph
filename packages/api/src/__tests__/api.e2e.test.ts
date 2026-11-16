import { describe, it, expect } from "vitest";
import { app } from "../app";

async function get(path: string) {
  const res = await app.request(path);
  return { status: res.status, body: (await res.json()) as any };
}

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------
describe("Health", () => {
  it("GET /health returns ok with 11 packages", async () => {
    const { body } = await get("/health");
    expect(body.status).toBe("ok");
    expect(body.packages).toBe(11);
  });
});

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------
describe("Discovery", () => {
  it("GET /discover?cancer=glioblastoma returns gbm with datasets, biomarkers, and drugs", async () => {
    const { body } = await get("/discover?cancer=glioblastoma");
    expect(body.cancerType.id).toBe("gbm");
    expect(body.datasets.length).toBeGreaterThan(0);
    expect(body.biomarkers.length).toBeGreaterThan(0);
    expect(body.drugs.length).toBeGreaterThan(0);
  });

  it("GET /discover?cancer=breast%20cancer&dataTypes=imaging returns brca with imaging datasets", async () => {
    const { body } = await get("/discover?cancer=breast%20cancer&dataTypes=imaging");
    expect(body.cancerType.id).toBe("brca");
    expect(body.datasets.length).toBeGreaterThan(0);
  });

  it("GET /discover?cancer=NSCLC&accessModel=open returns only open-access datasets", async () => {
    const { body } = await get("/discover?cancer=NSCLC&accessModel=open");
    for (const ds of body.datasets) {
      expect(ds.accessModel).toBe("open");
    }
  });

  it("GET /discover?cancer=xyznonexistent returns null cancerType and empty datasets", async () => {
    const { body } = await get("/discover?cancer=xyznonexistent");
    expect(body.cancerType).toBeNull();
    expect(body.datasets.length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Biomarkers
// ---------------------------------------------------------------------------
describe("Biomarkers", () => {
  it("GET /biomarkers/nsclc returns at least 10 biomarkers", async () => {
    const { body } = await get("/biomarkers/nsclc");
    expect(body.biomarkers.length).toBeGreaterThanOrEqual(10);
  });
});

// ---------------------------------------------------------------------------
// Drugs
// ---------------------------------------------------------------------------
describe("Drugs", () => {
  it("GET /drugs/EGFR returns at least 4 drugs", async () => {
    const { body } = await get("/drugs/EGFR");
    expect(body.drugs.length).toBeGreaterThanOrEqual(4);
  });

  it("GET /drugs/PD-1 returns at least 2 drugs", async () => {
    const { body } = await get("/drugs/PD-1");
    expect(body.drugs.length).toBeGreaterThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// Datasets
// ---------------------------------------------------------------------------
describe("Datasets", () => {
  it("GET /datasets/gdc returns at least 5 datasets", async () => {
    const { body } = await get("/datasets/gdc");
    expect(body.datasets.length).toBeGreaterThanOrEqual(5);
  });

  it("GET /datasets/tcia returns at least 5 datasets", async () => {
    const { body } = await get("/datasets/tcia");
    expect(body.datasets.length).toBeGreaterThanOrEqual(5);
  });
});

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------
describe("Search", () => {
  it("GET /search?q=glioblastoma returns results", async () => {
    const { body } = await get("/search?q=glioblastoma");
    expect(body.total).toBeGreaterThan(0);
  });

  it("GET /search?q=IDH1 returns results including a biomarker type", async () => {
    const { body } = await get("/search?q=IDH1");
    expect(body.total).toBeGreaterThan(0);
    const types = body.results.map((r: any) => r.type);
    expect(types).toContain("biomarker");
  });
});

// ---------------------------------------------------------------------------
// Pathways
// ---------------------------------------------------------------------------
describe("Pathways", () => {
  it("GET /pathways?genes=EGFR,KRAS returns affected pathways and drug targets", async () => {
    const { body } = await get("/pathways?genes=EGFR,KRAS");
    expect(body.affectedPathways.length).toBeGreaterThan(0);
    expect(body.drugTargets.length).toBeGreaterThan(0);
  });

  it("GET /pathways?genes=BRCA1 includes a pathway related to DNA repair", async () => {
    const { body } = await get("/pathways?genes=BRCA1");
    const hasRepair = body.affectedPathways.some(
      (p: any) =>
        /repair/i.test(p.name ?? "") || /repair/i.test(p.description ?? ""),
    );
    expect(hasRepair).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Survival
// ---------------------------------------------------------------------------
describe("Survival", () => {
  it("GET /survival?cancer=gbm returns valid survival statistics", async () => {
    const { body } = await get("/survival?cancer=gbm");
    expect(body.fiveYearSurvival).toBeGreaterThanOrEqual(0);
    expect(body.fiveYearSurvival).toBeLessThanOrEqual(1);
    expect(body.medianSurvivalMonths).toBeGreaterThan(0);
  });

  it("GET /survival?cancer=gbm&biomarker=mgmt returns stratified survival data", async () => {
    const { body } = await get("/survival?cancer=gbm&biomarker=mgmt");
    expect(body.positive).toBeDefined();
    expect(body.positive.fiveYearSurvival).toBeGreaterThan(0);
  });

  it("GET /survival?cancer=breast reports five-year survival above 80%", async () => {
    const { body } = await get("/survival?cancer=breast");
    expect(body.fiveYearSurvival).toBeGreaterThan(0.8);
  });
});

// ---------------------------------------------------------------------------
// Completeness
// ---------------------------------------------------------------------------
describe("Completeness", () => {
  it("GET /completeness/gbm returns a score between 0 and 1 with modalities", async () => {
    const { body } = await get("/completeness/gbm");
    expect(body.score).toBeGreaterThan(0);
    expect(body.score).toBeLessThanOrEqual(1);
    expect(typeof body.modalities).toBe("object");
  });
});

// ---------------------------------------------------------------------------
// Trials
// ---------------------------------------------------------------------------
describe("Trials", () => {
  it("GET /trials?cancer=gbm returns a trials array", async () => {
    const { body } = await get("/trials?cancer=gbm");
    expect(Array.isArray(body.trials)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// OpenAPI
// ---------------------------------------------------------------------------
describe("OpenAPI", () => {
  it("GET /openapi.json returns a valid OpenAPI 3.0.3 spec with at least 10 paths", async () => {
    const { body } = await get("/openapi.json");
    expect(body.openapi).toBe("3.0.3");
    expect(Object.keys(body.paths).length).toBeGreaterThanOrEqual(10);
  });
});

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------
describe("Error handling", () => {
  it("GET /discover without params returns 400 with Missing error", async () => {
    const { status, body } = await get("/discover");
    expect(status).toBe(400);
    expect(body.error).toMatch(/Missing/i);
  });
});
