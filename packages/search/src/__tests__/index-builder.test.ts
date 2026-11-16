import { describe, it, expect, beforeEach } from "vitest";
import { CancerSearchIndex } from "../index-builder";
import type { Dataset, Biomarker } from "@oncograph/core";

function makeDataset(overrides?: Partial<Dataset>): Dataset {
  return {
    id: "ds-1",
    repositoryId: "test-repo",
    name: "TCGA Glioblastoma",
    description: "Comprehensive genomic characterization of glioblastoma multiforme",
    cancerTypes: ["gbm"],
    dataTypes: ["genomic"],
    patientCount: 528,
    sampleCount: 600,
    url: "https://example.com",
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
    description: "IDH1 hotspot mutation in gliomas",
    ...overrides,
  };
}

describe("CancerSearchIndex", () => {
  let index: CancerSearchIndex;

  beforeEach(() => {
    index = new CancerSearchIndex();
  });

  it("adding a dataset and searching for it by name returns it", () => {
    index.addDataset(makeDataset());
    const results = index.search("glioblastoma");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe("ds-1");
  });

  it("adding a biomarker and searching by gene name works", () => {
    index.addBiomarker(makeBiomarker());
    const results = index.search("IDH1");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe("bm-1");
  });

  it("search scores are descending", () => {
    index.addDataset(makeDataset());
    index.addDataset(
      makeDataset({
        id: "ds-2",
        name: "Breast Cancer Atlas",
        description: "Breast cancer study",
        cancerTypes: ["brca"],
      }),
    );
    index.addBiomarker(makeBiomarker());
    const results = index.search("glioblastoma");
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });

  it('synonym expansion works (search "GBM" finds "glioblastoma" entries)', () => {
    index.addDataset(makeDataset());
    const results = index.search("GBM");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.id === "ds-1")).toBe(true);
  });

  it("empty query returns empty results", () => {
    index.addDataset(makeDataset());
    const results = index.search("");
    expect(results).toEqual([]);
  });
});
