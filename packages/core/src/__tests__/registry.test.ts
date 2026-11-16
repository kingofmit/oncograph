import { describe, it, expect, beforeEach } from "vitest";
import { DataRegistry } from "../registry";
import type { Repository, Dataset, Biomarker, Drug } from "../types";

function makeRepo(overrides?: Partial<Repository>): Repository {
  return {
    id: "test-repo",
    name: "Test Repository",
    abbreviation: "TR",
    url: "https://example.com",
    apiUrl: null,
    dataTypes: ["genomic"],
    accessModel: "open",
    organization: "Test Org",
    description: "A test repository",
    scale: "100 samples",
    ...overrides,
  };
}

function makeDataset(overrides?: Partial<Dataset>): Dataset {
  return {
    id: "ds-1",
    repositoryId: "test-repo",
    name: "Test Dataset",
    description: "A test dataset",
    cancerTypes: ["gbm"],
    dataTypes: ["genomic"],
    patientCount: 100,
    sampleCount: 200,
    url: "https://example.com/ds1",
    accessModel: "open",
    lastUpdated: "2024-01-01",
    ...overrides,
  };
}

function makeBiomarker(overrides?: Partial<Biomarker>): Biomarker {
  return {
    id: "bm-1",
    name: "IDH1 R132H",
    gene: "IDH1",
    type: "mutation",
    cancerTypes: ["gbm"],
    clinicalSignificance: ["diagnostic", "prognostic"],
    description: "IDH1 mutation",
    ...overrides,
  };
}

function makeDrug(overrides?: Partial<Drug>): Drug {
  return {
    id: "drug-1",
    name: "Temozolomide",
    aliases: ["TMZ"],
    targets: ["DNA"],
    mechanism: "Alkylating agent",
    cancerTypes: ["gbm"],
    approvalStatus: "approved",
    ...overrides,
  };
}

describe("DataRegistry", () => {
  let registry: DataRegistry;

  beforeEach(() => {
    registry = new DataRegistry();
  });

  it("registers and finds datasets by cancer type", () => {
    registry.registerDataset(makeDataset());
    const results = registry.findDatasets("gbm");
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("ds-1");
  });

  it("registers and finds biomarkers", () => {
    registry.registerBiomarker(makeBiomarker());
    const results = registry.findBiomarkers("gbm");
    expect(results).toHaveLength(1);
    expect(results[0].gene).toBe("IDH1");
  });

  it("registers and finds drugs", () => {
    registry.registerDrug(makeDrug());
    const results = registry.findDrugs("gbm");
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Temozolomide");
  });

  it("pan-cancer datasets match any cancer type query", () => {
    registry.registerDataset(makeDataset({ id: "ds-pan", cancerTypes: ["pan-cancer"] }));
    const results = registry.findDatasets("brca");
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("ds-pan");
  });

  it("getRepository returns registered repo", () => {
    registry.registerRepository(makeRepo());
    const repo = registry.getRepository("test-repo");
    expect(repo).toBeDefined();
    expect(repo!.name).toBe("Test Repository");
  });

  it("getDatasetCount is accurate", () => {
    expect(registry.getDatasetCount()).toBe(0);
    registry.registerDataset(makeDataset());
    registry.registerDataset(makeDataset({ id: "ds-2" }));
    expect(registry.getDatasetCount()).toBe(2);
  });
});
