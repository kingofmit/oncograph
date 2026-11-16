import { describe, it, expect } from "vitest";
import { toJSON } from "../json";
import { datasetsToCSV, biomarkersToCSV, drugsToCSV } from "../csv";
import { toMarkdown } from "../markdown";
import type { DiscoveryResult } from "@oncograph/core";

function makeResult(): DiscoveryResult {
  return {
    query: { cancerType: "glioblastoma" },
    cancerType: {
      id: "gbm",
      name: "Glioblastoma",
      parent: "brain",
      tissue: "Brain/CNS",
      aliases: ["GBM"],
      oncoTreeCode: "GBM",
    },
    datasets: [
      {
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
      },
    ],
    biomarkers: [
      {
        id: "idh1",
        name: "IDH1 R132H",
        gene: "IDH1",
        type: "mutation",
        cancerTypes: ["gbm"],
        clinicalSignificance: ["diagnostic", "prognostic"],
        description: "IDH1 hotspot mutation",
      },
    ],
    drugs: [
      {
        id: "tmz",
        name: "Temozolomide",
        aliases: ["TMZ"],
        targets: ["DNA"],
        mechanism: "Alkylating agent",
        cancerTypes: ["gbm"],
        approvalStatus: "approved",
      },
    ],
    trials: [],
    repositories: [],
    timestamp: Date.now(),
    disclaimer: "OncoGraph provides research data discovery information.",
  };
}

describe("toJSON", () => {
  it("returns valid JSON string", () => {
    const json = toJSON(makeResult());
    expect(() => JSON.parse(json)).not.toThrow();
    const parsed = JSON.parse(json);
    expect(parsed.query.cancerType).toBe("glioblastoma");
  });
});

describe("datasetsToCSV", () => {
  it("has correct header", () => {
    const csv = datasetsToCSV(makeResult());
    const firstLine = csv.split("\n")[0];
    expect(firstLine).toBe("name,repository,data_types,access,patients,url,description");
  });
});

describe("biomarkersToCSV", () => {
  it("includes significance as semicolon-separated", () => {
    const csv = biomarkersToCSV(makeResult());
    expect(csv).toContain("diagnostic; prognostic");
  });
});

describe("drugsToCSV", () => {
  it("has correct columns", () => {
    const csv = drugsToCSV(makeResult());
    const firstLine = csv.split("\n")[0];
    expect(firstLine).toBe("name,aliases,targets,mechanism,class,approval_status,indications");
  });
});

describe("toMarkdown", () => {
  it("includes section headers", () => {
    const md = toMarkdown(makeResult());
    expect(md).toContain("# Cancer Data Discovery Report");
    expect(md).toContain("## Available Datasets");
    expect(md).toContain("## Key Biomarkers");
    expect(md).toContain("## Targeted Therapies");
  });
});
