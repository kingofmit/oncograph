import { Repository } from "@oncograph/core";

export const DRUG_REPOSITORIES: Repository[] = [
  {
    id: "depmap",
    name: "Cancer Dependency Map",
    abbreviation: "DepMap",
    url: "https://depmap.org",
    apiUrl: "https://api.depmap.org",
    dataTypes: ["cell-line", "drug-sensitivity", "genomic"],
    accessModel: "open",
    organization: "Broad Institute",
    description:
      "Systematic identification of cancer dependencies via genome-wide CRISPR screens, RNAi, drug sensitivity profiles, and multi-omics characterization for 1,000+ cancer cell lines. Known overrepresentation of European-derived cell lines.",
    scale: "1,000+ cell lines, 4,000+ gene knockouts",
  },
  {
    id: "gdsc",
    name: "Genomics of Drug Sensitivity in Cancer",
    abbreviation: "GDSC",
    url: "https://www.cancerrxgene.org",
    apiUrl: null,
    dataTypes: ["drug-sensitivity", "cell-line"],
    accessModel: "open",
    organization: "Wellcome Sanger Institute",
    description:
      "Comprehensive drug sensitivity screening providing IC50 and AUC values for hundreds of anti-cancer compounds across cancer cell lines. Paired with genomic features (mutations, CNAs, methylation) for biomarker discovery.",
    scale: "1,000+ cell lines, 600+ compounds",
  },
  {
    id: "nci60",
    name: "NCI-60 Human Tumor Cell Line Screen",
    abbreviation: "NCI-60",
    url: "https://dtp.cancer.gov/discovery_development/nci-60",
    apiUrl: null,
    dataTypes: ["drug-sensitivity", "cell-line"],
    accessModel: "open",
    organization: "NCI",
    description:
      "Legacy high-throughput drug screening panel testing 100,000+ compounds across 60 cancer cell lines representing 9 tumor types. Foundational resource for computational pharmacology and drug response modeling.",
    scale: "60 cell lines, 100,000+ compounds tested",
  },
  {
    id: "chembl",
    name: "ChEMBL",
    abbreviation: "ChEMBL",
    url: "https://www.ebi.ac.uk/chembl",
    apiUrl: "https://www.ebi.ac.uk/chembl/api/data",
    dataTypes: ["drug-sensitivity", "pharmacogenomic"],
    accessModel: "open",
    organization: "EMBL-EBI",
    description:
      "Manually curated chemical biology database containing binding, functional, and ADMET bioactivity data for drug-like molecules extracted from medicinal chemistry literature. Covers 2M+ compounds with target annotations relevant to oncology drug discovery.",
    scale: "2.4M+ compounds, 20M+ bioactivity measurements",
  },
  {
    id: "drugbank",
    name: "DrugBank",
    abbreviation: "DrugBank",
    url: "https://go.drugbank.com",
    apiUrl: "https://go.drugbank.com/api/v1",
    dataTypes: ["pharmacogenomic", "clinical"],
    accessModel: "commercial",
    organization: "OMx Personal Health Analytics",
    description:
      "Comprehensive pharmaceutical knowledge base combining detailed drug data (chemical, pharmacological, pharmaceutical) with drug target information (sequence, structure, pathway). Free academic tier, commercial license for full access and API.",
    scale: "15,000+ drug entries, 5,000+ protein targets",
  },
  {
    id: "pharmgkb",
    name: "Pharmacogenomics Knowledge Base",
    abbreviation: "PharmGKB",
    url: "https://www.pharmgkb.org",
    apiUrl: "https://api.pharmgkb.org/v1/data",
    dataTypes: ["pharmacogenomic", "clinical"],
    accessModel: "open",
    organization: "Stanford University",
    description:
      "NIH-funded resource cataloguing the impact of human genetic variation on drug response. Curates genotype-phenotype relationships, drug-gene interactions, and clinical pharmacogenomics guidelines (CPIC, DPWG) relevant to oncology dosing and toxicity.",
    scale: "700+ drugs, 1,000+ gene-drug relationships",
  },
];
