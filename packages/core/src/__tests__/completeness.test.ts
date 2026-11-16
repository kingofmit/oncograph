import { describe, it, expect } from "vitest";
import { computeCompleteness } from "../completeness";
import { DataRegistry } from "../registry";
import type { Dataset } from "../types";

function makeDataset(overrides: Partial<Dataset>): Dataset {
  return {
    id: "ds-1",
    repositoryId: "test-repo",
    name: "Test Dataset",
    description: "A test dataset",
    cancerTypes: ["gbm"],
    dataTypes: ["genomic"],
    patientCount: 100,
    sampleCount: 200,
    url: null,
    accessModel: "open",
    lastUpdated: null,
    ...overrides,
  };
}

describe("computeCompleteness", () => {
  it("returns score between 0 and 1", () => {
    const registry = new DataRegistry();
    registry.registerDataset(makeDataset({ dataTypes: ["genomic", "transcriptomic"] }));
    const result = computeCompleteness("gbm", registry);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
  });

  it("gaps list contains missing modalities", () => {
    const registry = new DataRegistry();
    registry.registerDataset(makeDataset({ dataTypes: ["genomic"] }));
    const result = computeCompleteness("gbm", registry);
    expect(result.gaps).toContain("transcriptomic");
    expect(result.gaps).toContain("imaging");
    expect(result.gaps).not.toContain("genomic");
  });

  it("pan-cancer types with many datasets score higher", () => {
    const registryFull = new DataRegistry();
    registryFull.registerDataset(
      makeDataset({
        id: "ds-full",
        cancerTypes: ["gbm"],
        dataTypes: ["genomic", "transcriptomic", "proteomic", "imaging", "clinical", "drug-sensitivity"],
      }),
    );
    const full = computeCompleteness("gbm", registryFull);

    const registryPartial = new DataRegistry();
    registryPartial.registerDataset(
      makeDataset({ id: "ds-partial", cancerTypes: ["gbm"], dataTypes: ["genomic"] }),
    );
    const partial = computeCompleteness("gbm", registryPartial);

    expect(full.score).toBeGreaterThan(partial.score);
  });
});
