import { Repository } from "@oncograph/core";

export const GENOMIC_REPOSITORIES: Repository[] = [
  { id: "gdc", name: "Genomic Data Commons", abbreviation: "GDC", url: "https://gdc.cancer.gov", apiUrl: "https://api.gdc.cancer.gov", dataTypes: ["genomic", "transcriptomic", "clinical"], accessModel: "controlled", organization: "NCI", description: "Central node of the CRDC hosting TCGA, TARGET, and other major genomic programs.", scale: "2.5+ PB across CRDC" },
  { id: "icgc", name: "ICGC ARGO", abbreviation: "ICGC", url: "https://platform.icgc-argo.org", apiUrl: "https://api.icgc-argo.org", dataTypes: ["genomic", "transcriptomic", "clinical"], accessModel: "controlled", organization: "ICGC", description: "International consortium with 25,000 tumor-normal pairs across 22 jurisdictions.", scale: "25,000 tumor-normal pairs" },
  { id: "genie", name: "AACR Project GENIE", abbreviation: "GENIE", url: "https://www.aacr.org/professionals/research/aacr-project-genie", apiUrl: null, dataTypes: ["genomic", "clinical"], accessModel: "controlled", organization: "AACR", description: "Real-world genomic and clinical data from 200,000+ patients across major cancer centers.", scale: "200,000+ patients" },
  { id: "pcawg", name: "Pan-Cancer Analysis of Whole Genomes", abbreviation: "PCAWG", url: "https://dcc.icgc.org/pcawg", apiUrl: null, dataTypes: ["genomic"], accessModel: "controlled", organization: "ICGC/TCGA", description: "Whole-genome sequencing across cancer types, discovering non-coding drivers.", scale: "2,658 whole genomes" },
];
