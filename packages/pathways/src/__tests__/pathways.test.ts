import { describe, it, expect } from "vitest";
import { CANCER_PATHWAYS, getPathwaysByGene } from "../pathways";
import { analyzePathways } from "../analyzer";

describe("CANCER_PATHWAYS", () => {
  it("has 20 entries", () => {
    expect(CANCER_PATHWAYS).toHaveLength(20);
  });

  it("each pathway has id, name, genes, and source", () => {
    for (const pathway of CANCER_PATHWAYS) {
      expect(pathway.id).toBeTruthy();
      expect(pathway.name).toBeTruthy();
      expect(pathway.genes.length).toBeGreaterThan(0);
      expect(["KEGG", "Reactome"]).toContain(pathway.source);
    }
  });
});

describe("analyzePathways", () => {
  it('analyzePathways(["EGFR"]) returns RTK signaling pathway', () => {
    const result = analyzePathways(["EGFR"]);
    expect(result.affectedPathways.some((p) => p.id === "rtk")).toBe(true);
    expect(result.affectedPathways.some((p) => p.name.includes("Receptor Tyrosine Kinase"))).toBe(true);
  });

  it('analyzePathways(["BRCA1"]) returns DNA repair pathway', () => {
    const result = analyzePathways(["BRCA1"]);
    expect(result.affectedPathways.some((p) => p.id === "hrr-dna-repair")).toBe(true);
  });

  it("analyzePathways([]) returns empty analysis", () => {
    const result = analyzePathways([]);
    expect(result.affectedPathways).toEqual([]);
    expect(result.downstreamEffects).toEqual([]);
    expect(result.drugTargets).toEqual([]);
  });
});
