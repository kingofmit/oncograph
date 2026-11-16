import { CrossReference, DataType } from "./types";

/** Cross-reference registry linking samples across repositories */
export class CrossReferenceRegistry {
  private refs = new Map<string, CrossReference>();

  register(ref: CrossReference): void {
    this.refs.set(ref.sampleId, ref);
  }

  registerBatch(refs: CrossReference[]): void {
    for (const ref of refs) this.register(ref);
  }

  findBySample(sampleId: string): CrossReference | undefined {
    return this.refs.get(sampleId);
  }

  findByCancerType(cancerTypeId: string): CrossReference[] {
    return Array.from(this.refs.values()).filter((r) => r.cancerType === cancerTypeId);
  }

  findByRepository(repositoryId: string): CrossReference[] {
    return Array.from(this.refs.values()).filter((r) =>
      r.repositories.some((repo) => repo.repositoryId === repositoryId),
    );
  }

  get size(): number { return this.refs.size; }
}

/** Pre-built project-level cross-references for major cohorts */
export const PROJECT_CROSS_REFERENCES: CrossReference[] = [
  // TCGA-GBM appears across multiple repositories
  {
    sampleId: "TCGA-GBM",
    cancerType: "gbm",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "epigenomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-GBM" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging", "histopathology"], url: "https://www.cancerimagingarchive.net/collection/tcga-gbm/" },
      { repositoryId: "cda", datasetId: "cda-tcga", dataTypes: ["genomic", "imaging", "proteomic"] },
      { repositoryId: "depmap", datasetId: "depmap-data", dataTypes: ["cell-line", "drug-sensitivity"] },
    ],
  },
  {
    sampleId: "TCGA-LGG",
    cancerType: "lgg",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-LGG" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"], url: "https://www.cancerimagingarchive.net/collection/tcga-lgg/" },
      { repositoryId: "cda", datasetId: "cda-tcga", dataTypes: ["genomic", "imaging"] },
    ],
  },
  {
    sampleId: "TCGA-BRCA",
    cancerType: "brca",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "epigenomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-BRCA" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging", "histopathology"] },
      { repositoryId: "cda", datasetId: "cda-tcga", dataTypes: ["genomic", "imaging", "proteomic"] },
    ],
  },
  {
    sampleId: "TCGA-LUAD",
    cancerType: "nsclc",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-LUAD" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
      { repositoryId: "cda", datasetId: "cda-tcga", dataTypes: ["genomic", "imaging", "proteomic"] },
    ],
  },
  {
    sampleId: "TCGA-LUSC",
    cancerType: "nsclc",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-LUSC" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
    ],
  },
  {
    sampleId: "TCGA-COAD",
    cancerType: "crc",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-COAD" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging", "histopathology"] },
      { repositoryId: "cda", datasetId: "cda-tcga", dataTypes: ["genomic", "imaging", "proteomic"] },
    ],
  },
  {
    sampleId: "TCGA-READ",
    cancerType: "crc",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-READ" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
    ],
  },
  {
    sampleId: "TCGA-OV",
    cancerType: "ov",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-OV" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
      { repositoryId: "cda", datasetId: "cda-tcga", dataTypes: ["genomic", "proteomic"] },
    ],
  },
  {
    sampleId: "TCGA-PRAD",
    cancerType: "prad",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-PRAD" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
    ],
  },
  {
    sampleId: "TCGA-SKCM",
    cancerType: "skcm",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-SKCM" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging", "histopathology"] },
    ],
  },
  {
    sampleId: "TCGA-KIRC",
    cancerType: "kirc",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-KIRC" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
      { repositoryId: "cda", datasetId: "cda-tcga", dataTypes: ["genomic", "proteomic"] },
    ],
  },
  {
    sampleId: "TCGA-LAML",
    cancerType: "aml",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-LAML" },
    ],
  },
  {
    sampleId: "TCGA-PAAD",
    cancerType: "paad",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-PAAD" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
    ],
  },
  {
    sampleId: "TCGA-THCA",
    cancerType: "thca",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-THCA" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
    ],
  },
  {
    sampleId: "TCGA-BLCA",
    cancerType: "blca",
    repositories: [
      { repositoryId: "gdc", datasetId: "tcga", dataTypes: ["genomic", "transcriptomic", "clinical"], url: "https://portal.gdc.cancer.gov/projects/TCGA-BLCA" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
    ],
  },
  // CPTAC proteomics cross-references
  {
    sampleId: "CPTAC-GBM",
    cancerType: "gbm",
    repositories: [
      { repositoryId: "gdc", datasetId: "cptac-gbm", dataTypes: ["proteomic", "genomic"], url: "https://proteomic.datacommons.cancer.gov/pdc/study/PDC000204" },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
    ],
  },
  {
    sampleId: "CPTAC-BRCA",
    cancerType: "brca",
    repositories: [
      { repositoryId: "gdc", datasetId: "cptac-brca", dataTypes: ["proteomic", "genomic"] },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
    ],
  },
  {
    sampleId: "CPTAC-LUAD",
    cancerType: "nsclc",
    repositories: [
      { repositoryId: "gdc", datasetId: "cptac-luad", dataTypes: ["proteomic", "genomic"] },
      { repositoryId: "tcia", datasetId: "tcga-imaging", dataTypes: ["imaging"] },
    ],
  },
];
