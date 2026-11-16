import { Repository } from "@oncograph/core";

export const DRUG_REPOSITORIES: Repository[] = [
  { id: "depmap", name: "Cancer Dependency Map", abbreviation: "DepMap", url: "https://depmap.org", apiUrl: "https://api.depmap.org", dataTypes: ["cell-line", "drug-sensitivity", "genomic"], accessModel: "open", organization: "Broad Institute", description: "CRISPR screens, drug sensitivity profiles, and multi-omics for hundreds of cancer cell lines.", scale: "1,000+ cell lines" },
  { id: "gdsc", name: "Genomics of Drug Sensitivity in Cancer", abbreviation: "GDSC", url: "https://www.cancerrxgene.org", apiUrl: null, dataTypes: ["drug-sensitivity", "cell-line"], accessModel: "open", organization: "Wellcome Sanger Institute", description: "Drug sensitivity curves for 1,000s of compounds across cancer cell lines.", scale: "1,000+ cell lines, 600+ compounds" },
  { id: "nci60", name: "NCI-60 Human Tumor Cell Line Screen", abbreviation: "NCI-60", url: "https://dtp.cancer.gov/discovery_development/nci-60", apiUrl: null, dataTypes: ["drug-sensitivity", "cell-line"], accessModel: "open", organization: "NCI", description: "Legacy large-scale drug screening panel across 60 cancer cell lines.", scale: "60 cell lines, 100,000+ compounds tested" },
];
