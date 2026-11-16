import { Drug } from "@oncograph/core";

export const KEY_DRUGS: Drug[] = [
  { id: "temozolomide", name: "Temozolomide", aliases: ["TMZ", "Temodar"], targets: ["DNA alkylation"], mechanism: "Alkylating agent", cancerTypes: ["gbm", "lgg"], approvalStatus: "approved" },
  { id: "osimertinib", name: "Osimertinib", aliases: ["Tagrisso"], targets: ["EGFR"], mechanism: "Third-generation EGFR TKI", cancerTypes: ["nsclc"], approvalStatus: "approved" },
  { id: "trastuzumab", name: "Trastuzumab", aliases: ["Herceptin"], targets: ["HER2"], mechanism: "Anti-HER2 monoclonal antibody", cancerTypes: ["brca", "brca-her2"], approvalStatus: "approved" },
  { id: "pembrolizumab", name: "Pembrolizumab", aliases: ["Keytruda"], targets: ["PD-1"], mechanism: "Anti-PD-1 immune checkpoint inhibitor", cancerTypes: ["nsclc", "skcm", "crc-msi", "blca"], approvalStatus: "approved" },
  { id: "imatinib", name: "Imatinib", aliases: ["Gleevec"], targets: ["BCR-ABL", "KIT", "PDGFRA"], mechanism: "Tyrosine kinase inhibitor", cancerTypes: ["cml"], approvalStatus: "approved" },
  { id: "olaparib", name: "Olaparib", aliases: ["Lynparza"], targets: ["PARP"], mechanism: "PARP inhibitor", cancerTypes: ["brca", "ov", "prad", "paad"], approvalStatus: "approved" },
  { id: "sotorasib", name: "Sotorasib", aliases: ["Lumakras"], targets: ["KRAS G12C"], mechanism: "KRAS G12C inhibitor", cancerTypes: ["nsclc"], approvalStatus: "approved" },
  { id: "vemurafenib", name: "Vemurafenib", aliases: ["Zelboraf"], targets: ["BRAF V600E"], mechanism: "BRAF inhibitor", cancerTypes: ["skcm"], approvalStatus: "approved" },
  { id: "encorafenib", name: "Encorafenib", aliases: ["Braftovi"], targets: ["BRAF"], mechanism: "BRAF inhibitor", cancerTypes: ["crc", "skcm"], approvalStatus: "approved" },
  { id: "bevacizumab", name: "Bevacizumab", aliases: ["Avastin"], targets: ["VEGF"], mechanism: "Anti-VEGF monoclonal antibody", cancerTypes: ["crc", "nsclc", "gbm", "ov"], approvalStatus: "approved" },
];
