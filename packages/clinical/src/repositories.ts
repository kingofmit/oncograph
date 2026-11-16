import { Repository } from "@oncograph/core";

export const CLINICAL_REPOSITORIES: Repository[] = [
  { id: "seer", name: "Surveillance, Epidemiology, and End Results", abbreviation: "SEER", url: "https://seer.cancer.gov", apiUrl: null, dataTypes: ["epidemiological", "clinical"], accessModel: "controlled", organization: "NCI", description: "Population-based cancer incidence, survival, and prevalence data covering ~48% of the U.S. population.", scale: "Millions of cancer cases" },
  { id: "ukbiobank", name: "UK Biobank", abbreviation: "UKB", url: "https://www.ukbiobank.ac.uk", apiUrl: null, dataTypes: ["genomic", "clinical", "imaging", "epidemiological"], accessModel: "controlled", organization: "UK Biobank Ltd", description: "Large-scale biomedical database with genetics, health records, lifestyle data, and imaging for 500,000 UK participants.", scale: "500,000 participants" },
  { id: "cda", name: "Cancer Data Aggregator", abbreviation: "CDA", url: "https://datacommons.cancer.gov/cancer-data-aggregator", apiUrl: "https://cda.datacommons.cancer.gov", dataTypes: ["genomic", "imaging", "clinical", "proteomic"], accessModel: "open", organization: "NCI CRDC", description: "Cross-domain query service unifying GDC, PDC, and IDC under a single API.", scale: "Aggregates 2.5+ PB" },
];
