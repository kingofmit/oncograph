import { describe, it, expect, beforeEach } from "vitest";
import { discover } from "../query";
import { DataRegistry } from "../registry";
import type { Dataset, Biomarker, Drug, Repository } from "../types";

describe("discover", () => {
  let registry: DataRegistry;

  beforeEach(() => {
    registry = new DataRegistry();

    const repo: Repository = {
      id: "gdc",
      name: "Genomic Data Commons",
      abbreviation: "GDC",
      url: "https://gdc.cancer.gov",
      apiUrl: "https://api.gdc.cancer.gov",
      dataTypes: ["genomic"],
      accessModel: "open",
      organization: "NCI",
      description: "NCI GDC",
      scale: "80,000+ cases",
    };
    registry.registerRepository(repo);

    const ds: Dataset = {
      id: "tcga-gbm",
      repositoryId: "gdc",
      name: "TCGA-GBM",
      description: "TCGA Glioblastoma",
      cancerTypes: ["gbm"],
      dataTypes: ["genomic", "transcriptomic"],
      patientCount: 528,
      sampleCount: 600,
      url: "https://gdc.cancer.gov/tcga-gbm",
      accessModel: "open",
      lastUpdated: "2024-01-01",
    };
    registry.registerDataset(ds);

    const controlledDs: Dataset = {
      id: "controlled-gbm",
      repositoryId: "gdc",
      name: "Controlled GBM Dataset",
      description: "Controlled access GBM data",
      cancerTypes: ["gbm"],
      dataTypes: ["genomic"],
      patientCount: 100,
      sampleCount: 100,
      url: null,
      accessModel: "controlled",
      lastUpdated: null,
    };
    registry.registerDataset(controlledDs);

    const bm: Biomarker = {
      id: "idh1-r132h",
      name: "IDH1 R132H",
      gene: "IDH1",
      type: "mutation",
      cancerTypes: ["gbm"],
      clinicalSignificance: ["diagnostic", "prognostic"],
      description: "IDH1 hotspot mutation",
    };
    registry.registerBiomarker(bm);

    const drug: Drug = {
      id: "tmz",
      name: "Temozolomide",
      aliases: ["TMZ"],
      targets: ["DNA"],
      mechanism: "Alkylating agent",
      cancerTypes: ["gbm"],
      approvalStatus: "approved",
    };
    registry.registerDrug(drug);
  });

  it("returns datasets, biomarkers, drugs for glioblastoma query", () => {
    const result = discover({ cancerType: "glioblastoma" }, registry);
    expect(result.cancerType).not.toBeNull();
    expect(result.datasets.length).toBeGreaterThan(0);
    expect(result.biomarkers.length).toBeGreaterThan(0);
    expect(result.drugs.length).toBeGreaterThan(0);
  });

  it('discovery includes subtypes (querying "brain" returns GBM data)', () => {
    const result = discover({ cancerType: "brain" }, registry);
    expect(result.cancerType).not.toBeNull();
    // brain tree includes gbm, so datasets registered under gbm should appear
    expect(result.datasets.some((ds) => ds.id === "tcga-gbm")).toBe(true);
  });

  it("unknown cancer type returns null cancerType with empty results", () => {
    const result = discover({ cancerType: "zzz-nonexistent-cancer" }, registry);
    expect(result.cancerType).toBeNull();
    expect(result.datasets).toEqual([]);
    expect(result.biomarkers).toEqual([]);
    expect(result.drugs).toEqual([]);
  });

  it("access model filtering works", () => {
    const result = discover({ cancerType: "glioblastoma", accessModel: ["open"] }, registry);
    expect(result.datasets.every((ds) => ds.accessModel === "open")).toBe(true);
  });

  it("disclaimer is present", () => {
    const result = discover({ cancerType: "glioblastoma" }, registry);
    expect(result.disclaimer).toBeTruthy();
    expect(result.disclaimer.length).toBeGreaterThan(20);
  });
});
