import { describe, it, expect } from "vitest";
import { getSurvival, getSurvivalComparison, getAllSurvivalData } from "../queries";

describe("getSurvival", () => {
  it("returns overall survival data for a cancer type with null biomarker", () => {
    // Breast cancer has a null-biomarker (overall) entry
    const data = getSurvival("breast cancer");
    expect(data).toBeDefined();
    expect(data!.biomarker).toBeNull();
    expect(data!.fiveYearSurvival).toBeGreaterThan(0);
    expect(data!.fiveYearSurvival).toBeLessThanOrEqual(1);
  });

  it('returns MGMT-specific data for "glioblastoma" + "mgmt"', () => {
    const data = getSurvival("glioblastoma", "mgmt");
    expect(data).toBeDefined();
    expect(data!.biomarker).toContain("MGMT");
    expect(data!.fiveYearSurvival).toBeGreaterThan(0);
    expect(data!.fiveYearSurvival).toBeLessThanOrEqual(1);
  });
});

describe("getSurvivalComparison", () => {
  it("returns positive and optionally negative", () => {
    const result = getSurvivalComparison("breast cancer", "ER-positive");
    expect(result).toBeDefined();
    expect(result!.positive).toBeDefined();
    expect(result!.positive.biomarker).toContain("ER-positive");
    // negative is the overall (biomarker===null) entry
    expect(result!.negative).toBeDefined();
  });
});

describe("getAllSurvivalData", () => {
  it("returns 40+ entries", () => {
    const all = getAllSurvivalData();
    expect(all.length).toBeGreaterThanOrEqual(40);
  });

  it("all survival data has valid fiveYearSurvival between 0 and 1", () => {
    const all = getAllSurvivalData();
    for (const entry of all) {
      expect(entry.fiveYearSurvival).toBeGreaterThanOrEqual(0);
      expect(entry.fiveYearSurvival).toBeLessThanOrEqual(1);
    }
  });
});
