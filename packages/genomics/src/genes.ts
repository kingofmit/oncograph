import { Biomarker } from "@oncograph/core";

/** Key cancer biomarkers and driver mutations */
export const CANCER_BIOMARKERS: Biomarker[] = [
  // Brain
  { id: "idh1", name: "IDH1 Mutation", gene: "IDH1", type: "mutation", cancerTypes: ["gbm", "lgg"], clinicalSignificance: "diagnostic", description: "IDH1 R132H mutation distinguishes diffuse gliomas; better prognosis when mutated." },
  { id: "mgmt", name: "MGMT Promoter Methylation", gene: "MGMT", type: "methylation", cancerTypes: ["gbm"], clinicalSignificance: "predictive", description: "Predicts response to temozolomide in glioblastoma." },
  { id: "1p19q", name: "1p/19q Co-deletion", gene: null, type: "deletion", cancerTypes: ["lgg"], clinicalSignificance: "diagnostic", description: "Defines oligodendroglioma; associated with PCV chemotherapy response." },
  // Breast
  { id: "brca1", name: "BRCA1 Mutation", gene: "BRCA1", type: "mutation", cancerTypes: ["brca", "ov"], clinicalSignificance: "predictive", description: "Hereditary breast/ovarian cancer; predicts PARP inhibitor response." },
  { id: "brca2", name: "BRCA2 Mutation", gene: "BRCA2", type: "mutation", cancerTypes: ["brca", "ov", "prad", "paad"], clinicalSignificance: "predictive", description: "Hereditary cancer syndrome; PARP inhibitor sensitivity." },
  { id: "her2", name: "HER2 Amplification", gene: "ERBB2", type: "amplification", cancerTypes: ["brca", "brca-her2"], clinicalSignificance: "therapeutic-target", description: "Target for trastuzumab, pertuzumab, and T-DXd." },
  { id: "er", name: "Estrogen Receptor", gene: "ESR1", type: "expression", cancerTypes: ["brca"], clinicalSignificance: "predictive", description: "Predicts response to endocrine therapy." },
  // Lung
  { id: "egfr", name: "EGFR Mutation", gene: "EGFR", type: "mutation", cancerTypes: ["nsclc"], clinicalSignificance: "therapeutic-target", description: "Target for osimertinib, erlotinib, gefitinib. Common in Asian, non-smoking populations." },
  { id: "alk", name: "ALK Fusion", gene: "ALK", type: "fusion", cancerTypes: ["nsclc"], clinicalSignificance: "therapeutic-target", description: "Target for crizotinib, alectinib, lorlatinib." },
  { id: "kras-g12c", name: "KRAS G12C Mutation", gene: "KRAS", type: "mutation", cancerTypes: ["nsclc", "crc"], clinicalSignificance: "therapeutic-target", description: "Target for sotorasib and adagrasib." },
  { id: "pdl1", name: "PD-L1 Expression", gene: "CD274", type: "expression", cancerTypes: ["nsclc", "skcm", "blca"], clinicalSignificance: "predictive", description: "Predicts response to immune checkpoint inhibitors (pembrolizumab, nivolumab)." },
  // Colorectal
  { id: "msi", name: "Microsatellite Instability", gene: null, type: "mutation", cancerTypes: ["crc", "crc-msi"], clinicalSignificance: "predictive", description: "MSI-H tumors respond to pembrolizumab. Key biomarker for Lynch syndrome screening." },
  { id: "braf-v600e", name: "BRAF V600E Mutation", gene: "BRAF", type: "mutation", cancerTypes: ["crc", "skcm", "thca"], clinicalSignificance: "therapeutic-target", description: "Target for encorafenib + cetuximab in CRC; vemurafenib in melanoma." },
  // Melanoma
  { id: "braf-mel", name: "BRAF Mutation (Melanoma)", gene: "BRAF", type: "mutation", cancerTypes: ["skcm"], clinicalSignificance: "therapeutic-target", description: "Present in ~50% of melanomas. Target for BRAF/MEK inhibitor combinations." },
  // Leukemia
  { id: "bcr-abl", name: "BCR-ABL1 Fusion", gene: "BCR-ABL1", type: "fusion", cancerTypes: ["cml", "all"], clinicalSignificance: "therapeutic-target", description: "Philadelphia chromosome. Target for imatinib, dasatinib, ponatinib." },
  { id: "flt3", name: "FLT3 Mutation", gene: "FLT3", type: "mutation", cancerTypes: ["aml"], clinicalSignificance: "prognostic", description: "FLT3-ITD associated with poor prognosis. Target for midostaurin, gilteritinib." },
];
