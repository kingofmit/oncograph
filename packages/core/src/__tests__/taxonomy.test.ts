import { describe, it, expect } from "vitest";
import { searchCancerTypes, getCancerTree, getTissues, CANCER_TYPES } from "../taxonomy";

describe("searchCancerTypes", () => {
  it('returns results with id "gbm" when searching for "glioblastoma"', () => {
    const results = searchCancerTypes("glioblastoma");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.id === "gbm")).toBe(true);
  });

  it("works case-insensitively for GBM", () => {
    const results = searchCancerTypes("GBM");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.id === "gbm")).toBe(true);
  });
});

describe("getCancerTree", () => {
  it('includes gbm, lgg, and other brain subtypes for "brain"', () => {
    const tree = getCancerTree("brain");
    const ids = tree.map((t) => t.id);
    expect(ids).toContain("gbm");
    expect(ids).toContain("lgg");
    expect(tree.length).toBeGreaterThan(5);
  });

  it("returns empty array for nonexistent type", () => {
    const tree = getCancerTree("nonexistent");
    expect(tree).toEqual([]);
  });
});

describe("getTissues", () => {
  it("returns sorted unique tissue names", () => {
    const tissues = getTissues();
    expect(tissues.length).toBeGreaterThan(5);
    const sorted = [...tissues].sort();
    expect(tissues).toEqual(sorted);
    // Check uniqueness
    expect(new Set(tissues).size).toBe(tissues.length);
  });
});

describe("CANCER_TYPES data integrity", () => {
  it("has more than 800 cancer types", () => {
    expect(CANCER_TYPES.length).toBeGreaterThan(800);
  });

  it("all cancer types have id, name, and tissue", () => {
    for (const ct of CANCER_TYPES) {
      expect(ct.id).toBeTruthy();
      expect(ct.name).toBeTruthy();
      expect(ct.tissue).toBeTruthy();
    }
  });

  it("ICD-O-3 codes are present on most entries", () => {
    const withCode = CANCER_TYPES.filter((ct) => ct.icdO3Code);
    expect(withCode.length / CANCER_TYPES.length).toBeGreaterThan(0.5);
  });

  it("parent references are valid (parent exists or is null)", () => {
    const ids = new Set(CANCER_TYPES.map((ct) => ct.id));
    for (const ct of CANCER_TYPES) {
      if (ct.parent !== null) {
        expect(ids.has(ct.parent)).toBe(true);
      }
    }
  });
});
