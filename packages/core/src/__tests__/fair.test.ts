import { describe, it, expect } from "vitest";
import { assessFAIR, fairTotal } from "../fair";
import type { Dataset } from "../types";

function makeDataset(overrides?: Partial<Dataset>): Dataset {
  return {
    id: "ds-1",
    repositoryId: "test-repo",
    name: "Test Dataset",
    description: "A comprehensive test dataset with sufficient description length",
    cancerTypes: ["gbm"],
    dataTypes: ["genomic"],
    patientCount: 100,
    sampleCount: 200,
    url: "https://example.com/ds1",
    accessModel: "open",
    lastUpdated: "2024-01-01",
    doi: "10.1234/test",
    license: "CC-BY-4.0",
    formats: ["VCF", "BAM"],
    ...overrides,
  };
}

describe("assessFAIR", () => {
  it("returns scores between 0 and 1 for each dimension", () => {
    const score = assessFAIR(makeDataset());
    expect(score.findability).toBeGreaterThanOrEqual(0);
    expect(score.findability).toBeLessThanOrEqual(1);
    expect(score.accessibility).toBeGreaterThanOrEqual(0);
    expect(score.accessibility).toBeLessThanOrEqual(1);
    expect(score.interoperability).toBeGreaterThanOrEqual(0);
    expect(score.interoperability).toBeLessThanOrEqual(1);
    expect(score.reusability).toBeGreaterThanOrEqual(0);
    expect(score.reusability).toBeLessThanOrEqual(1);
  });

  it("open access datasets score higher on accessibility", () => {
    const open = assessFAIR(makeDataset({ accessModel: "open" }));
    const controlled = assessFAIR(makeDataset({ accessModel: "controlled" }));
    expect(open.accessibility).toBeGreaterThan(controlled.accessibility);
  });

  it("datasets with DOI score higher on findability", () => {
    const withDoi = assessFAIR(makeDataset({ doi: "10.1234/test" }));
    const withoutDoi = assessFAIR(makeDataset({ doi: undefined }));
    expect(withDoi.findability).toBeGreaterThan(withoutDoi.findability);
  });
});

describe("fairTotal", () => {
  it("averages the four scores", () => {
    const score = { findability: 0.8, accessibility: 0.6, interoperability: 0.4, reusability: 0.2 };
    expect(fairTotal(score)).toBeCloseTo(0.5);
  });
});
