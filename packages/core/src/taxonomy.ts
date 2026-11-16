import { CancerType } from "./types";

/** OncoTree-based cancer type taxonomy */
export const CANCER_TYPES: CancerType[] = [
  // CNS / Neuro-Oncology
  { id: "gbm", name: "Glioblastoma", parent: "brain", tissue: "Brain", aliases: ["glioblastoma multiforme", "GBM", "grade IV glioma"], oncoTreeCode: "GBM" },
  { id: "lgg", name: "Low-Grade Glioma", parent: "brain", tissue: "Brain", aliases: ["LGG", "grade II glioma", "diffuse glioma"], oncoTreeCode: "LGG" },
  { id: "medullo", name: "Medulloblastoma", parent: "brain", tissue: "Brain", aliases: ["MB", "cerebellar tumor"], oncoTreeCode: "MBL" },
  { id: "menin", name: "Meningioma", parent: "brain", tissue: "Brain", aliases: ["meningeal tumor"], oncoTreeCode: "MNG" },
  { id: "brain", name: "Brain Cancer", parent: null, tissue: "Brain", aliases: ["CNS tumor", "brain tumor", "intracranial neoplasm"], oncoTreeCode: null },

  // Breast
  { id: "brca", name: "Breast Cancer", parent: null, tissue: "Breast", aliases: ["breast carcinoma", "BRCA", "breast tumor"], oncoTreeCode: "BREAST" },
  { id: "brca-tnbc", name: "Triple-Negative Breast Cancer", parent: "brca", tissue: "Breast", aliases: ["TNBC"], oncoTreeCode: "TNBC" },
  { id: "brca-her2", name: "HER2-Positive Breast Cancer", parent: "brca", tissue: "Breast", aliases: ["HER2+"], oncoTreeCode: null },

  // Lung
  { id: "nsclc", name: "Non-Small Cell Lung Cancer", parent: "lung", tissue: "Lung", aliases: ["NSCLC", "lung adenocarcinoma", "squamous cell lung"], oncoTreeCode: "NSCLC" },
  { id: "sclc", name: "Small Cell Lung Cancer", parent: "lung", tissue: "Lung", aliases: ["SCLC", "oat cell carcinoma"], oncoTreeCode: "SCLC" },
  { id: "lung", name: "Lung Cancer", parent: null, tissue: "Lung", aliases: ["pulmonary cancer", "lung tumor", "bronchogenic carcinoma"], oncoTreeCode: "LUNG" },

  // Colorectal
  { id: "crc", name: "Colorectal Cancer", parent: null, tissue: "Colon/Rectum", aliases: ["colon cancer", "rectal cancer", "CRC", "bowel cancer"], oncoTreeCode: "CRC" },
  { id: "crc-msi", name: "MSI-High Colorectal Cancer", parent: "crc", tissue: "Colon/Rectum", aliases: ["microsatellite instability", "MSI-H CRC"], oncoTreeCode: null },

  // Prostate
  { id: "prad", name: "Prostate Cancer", parent: null, tissue: "Prostate", aliases: ["prostate adenocarcinoma", "PRAD"], oncoTreeCode: "PRAD" },

  // Pancreatic
  { id: "paad", name: "Pancreatic Cancer", parent: null, tissue: "Pancreas", aliases: ["pancreatic adenocarcinoma", "PDAC", "PAAD"], oncoTreeCode: "PAAD" },

  // Melanoma
  { id: "skcm", name: "Melanoma", parent: null, tissue: "Skin", aliases: ["cutaneous melanoma", "SKCM", "skin melanoma"], oncoTreeCode: "MEL" },

  // Leukemia
  { id: "aml", name: "Acute Myeloid Leukemia", parent: "leukemia", tissue: "Blood", aliases: ["AML"], oncoTreeCode: "AML" },
  { id: "all", name: "Acute Lymphoblastic Leukemia", parent: "leukemia", tissue: "Blood", aliases: ["ALL"], oncoTreeCode: "ALL" },
  { id: "cml", name: "Chronic Myeloid Leukemia", parent: "leukemia", tissue: "Blood", aliases: ["CML"], oncoTreeCode: "CML" },
  { id: "leukemia", name: "Leukemia", parent: null, tissue: "Blood", aliases: ["blood cancer"], oncoTreeCode: null },

  // Lymphoma
  { id: "dlbcl", name: "Diffuse Large B-Cell Lymphoma", parent: "lymphoma", tissue: "Lymph", aliases: ["DLBCL"], oncoTreeCode: "DLBCL" },
  { id: "hl", name: "Hodgkin Lymphoma", parent: "lymphoma", tissue: "Lymph", aliases: ["Hodgkin disease", "HL"], oncoTreeCode: "HL" },
  { id: "lymphoma", name: "Lymphoma", parent: null, tissue: "Lymph", aliases: ["lymphatic cancer"], oncoTreeCode: null },

  // Ovarian
  { id: "ov", name: "Ovarian Cancer", parent: null, tissue: "Ovary", aliases: ["ovarian carcinoma", "OV"], oncoTreeCode: "OV" },

  // Liver
  { id: "hcc", name: "Hepatocellular Carcinoma", parent: null, tissue: "Liver", aliases: ["liver cancer", "HCC", "hepatoma"], oncoTreeCode: "HCC" },

  // Kidney
  { id: "kirc", name: "Clear Cell Renal Cell Carcinoma", parent: "kidney", tissue: "Kidney", aliases: ["ccRCC", "KIRC"], oncoTreeCode: "CCRCC" },
  { id: "kidney", name: "Kidney Cancer", parent: null, tissue: "Kidney", aliases: ["renal cell carcinoma", "renal cancer"], oncoTreeCode: "KIDNEY" },

  // Thyroid
  { id: "thca", name: "Thyroid Cancer", parent: null, tissue: "Thyroid", aliases: ["thyroid carcinoma", "THCA", "papillary thyroid"], oncoTreeCode: "THYROID" },

  // Bladder
  { id: "blca", name: "Bladder Cancer", parent: null, tissue: "Bladder", aliases: ["urothelial carcinoma", "BLCA", "bladder tumor"], oncoTreeCode: "BLCA" },

  // Sarcoma
  { id: "sarc", name: "Sarcoma", parent: null, tissue: "Soft Tissue", aliases: ["soft tissue sarcoma", "SARC", "bone cancer"], oncoTreeCode: "SOFT_TISSUE" },
];

/** Find cancer types by keyword */
export function searchCancerTypes(query: string): CancerType[] {
  const q = query.toLowerCase().trim();
  return CANCER_TYPES.filter(
    (c) => c.name.toLowerCase().includes(q) || c.id === q || c.aliases.some((a) => a.toLowerCase().includes(q)) || c.tissue.toLowerCase().includes(q),
  );
}

/** Get a cancer type and all subtypes */
export function getCancerTree(typeId: string): CancerType[] {
  const result: CancerType[] = [];
  const root = CANCER_TYPES.find((c) => c.id === typeId);
  if (!root) return result;
  result.push(root);
  for (const child of CANCER_TYPES.filter((c) => c.parent === typeId)) {
    result.push(...getCancerTree(child.id));
  }
  return result;
}

/** Get all tissue types */
export function getTissues(): string[] {
  return [...new Set(CANCER_TYPES.map((c) => c.tissue))].sort();
}
