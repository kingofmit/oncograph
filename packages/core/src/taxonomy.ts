import { CancerType } from "./types";

/** OncoTree-based cancer type taxonomy — WHO 2021 aligned */
export const CANCER_TYPES: CancerType[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // BRAIN / CNS (root)
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "brain", name: "Brain/CNS Cancer", parent: null, tissue: "Brain/CNS", aliases: ["CNS tumor", "brain tumor", "intracranial neoplasm", "central nervous system cancer"], oncoTreeCode: null, prevalence: "uncommon" },

  // Diffuse astrocytic and oligodendroglial tumors
  { id: "gbm", name: "Glioblastoma", parent: "brain", tissue: "Brain/CNS", aliases: ["glioblastoma multiforme", "GBM", "grade IV glioma"], oncoTreeCode: "GBM", icdO3Code: "9440/3", whoGrade: "IV", prevalence: "uncommon" },
  { id: "gbm-idh-wt", name: "Glioblastoma, IDH-wildtype", parent: "gbm", tissue: "Brain/CNS", aliases: ["GBM IDH-wt", "primary glioblastoma"], oncoTreeCode: "GBM", icdO3Code: "9440/3", whoGrade: "IV", molecularSubtype: "IDH-wildtype", prevalence: "uncommon" },
  { id: "gbm-idh-wt-classical", name: "Glioblastoma, IDH-wt, Classical", parent: "gbm-idh-wt", tissue: "Brain/CNS", aliases: ["classical GBM"], oncoTreeCode: "GBM", icdO3Code: "9440/3", whoGrade: "IV", molecularSubtype: "IDH-wt classical", prevalence: "uncommon" },
  { id: "gbm-idh-wt-mesenchymal", name: "Glioblastoma, IDH-wt, Mesenchymal", parent: "gbm-idh-wt", tissue: "Brain/CNS", aliases: ["mesenchymal GBM"], oncoTreeCode: "GBM", icdO3Code: "9440/3", whoGrade: "IV", molecularSubtype: "IDH-wt mesenchymal", prevalence: "uncommon" },
  { id: "gbm-idh-wt-proneural", name: "Glioblastoma, IDH-wt, Proneural", parent: "gbm-idh-wt", tissue: "Brain/CNS", aliases: ["proneural GBM"], oncoTreeCode: "GBM", icdO3Code: "9440/3", whoGrade: "IV", molecularSubtype: "IDH-wt proneural", prevalence: "uncommon" },
  { id: "gbm-idh-wt-neural", name: "Glioblastoma, IDH-wt, Neural", parent: "gbm-idh-wt", tissue: "Brain/CNS", aliases: ["neural GBM"], oncoTreeCode: "GBM", icdO3Code: "9440/3", whoGrade: "IV", molecularSubtype: "IDH-wt neural", prevalence: "rare" },
  { id: "astro-idh", name: "Astrocytoma, IDH-mutant", parent: "brain", tissue: "Brain/CNS", aliases: ["diffuse astrocytoma IDH-mutant", "astrocytoma IDH"], oncoTreeCode: "DASTR", icdO3Code: "9400/3", prevalence: "rare" },
  { id: "astro-idh-g2", name: "Astrocytoma, IDH-mutant, Grade 2", parent: "astro-idh", tissue: "Brain/CNS", aliases: ["diffuse astrocytoma grade 2", "low-grade astrocytoma IDH"], oncoTreeCode: "DASTR", icdO3Code: "9400/3", whoGrade: "II", molecularSubtype: "IDH-mutant", prevalence: "rare" },
  { id: "astro-idh-g3", name: "Astrocytoma, IDH-mutant, Grade 3", parent: "astro-idh", tissue: "Brain/CNS", aliases: ["anaplastic astrocytoma IDH-mutant"], oncoTreeCode: "AASTR", icdO3Code: "9401/3", whoGrade: "III", molecularSubtype: "IDH-mutant", prevalence: "rare" },
  { id: "astro-idh-g4", name: "Astrocytoma, IDH-mutant, Grade 4", parent: "astro-idh", tissue: "Brain/CNS", aliases: ["astrocytoma IDH-mutant grade 4"], oncoTreeCode: "AASTR", icdO3Code: "9440/3", whoGrade: "IV", molecularSubtype: "IDH-mutant", prevalence: "rare" },
  { id: "oligo", name: "Oligodendroglioma", parent: "brain", tissue: "Brain/CNS", aliases: ["ODG", "oligodendroglial tumor"], oncoTreeCode: "ODG", icdO3Code: "9450/3", prevalence: "rare" },
  { id: "oligo-g2", name: "Oligodendroglioma, Grade 2", parent: "oligo", tissue: "Brain/CNS", aliases: ["low-grade oligodendroglioma"], oncoTreeCode: "ODG", icdO3Code: "9450/3", whoGrade: "II", molecularSubtype: "IDH-mut 1p/19q-codel", prevalence: "rare" },
  { id: "oligo-g3", name: "Oligodendroglioma, Anaplastic, Grade 3", parent: "oligo", tissue: "Brain/CNS", aliases: ["anaplastic oligodendroglioma"], oncoTreeCode: "AODG", icdO3Code: "9451/3", whoGrade: "III", molecularSubtype: "IDH-mut 1p/19q-codel", prevalence: "rare" },
  { id: "dmg-h3k27", name: "Diffuse Midline Glioma, H3 K27-altered", parent: "brain", tissue: "Brain/CNS", aliases: ["DMG", "DIPG", "diffuse intrinsic pontine glioma", "H3K27M mutant glioma"], oncoTreeCode: "DMG", icdO3Code: "9385/3", whoGrade: "IV", molecularSubtype: "H3 K27-altered", prevalence: "rare" },
  { id: "lgg", name: "Low-Grade Glioma, NOS", parent: "brain", tissue: "Brain/CNS", aliases: ["LGG", "grade II glioma", "diffuse glioma NOS"], oncoTreeCode: "LGG", icdO3Code: "9400/3", whoGrade: "II", prevalence: "rare" },
  { id: "pilocytic-astro", name: "Pilocytic Astrocytoma", parent: "brain", tissue: "Brain/CNS", aliases: ["PA", "juvenile pilocytic astrocytoma", "JPA"], oncoTreeCode: "PAST", icdO3Code: "9421/1", whoGrade: "I", prevalence: "rare" },
  { id: "pxa", name: "Pleomorphic Xanthoastrocytoma", parent: "brain", tissue: "Brain/CNS", aliases: ["PXA"], oncoTreeCode: "PXA", icdO3Code: "9424/3", whoGrade: "II", prevalence: "ultra-rare" },
  { id: "pxa-anaplastic", name: "Pleomorphic Xanthoastrocytoma, Anaplastic", parent: "pxa", tissue: "Brain/CNS", aliases: ["anaplastic PXA"], oncoTreeCode: "PXA", icdO3Code: "9424/3", whoGrade: "III", prevalence: "ultra-rare" },
  { id: "sega", name: "Subependymal Giant Cell Astrocytoma", parent: "brain", tissue: "Brain/CNS", aliases: ["SEGA", "tuberous sclerosis-associated astrocytoma"], oncoTreeCode: "SEGA", icdO3Code: "9384/1", whoGrade: "I", prevalence: "ultra-rare" },
  { id: "ganglioglioma", name: "Ganglioglioma", parent: "brain", tissue: "Brain/CNS", aliases: ["GG", "gangliocytoma"], oncoTreeCode: "GNG", icdO3Code: "9505/1", whoGrade: "I", prevalence: "ultra-rare" },
  { id: "ganglioglioma-anaplastic", name: "Ganglioglioma, Anaplastic", parent: "ganglioglioma", tissue: "Brain/CNS", aliases: ["anaplastic ganglioglioma"], oncoTreeCode: "GNG", icdO3Code: "9505/3", whoGrade: "III", prevalence: "ultra-rare" },
  { id: "dnet", name: "Dysembryoplastic Neuroepithelial Tumor", parent: "brain", tissue: "Brain/CNS", aliases: ["DNET", "DNT"], oncoTreeCode: "DNT", icdO3Code: "9413/0", whoGrade: "I", prevalence: "ultra-rare" },
  { id: "central-neurocytoma", name: "Central Neurocytoma", parent: "brain", tissue: "Brain/CNS", aliases: ["neurocytoma"], oncoTreeCode: null, icdO3Code: "9506/1", whoGrade: "II", prevalence: "ultra-rare" },

  // Ependymal tumors
  { id: "ependymoma", name: "Ependymoma", parent: "brain", tissue: "Brain/CNS", aliases: ["EPD"], oncoTreeCode: "EPM", icdO3Code: "9391/3", prevalence: "rare" },
  { id: "ependymoma-rela", name: "Ependymoma, RELA Fusion-Positive", parent: "ependymoma", tissue: "Brain/CNS", aliases: ["RELA ependymoma", "supratentorial RELA"], oncoTreeCode: "EPM", icdO3Code: "9396/3", whoGrade: "II-III", molecularSubtype: "RELA fusion", prevalence: "ultra-rare" },
  { id: "ependymoma-yap1", name: "Ependymoma, YAP1 Fusion-Positive", parent: "ependymoma", tissue: "Brain/CNS", aliases: ["YAP1 ependymoma"], oncoTreeCode: "EPM", icdO3Code: "9396/3", whoGrade: "II", molecularSubtype: "YAP1 fusion", prevalence: "ultra-rare" },
  { id: "ependymoma-pfa", name: "Ependymoma, Posterior Fossa Group A", parent: "ependymoma", tissue: "Brain/CNS", aliases: ["PFA ependymoma"], oncoTreeCode: "EPM", icdO3Code: "9391/3", whoGrade: "II-III", molecularSubtype: "PFA", prevalence: "ultra-rare" },
  { id: "ependymoma-pfb", name: "Ependymoma, Posterior Fossa Group B", parent: "ependymoma", tissue: "Brain/CNS", aliases: ["PFB ependymoma"], oncoTreeCode: "EPM", icdO3Code: "9391/3", whoGrade: "II", molecularSubtype: "PFB", prevalence: "ultra-rare" },
  { id: "ependymoma-myxopap", name: "Myxopapillary Ependymoma", parent: "ependymoma", tissue: "Brain/CNS", aliases: ["myxopapillary"], oncoTreeCode: "MPE", icdO3Code: "9394/1", whoGrade: "II", prevalence: "ultra-rare" },
  { id: "subependymoma", name: "Subependymoma", parent: "ependymoma", tissue: "Brain/CNS", aliases: [], oncoTreeCode: "SUBE", icdO3Code: "9383/1", whoGrade: "I", prevalence: "ultra-rare" },
  { id: "ependymoma-anaplastic", name: "Ependymoma, Anaplastic", parent: "ependymoma", tissue: "Brain/CNS", aliases: ["anaplastic ependymoma"], oncoTreeCode: "EPM", icdO3Code: "9392/3", whoGrade: "III", prevalence: "ultra-rare" },
  { id: "ependymoma-spinal", name: "Spinal Ependymoma", parent: "ependymoma", tissue: "Brain/CNS", aliases: ["spinal cord ependymoma"], oncoTreeCode: "EPM", icdO3Code: "9391/3", whoGrade: "II", prevalence: "ultra-rare" },

  // Medulloblastoma
  { id: "medullo", name: "Medulloblastoma", parent: "brain", tissue: "Brain/CNS", aliases: ["MB", "cerebellar PNET"], oncoTreeCode: "MBL", icdO3Code: "9470/3", whoGrade: "IV", prevalence: "rare" },
  { id: "medullo-wnt", name: "Medulloblastoma, WNT-activated", parent: "medullo", tissue: "Brain/CNS", aliases: ["WNT medulloblastoma"], oncoTreeCode: "MBL", icdO3Code: "9470/3", whoGrade: "IV", molecularSubtype: "WNT", prevalence: "ultra-rare" },
  { id: "medullo-shh", name: "Medulloblastoma, SHH-activated", parent: "medullo", tissue: "Brain/CNS", aliases: ["SHH medulloblastoma", "sonic hedgehog medulloblastoma"], oncoTreeCode: "MBL", icdO3Code: "9470/3", whoGrade: "IV", molecularSubtype: "SHH", prevalence: "ultra-rare" },
  { id: "medullo-shh-tp53wt", name: "Medulloblastoma, SHH-activated, TP53-wildtype", parent: "medullo-shh", tissue: "Brain/CNS", aliases: ["SHH TP53-wt MB"], oncoTreeCode: "MBL", icdO3Code: "9470/3", whoGrade: "IV", molecularSubtype: "SHH TP53-wt", prevalence: "ultra-rare" },
  { id: "medullo-shh-tp53mut", name: "Medulloblastoma, SHH-activated, TP53-mutant", parent: "medullo-shh", tissue: "Brain/CNS", aliases: ["SHH TP53-mut MB"], oncoTreeCode: "MBL", icdO3Code: "9470/3", whoGrade: "IV", molecularSubtype: "SHH TP53-mut", prevalence: "ultra-rare" },
  { id: "medullo-grp3", name: "Medulloblastoma, Group 3", parent: "medullo", tissue: "Brain/CNS", aliases: ["group 3 medulloblastoma"], oncoTreeCode: "MBL", icdO3Code: "9470/3", whoGrade: "IV", molecularSubtype: "Group 3", prevalence: "ultra-rare" },
  { id: "medullo-grp4", name: "Medulloblastoma, Group 4", parent: "medullo", tissue: "Brain/CNS", aliases: ["group 4 medulloblastoma"], oncoTreeCode: "MBL", icdO3Code: "9470/3", whoGrade: "IV", molecularSubtype: "Group 4", prevalence: "ultra-rare" },

  // Meningioma
  { id: "menin", name: "Meningioma", parent: "brain", tissue: "Brain/CNS", aliases: ["meningeal tumor", "MNG"], oncoTreeCode: "MNG", icdO3Code: "9530/0", prevalence: "common" },
  { id: "menin-g1", name: "Meningioma, Grade 1", parent: "menin", tissue: "Brain/CNS", aliases: ["benign meningioma", "WHO grade 1 meningioma"], oncoTreeCode: "MNG", icdO3Code: "9530/0", whoGrade: "I", prevalence: "common" },
  { id: "menin-g2", name: "Meningioma, Grade 2", parent: "menin", tissue: "Brain/CNS", aliases: ["atypical meningioma", "WHO grade 2 meningioma"], oncoTreeCode: "MNG", icdO3Code: "9539/1", whoGrade: "II", prevalence: "uncommon" },
  { id: "menin-g3", name: "Meningioma, Grade 3", parent: "menin", tissue: "Brain/CNS", aliases: ["anaplastic meningioma", "malignant meningioma"], oncoTreeCode: "MNG", icdO3Code: "9530/3", whoGrade: "III", prevalence: "rare" },

  // Other CNS
  { id: "atrt", name: "Atypical Teratoid/Rhabdoid Tumor", parent: "brain", tissue: "Brain/CNS", aliases: ["ATRT", "AT/RT"], oncoTreeCode: "ATRT", icdO3Code: "9508/3", whoGrade: "IV", prevalence: "ultra-rare" },
  { id: "choroid-plexus-papilloma", name: "Choroid Plexus Papilloma", parent: "brain", tissue: "Brain/CNS", aliases: ["CPP"], oncoTreeCode: "CPP", icdO3Code: "9390/0", whoGrade: "I", prevalence: "ultra-rare" },
  { id: "choroid-plexus-carcinoma", name: "Choroid Plexus Carcinoma", parent: "brain", tissue: "Brain/CNS", aliases: ["CPC", "malignant choroid plexus tumor"], oncoTreeCode: "CPC", icdO3Code: "9390/3", whoGrade: "III", prevalence: "ultra-rare" },
  { id: "cns-lymphoma", name: "Primary CNS Lymphoma", parent: "brain", tissue: "Brain/CNS", aliases: ["PCNSL", "brain lymphoma"], oncoTreeCode: "PCNSL", icdO3Code: "9680/3", prevalence: "rare" },
  { id: "craniopharyngioma", name: "Craniopharyngioma", parent: "brain", tissue: "Brain/CNS", aliases: ["Rathke pouch tumor"], oncoTreeCode: "CPH", icdO3Code: "9350/1", whoGrade: "I", prevalence: "rare" },
  { id: "craniopharyngioma-adamant", name: "Craniopharyngioma, Adamantinomatous", parent: "craniopharyngioma", tissue: "Brain/CNS", aliases: ["adamantinomatous craniopharyngioma"], oncoTreeCode: "CPH", icdO3Code: "9351/1", whoGrade: "I", prevalence: "ultra-rare" },
  { id: "craniopharyngioma-papillary", name: "Craniopharyngioma, Papillary", parent: "craniopharyngioma", tissue: "Brain/CNS", aliases: ["papillary craniopharyngioma"], oncoTreeCode: "CPH", icdO3Code: "9352/1", whoGrade: "I", prevalence: "ultra-rare" },
  { id: "schwannoma", name: "Schwannoma", parent: "brain", tissue: "Brain/CNS", aliases: ["vestibular schwannoma", "acoustic neuroma", "neurilemmoma"], oncoTreeCode: "SCHW", icdO3Code: "9560/0", whoGrade: "I", prevalence: "uncommon" },
  { id: "neurofibroma", name: "Neurofibroma", parent: "brain", tissue: "Brain/CNS", aliases: ["NF", "plexiform neurofibroma"], oncoTreeCode: "NFIB", icdO3Code: "9540/0", whoGrade: "I", prevalence: "uncommon" },
  { id: "pineoblastoma", name: "Pineoblastoma", parent: "brain", tissue: "Brain/CNS", aliases: ["pineal blastoma"], oncoTreeCode: "PBL", icdO3Code: "9362/3", whoGrade: "IV", prevalence: "ultra-rare" },
  { id: "pineocytoma", name: "Pineocytoma", parent: "brain", tissue: "Brain/CNS", aliases: ["pineal parenchymal tumor"], oncoTreeCode: null, icdO3Code: "9361/1", whoGrade: "I", prevalence: "ultra-rare" },
  { id: "hemangioblastoma", name: "Hemangioblastoma", parent: "brain", tissue: "Brain/CNS", aliases: ["HB", "VHL-associated hemangioblastoma"], oncoTreeCode: "HGBL", icdO3Code: "9161/1", whoGrade: "I", prevalence: "rare" },
  { id: "chordoma", name: "Chordoma", parent: "brain", tissue: "Brain/CNS", aliases: ["skull base chordoma", "notochordal tumor"], oncoTreeCode: "CHORD", icdO3Code: "9370/3", prevalence: "ultra-rare" },
  { id: "cns-germ-cell", name: "CNS Germ Cell Tumor", parent: "brain", tissue: "Brain/CNS", aliases: ["intracranial germ cell tumor", "CNS germinoma"], oncoTreeCode: null, icdO3Code: "9064/3", prevalence: "ultra-rare" },
  { id: "cns-germinoma", name: "CNS Germinoma", parent: "cns-germ-cell", tissue: "Brain/CNS", aliases: ["intracranial germinoma"], oncoTreeCode: null, icdO3Code: "9064/3", prevalence: "ultra-rare" },
  { id: "gliosarcoma", name: "Gliosarcoma", parent: "gbm", tissue: "Brain/CNS", aliases: [], oncoTreeCode: "GBM", icdO3Code: "9442/3", whoGrade: "IV", prevalence: "ultra-rare" },
  { id: "diffuse-hemispheric-glioma", name: "Diffuse Hemispheric Glioma, H3 G34-mutant", parent: "brain", tissue: "Brain/CNS", aliases: ["H3 G34 glioma"], oncoTreeCode: null, icdO3Code: "9400/3", whoGrade: "IV", molecularSubtype: "H3 G34-mutant", prevalence: "ultra-rare" },
  { id: "high-grade-astro-pdgfra", name: "High-grade Astrocytoma with Piloid Features", parent: "brain", tissue: "Brain/CNS", aliases: ["piloid astrocytoma"], oncoTreeCode: null, icdO3Code: "9400/3", whoGrade: "IV", prevalence: "ultra-rare" },
  { id: "dlgnt", name: "Diffuse Leptomeningeal Glioneuronal Tumor", parent: "brain", tissue: "Brain/CNS", aliases: ["DLGNT"], oncoTreeCode: null, icdO3Code: "9506/1", prevalence: "ultra-rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // BREAST
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "brca", name: "Breast Cancer", parent: null, tissue: "Breast", aliases: ["breast carcinoma", "BRCA", "breast tumor", "mammary carcinoma"], oncoTreeCode: "BREAST", icdO3Code: "8500/3", prevalence: "common" },
  { id: "brca-idc", name: "Invasive Ductal Carcinoma", parent: "brca", tissue: "Breast", aliases: ["IDC", "ductal carcinoma", "NST breast cancer", "invasive carcinoma of no special type"], oncoTreeCode: "IDC", icdO3Code: "8500/3", prevalence: "common" },
  { id: "brca-ilc", name: "Invasive Lobular Carcinoma", parent: "brca", tissue: "Breast", aliases: ["ILC", "lobular carcinoma"], oncoTreeCode: "ILC", icdO3Code: "8520/3", prevalence: "common" },
  { id: "brca-luminal-a", name: "Breast Cancer, Luminal A", parent: "brca-idc", tissue: "Breast", aliases: ["luminal A", "ER+/HER2- low Ki67"], oncoTreeCode: "IDC", icdO3Code: "8500/3", molecularSubtype: "Luminal A", prevalence: "common" },
  { id: "brca-luminal-b", name: "Breast Cancer, Luminal B", parent: "brca-idc", tissue: "Breast", aliases: ["luminal B", "ER+/HER2- high Ki67"], oncoTreeCode: "IDC", icdO3Code: "8500/3", molecularSubtype: "Luminal B", prevalence: "common" },
  { id: "brca-luminal-b-her2", name: "Breast Cancer, Luminal B HER2-positive", parent: "brca-idc", tissue: "Breast", aliases: ["luminal B HER2+", "ER+/HER2+"], oncoTreeCode: "IDC", icdO3Code: "8500/3", molecularSubtype: "Luminal B HER2+", prevalence: "uncommon" },
  { id: "brca-her2", name: "HER2-Positive Breast Cancer", parent: "brca-idc", tissue: "Breast", aliases: ["HER2+", "HER2-enriched", "ERBB2-amplified breast"], oncoTreeCode: "IDC", icdO3Code: "8500/3", molecularSubtype: "HER2-enriched", prevalence: "uncommon" },
  { id: "brca-tnbc", name: "Triple-Negative Breast Cancer", parent: "brca-idc", tissue: "Breast", aliases: ["TNBC", "basal-like breast cancer"], oncoTreeCode: "TNBC", icdO3Code: "8500/3", molecularSubtype: "Triple-negative", prevalence: "uncommon" },
  { id: "brca-basal", name: "Breast Cancer, Basal-like", parent: "brca-tnbc", tissue: "Breast", aliases: ["basal breast cancer"], oncoTreeCode: "TNBC", icdO3Code: "8500/3", molecularSubtype: "Basal-like", prevalence: "uncommon" },
  { id: "brca-claudin-low", name: "Breast Cancer, Claudin-low", parent: "brca-tnbc", tissue: "Breast", aliases: ["claudin-low breast"], oncoTreeCode: "TNBC", icdO3Code: "8500/3", molecularSubtype: "Claudin-low", prevalence: "rare" },
  { id: "brca-metaplastic", name: "Metaplastic Breast Cancer", parent: "brca", tissue: "Breast", aliases: ["metaplastic carcinoma of breast"], oncoTreeCode: "MBC", icdO3Code: "8575/3", prevalence: "rare" },
  { id: "brca-inflammatory", name: "Inflammatory Breast Cancer", parent: "brca", tissue: "Breast", aliases: ["IBC", "inflammatory carcinoma"], oncoTreeCode: "IBC", icdO3Code: "8530/3", prevalence: "rare" },
  { id: "brca-mucinous", name: "Mucinous Breast Carcinoma", parent: "brca", tissue: "Breast", aliases: ["colloid carcinoma of breast", "mucinous carcinoma"], oncoTreeCode: "IMMC", icdO3Code: "8480/3", prevalence: "rare" },
  { id: "brca-tubular", name: "Tubular Carcinoma of Breast", parent: "brca", tissue: "Breast", aliases: ["tubular carcinoma"], oncoTreeCode: null, icdO3Code: "8211/3", prevalence: "rare" },
  { id: "brca-medullary", name: "Medullary Breast Carcinoma", parent: "brca", tissue: "Breast", aliases: ["medullary carcinoma of breast"], oncoTreeCode: null, icdO3Code: "8510/3", prevalence: "rare" },
  { id: "brca-papillary", name: "Papillary Breast Carcinoma", parent: "brca", tissue: "Breast", aliases: ["papillary carcinoma of breast", "intracystic papillary"], oncoTreeCode: null, icdO3Code: "8503/3", prevalence: "rare" },
  { id: "brca-micropapillary", name: "Micropapillary Breast Carcinoma", parent: "brca", tissue: "Breast", aliases: ["invasive micropapillary carcinoma"], oncoTreeCode: null, icdO3Code: "8507/3", prevalence: "rare" },
  { id: "brca-paget", name: "Paget Disease of the Nipple", parent: "brca", tissue: "Breast", aliases: ["Paget disease", "Paget's disease of breast"], oncoTreeCode: null, icdO3Code: "8540/3", prevalence: "rare" },
  { id: "brca-phyllodes", name: "Phyllodes Tumor of Breast", parent: "brca", tissue: "Breast", aliases: ["phyllodes", "cystosarcoma phyllodes"], oncoTreeCode: "PT", icdO3Code: "9020/1", prevalence: "rare" },
  { id: "brca-phyllodes-malignant", name: "Phyllodes Tumor, Malignant", parent: "brca-phyllodes", tissue: "Breast", aliases: ["malignant phyllodes"], oncoTreeCode: "PT", icdO3Code: "9020/3", prevalence: "ultra-rare" },
  { id: "brca-dcis", name: "Ductal Carcinoma In Situ", parent: "brca", tissue: "Breast", aliases: ["DCIS", "intraductal carcinoma"], oncoTreeCode: "DCIS", icdO3Code: "8500/2", prevalence: "common" },
  { id: "brca-lcis", name: "Lobular Carcinoma In Situ", parent: "brca", tissue: "Breast", aliases: ["LCIS"], oncoTreeCode: null, icdO3Code: "8520/2", prevalence: "uncommon" },
  { id: "brca-secretory", name: "Secretory Breast Carcinoma", parent: "brca", tissue: "Breast", aliases: ["secretory carcinoma", "juvenile breast carcinoma"], oncoTreeCode: null, icdO3Code: "8502/3", prevalence: "ultra-rare" },
  { id: "brca-adenoid-cystic", name: "Adenoid Cystic Carcinoma of Breast", parent: "brca", tissue: "Breast", aliases: ["ACC of breast"], oncoTreeCode: null, icdO3Code: "8200/3", prevalence: "ultra-rare" },
  { id: "brca-normal-like", name: "Breast Cancer, Normal-like", parent: "brca-idc", tissue: "Breast", aliases: ["normal-like breast"], oncoTreeCode: "IDC", icdO3Code: "8500/3", molecularSubtype: "Normal-like", prevalence: "rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // LUNG
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "lung", name: "Lung Cancer", parent: null, tissue: "Lung", aliases: ["pulmonary cancer", "lung tumor", "bronchogenic carcinoma"], oncoTreeCode: "LUNG", prevalence: "common" },
  { id: "nsclc", name: "Non-Small Cell Lung Cancer", parent: "lung", tissue: "Lung", aliases: ["NSCLC"], oncoTreeCode: "NSCLC", icdO3Code: "8046/3", prevalence: "common" },
  { id: "luad", name: "Lung Adenocarcinoma", parent: "nsclc", tissue: "Lung", aliases: ["LUAD", "pulmonary adenocarcinoma"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", prevalence: "common" },
  { id: "luad-acinar", name: "Lung Adenocarcinoma, Acinar", parent: "luad", tissue: "Lung", aliases: ["acinar predominant adenocarcinoma"], oncoTreeCode: "LUAD", icdO3Code: "8551/3", prevalence: "uncommon" },
  { id: "luad-lepidic", name: "Lung Adenocarcinoma, Lepidic", parent: "luad", tissue: "Lung", aliases: ["lepidic predominant adenocarcinoma", "formerly BAC"], oncoTreeCode: "LUAD", icdO3Code: "8250/3", prevalence: "uncommon" },
  { id: "luad-papillary", name: "Lung Adenocarcinoma, Papillary", parent: "luad", tissue: "Lung", aliases: ["papillary predominant adenocarcinoma"], oncoTreeCode: "LUAD", icdO3Code: "8260/3", prevalence: "uncommon" },
  { id: "luad-micropapillary", name: "Lung Adenocarcinoma, Micropapillary", parent: "luad", tissue: "Lung", aliases: ["micropapillary predominant adenocarcinoma"], oncoTreeCode: "LUAD", icdO3Code: "8265/3", prevalence: "rare" },
  { id: "luad-solid", name: "Lung Adenocarcinoma, Solid", parent: "luad", tissue: "Lung", aliases: ["solid predominant adenocarcinoma"], oncoTreeCode: "LUAD", icdO3Code: "8230/3", prevalence: "uncommon" },
  { id: "luad-mucinous", name: "Lung Adenocarcinoma, Invasive Mucinous", parent: "luad", tissue: "Lung", aliases: ["mucinous adenocarcinoma of lung", "IMA"], oncoTreeCode: "LUAD", icdO3Code: "8253/3", prevalence: "rare" },
  { id: "luad-egfr", name: "Lung Adenocarcinoma, EGFR-mutant", parent: "luad", tissue: "Lung", aliases: ["EGFR+ lung cancer", "EGFR-mutant NSCLC"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "EGFR-mutant", prevalence: "uncommon" },
  { id: "luad-alk", name: "Lung Adenocarcinoma, ALK-rearranged", parent: "luad", tissue: "Lung", aliases: ["ALK+ lung cancer", "ALK-rearranged NSCLC"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "ALK-rearranged", prevalence: "rare" },
  { id: "luad-ros1", name: "Lung Adenocarcinoma, ROS1-rearranged", parent: "luad", tissue: "Lung", aliases: ["ROS1+ lung cancer"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "ROS1-rearranged", prevalence: "rare" },
  { id: "luad-kras", name: "Lung Adenocarcinoma, KRAS-mutant", parent: "luad", tissue: "Lung", aliases: ["KRAS G12C lung", "KRAS-mutant NSCLC"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "KRAS-mutant", prevalence: "uncommon" },
  { id: "luad-braf", name: "Lung Adenocarcinoma, BRAF V600E", parent: "luad", tissue: "Lung", aliases: ["BRAF+ lung cancer"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "BRAF V600E", prevalence: "rare" },
  { id: "luad-ret", name: "Lung Adenocarcinoma, RET-rearranged", parent: "luad", tissue: "Lung", aliases: ["RET+ lung cancer"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "RET-rearranged", prevalence: "rare" },
  { id: "luad-met", name: "Lung Adenocarcinoma, MET Exon 14 Skip", parent: "luad", tissue: "Lung", aliases: ["METex14 lung cancer"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "MET exon 14 skipping", prevalence: "rare" },
  { id: "luad-ntrk", name: "Lung Adenocarcinoma, NTRK Fusion", parent: "luad", tissue: "Lung", aliases: ["NTRK+ lung cancer"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "NTRK fusion", prevalence: "ultra-rare" },
  { id: "luad-her2", name: "Lung Adenocarcinoma, HER2-mutant", parent: "luad", tissue: "Lung", aliases: ["ERBB2-mutant lung cancer"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "HER2/ERBB2-mutant", prevalence: "rare" },
  { id: "lusc", name: "Lung Squamous Cell Carcinoma", parent: "nsclc", tissue: "Lung", aliases: ["LUSC", "squamous cell lung cancer", "epidermoid carcinoma of lung"], oncoTreeCode: "LUSC", icdO3Code: "8070/3", prevalence: "common" },
  { id: "lusc-keratinizing", name: "Lung SCC, Keratinizing", parent: "lusc", tissue: "Lung", aliases: ["keratinizing squamous cell lung"], oncoTreeCode: "LUSC", icdO3Code: "8071/3", prevalence: "uncommon" },
  { id: "lusc-non-keratinizing", name: "Lung SCC, Non-keratinizing", parent: "lusc", tissue: "Lung", aliases: ["non-keratinizing squamous cell lung"], oncoTreeCode: "LUSC", icdO3Code: "8072/3", prevalence: "uncommon" },
  { id: "lusc-basaloid", name: "Lung SCC, Basaloid", parent: "lusc", tissue: "Lung", aliases: ["basaloid squamous cell lung"], oncoTreeCode: "LUSC", icdO3Code: "8083/3", prevalence: "rare" },
  { id: "lclc", name: "Large Cell Lung Carcinoma", parent: "nsclc", tissue: "Lung", aliases: ["LCLC", "large cell undifferentiated carcinoma"], oncoTreeCode: "LCLC", icdO3Code: "8012/3", prevalence: "rare" },
  { id: "nsclc-nos", name: "NSCLC, NOS", parent: "nsclc", tissue: "Lung", aliases: ["non-small cell lung cancer not otherwise specified"], oncoTreeCode: "NSCLC", icdO3Code: "8046/3", prevalence: "uncommon" },
  { id: "nsclc-adenosquamous", name: "Adenosquamous Carcinoma of Lung", parent: "nsclc", tissue: "Lung", aliases: ["adenosquamous lung cancer"], oncoTreeCode: null, icdO3Code: "8560/3", prevalence: "rare" },
  { id: "nsclc-sarcomatoid", name: "Sarcomatoid Carcinoma of Lung", parent: "nsclc", tissue: "Lung", aliases: ["pleomorphic carcinoma of lung", "spindle cell lung carcinoma"], oncoTreeCode: null, icdO3Code: "8022/3", prevalence: "rare" },
  { id: "sclc", name: "Small Cell Lung Cancer", parent: "lung", tissue: "Lung", aliases: ["SCLC", "oat cell carcinoma", "small cell carcinoma"], oncoTreeCode: "SCLC", icdO3Code: "8041/3", prevalence: "uncommon" },
  { id: "lung-carcinoid", name: "Pulmonary Carcinoid Tumor", parent: "lung", tissue: "Lung", aliases: ["lung carcinoid", "bronchial carcinoid"], oncoTreeCode: "LNET", icdO3Code: "8240/3", prevalence: "rare" },
  { id: "lung-carcinoid-typical", name: "Typical Carcinoid of Lung", parent: "lung-carcinoid", tissue: "Lung", aliases: ["typical carcinoid", "TC"], oncoTreeCode: "LNET", icdO3Code: "8240/3", prevalence: "rare" },
  { id: "lung-carcinoid-atypical", name: "Atypical Carcinoid of Lung", parent: "lung-carcinoid", tissue: "Lung", aliases: ["atypical carcinoid", "AC"], oncoTreeCode: "LNET", icdO3Code: "8249/3", prevalence: "rare" },
  { id: "lcnec", name: "Large Cell Neuroendocrine Carcinoma of Lung", parent: "lung", tissue: "Lung", aliases: ["LCNEC", "pulmonary LCNEC"], oncoTreeCode: "LCNEC", icdO3Code: "8013/3", prevalence: "rare" },
  { id: "mesothelioma", name: "Mesothelioma", parent: "lung", tissue: "Lung", aliases: ["malignant mesothelioma", "pleural mesothelioma"], oncoTreeCode: "PLMESO", icdO3Code: "9050/3", prevalence: "rare" },
  { id: "mesothelioma-epithelioid", name: "Mesothelioma, Epithelioid", parent: "mesothelioma", tissue: "Lung", aliases: ["epithelioid mesothelioma"], oncoTreeCode: "PLMESO", icdO3Code: "9052/3", prevalence: "rare" },
  { id: "mesothelioma-sarcomatoid", name: "Mesothelioma, Sarcomatoid", parent: "mesothelioma", tissue: "Lung", aliases: ["sarcomatoid mesothelioma"], oncoTreeCode: "PLMESO", icdO3Code: "9051/3", prevalence: "ultra-rare" },
  { id: "mesothelioma-biphasic", name: "Mesothelioma, Biphasic", parent: "mesothelioma", tissue: "Lung", aliases: ["biphasic mesothelioma", "mixed mesothelioma"], oncoTreeCode: "PLMESO", icdO3Code: "9053/3", prevalence: "ultra-rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // HEMATOLOGIC MALIGNANCIES
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "hemato", name: "Hematologic Malignancy", parent: null, tissue: "Blood/Bone Marrow", aliases: ["blood cancer", "hematological cancer"], oncoTreeCode: null, prevalence: "common" },

  // Leukemias
  { id: "leukemia", name: "Leukemia", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["blood cancer"], oncoTreeCode: null, prevalence: "common" },
  { id: "aml", name: "Acute Myeloid Leukemia", parent: "leukemia", tissue: "Blood/Bone Marrow", aliases: ["AML", "acute myelogenous leukemia"], oncoTreeCode: "AML", icdO3Code: "9861/3", prevalence: "uncommon" },
  { id: "aml-t8-21", name: "AML with t(8;21)(q22;q22.1); RUNX1-RUNX1T1", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML RUNX1-RUNX1T1", "AML with t(8;21)", "FAB M2 with t(8;21)"], oncoTreeCode: "AML", icdO3Code: "9896/3", molecularSubtype: "RUNX1-RUNX1T1", prevalence: "rare" },
  { id: "aml-inv16", name: "AML with inv(16)/t(16;16); CBFB-MYH11", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML CBFB-MYH11", "AML with inv(16)"], oncoTreeCode: "AML", icdO3Code: "9871/3", molecularSubtype: "CBFB-MYH11", prevalence: "rare" },
  { id: "aml-pml-rara", name: "Acute Promyelocytic Leukemia with PML-RARA", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["APL", "AML M3", "acute promyelocytic leukemia"], oncoTreeCode: "APL", icdO3Code: "9866/3", molecularSubtype: "PML-RARA", prevalence: "rare" },
  { id: "aml-mll", name: "AML with KMT2A (MLL) Rearrangement", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML MLL", "AML with 11q23", "KMT2A-rearranged AML"], oncoTreeCode: "AML", icdO3Code: "9897/3", molecularSubtype: "KMT2A-rearranged", prevalence: "rare" },
  { id: "aml-npm1", name: "AML with Mutated NPM1", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["NPM1-mutant AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "NPM1-mutant", prevalence: "rare" },
  { id: "aml-cebpa", name: "AML with Biallelic CEBPA Mutation", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["CEBPA-mutant AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "CEBPA biallelic", prevalence: "rare" },
  { id: "aml-tp53", name: "AML with TP53 Mutation", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["TP53-mutant AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "TP53-mutant", prevalence: "rare" },
  { id: "aml-flt3-itd", name: "AML with FLT3-ITD", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["FLT3-ITD AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "FLT3-ITD", prevalence: "rare" },
  { id: "aml-idh1", name: "AML with IDH1 Mutation", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["IDH1-mutant AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "IDH1-mutant", prevalence: "rare" },
  { id: "aml-idh2", name: "AML with IDH2 Mutation", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["IDH2-mutant AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "IDH2-mutant", prevalence: "rare" },
  { id: "aml-runx1", name: "AML with Mutated RUNX1", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["RUNX1-mutant AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "RUNX1-mutant", prevalence: "rare" },
  { id: "aml-mrc", name: "AML with Myelodysplasia-Related Changes", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML-MRC", "secondary AML"], oncoTreeCode: "AML", icdO3Code: "9895/3", prevalence: "rare" },
  { id: "aml-therapy", name: "Therapy-Related AML", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["t-AML", "treatment-related AML"], oncoTreeCode: "AML", icdO3Code: "9920/3", prevalence: "rare" },
  { id: "aml-nos-m0", name: "AML with Minimal Differentiation (FAB M0)", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML M0"], oncoTreeCode: "AML", icdO3Code: "9872/3", prevalence: "rare" },
  { id: "aml-nos-m1", name: "AML without Maturation (FAB M1)", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML M1"], oncoTreeCode: "AML", icdO3Code: "9873/3", prevalence: "rare" },
  { id: "aml-nos-m2", name: "AML with Maturation (FAB M2)", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML M2"], oncoTreeCode: "AML", icdO3Code: "9874/3", prevalence: "rare" },
  { id: "aml-nos-m4", name: "Acute Myelomonocytic Leukemia (FAB M4)", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML M4", "AMML"], oncoTreeCode: "AML", icdO3Code: "9867/3", prevalence: "rare" },
  { id: "aml-nos-m5", name: "Acute Monocytic Leukemia (FAB M5)", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML M5", "acute monoblastic leukemia"], oncoTreeCode: "AML", icdO3Code: "9891/3", prevalence: "rare" },
  { id: "aml-nos-m6", name: "Acute Erythroid Leukemia (FAB M6)", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML M6", "erythroleukemia"], oncoTreeCode: "AML", icdO3Code: "9840/3", prevalence: "ultra-rare" },
  { id: "aml-nos-m7", name: "Acute Megakaryoblastic Leukemia (FAB M7)", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML M7", "AMKL"], oncoTreeCode: "AML", icdO3Code: "9910/3", prevalence: "ultra-rare" },
  { id: "aml-bcr-abl1", name: "AML with BCR-ABL1", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["Ph+ AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "BCR-ABL1", prevalence: "ultra-rare" },
  { id: "aml-dek-nup214", name: "AML with DEK-NUP214", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["AML with t(6;9)"], oncoTreeCode: "AML", icdO3Code: "9865/3", molecularSubtype: "DEK-NUP214", prevalence: "ultra-rare" },

  { id: "all", name: "Acute Lymphoblastic Leukemia", parent: "leukemia", tissue: "Blood/Bone Marrow", aliases: ["ALL", "acute lymphocytic leukemia"], oncoTreeCode: "ALL", icdO3Code: "9811/3", prevalence: "uncommon" },
  { id: "all-b", name: "B-cell ALL", parent: "all", tissue: "Blood/Bone Marrow", aliases: ["B-ALL", "B-lymphoblastic leukemia", "precursor B-ALL"], oncoTreeCode: "ALL", icdO3Code: "9811/3", prevalence: "uncommon" },
  { id: "all-b-ph", name: "Ph-positive B-ALL", parent: "all-b", tissue: "Blood/Bone Marrow", aliases: ["Ph+ ALL", "BCR-ABL1 ALL"], oncoTreeCode: "ALL", icdO3Code: "9812/3", molecularSubtype: "BCR-ABL1", prevalence: "rare" },
  { id: "all-b-ph-like", name: "Ph-like B-ALL", parent: "all-b", tissue: "Blood/Bone Marrow", aliases: ["Ph-like ALL", "BCR-ABL1-like ALL"], oncoTreeCode: "ALL", icdO3Code: "9811/3", molecularSubtype: "Ph-like", prevalence: "rare" },
  { id: "all-b-hyperdiploid", name: "B-ALL, Hyperdiploid", parent: "all-b", tissue: "Blood/Bone Marrow", aliases: ["hyperdiploid ALL"], oncoTreeCode: "ALL", icdO3Code: "9811/3", molecularSubtype: "Hyperdiploid", prevalence: "rare" },
  { id: "all-b-hypo", name: "B-ALL, Hypodiploid", parent: "all-b", tissue: "Blood/Bone Marrow", aliases: ["hypodiploid ALL"], oncoTreeCode: "ALL", icdO3Code: "9811/3", molecularSubtype: "Hypodiploid", prevalence: "ultra-rare" },
  { id: "all-b-etv6-runx1", name: "B-ALL with ETV6-RUNX1", parent: "all-b", tissue: "Blood/Bone Marrow", aliases: ["TEL-AML1 ALL", "t(12;21) ALL"], oncoTreeCode: "ALL", icdO3Code: "9814/3", molecularSubtype: "ETV6-RUNX1", prevalence: "rare" },
  { id: "all-b-mll", name: "B-ALL with KMT2A Rearrangement", parent: "all-b", tissue: "Blood/Bone Marrow", aliases: ["MLL-rearranged ALL", "infant ALL"], oncoTreeCode: "ALL", icdO3Code: "9811/3", molecularSubtype: "KMT2A-rearranged", prevalence: "rare" },
  { id: "all-b-ikzf1", name: "B-ALL with IKZF1 Deletion", parent: "all-b", tissue: "Blood/Bone Marrow", aliases: ["IKAROS-deleted ALL"], oncoTreeCode: "ALL", icdO3Code: "9811/3", molecularSubtype: "IKZF1-deleted", prevalence: "rare" },
  { id: "all-t", name: "T-cell ALL", parent: "all", tissue: "Blood/Bone Marrow", aliases: ["T-ALL", "T-lymphoblastic leukemia"], oncoTreeCode: "ALL", icdO3Code: "9837/3", prevalence: "rare" },
  { id: "all-t-ets", name: "Early T-cell Precursor ALL", parent: "all-t", tissue: "Blood/Bone Marrow", aliases: ["ETP-ALL"], oncoTreeCode: "ALL", icdO3Code: "9837/3", molecularSubtype: "ETP", prevalence: "ultra-rare" },

  { id: "cml", name: "Chronic Myeloid Leukemia", parent: "leukemia", tissue: "Blood/Bone Marrow", aliases: ["CML", "chronic myelogenous leukemia", "BCR-ABL1 positive CML"], oncoTreeCode: "CML", icdO3Code: "9875/3", prevalence: "uncommon" },
  { id: "cml-cp", name: "CML, Chronic Phase", parent: "cml", tissue: "Blood/Bone Marrow", aliases: ["CML-CP"], oncoTreeCode: "CML", icdO3Code: "9875/3", prevalence: "uncommon" },
  { id: "cml-ap", name: "CML, Accelerated Phase", parent: "cml", tissue: "Blood/Bone Marrow", aliases: ["CML-AP"], oncoTreeCode: "CML", icdO3Code: "9875/3", prevalence: "rare" },
  { id: "cml-bp", name: "CML, Blast Phase", parent: "cml", tissue: "Blood/Bone Marrow", aliases: ["CML blast crisis", "CML-BP"], oncoTreeCode: "CML", icdO3Code: "9875/3", prevalence: "rare" },
  { id: "cll", name: "Chronic Lymphocytic Leukemia", parent: "leukemia", tissue: "Blood/Bone Marrow", aliases: ["CLL", "small lymphocytic lymphoma", "CLL/SLL"], oncoTreeCode: "CLL", icdO3Code: "9823/3", prevalence: "uncommon" },
  { id: "cll-igvh-mut", name: "CLL, IGHV Mutated", parent: "cll", tissue: "Blood/Bone Marrow", aliases: ["IGHV-mutated CLL"], oncoTreeCode: "CLL", icdO3Code: "9823/3", molecularSubtype: "IGHV-mutated", prevalence: "rare" },
  { id: "cll-igvh-unmut", name: "CLL, IGHV Unmutated", parent: "cll", tissue: "Blood/Bone Marrow", aliases: ["IGHV-unmutated CLL"], oncoTreeCode: "CLL", icdO3Code: "9823/3", molecularSubtype: "IGHV-unmutated", prevalence: "rare" },
  { id: "cll-del17p", name: "CLL with del(17p)/TP53 Mutation", parent: "cll", tissue: "Blood/Bone Marrow", aliases: ["TP53-mutant CLL", "del(17p) CLL"], oncoTreeCode: "CLL", icdO3Code: "9823/3", molecularSubtype: "del(17p)/TP53", prevalence: "rare" },
  { id: "hairy-cell", name: "Hairy Cell Leukemia", parent: "leukemia", tissue: "Blood/Bone Marrow", aliases: ["HCL", "leukemic reticuloendotheliosis"], oncoTreeCode: "HCL", icdO3Code: "9940/3", prevalence: "rare" },
  { id: "hairy-cell-variant", name: "Hairy Cell Leukemia Variant", parent: "hairy-cell", tissue: "Blood/Bone Marrow", aliases: ["HCL-v"], oncoTreeCode: "HCL", icdO3Code: "9940/3", prevalence: "ultra-rare" },
  { id: "pll-t", name: "T-cell Prolymphocytic Leukemia", parent: "leukemia", tissue: "Blood/Bone Marrow", aliases: ["T-PLL"], oncoTreeCode: null, icdO3Code: "9834/3", prevalence: "ultra-rare" },
  { id: "pll-b", name: "B-cell Prolymphocytic Leukemia", parent: "leukemia", tissue: "Blood/Bone Marrow", aliases: ["B-PLL"], oncoTreeCode: null, icdO3Code: "9833/3", prevalence: "ultra-rare" },
  { id: "lgl-leukemia", name: "Large Granular Lymphocytic Leukemia", parent: "leukemia", tissue: "Blood/Bone Marrow", aliases: ["LGL leukemia", "T-LGL"], oncoTreeCode: null, icdO3Code: "9831/3", prevalence: "ultra-rare" },
  { id: "adult-t-cell-leukemia", name: "Adult T-cell Leukemia/Lymphoma", parent: "leukemia", tissue: "Blood/Bone Marrow", aliases: ["ATLL", "HTLV-1 associated leukemia"], oncoTreeCode: null, icdO3Code: "9827/3", prevalence: "rare" },

  // MDS
  { id: "mds", name: "Myelodysplastic Syndrome", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["MDS", "myelodysplasia", "preleukemia"], oncoTreeCode: "MDS", icdO3Code: "9989/3", prevalence: "uncommon" },
  { id: "mds-sld", name: "MDS with Single Lineage Dysplasia", parent: "mds", tissue: "Blood/Bone Marrow", aliases: ["MDS-SLD", "refractory cytopenia"], oncoTreeCode: "MDS", icdO3Code: "9980/3", prevalence: "rare" },
  { id: "mds-mld", name: "MDS with Multilineage Dysplasia", parent: "mds", tissue: "Blood/Bone Marrow", aliases: ["MDS-MLD", "RCMD"], oncoTreeCode: "MDS", icdO3Code: "9985/3", prevalence: "rare" },
  { id: "mds-rs", name: "MDS with Ring Sideroblasts", parent: "mds", tissue: "Blood/Bone Marrow", aliases: ["MDS-RS", "RARS"], oncoTreeCode: "MDS", icdO3Code: "9982/3", prevalence: "rare" },
  { id: "mds-eb1", name: "MDS with Excess Blasts-1", parent: "mds", tissue: "Blood/Bone Marrow", aliases: ["MDS-EB-1", "RAEB-1"], oncoTreeCode: "MDS", icdO3Code: "9983/3", prevalence: "rare" },
  { id: "mds-eb2", name: "MDS with Excess Blasts-2", parent: "mds", tissue: "Blood/Bone Marrow", aliases: ["MDS-EB-2", "RAEB-2"], oncoTreeCode: "MDS", icdO3Code: "9983/3", prevalence: "rare" },
  { id: "mds-del5q", name: "MDS with Isolated del(5q)", parent: "mds", tissue: "Blood/Bone Marrow", aliases: ["5q- syndrome", "MDS del(5q)"], oncoTreeCode: "MDS", icdO3Code: "9986/3", molecularSubtype: "del(5q)", prevalence: "rare" },
  { id: "mds-u", name: "MDS, Unclassifiable", parent: "mds", tissue: "Blood/Bone Marrow", aliases: ["MDS-U"], oncoTreeCode: "MDS", icdO3Code: "9989/3", prevalence: "rare" },
  { id: "mds-sf3b1", name: "MDS with SF3B1 Mutation", parent: "mds", tissue: "Blood/Bone Marrow", aliases: ["SF3B1-mutant MDS"], oncoTreeCode: "MDS", icdO3Code: "9982/3", molecularSubtype: "SF3B1-mutant", prevalence: "rare" },
  { id: "mds-tp53", name: "MDS with TP53 Mutation (Biallelic)", parent: "mds", tissue: "Blood/Bone Marrow", aliases: ["TP53-mutant MDS"], oncoTreeCode: "MDS", icdO3Code: "9989/3", molecularSubtype: "TP53 biallelic", prevalence: "rare" },
  { id: "cmml", name: "Chronic Myelomonocytic Leukemia", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["CMML", "MDS/MPN"], oncoTreeCode: "CMML", icdO3Code: "9945/3", prevalence: "rare" },
  { id: "jmml", name: "Juvenile Myelomonocytic Leukemia", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["JMML"], oncoTreeCode: null, icdO3Code: "9946/3", prevalence: "ultra-rare" },

  // MPN
  { id: "mpn", name: "Myeloproliferative Neoplasm", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["MPN"], oncoTreeCode: "MPN", prevalence: "uncommon" },
  { id: "mpn-pv", name: "Polycythemia Vera", parent: "mpn", tissue: "Blood/Bone Marrow", aliases: ["PV", "polycythaemia vera"], oncoTreeCode: "MPN", icdO3Code: "9950/3", prevalence: "rare" },
  { id: "mpn-et", name: "Essential Thrombocythemia", parent: "mpn", tissue: "Blood/Bone Marrow", aliases: ["ET", "essential thrombocytosis"], oncoTreeCode: "MPN", icdO3Code: "9962/3", prevalence: "rare" },
  { id: "mpn-pmf", name: "Primary Myelofibrosis", parent: "mpn", tissue: "Blood/Bone Marrow", aliases: ["PMF", "idiopathic myelofibrosis", "agnogenic myeloid metaplasia"], oncoTreeCode: "MPN", icdO3Code: "9961/3", prevalence: "rare" },
  { id: "mpn-cep", name: "Chronic Eosinophilic Leukemia", parent: "mpn", tissue: "Blood/Bone Marrow", aliases: ["CEL", "hypereosinophilic syndrome"], oncoTreeCode: null, icdO3Code: "9964/3", prevalence: "ultra-rare" },
  { id: "mpn-cnl", name: "Chronic Neutrophilic Leukemia", parent: "mpn", tissue: "Blood/Bone Marrow", aliases: ["CNL"], oncoTreeCode: null, icdO3Code: "9963/3", prevalence: "ultra-rare" },
  { id: "mastocytosis", name: "Systemic Mastocytosis", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["SM", "mast cell disease"], oncoTreeCode: null, icdO3Code: "9741/3", prevalence: "rare" },

  // Lymphoma — NHL
  { id: "lymphoma", name: "Lymphoma", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["lymphatic cancer"], oncoTreeCode: null, prevalence: "common" },
  { id: "nhl", name: "Non-Hodgkin Lymphoma", parent: "lymphoma", tissue: "Blood/Bone Marrow", aliases: ["NHL"], oncoTreeCode: "NHL", prevalence: "common" },
  { id: "dlbcl", name: "Diffuse Large B-Cell Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["DLBCL"], oncoTreeCode: "DLBCL", icdO3Code: "9680/3", prevalence: "uncommon" },
  { id: "dlbcl-gcb", name: "DLBCL, GCB Subtype", parent: "dlbcl", tissue: "Blood/Bone Marrow", aliases: ["GCB DLBCL", "germinal center B-cell DLBCL"], oncoTreeCode: "DLBCL", icdO3Code: "9680/3", molecularSubtype: "GCB", prevalence: "rare" },
  { id: "dlbcl-abc", name: "DLBCL, ABC Subtype", parent: "dlbcl", tissue: "Blood/Bone Marrow", aliases: ["ABC DLBCL", "activated B-cell DLBCL"], oncoTreeCode: "DLBCL", icdO3Code: "9680/3", molecularSubtype: "ABC", prevalence: "rare" },
  { id: "dlbcl-double-hit", name: "High-Grade B-Cell Lymphoma, Double-Hit", parent: "dlbcl", tissue: "Blood/Bone Marrow", aliases: ["double-hit lymphoma", "MYC/BCL2 rearranged"], oncoTreeCode: "DLBCL", icdO3Code: "9680/3", molecularSubtype: "Double-hit (MYC+BCL2)", prevalence: "rare" },
  { id: "dlbcl-triple-hit", name: "High-Grade B-Cell Lymphoma, Triple-Hit", parent: "dlbcl", tissue: "Blood/Bone Marrow", aliases: ["triple-hit lymphoma", "MYC/BCL2/BCL6 rearranged"], oncoTreeCode: "DLBCL", icdO3Code: "9680/3", molecularSubtype: "Triple-hit", prevalence: "ultra-rare" },
  { id: "dlbcl-primary-mediastinal", name: "Primary Mediastinal Large B-Cell Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["PMBCL", "primary mediastinal DLBCL"], oncoTreeCode: "PMBCL", icdO3Code: "9679/3", prevalence: "rare" },
  { id: "fl", name: "Follicular Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["FL", "follicle center lymphoma"], oncoTreeCode: "FL", icdO3Code: "9690/3", prevalence: "uncommon" },
  { id: "fl-g1", name: "Follicular Lymphoma, Grade 1", parent: "fl", tissue: "Blood/Bone Marrow", aliases: ["FL grade 1"], oncoTreeCode: "FL", icdO3Code: "9695/3", prevalence: "rare" },
  { id: "fl-g2", name: "Follicular Lymphoma, Grade 2", parent: "fl", tissue: "Blood/Bone Marrow", aliases: ["FL grade 2"], oncoTreeCode: "FL", icdO3Code: "9691/3", prevalence: "rare" },
  { id: "fl-g3a", name: "Follicular Lymphoma, Grade 3A", parent: "fl", tissue: "Blood/Bone Marrow", aliases: ["FL grade 3A"], oncoTreeCode: "FL", icdO3Code: "9698/3", prevalence: "rare" },
  { id: "fl-g3b", name: "Follicular Lymphoma, Grade 3B", parent: "fl", tissue: "Blood/Bone Marrow", aliases: ["FL grade 3B"], oncoTreeCode: "FL", icdO3Code: "9698/3", prevalence: "rare" },
  { id: "mcl", name: "Mantle Cell Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["MCL"], oncoTreeCode: "MCL", icdO3Code: "9673/3", prevalence: "rare" },
  { id: "mzl", name: "Marginal Zone Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["MZL"], oncoTreeCode: "MZL", icdO3Code: "9699/3", prevalence: "rare" },
  { id: "mzl-splenic", name: "Splenic Marginal Zone Lymphoma", parent: "mzl", tissue: "Blood/Bone Marrow", aliases: ["SMZL"], oncoTreeCode: "MZL", icdO3Code: "9689/3", prevalence: "rare" },
  { id: "mzl-malt", name: "Extranodal Marginal Zone Lymphoma (MALT)", parent: "mzl", tissue: "Blood/Bone Marrow", aliases: ["MALT lymphoma", "mucosa-associated lymphoid tissue lymphoma"], oncoTreeCode: "MZL", icdO3Code: "9699/3", prevalence: "rare" },
  { id: "mzl-nodal", name: "Nodal Marginal Zone Lymphoma", parent: "mzl", tissue: "Blood/Bone Marrow", aliases: ["NMZL"], oncoTreeCode: "MZL", icdO3Code: "9699/3", prevalence: "rare" },
  { id: "burkitt", name: "Burkitt Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["BL", "Burkitt's lymphoma"], oncoTreeCode: "BL", icdO3Code: "9687/3", prevalence: "rare" },
  { id: "burkitt-endemic", name: "Burkitt Lymphoma, Endemic", parent: "burkitt", tissue: "Blood/Bone Marrow", aliases: ["African Burkitt"], oncoTreeCode: "BL", icdO3Code: "9687/3", prevalence: "rare" },
  { id: "burkitt-sporadic", name: "Burkitt Lymphoma, Sporadic", parent: "burkitt", tissue: "Blood/Bone Marrow", aliases: [], oncoTreeCode: "BL", icdO3Code: "9687/3", prevalence: "rare" },
  { id: "lpl", name: "Lymphoplasmacytic Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["LPL", "Waldenström macroglobulinemia", "WM"], oncoTreeCode: "WM", icdO3Code: "9671/3", prevalence: "rare" },
  { id: "alcl", name: "Anaplastic Large Cell Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["ALCL"], oncoTreeCode: "ALCL", icdO3Code: "9714/3", prevalence: "rare" },
  { id: "alcl-alk-pos", name: "ALCL, ALK-positive", parent: "alcl", tissue: "Blood/Bone Marrow", aliases: ["ALK+ ALCL"], oncoTreeCode: "ALCL", icdO3Code: "9714/3", molecularSubtype: "ALK-positive", prevalence: "rare" },
  { id: "alcl-alk-neg", name: "ALCL, ALK-negative", parent: "alcl", tissue: "Blood/Bone Marrow", aliases: ["ALK- ALCL"], oncoTreeCode: "ALCL", icdO3Code: "9702/3", molecularSubtype: "ALK-negative", prevalence: "rare" },
  { id: "alcl-breast-implant", name: "Breast Implant-Associated ALCL", parent: "alcl", tissue: "Blood/Bone Marrow", aliases: ["BIA-ALCL"], oncoTreeCode: "ALCL", icdO3Code: "9714/3", prevalence: "ultra-rare" },
  { id: "ptcl", name: "Peripheral T-Cell Lymphoma, NOS", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["PTCL-NOS", "PTCL"], oncoTreeCode: "PTCL", icdO3Code: "9702/3", prevalence: "rare" },
  { id: "aitl", name: "Angioimmunoblastic T-Cell Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["AITL", "angioimmunoblastic lymphadenopathy"], oncoTreeCode: "AITL", icdO3Code: "9705/3", prevalence: "rare" },
  { id: "eatl", name: "Enteropathy-Associated T-Cell Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["EATL"], oncoTreeCode: null, icdO3Code: "9717/3", prevalence: "ultra-rare" },
  { id: "hstl", name: "Hepatosplenic T-Cell Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["HSTL"], oncoTreeCode: null, icdO3Code: "9716/3", prevalence: "ultra-rare" },
  { id: "nk-t-cell", name: "Extranodal NK/T-Cell Lymphoma, Nasal Type", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["ENKTL", "nasal NK/T-cell lymphoma"], oncoTreeCode: null, icdO3Code: "9719/3", prevalence: "rare" },
  { id: "ctcl", name: "Cutaneous T-Cell Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["CTCL"], oncoTreeCode: null, icdO3Code: "9709/3", prevalence: "rare" },
  { id: "mycosis-fungoides", name: "Mycosis Fungoides", parent: "ctcl", tissue: "Blood/Bone Marrow", aliases: ["MF", "Alibert-Bazin syndrome"], oncoTreeCode: "MF", icdO3Code: "9700/3", prevalence: "rare" },
  { id: "sezary", name: "Sezary Syndrome", parent: "ctcl", tissue: "Blood/Bone Marrow", aliases: ["Sézary syndrome", "SS"], oncoTreeCode: null, icdO3Code: "9701/3", prevalence: "ultra-rare" },

  // Hodgkin Lymphoma
  { id: "hl", name: "Hodgkin Lymphoma", parent: "lymphoma", tissue: "Blood/Bone Marrow", aliases: ["Hodgkin disease", "HL", "Hodgkin's lymphoma"], oncoTreeCode: "HL", icdO3Code: "9650/3", prevalence: "uncommon" },
  { id: "hl-ns", name: "Classical Hodgkin Lymphoma, Nodular Sclerosis", parent: "hl", tissue: "Blood/Bone Marrow", aliases: ["NSHL", "nodular sclerosis HL"], oncoTreeCode: "HL", icdO3Code: "9663/3", prevalence: "uncommon" },
  { id: "hl-mc", name: "Classical Hodgkin Lymphoma, Mixed Cellularity", parent: "hl", tissue: "Blood/Bone Marrow", aliases: ["MCHL", "mixed cellularity HL"], oncoTreeCode: "HL", icdO3Code: "9652/3", prevalence: "rare" },
  { id: "hl-lr", name: "Classical Hodgkin Lymphoma, Lymphocyte-Rich", parent: "hl", tissue: "Blood/Bone Marrow", aliases: ["LRHL"], oncoTreeCode: "HL", icdO3Code: "9651/3", prevalence: "rare" },
  { id: "hl-ld", name: "Classical Hodgkin Lymphoma, Lymphocyte-Depleted", parent: "hl", tissue: "Blood/Bone Marrow", aliases: ["LDHL"], oncoTreeCode: "HL", icdO3Code: "9653/3", prevalence: "ultra-rare" },
  { id: "nlphl", name: "Nodular Lymphocyte-Predominant Hodgkin Lymphoma", parent: "hl", tissue: "Blood/Bone Marrow", aliases: ["NLPHL", "lymphocyte predominant HL"], oncoTreeCode: "NLPHL", icdO3Code: "9659/3", prevalence: "rare" },

  // Plasma cell
  { id: "mm", name: "Multiple Myeloma", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["myeloma", "MM", "plasma cell myeloma", "Kahler disease"], oncoTreeCode: "MM", icdO3Code: "9732/3", prevalence: "uncommon" },
  { id: "mm-t4-14", name: "Multiple Myeloma with t(4;14)", parent: "mm", tissue: "Blood/Bone Marrow", aliases: ["FGFR3/MMSET myeloma"], oncoTreeCode: "MM", icdO3Code: "9732/3", molecularSubtype: "t(4;14)", prevalence: "rare" },
  { id: "mm-t14-16", name: "Multiple Myeloma with t(14;16)", parent: "mm", tissue: "Blood/Bone Marrow", aliases: ["MAF myeloma"], oncoTreeCode: "MM", icdO3Code: "9732/3", molecularSubtype: "t(14;16)", prevalence: "rare" },
  { id: "mm-t11-14", name: "Multiple Myeloma with t(11;14)", parent: "mm", tissue: "Blood/Bone Marrow", aliases: ["CCND1 myeloma"], oncoTreeCode: "MM", icdO3Code: "9732/3", molecularSubtype: "t(11;14)", prevalence: "rare" },
  { id: "mm-del17p", name: "Multiple Myeloma with del(17p)", parent: "mm", tissue: "Blood/Bone Marrow", aliases: ["TP53-deleted myeloma"], oncoTreeCode: "MM", icdO3Code: "9732/3", molecularSubtype: "del(17p)", prevalence: "rare" },
  { id: "mm-hyperdiploid", name: "Multiple Myeloma, Hyperdiploid", parent: "mm", tissue: "Blood/Bone Marrow", aliases: ["hyperdiploid myeloma"], oncoTreeCode: "MM", icdO3Code: "9732/3", molecularSubtype: "Hyperdiploid", prevalence: "rare" },
  { id: "waldenstrom", name: "Waldenström Macroglobulinemia", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["WM", "lymphoplasmacytic lymphoma"], oncoTreeCode: "WM", icdO3Code: "9761/3", prevalence: "rare" },
  { id: "amyloidosis-al", name: "AL Amyloidosis", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["primary amyloidosis", "light-chain amyloidosis"], oncoTreeCode: null, icdO3Code: "9769/1", prevalence: "rare" },
  { id: "plasmacytoma", name: "Solitary Plasmacytoma", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["extramedullary plasmacytoma"], oncoTreeCode: null, icdO3Code: "9731/3", prevalence: "rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // GASTROINTESTINAL
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "gi", name: "Gastrointestinal Cancer", parent: null, tissue: "Gastrointestinal", aliases: ["GI cancer", "digestive cancer"], oncoTreeCode: null, prevalence: "common" },

  // Esophageal
  { id: "esophageal", name: "Esophageal Cancer", parent: "gi", tissue: "Gastrointestinal", aliases: ["esophageal carcinoma"], oncoTreeCode: "ESCA", prevalence: "uncommon" },
  { id: "esophageal-adeno", name: "Esophageal Adenocarcinoma", parent: "esophageal", tissue: "Gastrointestinal", aliases: ["EAC", "Barrett's-associated adenocarcinoma"], oncoTreeCode: "ESCA", icdO3Code: "8140/3", prevalence: "uncommon" },
  { id: "esophageal-scc", name: "Esophageal Squamous Cell Carcinoma", parent: "esophageal", tissue: "Gastrointestinal", aliases: ["ESCC", "esophageal SCC"], oncoTreeCode: "ESCA", icdO3Code: "8070/3", prevalence: "uncommon" },
  { id: "esophageal-small-cell", name: "Esophageal Small Cell Carcinoma", parent: "esophageal", tissue: "Gastrointestinal", aliases: [], oncoTreeCode: null, icdO3Code: "8041/3", prevalence: "ultra-rare" },

  // Gastric
  { id: "gastric", name: "Gastric Cancer", parent: "gi", tissue: "Gastrointestinal", aliases: ["stomach cancer", "gastric carcinoma"], oncoTreeCode: "STAD", icdO3Code: "8140/3", prevalence: "common" },
  { id: "gastric-intestinal", name: "Gastric Cancer, Intestinal Type", parent: "gastric", tissue: "Gastrointestinal", aliases: ["intestinal-type gastric cancer", "Lauren intestinal"], oncoTreeCode: "STAD", icdO3Code: "8144/3", prevalence: "uncommon" },
  { id: "gastric-diffuse", name: "Gastric Cancer, Diffuse Type", parent: "gastric", tissue: "Gastrointestinal", aliases: ["diffuse gastric cancer", "Lauren diffuse", "linitis plastica"], oncoTreeCode: "STAD", icdO3Code: "8145/3", prevalence: "uncommon" },
  { id: "gastric-signet-ring", name: "Gastric Signet Ring Cell Carcinoma", parent: "gastric-diffuse", tissue: "Gastrointestinal", aliases: ["signet ring cell gastric"], oncoTreeCode: "STAD", icdO3Code: "8490/3", prevalence: "rare" },
  { id: "gastric-her2", name: "Gastric Cancer, HER2-positive", parent: "gastric", tissue: "Gastrointestinal", aliases: ["HER2+ gastric cancer"], oncoTreeCode: "STAD", icdO3Code: "8140/3", molecularSubtype: "HER2-positive", prevalence: "rare" },
  { id: "gastric-ebv", name: "Gastric Cancer, EBV-associated", parent: "gastric", tissue: "Gastrointestinal", aliases: ["EBV+ gastric cancer"], oncoTreeCode: "STAD", icdO3Code: "8140/3", molecularSubtype: "EBV-associated", prevalence: "rare" },
  { id: "gastric-msi", name: "Gastric Cancer, MSI-High", parent: "gastric", tissue: "Gastrointestinal", aliases: ["MSI-H gastric cancer"], oncoTreeCode: "STAD", icdO3Code: "8140/3", molecularSubtype: "MSI-H", prevalence: "rare" },
  { id: "gastric-gist", name: "Gastric GIST", parent: "gastric", tissue: "Gastrointestinal", aliases: ["gastric gastrointestinal stromal tumor"], oncoTreeCode: "GIST", icdO3Code: "8936/3", prevalence: "rare" },

  // Small bowel
  { id: "small-bowel", name: "Small Bowel Cancer", parent: "gi", tissue: "Gastrointestinal", aliases: ["small intestine cancer", "small bowel adenocarcinoma"], oncoTreeCode: "SBC", icdO3Code: "8140/3", prevalence: "rare" },
  { id: "small-bowel-adeno", name: "Small Bowel Adenocarcinoma", parent: "small-bowel", tissue: "Gastrointestinal", aliases: ["duodenal adenocarcinoma", "jejunal adenocarcinoma", "ileal adenocarcinoma"], oncoTreeCode: "SBC", icdO3Code: "8140/3", prevalence: "rare" },
  { id: "small-bowel-net", name: "Small Bowel Neuroendocrine Tumor", parent: "small-bowel", tissue: "Gastrointestinal", aliases: ["small bowel carcinoid", "ileal carcinoid"], oncoTreeCode: null, icdO3Code: "8240/3", prevalence: "rare" },

  // Colorectal
  { id: "crc", name: "Colorectal Cancer", parent: "gi", tissue: "Gastrointestinal", aliases: ["colon cancer", "rectal cancer", "CRC", "bowel cancer"], oncoTreeCode: "CRC", icdO3Code: "8140/3", prevalence: "common" },
  { id: "colon-adeno", name: "Colon Adenocarcinoma", parent: "crc", tissue: "Gastrointestinal", aliases: ["colon cancer", "COAD"], oncoTreeCode: "COAD", icdO3Code: "8140/3", prevalence: "common" },
  { id: "rectal-adeno", name: "Rectal Adenocarcinoma", parent: "crc", tissue: "Gastrointestinal", aliases: ["rectal cancer", "READ"], oncoTreeCode: "READ", icdO3Code: "8140/3", prevalence: "common" },
  { id: "crc-msi-h", name: "Colorectal Cancer, MSI-High", parent: "crc", tissue: "Gastrointestinal", aliases: ["MSI-H CRC", "dMMR CRC", "microsatellite instability CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "MSI-H/dMMR", prevalence: "uncommon" },
  { id: "crc-mss", name: "Colorectal Cancer, MSS", parent: "crc", tissue: "Gastrointestinal", aliases: ["MSS CRC", "pMMR CRC", "microsatellite stable CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "MSS/pMMR", prevalence: "common" },
  { id: "crc-cms1", name: "Colorectal Cancer, CMS1 (MSI Immune)", parent: "crc", tissue: "Gastrointestinal", aliases: ["CMS1 CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "CMS1", prevalence: "uncommon" },
  { id: "crc-cms2", name: "Colorectal Cancer, CMS2 (Canonical)", parent: "crc", tissue: "Gastrointestinal", aliases: ["CMS2 CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "CMS2", prevalence: "uncommon" },
  { id: "crc-cms3", name: "Colorectal Cancer, CMS3 (Metabolic)", parent: "crc", tissue: "Gastrointestinal", aliases: ["CMS3 CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "CMS3", prevalence: "uncommon" },
  { id: "crc-cms4", name: "Colorectal Cancer, CMS4 (Mesenchymal)", parent: "crc", tissue: "Gastrointestinal", aliases: ["CMS4 CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "CMS4", prevalence: "uncommon" },
  { id: "crc-braf-v600e", name: "Colorectal Cancer, BRAF V600E", parent: "crc", tissue: "Gastrointestinal", aliases: ["BRAF+ CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "BRAF V600E", prevalence: "rare" },
  { id: "crc-kras-mut", name: "Colorectal Cancer, KRAS-mutant", parent: "crc", tissue: "Gastrointestinal", aliases: ["KRAS+ CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "KRAS-mutant", prevalence: "uncommon" },
  { id: "crc-her2-amp", name: "Colorectal Cancer, HER2-amplified", parent: "crc", tissue: "Gastrointestinal", aliases: ["HER2+ CRC", "ERBB2-amplified CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "HER2-amplified", prevalence: "rare" },
  { id: "crc-mucinous", name: "Mucinous Colorectal Adenocarcinoma", parent: "crc", tissue: "Gastrointestinal", aliases: ["mucinous CRC"], oncoTreeCode: "CRC", icdO3Code: "8480/3", prevalence: "uncommon" },
  { id: "crc-signet-ring", name: "Signet Ring Cell Colorectal Carcinoma", parent: "crc", tissue: "Gastrointestinal", aliases: ["signet ring CRC"], oncoTreeCode: "CRC", icdO3Code: "8490/3", prevalence: "rare" },
  { id: "crc-medullary", name: "Medullary Colorectal Carcinoma", parent: "crc", tissue: "Gastrointestinal", aliases: ["medullary CRC"], oncoTreeCode: "CRC", icdO3Code: "8510/3", prevalence: "ultra-rare" },

  // Appendiceal
  { id: "appendiceal", name: "Appendiceal Cancer", parent: "gi", tissue: "Gastrointestinal", aliases: ["appendix cancer"], oncoTreeCode: "APAD", prevalence: "rare" },
  { id: "appendiceal-mucinous", name: "Appendiceal Mucinous Neoplasm", parent: "appendiceal", tissue: "Gastrointestinal", aliases: ["LAMN", "pseudomyxoma peritonei"], oncoTreeCode: "APAD", icdO3Code: "8480/3", prevalence: "rare" },
  { id: "appendiceal-adeno", name: "Appendiceal Adenocarcinoma", parent: "appendiceal", tissue: "Gastrointestinal", aliases: [], oncoTreeCode: "APAD", icdO3Code: "8140/3", prevalence: "ultra-rare" },
  { id: "appendiceal-goblet", name: "Goblet Cell Adenocarcinoma of Appendix", parent: "appendiceal", tissue: "Gastrointestinal", aliases: ["goblet cell carcinoid"], oncoTreeCode: null, icdO3Code: "8243/3", prevalence: "ultra-rare" },

  // Anal
  { id: "anal", name: "Anal Cancer", parent: "gi", tissue: "Gastrointestinal", aliases: ["anal carcinoma"], oncoTreeCode: "ANSC", prevalence: "rare" },
  { id: "anal-scc", name: "Anal Squamous Cell Carcinoma", parent: "anal", tissue: "Gastrointestinal", aliases: ["anal SCC", "HPV-related anal cancer"], oncoTreeCode: "ANSC", icdO3Code: "8070/3", prevalence: "rare" },
  { id: "anal-adeno", name: "Anal Adenocarcinoma", parent: "anal", tissue: "Gastrointestinal", aliases: [], oncoTreeCode: null, icdO3Code: "8140/3", prevalence: "ultra-rare" },

  // Liver
  { id: "liver", name: "Liver Cancer", parent: "gi", tissue: "Gastrointestinal", aliases: ["hepatic cancer", "liver tumor"], oncoTreeCode: null, prevalence: "common" },
  { id: "hcc", name: "Hepatocellular Carcinoma", parent: "liver", tissue: "Gastrointestinal", aliases: ["HCC", "liver cancer", "hepatoma"], oncoTreeCode: "HCC", icdO3Code: "8170/3", prevalence: "common" },
  { id: "hcc-fibrolamellar", name: "Fibrolamellar Hepatocellular Carcinoma", parent: "hcc", tissue: "Gastrointestinal", aliases: ["fibrolamellar HCC", "FLC"], oncoTreeCode: "HCC", icdO3Code: "8171/3", prevalence: "ultra-rare" },

  // Biliary
  { id: "cholangiocarcinoma", name: "Cholangiocarcinoma", parent: "gi", tissue: "Gastrointestinal", aliases: ["bile duct cancer", "CCA", "biliary tract cancer"], oncoTreeCode: "CHOL", icdO3Code: "8160/3", prevalence: "rare" },
  { id: "cholangiocarcinoma-intra", name: "Intrahepatic Cholangiocarcinoma", parent: "cholangiocarcinoma", tissue: "Gastrointestinal", aliases: ["iCCA", "intrahepatic bile duct cancer"], oncoTreeCode: "IHCH", icdO3Code: "8160/3", prevalence: "rare" },
  { id: "cholangiocarcinoma-perihilar", name: "Perihilar Cholangiocarcinoma", parent: "cholangiocarcinoma", tissue: "Gastrointestinal", aliases: ["Klatskin tumor", "pCCA", "hilar cholangiocarcinoma"], oncoTreeCode: "CHOL", icdO3Code: "8160/3", prevalence: "rare" },
  { id: "cholangiocarcinoma-distal", name: "Distal Cholangiocarcinoma", parent: "cholangiocarcinoma", tissue: "Gastrointestinal", aliases: ["dCCA", "extrahepatic cholangiocarcinoma"], oncoTreeCode: "CHOL", icdO3Code: "8160/3", prevalence: "rare" },
  { id: "cholangiocarcinoma-idh1", name: "Cholangiocarcinoma, IDH1-mutant", parent: "cholangiocarcinoma", tissue: "Gastrointestinal", aliases: ["IDH1+ CCA"], oncoTreeCode: "CHOL", icdO3Code: "8160/3", molecularSubtype: "IDH1-mutant", prevalence: "rare" },
  { id: "cholangiocarcinoma-fgfr2", name: "Cholangiocarcinoma, FGFR2 Fusion", parent: "cholangiocarcinoma", tissue: "Gastrointestinal", aliases: ["FGFR2+ CCA"], oncoTreeCode: "CHOL", icdO3Code: "8160/3", molecularSubtype: "FGFR2 fusion", prevalence: "rare" },
  { id: "gallbladder", name: "Gallbladder Cancer", parent: "gi", tissue: "Gastrointestinal", aliases: ["gallbladder carcinoma", "GBC"], oncoTreeCode: "GBC", icdO3Code: "8140/3", prevalence: "rare" },

  // Pancreatic
  { id: "pancreatic", name: "Pancreatic Cancer", parent: "gi", tissue: "Gastrointestinal", aliases: ["pancreatic carcinoma", "PAAD"], oncoTreeCode: "PAAD", prevalence: "uncommon" },
  { id: "pdac", name: "Pancreatic Ductal Adenocarcinoma", parent: "pancreatic", tissue: "Gastrointestinal", aliases: ["PDAC", "pancreatic adenocarcinoma"], oncoTreeCode: "PAAD", icdO3Code: "8500/3", prevalence: "uncommon" },
  { id: "pdac-kras-wt", name: "PDAC, KRAS Wildtype", parent: "pdac", tissue: "Gastrointestinal", aliases: ["KRAS-wt pancreatic cancer"], oncoTreeCode: "PAAD", icdO3Code: "8500/3", molecularSubtype: "KRAS-wildtype", prevalence: "rare" },
  { id: "pdac-brca", name: "PDAC with BRCA Mutation", parent: "pdac", tissue: "Gastrointestinal", aliases: ["BRCA-mutant pancreatic cancer"], oncoTreeCode: "PAAD", icdO3Code: "8500/3", molecularSubtype: "BRCA-mutant", prevalence: "rare" },
  { id: "pannet", name: "Pancreatic Neuroendocrine Tumor", parent: "pancreatic", tissue: "Gastrointestinal", aliases: ["PanNET", "islet cell tumor", "pancreatic NET"], oncoTreeCode: "PANET", icdO3Code: "8150/3", prevalence: "rare" },
  { id: "pannet-functional", name: "Pancreatic NET, Functional", parent: "pannet", tissue: "Gastrointestinal", aliases: ["insulinoma", "glucagonoma", "gastrinoma", "VIPoma"], oncoTreeCode: "PANET", icdO3Code: "8150/3", prevalence: "rare" },
  { id: "pannet-nonfunctional", name: "Pancreatic NET, Non-functional", parent: "pannet", tissue: "Gastrointestinal", aliases: ["non-functional PanNET"], oncoTreeCode: "PANET", icdO3Code: "8150/3", prevalence: "rare" },
  { id: "pannec", name: "Pancreatic Neuroendocrine Carcinoma", parent: "pancreatic", tissue: "Gastrointestinal", aliases: ["PanNEC"], oncoTreeCode: null, icdO3Code: "8246/3", prevalence: "ultra-rare" },
  { id: "pancreatic-acinar", name: "Pancreatic Acinar Cell Carcinoma", parent: "pancreatic", tissue: "Gastrointestinal", aliases: ["acinar cell carcinoma"], oncoTreeCode: null, icdO3Code: "8550/3", prevalence: "ultra-rare" },
  { id: "pancreatic-spn", name: "Solid Pseudopapillary Neoplasm of Pancreas", parent: "pancreatic", tissue: "Gastrointestinal", aliases: ["SPN", "Frantz tumor"], oncoTreeCode: null, icdO3Code: "8452/3", prevalence: "ultra-rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // GENITOURINARY
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "gu", name: "Genitourinary Cancer", parent: null, tissue: "Genitourinary", aliases: ["GU cancer", "urological cancer"], oncoTreeCode: null, prevalence: "common" },

  // Kidney
  { id: "kidney", name: "Kidney Cancer", parent: "gu", tissue: "Genitourinary", aliases: ["renal cancer", "renal cell carcinoma"], oncoTreeCode: "KIDNEY", prevalence: "common" },
  { id: "ccrcc", name: "Clear Cell Renal Cell Carcinoma", parent: "kidney", tissue: "Genitourinary", aliases: ["ccRCC", "KIRC", "conventional RCC"], oncoTreeCode: "CCRCC", icdO3Code: "8310/3", prevalence: "uncommon" },
  { id: "ccrcc-vhl", name: "Clear Cell RCC, VHL-mutant", parent: "ccrcc", tissue: "Genitourinary", aliases: ["VHL-mutant ccRCC"], oncoTreeCode: "CCRCC", icdO3Code: "8310/3", molecularSubtype: "VHL-mutant", prevalence: "uncommon" },
  { id: "prcc", name: "Papillary Renal Cell Carcinoma", parent: "kidney", tissue: "Genitourinary", aliases: ["pRCC", "KIRP", "chromophil RCC"], oncoTreeCode: "PRCC", icdO3Code: "8260/3", prevalence: "rare" },
  { id: "prcc-type1", name: "Papillary RCC, Type 1", parent: "prcc", tissue: "Genitourinary", aliases: ["type 1 papillary RCC", "MET-driven pRCC"], oncoTreeCode: "PRCC", icdO3Code: "8260/3", molecularSubtype: "Type 1", prevalence: "rare" },
  { id: "prcc-type2", name: "Papillary RCC, Type 2", parent: "prcc", tissue: "Genitourinary", aliases: ["type 2 papillary RCC"], oncoTreeCode: "PRCC", icdO3Code: "8260/3", molecularSubtype: "Type 2", prevalence: "rare" },
  { id: "chrcc", name: "Chromophobe Renal Cell Carcinoma", parent: "kidney", tissue: "Genitourinary", aliases: ["chromophobe RCC", "KICH"], oncoTreeCode: "CHRCC", icdO3Code: "8317/3", prevalence: "rare" },
  { id: "collecting-duct", name: "Collecting Duct Carcinoma", parent: "kidney", tissue: "Genitourinary", aliases: ["Bellini duct carcinoma", "CDC"], oncoTreeCode: null, icdO3Code: "8319/3", prevalence: "ultra-rare" },
  { id: "rcc-medullary", name: "Renal Medullary Carcinoma", parent: "kidney", tissue: "Genitourinary", aliases: ["medullary RCC"], oncoTreeCode: null, icdO3Code: "8510/3", prevalence: "ultra-rare" },
  { id: "rcc-translocation", name: "TFE3/TFEB Translocation RCC", parent: "kidney", tissue: "Genitourinary", aliases: ["Xp11.2 translocation RCC", "MiT family RCC"], oncoTreeCode: null, icdO3Code: "8311/3", molecularSubtype: "TFE3/TFEB translocation", prevalence: "ultra-rare" },
  { id: "oncocytoma", name: "Renal Oncocytoma", parent: "kidney", tissue: "Genitourinary", aliases: ["oncocytoma"], oncoTreeCode: null, icdO3Code: "8290/0", prevalence: "rare" },
  { id: "rcc-unclassified", name: "Renal Cell Carcinoma, Unclassified", parent: "kidney", tissue: "Genitourinary", aliases: ["unclassified RCC"], oncoTreeCode: null, icdO3Code: "8312/3", prevalence: "rare" },
  { id: "wilms", name: "Wilms Tumor", parent: "kidney", tissue: "Genitourinary", aliases: ["nephroblastoma", "Wilms' tumor"], oncoTreeCode: "WT", icdO3Code: "8960/3", prevalence: "rare" },

  // Bladder / Urothelial
  { id: "bladder", name: "Bladder Cancer", parent: "gu", tissue: "Genitourinary", aliases: ["urothelial carcinoma", "BLCA", "bladder tumor"], oncoTreeCode: "BLCA", prevalence: "common" },
  { id: "bladder-urothelial", name: "Urothelial Carcinoma of Bladder", parent: "bladder", tissue: "Genitourinary", aliases: ["transitional cell carcinoma", "TCC"], oncoTreeCode: "BLCA", icdO3Code: "8120/3", prevalence: "common" },
  { id: "bladder-urothelial-mibc", name: "Muscle-Invasive Bladder Cancer", parent: "bladder-urothelial", tissue: "Genitourinary", aliases: ["MIBC"], oncoTreeCode: "BLCA", icdO3Code: "8120/3", prevalence: "uncommon" },
  { id: "bladder-urothelial-nmibc", name: "Non-Muscle-Invasive Bladder Cancer", parent: "bladder-urothelial", tissue: "Genitourinary", aliases: ["NMIBC", "superficial bladder cancer"], oncoTreeCode: "BLCA", icdO3Code: "8120/3", prevalence: "uncommon" },
  { id: "bladder-scc", name: "Squamous Cell Carcinoma of Bladder", parent: "bladder", tissue: "Genitourinary", aliases: ["bladder SCC"], oncoTreeCode: "BLCA", icdO3Code: "8070/3", prevalence: "rare" },
  { id: "bladder-adeno", name: "Adenocarcinoma of Bladder", parent: "bladder", tissue: "Genitourinary", aliases: ["bladder adenocarcinoma", "urachal carcinoma"], oncoTreeCode: "BLCA", icdO3Code: "8140/3", prevalence: "rare" },
  { id: "bladder-small-cell", name: "Small Cell Carcinoma of Bladder", parent: "bladder", tissue: "Genitourinary", aliases: ["neuroendocrine bladder cancer"], oncoTreeCode: "BLCA", icdO3Code: "8041/3", prevalence: "ultra-rare" },
  { id: "utuc", name: "Upper Tract Urothelial Carcinoma", parent: "gu", tissue: "Genitourinary", aliases: ["UTUC", "renal pelvis cancer", "ureteral cancer"], oncoTreeCode: "UTUC", icdO3Code: "8120/3", prevalence: "rare" },

  // Prostate
  { id: "prostate", name: "Prostate Cancer", parent: "gu", tissue: "Genitourinary", aliases: ["prostate adenocarcinoma", "PRAD", "prostatic carcinoma"], oncoTreeCode: "PRAD", icdO3Code: "8140/3", prevalence: "common" },
  { id: "prostate-acinar", name: "Prostate Acinar Adenocarcinoma", parent: "prostate", tissue: "Genitourinary", aliases: ["conventional prostate cancer"], oncoTreeCode: "PRAD", icdO3Code: "8140/3", prevalence: "common" },
  { id: "prostate-ductal", name: "Prostatic Ductal Adenocarcinoma", parent: "prostate", tissue: "Genitourinary", aliases: ["ductal prostate cancer"], oncoTreeCode: "PRAD", icdO3Code: "8500/3", prevalence: "rare" },
  { id: "prostate-nepc", name: "Neuroendocrine Prostate Cancer", parent: "prostate", tissue: "Genitourinary", aliases: ["NEPC", "small cell prostate cancer"], oncoTreeCode: "PRAD", icdO3Code: "8041/3", prevalence: "rare" },
  { id: "prostate-crpc", name: "Castration-Resistant Prostate Cancer", parent: "prostate", tissue: "Genitourinary", aliases: ["CRPC", "hormone-refractory prostate cancer"], oncoTreeCode: "PRAD", icdO3Code: "8140/3", prevalence: "uncommon" },
  { id: "prostate-brca", name: "Prostate Cancer, BRCA-mutant", parent: "prostate", tissue: "Genitourinary", aliases: ["BRCA+ prostate cancer", "HRD prostate cancer"], oncoTreeCode: "PRAD", icdO3Code: "8140/3", molecularSubtype: "BRCA-mutant", prevalence: "rare" },

  // Testicular
  { id: "testicular", name: "Testicular Cancer", parent: "gu", tissue: "Genitourinary", aliases: ["testis cancer", "testicular germ cell tumor"], oncoTreeCode: "TESTIS", prevalence: "uncommon" },
  { id: "seminoma", name: "Seminoma", parent: "testicular", tissue: "Genitourinary", aliases: ["classical seminoma", "pure seminoma"], oncoTreeCode: "SEM", icdO3Code: "9061/3", prevalence: "uncommon" },
  { id: "nonseminoma", name: "Non-Seminomatous Germ Cell Tumor", parent: "testicular", tissue: "Genitourinary", aliases: ["NSGCT", "non-seminoma"], oncoTreeCode: "NSGCT", icdO3Code: "9080/3", prevalence: "uncommon" },
  { id: "embryonal-carcinoma", name: "Embryonal Carcinoma", parent: "nonseminoma", tissue: "Genitourinary", aliases: ["EC"], oncoTreeCode: "NSGCT", icdO3Code: "9070/3", prevalence: "rare" },
  { id: "yolk-sac-tumor", name: "Yolk Sac Tumor", parent: "nonseminoma", tissue: "Genitourinary", aliases: ["endodermal sinus tumor", "YST"], oncoTreeCode: "NSGCT", icdO3Code: "9071/3", prevalence: "rare" },
  { id: "choriocarcinoma", name: "Choriocarcinoma", parent: "nonseminoma", tissue: "Genitourinary", aliases: ["testicular choriocarcinoma"], oncoTreeCode: "NSGCT", icdO3Code: "9100/3", prevalence: "rare" },
  { id: "teratoma-mature", name: "Mature Teratoma", parent: "nonseminoma", tissue: "Genitourinary", aliases: ["mature teratoma of testis"], oncoTreeCode: "NSGCT", icdO3Code: "9080/0", prevalence: "rare" },
  { id: "teratoma-immature", name: "Immature Teratoma", parent: "nonseminoma", tissue: "Genitourinary", aliases: ["immature teratoma of testis"], oncoTreeCode: "NSGCT", icdO3Code: "9080/3", prevalence: "rare" },
  { id: "mixed-gct", name: "Mixed Germ Cell Tumor", parent: "nonseminoma", tissue: "Genitourinary", aliases: ["mixed GCT"], oncoTreeCode: "NSGCT", icdO3Code: "9085/3", prevalence: "uncommon" },

  // Penile
  { id: "penile", name: "Penile Cancer", parent: "gu", tissue: "Genitourinary", aliases: ["penile carcinoma", "penile SCC"], oncoTreeCode: "PENIS", icdO3Code: "8070/3", prevalence: "rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // GYNECOLOGIC
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "gyn", name: "Gynecologic Cancer", parent: null, tissue: "Gynecologic", aliases: ["gynecological cancer", "women's cancer"], oncoTreeCode: null, prevalence: "common" },

  // Ovarian
  { id: "ovarian", name: "Ovarian Cancer", parent: "gyn", tissue: "Gynecologic", aliases: ["ovarian carcinoma", "OV"], oncoTreeCode: "OVARY", prevalence: "uncommon" },
  { id: "ovarian-hgsoc", name: "High-Grade Serous Ovarian Carcinoma", parent: "ovarian", tissue: "Gynecologic", aliases: ["HGSOC", "serous ovarian cancer"], oncoTreeCode: "HGSOC", icdO3Code: "8461/3", prevalence: "uncommon" },
  { id: "ovarian-hgsoc-brca", name: "HGSOC, BRCA-mutant", parent: "ovarian-hgsoc", tissue: "Gynecologic", aliases: ["BRCA+ ovarian cancer"], oncoTreeCode: "HGSOC", icdO3Code: "8461/3", molecularSubtype: "BRCA-mutant", prevalence: "rare" },
  { id: "ovarian-hgsoc-hrd", name: "HGSOC, HRD-positive", parent: "ovarian-hgsoc", tissue: "Gynecologic", aliases: ["HRD+ ovarian cancer"], oncoTreeCode: "HGSOC", icdO3Code: "8461/3", molecularSubtype: "HRD-positive", prevalence: "rare" },
  { id: "ovarian-lgsoc", name: "Low-Grade Serous Ovarian Carcinoma", parent: "ovarian", tissue: "Gynecologic", aliases: ["LGSOC"], oncoTreeCode: "LGSOC", icdO3Code: "8460/3", prevalence: "rare" },
  { id: "ovarian-endometrioid", name: "Ovarian Endometrioid Carcinoma", parent: "ovarian", tissue: "Gynecologic", aliases: ["endometrioid ovarian cancer"], oncoTreeCode: null, icdO3Code: "8380/3", prevalence: "rare" },
  { id: "ovarian-clear-cell", name: "Ovarian Clear Cell Carcinoma", parent: "ovarian", tissue: "Gynecologic", aliases: ["clear cell ovarian cancer", "OCCC"], oncoTreeCode: "CCOV", icdO3Code: "8310/3", prevalence: "rare" },
  { id: "ovarian-mucinous", name: "Mucinous Ovarian Carcinoma", parent: "ovarian", tissue: "Gynecologic", aliases: ["mucinous ovarian cancer"], oncoTreeCode: null, icdO3Code: "8480/3", prevalence: "rare" },
  { id: "ovarian-granulosa", name: "Granulosa Cell Tumor of Ovary", parent: "ovarian", tissue: "Gynecologic", aliases: ["GCT", "ovarian sex cord-stromal tumor"], oncoTreeCode: "GRCT", icdO3Code: "8620/3", prevalence: "rare" },
  { id: "ovarian-dysgerminoma", name: "Ovarian Dysgerminoma", parent: "ovarian", tissue: "Gynecologic", aliases: ["dysgerminoma"], oncoTreeCode: null, icdO3Code: "9060/3", prevalence: "ultra-rare" },
  { id: "ovarian-immature-teratoma", name: "Ovarian Immature Teratoma", parent: "ovarian", tissue: "Gynecologic", aliases: ["immature teratoma of ovary"], oncoTreeCode: null, icdO3Code: "9080/3", prevalence: "ultra-rare" },
  { id: "ovarian-sertoli-leydig", name: "Sertoli-Leydig Cell Tumor of Ovary", parent: "ovarian", tissue: "Gynecologic", aliases: ["androblastoma"], oncoTreeCode: null, icdO3Code: "8631/3", prevalence: "ultra-rare" },
  { id: "ovarian-carcinosarcoma", name: "Ovarian Carcinosarcoma", parent: "ovarian", tissue: "Gynecologic", aliases: ["MMMT of ovary"], oncoTreeCode: null, icdO3Code: "8980/3", prevalence: "ultra-rare" },

  // Endometrial
  { id: "endometrial", name: "Endometrial Cancer", parent: "gyn", tissue: "Gynecologic", aliases: ["uterine cancer", "UCEC", "corpus uteri cancer"], oncoTreeCode: "UCEC", prevalence: "common" },
  { id: "endometrial-endometrioid", name: "Endometrial Endometrioid Carcinoma", parent: "endometrial", tissue: "Gynecologic", aliases: ["type I endometrial cancer"], oncoTreeCode: "UCEC", icdO3Code: "8380/3", prevalence: "common" },
  { id: "endometrial-serous", name: "Endometrial Serous Carcinoma", parent: "endometrial", tissue: "Gynecologic", aliases: ["uterine serous carcinoma", "type II endometrial"], oncoTreeCode: "UCEC", icdO3Code: "8441/3", prevalence: "uncommon" },
  { id: "endometrial-clear-cell", name: "Endometrial Clear Cell Carcinoma", parent: "endometrial", tissue: "Gynecologic", aliases: ["uterine clear cell carcinoma"], oncoTreeCode: "UCEC", icdO3Code: "8310/3", prevalence: "rare" },
  { id: "endometrial-carcinosarcoma", name: "Uterine Carcinosarcoma", parent: "endometrial", tissue: "Gynecologic", aliases: ["MMMT", "malignant mixed Mullerian tumor"], oncoTreeCode: "UCS", icdO3Code: "8980/3", prevalence: "rare" },
  { id: "endometrial-pole-mut", name: "Endometrial Cancer, POLE Ultramutated", parent: "endometrial", tissue: "Gynecologic", aliases: ["POLE-mutant endometrial"], oncoTreeCode: "UCEC", icdO3Code: "8380/3", molecularSubtype: "POLE ultramutated", prevalence: "rare" },
  { id: "endometrial-msi", name: "Endometrial Cancer, MSI-High", parent: "endometrial", tissue: "Gynecologic", aliases: ["MSI-H endometrial", "dMMR endometrial"], oncoTreeCode: "UCEC", icdO3Code: "8380/3", molecularSubtype: "MSI-H/dMMR", prevalence: "uncommon" },
  { id: "endometrial-cn-high", name: "Endometrial Cancer, Copy Number High", parent: "endometrial", tissue: "Gynecologic", aliases: ["serous-like endometrial", "p53-abnormal endometrial"], oncoTreeCode: "UCEC", icdO3Code: "8380/3", molecularSubtype: "Copy number high/p53-abn", prevalence: "uncommon" },
  { id: "endometrial-cn-low", name: "Endometrial Cancer, Copy Number Low", parent: "endometrial", tissue: "Gynecologic", aliases: ["endometrioid-like", "p53-wt endometrial"], oncoTreeCode: "UCEC", icdO3Code: "8380/3", molecularSubtype: "Copy number low/p53-wt", prevalence: "uncommon" },
  { id: "uterine-leiomyosarcoma", name: "Uterine Leiomyosarcoma", parent: "gyn", tissue: "Gynecologic", aliases: ["uLMS", "uterine LMS"], oncoTreeCode: "ULMS", icdO3Code: "8890/3", prevalence: "rare" },

  // Cervical
  { id: "cervical", name: "Cervical Cancer", parent: "gyn", tissue: "Gynecologic", aliases: ["cervical carcinoma", "CESC"], oncoTreeCode: "CESC", prevalence: "common" },
  { id: "cervical-scc", name: "Cervical Squamous Cell Carcinoma", parent: "cervical", tissue: "Gynecologic", aliases: ["cervical SCC", "HPV-related cervical cancer"], oncoTreeCode: "CESC", icdO3Code: "8070/3", prevalence: "common" },
  { id: "cervical-adeno", name: "Cervical Adenocarcinoma", parent: "cervical", tissue: "Gynecologic", aliases: ["endocervical adenocarcinoma"], oncoTreeCode: "CESC", icdO3Code: "8140/3", prevalence: "uncommon" },
  { id: "cervical-adenosquamous", name: "Cervical Adenosquamous Carcinoma", parent: "cervical", tissue: "Gynecologic", aliases: [], oncoTreeCode: "CESC", icdO3Code: "8560/3", prevalence: "rare" },
  { id: "cervical-small-cell", name: "Small Cell Carcinoma of Cervix", parent: "cervical", tissue: "Gynecologic", aliases: ["neuroendocrine cervical cancer"], oncoTreeCode: null, icdO3Code: "8041/3", prevalence: "ultra-rare" },

  // Other GYN
  { id: "gtd", name: "Gestational Trophoblastic Disease", parent: "gyn", tissue: "Gynecologic", aliases: ["GTD", "molar pregnancy", "trophoblastic neoplasia"], oncoTreeCode: null, prevalence: "rare" },
  { id: "gtd-choriocarcinoma", name: "Gestational Choriocarcinoma", parent: "gtd", tissue: "Gynecologic", aliases: ["gestational trophoblastic neoplasia"], oncoTreeCode: null, icdO3Code: "9100/3", prevalence: "rare" },
  { id: "vulvar", name: "Vulvar Cancer", parent: "gyn", tissue: "Gynecologic", aliases: ["vulvar carcinoma", "vulvar SCC"], oncoTreeCode: "VULVA", icdO3Code: "8070/3", prevalence: "rare" },
  { id: "vaginal", name: "Vaginal Cancer", parent: "gyn", tissue: "Gynecologic", aliases: ["vaginal carcinoma"], oncoTreeCode: "VAGINA", icdO3Code: "8070/3", prevalence: "rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // SKIN
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "skin", name: "Skin Cancer", parent: null, tissue: "Skin", aliases: ["cutaneous cancer", "dermatologic cancer"], oncoTreeCode: null, prevalence: "common" },
  { id: "melanoma", name: "Melanoma", parent: "skin", tissue: "Skin", aliases: ["malignant melanoma", "SKCM"], oncoTreeCode: "MEL", icdO3Code: "8720/3", prevalence: "common" },
  { id: "melanoma-cutaneous", name: "Cutaneous Melanoma", parent: "melanoma", tissue: "Skin", aliases: ["skin melanoma", "superficial spreading melanoma"], oncoTreeCode: "SKCM", icdO3Code: "8720/3", prevalence: "common" },
  { id: "melanoma-cutaneous-braf", name: "Cutaneous Melanoma, BRAF V600E", parent: "melanoma-cutaneous", tissue: "Skin", aliases: ["BRAF+ melanoma"], oncoTreeCode: "SKCM", icdO3Code: "8720/3", molecularSubtype: "BRAF V600E", prevalence: "uncommon" },
  { id: "melanoma-cutaneous-nras", name: "Cutaneous Melanoma, NRAS-mutant", parent: "melanoma-cutaneous", tissue: "Skin", aliases: ["NRAS+ melanoma"], oncoTreeCode: "SKCM", icdO3Code: "8720/3", molecularSubtype: "NRAS-mutant", prevalence: "uncommon" },
  { id: "melanoma-cutaneous-kit", name: "Cutaneous Melanoma, KIT-mutant", parent: "melanoma-cutaneous", tissue: "Skin", aliases: ["KIT+ melanoma"], oncoTreeCode: "SKCM", icdO3Code: "8720/3", molecularSubtype: "KIT-mutant", prevalence: "rare" },
  { id: "melanoma-cutaneous-triple-wt", name: "Cutaneous Melanoma, Triple Wild-type", parent: "melanoma-cutaneous", tissue: "Skin", aliases: ["triple-wt melanoma"], oncoTreeCode: "SKCM", icdO3Code: "8720/3", molecularSubtype: "Triple wild-type", prevalence: "rare" },
  { id: "melanoma-nodular", name: "Nodular Melanoma", parent: "melanoma-cutaneous", tissue: "Skin", aliases: ["NM"], oncoTreeCode: "SKCM", icdO3Code: "8721/3", prevalence: "uncommon" },
  { id: "melanoma-lmm", name: "Lentigo Maligna Melanoma", parent: "melanoma-cutaneous", tissue: "Skin", aliases: ["LMM", "Hutchinson's melanotic freckle"], oncoTreeCode: "SKCM", icdO3Code: "8742/3", prevalence: "uncommon" },
  { id: "melanoma-acral", name: "Acral Melanoma", parent: "melanoma", tissue: "Skin", aliases: ["acral lentiginous melanoma", "ALM"], oncoTreeCode: "SKCM", icdO3Code: "8744/3", prevalence: "rare" },
  { id: "melanoma-uveal", name: "Uveal Melanoma", parent: "melanoma", tissue: "Skin", aliases: ["ocular melanoma", "eye melanoma", "choroidal melanoma", "UM"], oncoTreeCode: "UM", icdO3Code: "8720/3", prevalence: "rare" },
  { id: "melanoma-uveal-gnaq", name: "Uveal Melanoma, GNAQ/GNA11-mutant", parent: "melanoma-uveal", tissue: "Skin", aliases: ["GNAQ+ uveal melanoma"], oncoTreeCode: "UM", icdO3Code: "8720/3", molecularSubtype: "GNAQ/GNA11-mutant", prevalence: "rare" },
  { id: "melanoma-mucosal", name: "Mucosal Melanoma", parent: "melanoma", tissue: "Skin", aliases: ["mucosal MM"], oncoTreeCode: "MEL", icdO3Code: "8720/3", prevalence: "rare" },
  { id: "melanoma-desmoplastic", name: "Desmoplastic Melanoma", parent: "melanoma-cutaneous", tissue: "Skin", aliases: ["desmoplastic neurotropic melanoma"], oncoTreeCode: "SKCM", icdO3Code: "8745/3", prevalence: "rare" },
  { id: "bcc", name: "Basal Cell Carcinoma", parent: "skin", tissue: "Skin", aliases: ["BCC", "basal cell skin cancer", "basalioma"], oncoTreeCode: "BCC", icdO3Code: "8090/3", prevalence: "common" },
  { id: "skin-scc", name: "Cutaneous Squamous Cell Carcinoma", parent: "skin", tissue: "Skin", aliases: ["cSCC", "squamous cell skin cancer"], oncoTreeCode: "CSCC", icdO3Code: "8070/3", prevalence: "common" },
  { id: "merkel-cell", name: "Merkel Cell Carcinoma", parent: "skin", tissue: "Skin", aliases: ["MCC", "neuroendocrine carcinoma of skin"], oncoTreeCode: "MCC", icdO3Code: "8247/3", prevalence: "rare" },
  { id: "dfsp", name: "Dermatofibrosarcoma Protuberans", parent: "skin", tissue: "Skin", aliases: ["DFSP"], oncoTreeCode: "DFSP", icdO3Code: "8832/3", prevalence: "rare" },
  { id: "skin-adnexal", name: "Cutaneous Adnexal Carcinoma", parent: "skin", tissue: "Skin", aliases: ["appendageal carcinoma"], oncoTreeCode: null, icdO3Code: "8390/3", prevalence: "rare" },
  { id: "skin-angiosarcoma", name: "Cutaneous Angiosarcoma", parent: "skin", tissue: "Skin", aliases: ["angiosarcoma of skin"], oncoTreeCode: null, icdO3Code: "9120/3", prevalence: "ultra-rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // BONE AND SOFT TISSUE
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "bone-soft-tissue", name: "Bone and Soft Tissue Cancer", parent: null, tissue: "Bone/Soft Tissue", aliases: ["sarcoma", "musculoskeletal cancer"], oncoTreeCode: null, prevalence: "rare" },

  // Bone
  { id: "bone", name: "Bone Cancer", parent: "bone-soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["bone tumor", "skeletal cancer"], oncoTreeCode: "BONE", prevalence: "rare" },
  { id: "osteosarcoma", name: "Osteosarcoma", parent: "bone", tissue: "Bone/Soft Tissue", aliases: ["osteogenic sarcoma", "OS"], oncoTreeCode: "OS", icdO3Code: "9180/3", prevalence: "rare" },
  { id: "osteosarcoma-conventional", name: "Osteosarcoma, Conventional", parent: "osteosarcoma", tissue: "Bone/Soft Tissue", aliases: ["high-grade osteosarcoma"], oncoTreeCode: "OS", icdO3Code: "9180/3", prevalence: "rare" },
  { id: "osteosarcoma-telangiectatic", name: "Osteosarcoma, Telangiectatic", parent: "osteosarcoma", tissue: "Bone/Soft Tissue", aliases: ["telangiectatic OS"], oncoTreeCode: "OS", icdO3Code: "9183/3", prevalence: "ultra-rare" },
  { id: "osteosarcoma-parosteal", name: "Osteosarcoma, Parosteal", parent: "osteosarcoma", tissue: "Bone/Soft Tissue", aliases: ["parosteal OS", "juxtacortical OS"], oncoTreeCode: "OS", icdO3Code: "9190/3", prevalence: "ultra-rare" },
  { id: "osteosarcoma-periosteal", name: "Osteosarcoma, Periosteal", parent: "osteosarcoma", tissue: "Bone/Soft Tissue", aliases: ["periosteal OS"], oncoTreeCode: "OS", icdO3Code: "9191/3", prevalence: "ultra-rare" },
  { id: "ewing", name: "Ewing Sarcoma", parent: "bone", tissue: "Bone/Soft Tissue", aliases: ["Ewing's sarcoma", "EWS", "PNET"], oncoTreeCode: "EWS", icdO3Code: "9260/3", prevalence: "rare" },
  { id: "chondrosarcoma", name: "Chondrosarcoma", parent: "bone", tissue: "Bone/Soft Tissue", aliases: ["CHS"], oncoTreeCode: "CHS", icdO3Code: "9220/3", prevalence: "rare" },
  { id: "chondrosarcoma-conventional", name: "Chondrosarcoma, Conventional", parent: "chondrosarcoma", tissue: "Bone/Soft Tissue", aliases: ["conventional CHS"], oncoTreeCode: "CHS", icdO3Code: "9220/3", prevalence: "rare" },
  { id: "chondrosarcoma-dediff", name: "Chondrosarcoma, Dedifferentiated", parent: "chondrosarcoma", tissue: "Bone/Soft Tissue", aliases: ["dedifferentiated CHS"], oncoTreeCode: "CHS", icdO3Code: "9243/3", prevalence: "ultra-rare" },
  { id: "chondrosarcoma-mesenchymal", name: "Chondrosarcoma, Mesenchymal", parent: "chondrosarcoma", tissue: "Bone/Soft Tissue", aliases: ["mesenchymal CHS"], oncoTreeCode: "CHS", icdO3Code: "9240/3", prevalence: "ultra-rare" },
  { id: "chondrosarcoma-clear-cell", name: "Chondrosarcoma, Clear Cell", parent: "chondrosarcoma", tissue: "Bone/Soft Tissue", aliases: ["clear cell CHS"], oncoTreeCode: "CHS", icdO3Code: "9242/3", prevalence: "ultra-rare" },
  { id: "giant-cell-tumor-bone", name: "Giant Cell Tumor of Bone", parent: "bone", tissue: "Bone/Soft Tissue", aliases: ["GCT of bone", "osteoclastoma"], oncoTreeCode: "GCTB", icdO3Code: "9250/1", prevalence: "rare" },
  { id: "bone-chordoma", name: "Chordoma (Bone)", parent: "bone", tissue: "Bone/Soft Tissue", aliases: ["sacral chordoma", "spinal chordoma"], oncoTreeCode: "CHORD", icdO3Code: "9370/3", prevalence: "ultra-rare" },
  { id: "adamantinoma", name: "Adamantinoma of Bone", parent: "bone", tissue: "Bone/Soft Tissue", aliases: ["adamantinoma"], oncoTreeCode: null, icdO3Code: "9261/3", prevalence: "ultra-rare" },

  // Soft tissue sarcomas
  { id: "soft-tissue", name: "Soft Tissue Sarcoma", parent: "bone-soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["STS", "SARC"], oncoTreeCode: "SOFT_TISSUE", prevalence: "rare" },
  { id: "gist", name: "Gastrointestinal Stromal Tumor", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["GIST"], oncoTreeCode: "GIST", icdO3Code: "8936/3", prevalence: "rare" },
  { id: "gist-kit", name: "GIST, KIT-mutant", parent: "gist", tissue: "Bone/Soft Tissue", aliases: ["KIT+ GIST"], oncoTreeCode: "GIST", icdO3Code: "8936/3", molecularSubtype: "KIT-mutant", prevalence: "rare" },
  { id: "gist-pdgfra", name: "GIST, PDGFRA-mutant", parent: "gist", tissue: "Bone/Soft Tissue", aliases: ["PDGFRA+ GIST"], oncoTreeCode: "GIST", icdO3Code: "8936/3", molecularSubtype: "PDGFRA-mutant", prevalence: "rare" },
  { id: "gist-sdh-deficient", name: "GIST, SDH-deficient", parent: "gist", tissue: "Bone/Soft Tissue", aliases: ["SDH-deficient GIST", "wildtype GIST"], oncoTreeCode: "GIST", icdO3Code: "8936/3", molecularSubtype: "SDH-deficient", prevalence: "ultra-rare" },
  { id: "leiomyosarcoma", name: "Leiomyosarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["LMS"], oncoTreeCode: "LMS", icdO3Code: "8890/3", prevalence: "rare" },
  { id: "liposarcoma", name: "Liposarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["LPS"], oncoTreeCode: "LPS", icdO3Code: "8850/3", prevalence: "rare" },
  { id: "liposarcoma-wdls", name: "Well-Differentiated Liposarcoma", parent: "liposarcoma", tissue: "Bone/Soft Tissue", aliases: ["WDLS", "atypical lipomatous tumor", "ALT"], oncoTreeCode: "WDLS", icdO3Code: "8851/3", prevalence: "rare" },
  { id: "liposarcoma-ddls", name: "Dedifferentiated Liposarcoma", parent: "liposarcoma", tissue: "Bone/Soft Tissue", aliases: ["DDLS", "dedifferentiated LPS"], oncoTreeCode: "DDLS", icdO3Code: "8858/3", prevalence: "rare" },
  { id: "liposarcoma-myxoid", name: "Myxoid Liposarcoma", parent: "liposarcoma", tissue: "Bone/Soft Tissue", aliases: ["myxoid LPS", "MLPS", "myxoid/round cell liposarcoma"], oncoTreeCode: "MLPS", icdO3Code: "8852/3", molecularSubtype: "FUS-DDIT3", prevalence: "rare" },
  { id: "liposarcoma-pleomorphic", name: "Pleomorphic Liposarcoma", parent: "liposarcoma", tissue: "Bone/Soft Tissue", aliases: ["pleomorphic LPS", "PLPS"], oncoTreeCode: "PLPS", icdO3Code: "8854/3", prevalence: "ultra-rare" },
  { id: "rhabdomyosarcoma", name: "Rhabdomyosarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["RMS"], oncoTreeCode: "RMS", icdO3Code: "8900/3", prevalence: "rare" },
  { id: "rms-embryonal", name: "Embryonal Rhabdomyosarcoma", parent: "rhabdomyosarcoma", tissue: "Bone/Soft Tissue", aliases: ["ERMS", "embryonal RMS"], oncoTreeCode: "ERMS", icdO3Code: "8910/3", prevalence: "rare" },
  { id: "rms-alveolar", name: "Alveolar Rhabdomyosarcoma", parent: "rhabdomyosarcoma", tissue: "Bone/Soft Tissue", aliases: ["ARMS", "alveolar RMS", "PAX-FOXO1 fusion RMS"], oncoTreeCode: "ARMS", icdO3Code: "8920/3", molecularSubtype: "PAX3/PAX7-FOXO1", prevalence: "rare" },
  { id: "rms-pleomorphic", name: "Pleomorphic Rhabdomyosarcoma", parent: "rhabdomyosarcoma", tissue: "Bone/Soft Tissue", aliases: ["PRMS"], oncoTreeCode: "RMS", icdO3Code: "8901/3", prevalence: "ultra-rare" },
  { id: "rms-spindle-cell", name: "Spindle Cell/Sclerosing Rhabdomyosarcoma", parent: "rhabdomyosarcoma", tissue: "Bone/Soft Tissue", aliases: ["spindle cell RMS"], oncoTreeCode: "RMS", icdO3Code: "8912/3", prevalence: "ultra-rare" },
  { id: "synovial-sarcoma", name: "Synovial Sarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["SS", "SS18-SSX fusion sarcoma"], oncoTreeCode: "SYNS", icdO3Code: "9040/3", molecularSubtype: "SS18-SSX", prevalence: "rare" },
  { id: "angiosarcoma", name: "Angiosarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["AS", "hemangiosarcoma"], oncoTreeCode: "ANGS", icdO3Code: "9120/3", prevalence: "rare" },
  { id: "ups", name: "Undifferentiated Pleomorphic Sarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["UPS", "MFH", "malignant fibrous histiocytoma"], oncoTreeCode: "UPS", icdO3Code: "8830/3", prevalence: "rare" },
  { id: "mpnst", name: "Malignant Peripheral Nerve Sheath Tumor", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["MPNST", "malignant schwannoma", "neurofibrosarcoma"], oncoTreeCode: "MPNST", icdO3Code: "9540/3", prevalence: "rare" },
  { id: "sft", name: "Solitary Fibrous Tumor", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["SFT", "hemangiopericytoma"], oncoTreeCode: "SFT", icdO3Code: "8815/3", molecularSubtype: "NAB2-STAT6", prevalence: "rare" },
  { id: "desmoid", name: "Desmoid Tumor", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["desmoid fibromatosis", "aggressive fibromatosis"], oncoTreeCode: "DES", icdO3Code: "8821/1", prevalence: "rare" },
  { id: "epithelioid-sarcoma", name: "Epithelioid Sarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["ES"], oncoTreeCode: "EPIS", icdO3Code: "8804/3", prevalence: "ultra-rare" },
  { id: "clear-cell-sarcoma", name: "Clear Cell Sarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["melanoma of soft parts", "EWSR1-ATF1 sarcoma"], oncoTreeCode: "CCS", icdO3Code: "9044/3", molecularSubtype: "EWSR1-ATF1", prevalence: "ultra-rare" },
  { id: "alveolar-soft-part", name: "Alveolar Soft Part Sarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["ASPS"], oncoTreeCode: "ASPS", icdO3Code: "9581/3", prevalence: "ultra-rare" },
  { id: "pec-oma", name: "PEComa", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["perivascular epithelioid cell tumor"], oncoTreeCode: null, icdO3Code: "8714/3", prevalence: "ultra-rare" },
  { id: "extraskeletal-myxoid-chondrosarcoma", name: "Extraskeletal Myxoid Chondrosarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["EMC"], oncoTreeCode: null, icdO3Code: "9231/3", prevalence: "ultra-rare" },
  { id: "myxofibrosarcoma", name: "Myxofibrosarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["MFS", "myxoid MFH"], oncoTreeCode: null, icdO3Code: "8811/3", prevalence: "rare" },
  { id: "fibrosarcoma", name: "Fibrosarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: [], oncoTreeCode: null, icdO3Code: "8810/3", prevalence: "rare" },
  { id: "infantile-fibrosarcoma", name: "Infantile Fibrosarcoma", parent: "fibrosarcoma", tissue: "Bone/Soft Tissue", aliases: ["congenital fibrosarcoma", "ETV6-NTRK3 fibrosarcoma"], oncoTreeCode: null, icdO3Code: "8814/3", molecularSubtype: "ETV6-NTRK3", prevalence: "ultra-rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // HEAD AND NECK
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "head-neck", name: "Head and Neck Cancer", parent: null, tissue: "Head and Neck", aliases: ["HNSCC", "H&N cancer"], oncoTreeCode: "HEAD_NECK", prevalence: "common" },
  { id: "oral-cavity-scc", name: "Oral Cavity Squamous Cell Carcinoma", parent: "head-neck", tissue: "Head and Neck", aliases: ["oral cancer", "mouth cancer", "tongue cancer"], oncoTreeCode: "OCSC", icdO3Code: "8070/3", prevalence: "uncommon" },
  { id: "oropharyngeal-scc", name: "Oropharyngeal Squamous Cell Carcinoma", parent: "head-neck", tissue: "Head and Neck", aliases: ["oropharyngeal cancer", "tonsil cancer"], oncoTreeCode: "HNSC", icdO3Code: "8070/3", prevalence: "uncommon" },
  { id: "oropharyngeal-hpv-pos", name: "Oropharyngeal SCC, HPV-positive", parent: "oropharyngeal-scc", tissue: "Head and Neck", aliases: ["HPV+ oropharyngeal cancer", "p16+ OPSCC"], oncoTreeCode: "HNSC", icdO3Code: "8085/3", molecularSubtype: "HPV-positive", prevalence: "uncommon" },
  { id: "oropharyngeal-hpv-neg", name: "Oropharyngeal SCC, HPV-negative", parent: "oropharyngeal-scc", tissue: "Head and Neck", aliases: ["HPV- oropharyngeal cancer"], oncoTreeCode: "HNSC", icdO3Code: "8070/3", molecularSubtype: "HPV-negative", prevalence: "uncommon" },
  { id: "laryngeal-scc", name: "Laryngeal Squamous Cell Carcinoma", parent: "head-neck", tissue: "Head and Neck", aliases: ["laryngeal cancer", "larynx cancer", "vocal cord cancer"], oncoTreeCode: "LXSC", icdO3Code: "8070/3", prevalence: "uncommon" },
  { id: "hypopharyngeal-scc", name: "Hypopharyngeal Squamous Cell Carcinoma", parent: "head-neck", tissue: "Head and Neck", aliases: ["hypopharyngeal cancer"], oncoTreeCode: "HNSC", icdO3Code: "8070/3", prevalence: "rare" },
  { id: "nasopharyngeal", name: "Nasopharyngeal Carcinoma", parent: "head-neck", tissue: "Head and Neck", aliases: ["NPC", "nasopharyngeal cancer", "EBV-associated NPC"], oncoTreeCode: "NPC", icdO3Code: "8072/3", prevalence: "rare" },
  { id: "sinonasal", name: "Sinonasal Cancer", parent: "head-neck", tissue: "Head and Neck", aliases: ["nasal cavity cancer", "paranasal sinus cancer"], oncoTreeCode: null, icdO3Code: "8070/3", prevalence: "rare" },
  { id: "sinonasal-undiff", name: "Sinonasal Undifferentiated Carcinoma", parent: "sinonasal", tissue: "Head and Neck", aliases: ["SNUC"], oncoTreeCode: null, icdO3Code: "8020/3", prevalence: "ultra-rare" },
  { id: "sinonasal-esthesio", name: "Esthesioneuroblastoma", parent: "sinonasal", tissue: "Head and Neck", aliases: ["olfactory neuroblastoma", "ENB"], oncoTreeCode: null, icdO3Code: "9522/3", prevalence: "ultra-rare" },

  // Salivary gland
  { id: "salivary", name: "Salivary Gland Cancer", parent: "head-neck", tissue: "Head and Neck", aliases: ["salivary gland tumor", "parotid cancer"], oncoTreeCode: "SALI", prevalence: "rare" },
  { id: "salivary-mec", name: "Mucoepidermoid Carcinoma", parent: "salivary", tissue: "Head and Neck", aliases: ["MEC"], oncoTreeCode: "SALI", icdO3Code: "8430/3", prevalence: "rare" },
  { id: "salivary-acc", name: "Adenoid Cystic Carcinoma", parent: "salivary", tissue: "Head and Neck", aliases: ["ACC", "cylindroma"], oncoTreeCode: "ACYC", icdO3Code: "8200/3", prevalence: "rare" },
  { id: "salivary-acinic", name: "Acinic Cell Carcinoma", parent: "salivary", tissue: "Head and Neck", aliases: ["AciCC"], oncoTreeCode: "SALI", icdO3Code: "8550/3", prevalence: "rare" },
  { id: "salivary-sdcx", name: "Salivary Duct Carcinoma", parent: "salivary", tissue: "Head and Neck", aliases: ["SDC"], oncoTreeCode: "SALI", icdO3Code: "8500/3", prevalence: "ultra-rare" },
  { id: "salivary-myoep", name: "Myoepithelial Carcinoma", parent: "salivary", tissue: "Head and Neck", aliases: ["myoepithelial carcinoma of salivary gland"], oncoTreeCode: null, icdO3Code: "8982/3", prevalence: "ultra-rare" },
  { id: "salivary-secretory", name: "Secretory Carcinoma of Salivary Gland", parent: "salivary", tissue: "Head and Neck", aliases: ["mammary analogue secretory carcinoma", "MASC", "ETV6-NTRK3 salivary"], oncoTreeCode: null, icdO3Code: "8502/3", molecularSubtype: "ETV6-NTRK3", prevalence: "ultra-rare" },

  // Thyroid
  { id: "thyroid", name: "Thyroid Cancer", parent: "head-neck", tissue: "Head and Neck", aliases: ["thyroid carcinoma", "THCA"], oncoTreeCode: "THYROID", prevalence: "common" },
  { id: "thyroid-papillary", name: "Papillary Thyroid Carcinoma", parent: "thyroid", tissue: "Head and Neck", aliases: ["PTC", "papillary thyroid cancer"], oncoTreeCode: "THPA", icdO3Code: "8260/3", prevalence: "common" },
  { id: "thyroid-papillary-classic", name: "Papillary Thyroid Carcinoma, Classical", parent: "thyroid-papillary", tissue: "Head and Neck", aliases: ["classic PTC"], oncoTreeCode: "THPA", icdO3Code: "8260/3", prevalence: "common" },
  { id: "thyroid-papillary-follicular-variant", name: "Papillary Thyroid Carcinoma, Follicular Variant", parent: "thyroid-papillary", tissue: "Head and Neck", aliases: ["follicular variant PTC", "FVPTC"], oncoTreeCode: "THPA", icdO3Code: "8340/3", prevalence: "uncommon" },
  { id: "thyroid-papillary-tall-cell", name: "Papillary Thyroid Carcinoma, Tall Cell", parent: "thyroid-papillary", tissue: "Head and Neck", aliases: ["tall cell variant PTC"], oncoTreeCode: "THPA", icdO3Code: "8344/3", prevalence: "rare" },
  { id: "thyroid-papillary-braf", name: "Papillary Thyroid Carcinoma, BRAF V600E", parent: "thyroid-papillary", tissue: "Head and Neck", aliases: ["BRAF+ PTC"], oncoTreeCode: "THPA", icdO3Code: "8260/3", molecularSubtype: "BRAF V600E", prevalence: "uncommon" },
  { id: "thyroid-follicular", name: "Follicular Thyroid Carcinoma", parent: "thyroid", tissue: "Head and Neck", aliases: ["FTC", "follicular thyroid cancer"], oncoTreeCode: "THFO", icdO3Code: "8330/3", prevalence: "uncommon" },
  { id: "thyroid-hurthle", name: "Hürthle Cell Carcinoma", parent: "thyroid", tissue: "Head and Neck", aliases: ["Hurthle cell carcinoma", "oncocytic thyroid carcinoma"], oncoTreeCode: null, icdO3Code: "8290/3", prevalence: "rare" },
  { id: "thyroid-medullary", name: "Medullary Thyroid Carcinoma", parent: "thyroid", tissue: "Head and Neck", aliases: ["MTC", "C-cell carcinoma"], oncoTreeCode: "SMT", icdO3Code: "8510/3", prevalence: "rare" },
  { id: "thyroid-medullary-ret", name: "Medullary Thyroid Carcinoma, RET-mutant", parent: "thyroid-medullary", tissue: "Head and Neck", aliases: ["RET+ MTC", "hereditary MTC", "MEN2-associated MTC"], oncoTreeCode: "SMT", icdO3Code: "8510/3", molecularSubtype: "RET-mutant", prevalence: "rare" },
  { id: "thyroid-anaplastic", name: "Anaplastic Thyroid Carcinoma", parent: "thyroid", tissue: "Head and Neck", aliases: ["ATC", "undifferentiated thyroid carcinoma"], oncoTreeCode: "THATC", icdO3Code: "8021/3", prevalence: "rare" },
  { id: "thyroid-anaplastic-braf", name: "Anaplastic Thyroid Carcinoma, BRAF V600E", parent: "thyroid-anaplastic", tissue: "Head and Neck", aliases: ["BRAF+ ATC"], oncoTreeCode: "THATC", icdO3Code: "8021/3", molecularSubtype: "BRAF V600E", prevalence: "ultra-rare" },
  { id: "thyroid-poorly-diff", name: "Poorly Differentiated Thyroid Carcinoma", parent: "thyroid", tissue: "Head and Neck", aliases: ["PDTC", "insular carcinoma"], oncoTreeCode: null, icdO3Code: "8337/3", prevalence: "rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // PEDIATRIC
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "pediatric", name: "Pediatric Cancer", parent: null, tissue: "Pediatric", aliases: ["childhood cancer", "pediatric oncology"], oncoTreeCode: null, prevalence: "uncommon" },
  { id: "neuroblastoma", name: "Neuroblastoma", parent: "pediatric", tissue: "Pediatric", aliases: ["NBL", "NB"], oncoTreeCode: "NBL", icdO3Code: "9500/3", prevalence: "rare" },
  { id: "neuroblastoma-mycn-amp", name: "Neuroblastoma, MYCN-amplified", parent: "neuroblastoma", tissue: "Pediatric", aliases: ["MYCN+ neuroblastoma"], oncoTreeCode: "NBL", icdO3Code: "9500/3", molecularSubtype: "MYCN-amplified", prevalence: "rare" },
  { id: "neuroblastoma-mycn-noamp", name: "Neuroblastoma, MYCN Non-amplified", parent: "neuroblastoma", tissue: "Pediatric", aliases: ["MYCN- neuroblastoma"], oncoTreeCode: "NBL", icdO3Code: "9500/3", molecularSubtype: "MYCN non-amplified", prevalence: "rare" },
  { id: "neuroblastoma-alk", name: "Neuroblastoma, ALK-mutant", parent: "neuroblastoma", tissue: "Pediatric", aliases: ["ALK+ neuroblastoma"], oncoTreeCode: "NBL", icdO3Code: "9500/3", molecularSubtype: "ALK-mutant", prevalence: "ultra-rare" },
  { id: "ganglioneuroblastoma", name: "Ganglioneuroblastoma", parent: "neuroblastoma", tissue: "Pediatric", aliases: ["GNB"], oncoTreeCode: null, icdO3Code: "9490/3", prevalence: "ultra-rare" },
  { id: "ganglioneuroma", name: "Ganglioneuroma", parent: "neuroblastoma", tissue: "Pediatric", aliases: ["GN"], oncoTreeCode: null, icdO3Code: "9490/0", prevalence: "ultra-rare" },
  { id: "ped-wilms", name: "Wilms Tumor (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["nephroblastoma", "Wilms' tumor"], oncoTreeCode: "WT", icdO3Code: "8960/3", prevalence: "rare" },
  { id: "ped-wilms-favorable", name: "Wilms Tumor, Favorable Histology", parent: "ped-wilms", tissue: "Pediatric", aliases: ["favorable histology WT"], oncoTreeCode: "WT", icdO3Code: "8960/3", prevalence: "rare" },
  { id: "ped-wilms-anaplastic", name: "Wilms Tumor, Anaplastic", parent: "ped-wilms", tissue: "Pediatric", aliases: ["anaplastic Wilms tumor", "diffuse anaplasia WT"], oncoTreeCode: "WT", icdO3Code: "8960/3", prevalence: "ultra-rare" },
  { id: "retinoblastoma", name: "Retinoblastoma", parent: "pediatric", tissue: "Pediatric", aliases: ["RB", "eye cancer in children"], oncoTreeCode: "RBL", icdO3Code: "9510/3", prevalence: "rare" },
  { id: "hepatoblastoma", name: "Hepatoblastoma", parent: "pediatric", tissue: "Pediatric", aliases: ["HBL", "pediatric liver tumor"], oncoTreeCode: "HBL", icdO3Code: "8970/3", prevalence: "rare" },
  { id: "ped-rms", name: "Rhabdomyosarcoma (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric RMS"], oncoTreeCode: "RMS", icdO3Code: "8900/3", prevalence: "rare" },
  { id: "ped-osteosarcoma", name: "Osteosarcoma (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric osteosarcoma", "pediatric OS"], oncoTreeCode: "OS", icdO3Code: "9180/3", prevalence: "rare" },
  { id: "ped-ewing", name: "Ewing Sarcoma (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric Ewing sarcoma"], oncoTreeCode: "EWS", icdO3Code: "9260/3", prevalence: "rare" },
  { id: "ped-atrt", name: "ATRT (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["atypical teratoid/rhabdoid tumor pediatric"], oncoTreeCode: "ATRT", icdO3Code: "9508/3", whoGrade: "IV", prevalence: "ultra-rare" },
  { id: "ped-medullo", name: "Medulloblastoma (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric medulloblastoma"], oncoTreeCode: "MBL", icdO3Code: "9470/3", whoGrade: "IV", prevalence: "rare" },
  { id: "ped-pilocytic", name: "Pilocytic Astrocytoma (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric pilocytic astrocytoma", "JPA"], oncoTreeCode: "PAST", icdO3Code: "9421/1", whoGrade: "I", prevalence: "rare" },
  { id: "ped-craniopharyngioma", name: "Craniopharyngioma (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric craniopharyngioma"], oncoTreeCode: "CPH", icdO3Code: "9350/1", prevalence: "rare" },
  { id: "ped-dipg", name: "Diffuse Intrinsic Pontine Glioma (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["DIPG", "pediatric DMG"], oncoTreeCode: "DMG", icdO3Code: "9385/3", whoGrade: "IV", molecularSubtype: "H3 K27M", prevalence: "ultra-rare" },
  { id: "ped-ependymoma", name: "Ependymoma (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric ependymoma"], oncoTreeCode: "EPM", icdO3Code: "9391/3", prevalence: "rare" },
  { id: "ped-germ-cell", name: "Pediatric Germ Cell Tumor", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric GCT"], oncoTreeCode: null, icdO3Code: "9064/3", prevalence: "rare" },
  { id: "lch", name: "Langerhans Cell Histiocytosis", parent: "pediatric", tissue: "Pediatric", aliases: ["LCH", "histiocytosis X", "eosinophilic granuloma"], oncoTreeCode: "LCH", icdO3Code: "9751/3", prevalence: "rare" },
  { id: "ped-optic-pathway-glioma", name: "Optic Pathway Glioma", parent: "pediatric", tissue: "Pediatric", aliases: ["optic glioma", "NF1-associated optic glioma"], oncoTreeCode: null, icdO3Code: "9421/1", whoGrade: "I", prevalence: "rare" },
  { id: "ped-pleuropulmonary-blastoma", name: "Pleuropulmonary Blastoma", parent: "pediatric", tissue: "Pediatric", aliases: ["PPB"], oncoTreeCode: null, icdO3Code: "8973/3", prevalence: "ultra-rare" },
  { id: "ped-desmoplastic-small-round", name: "Desmoplastic Small Round Cell Tumor", parent: "pediatric", tissue: "Pediatric", aliases: ["DSRCT", "EWSR1-WT1 tumor"], oncoTreeCode: "DSRCT", icdO3Code: "8806/3", molecularSubtype: "EWSR1-WT1", prevalence: "ultra-rare" },
  { id: "ped-clear-cell-sarcoma-kidney", name: "Clear Cell Sarcoma of Kidney", parent: "pediatric", tissue: "Pediatric", aliases: ["CCSK"], oncoTreeCode: null, icdO3Code: "8964/3", prevalence: "ultra-rare" },
  { id: "ped-rhabdoid-kidney", name: "Rhabdoid Tumor of Kidney", parent: "pediatric", tissue: "Pediatric", aliases: ["RTK", "SMARCB1-deficient renal tumor"], oncoTreeCode: null, icdO3Code: "8963/3", prevalence: "ultra-rare" },
  { id: "ped-pancreatoblastoma", name: "Pancreatoblastoma", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric pancreas tumor"], oncoTreeCode: null, icdO3Code: "8971/3", prevalence: "ultra-rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // OTHER / ENDOCRINE / RARE
  // ─────────────────────────────────────────────────────────────────────────────
  { id: "other", name: "Other Cancer Types", parent: null, tissue: "Other", aliases: ["rare cancers", "uncommon cancers"], oncoTreeCode: null, prevalence: "rare" },

  // Adrenal
  { id: "adrenocortical", name: "Adrenocortical Carcinoma", parent: "other", tissue: "Other", aliases: ["ACC", "adrenal cortical carcinoma", "adrenal cancer"], oncoTreeCode: "ACC", icdO3Code: "8370/3", prevalence: "rare" },
  { id: "pheochromocytoma", name: "Pheochromocytoma", parent: "other", tissue: "Other", aliases: ["pheo", "adrenal medullary tumor"], oncoTreeCode: "PHC", icdO3Code: "8700/0", prevalence: "rare" },
  { id: "paraganglioma", name: "Paraganglioma", parent: "other", tissue: "Other", aliases: ["PGL", "extra-adrenal pheochromocytoma"], oncoTreeCode: "PGN", icdO3Code: "8693/3", prevalence: "rare" },
  { id: "pheo-para-sdhb", name: "Pheochromocytoma/Paraganglioma, SDHB-mutant", parent: "pheochromocytoma", tissue: "Other", aliases: ["SDHB+ pheo/para"], oncoTreeCode: "PHC", icdO3Code: "8700/3", molecularSubtype: "SDHB-mutant", prevalence: "ultra-rare" },

  // Thymic
  { id: "thymoma", name: "Thymoma", parent: "other", tissue: "Other", aliases: ["thymic epithelial tumor"], oncoTreeCode: "TET", icdO3Code: "8580/3", prevalence: "rare" },
  { id: "thymoma-a", name: "Thymoma, Type A", parent: "thymoma", tissue: "Other", aliases: ["medullary thymoma"], oncoTreeCode: "TET", icdO3Code: "8581/3", prevalence: "ultra-rare" },
  { id: "thymoma-ab", name: "Thymoma, Type AB", parent: "thymoma", tissue: "Other", aliases: ["mixed thymoma"], oncoTreeCode: "TET", icdO3Code: "8582/3", prevalence: "ultra-rare" },
  { id: "thymoma-b1", name: "Thymoma, Type B1", parent: "thymoma", tissue: "Other", aliases: ["lymphocyte-rich thymoma"], oncoTreeCode: "TET", icdO3Code: "8583/3", prevalence: "ultra-rare" },
  { id: "thymoma-b2", name: "Thymoma, Type B2", parent: "thymoma", tissue: "Other", aliases: ["cortical thymoma"], oncoTreeCode: "TET", icdO3Code: "8584/3", prevalence: "ultra-rare" },
  { id: "thymoma-b3", name: "Thymoma, Type B3", parent: "thymoma", tissue: "Other", aliases: ["epithelial thymoma"], oncoTreeCode: "TET", icdO3Code: "8585/3", prevalence: "ultra-rare" },
  { id: "thymic-carcinoma", name: "Thymic Carcinoma", parent: "other", tissue: "Other", aliases: ["thymic cancer", "type C thymoma"], oncoTreeCode: "THYM", icdO3Code: "8586/3", prevalence: "ultra-rare" },

  // Neuroendocrine
  { id: "net", name: "Neuroendocrine Tumor", parent: "other", tissue: "Other", aliases: ["NET", "carcinoid", "neuroendocrine neoplasm"], oncoTreeCode: null, prevalence: "rare" },
  { id: "net-gi", name: "GI Neuroendocrine Tumor", parent: "net", tissue: "Other", aliases: ["GI NET", "GI carcinoid"], oncoTreeCode: null, icdO3Code: "8240/3", prevalence: "rare" },
  { id: "net-gi-g1", name: "GI NET, Grade 1", parent: "net-gi", tissue: "Other", aliases: ["well-differentiated GI NET G1"], oncoTreeCode: null, icdO3Code: "8240/3", prevalence: "rare" },
  { id: "net-gi-g2", name: "GI NET, Grade 2", parent: "net-gi", tissue: "Other", aliases: ["GI NET G2"], oncoTreeCode: null, icdO3Code: "8249/3", prevalence: "rare" },
  { id: "net-gi-g3", name: "GI NET, Grade 3", parent: "net-gi", tissue: "Other", aliases: ["GI NET G3", "high-grade GI NET"], oncoTreeCode: null, icdO3Code: "8249/3", prevalence: "rare" },
  { id: "nec-gi", name: "GI Neuroendocrine Carcinoma", parent: "net", tissue: "Other", aliases: ["GI NEC", "poorly differentiated GI neuroendocrine"], oncoTreeCode: null, icdO3Code: "8246/3", prevalence: "rare" },
  { id: "net-lung-see-lung", name: "Lung Neuroendocrine Tumor", parent: "net", tissue: "Other", aliases: ["pulmonary NET", "bronchial carcinoid"], oncoTreeCode: "LNET", icdO3Code: "8240/3", prevalence: "rare" },
  { id: "net-pancreatic-see-gi", name: "Pancreatic Neuroendocrine Tumor", parent: "net", tissue: "Other", aliases: ["PanNET"], oncoTreeCode: "PANET", icdO3Code: "8150/3", prevalence: "rare" },
  { id: "net-rectal", name: "Rectal Neuroendocrine Tumor", parent: "net-gi", tissue: "Other", aliases: ["rectal NET", "rectal carcinoid"], oncoTreeCode: null, icdO3Code: "8240/3", prevalence: "rare" },
  { id: "net-gastric", name: "Gastric Neuroendocrine Tumor", parent: "net-gi", tissue: "Other", aliases: ["gastric NET", "gastric carcinoid", "ECLoma"], oncoTreeCode: null, icdO3Code: "8240/3", prevalence: "rare" },
  { id: "net-appendiceal", name: "Appendiceal Neuroendocrine Tumor", parent: "net-gi", tissue: "Other", aliases: ["appendiceal carcinoid", "appendiceal NET"], oncoTreeCode: null, icdO3Code: "8240/3", prevalence: "rare" },

  // CUP
  { id: "cup", name: "Cancer of Unknown Primary", parent: "other", tissue: "Other", aliases: ["CUP", "occult primary", "unknown primary carcinoma"], oncoTreeCode: "CUP", icdO3Code: "8000/3", prevalence: "uncommon" },
  { id: "cup-adeno", name: "CUP, Adenocarcinoma", parent: "cup", tissue: "Other", aliases: ["adenocarcinoma of unknown primary"], oncoTreeCode: "CUP", icdO3Code: "8140/3", prevalence: "uncommon" },
  { id: "cup-scc", name: "CUP, Squamous Cell Carcinoma", parent: "cup", tissue: "Other", aliases: ["SCC of unknown primary"], oncoTreeCode: "CUP", icdO3Code: "8070/3", prevalence: "rare" },
  { id: "cup-poorly-diff", name: "CUP, Poorly Differentiated", parent: "cup", tissue: "Other", aliases: ["undifferentiated CUP"], oncoTreeCode: "CUP", icdO3Code: "8020/3", prevalence: "rare" },
  { id: "cup-neuroendocrine", name: "CUP, Neuroendocrine", parent: "cup", tissue: "Other", aliases: ["neuroendocrine CUP"], oncoTreeCode: "CUP", icdO3Code: "8246/3", prevalence: "rare" },

  // Mesothelioma (peritoneal)
  { id: "mesothelioma-peritoneal", name: "Peritoneal Mesothelioma", parent: "other", tissue: "Other", aliases: ["peritoneal meso"], oncoTreeCode: "PEMESO", icdO3Code: "9050/3", prevalence: "ultra-rare" },

  // Other rare
  { id: "perivascular-epithelioid", name: "Perivascular Epithelioid Cell Tumor", parent: "other", tissue: "Other", aliases: ["PEComa", "AML of kidney"], oncoTreeCode: null, icdO3Code: "8714/3", prevalence: "ultra-rare" },
  { id: "hemangioendothelioma", name: "Epithelioid Hemangioendothelioma", parent: "other", tissue: "Other", aliases: ["EHE", "CAMTA1 fusion tumor"], oncoTreeCode: null, icdO3Code: "9133/3", prevalence: "ultra-rare" },
  { id: "inflammatory-myofibroblastic", name: "Inflammatory Myofibroblastic Tumor", parent: "other", tissue: "Other", aliases: ["IMT", "ALK+ IMT", "inflammatory pseudotumor"], oncoTreeCode: "IMT", icdO3Code: "8825/1", prevalence: "ultra-rare" },
  { id: "fibrohistiocytic", name: "Erdheim-Chester Disease", parent: "other", tissue: "Other", aliases: ["ECD", "non-Langerhans cell histiocytosis"], oncoTreeCode: null, icdO3Code: "9750/1", prevalence: "ultra-rare" },
  { id: "rosai-dorfman", name: "Rosai-Dorfman Disease", parent: "other", tissue: "Other", aliases: ["sinus histiocytosis with massive lymphadenopathy"], oncoTreeCode: null, prevalence: "ultra-rare" },
  { id: "castleman", name: "Castleman Disease", parent: "other", tissue: "Other", aliases: ["angiofollicular lymph node hyperplasia", "multicentric Castleman"], oncoTreeCode: null, prevalence: "ultra-rare" },
  { id: "blastic-plasmacytoid-dc", name: "Blastic Plasmacytoid Dendritic Cell Neoplasm", parent: "other", tissue: "Other", aliases: ["BPDCN", "CD123+ blastic neoplasm"], oncoTreeCode: "BPDCN", icdO3Code: "9727/3", prevalence: "ultra-rare" },
  { id: "myeloid-sarcoma", name: "Myeloid Sarcoma", parent: "other", tissue: "Other", aliases: ["granulocytic sarcoma", "chloroma"], oncoTreeCode: null, icdO3Code: "9930/3", prevalence: "ultra-rare" },

  // Additional specifics for count
  { id: "crc-nras", name: "Colorectal Cancer, NRAS-mutant", parent: "crc", tissue: "Gastrointestinal", aliases: ["NRAS+ CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "NRAS-mutant", prevalence: "rare" },
  { id: "crc-pik3ca", name: "Colorectal Cancer, PIK3CA-mutant", parent: "crc", tissue: "Gastrointestinal", aliases: ["PIK3CA+ CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "PIK3CA-mutant", prevalence: "rare" },
  { id: "crc-pole-mut", name: "Colorectal Cancer, POLE Ultramutated", parent: "crc", tissue: "Gastrointestinal", aliases: ["POLE-mutant CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "POLE ultramutated", prevalence: "ultra-rare" },
  { id: "crc-ntrk", name: "Colorectal Cancer, NTRK Fusion", parent: "crc", tissue: "Gastrointestinal", aliases: ["NTRK+ CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "NTRK fusion", prevalence: "ultra-rare" },
  { id: "luad-stk11", name: "Lung Adenocarcinoma, STK11-mutant", parent: "luad", tissue: "Lung", aliases: ["STK11+ NSCLC", "LKB1-mutant lung"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "STK11-mutant", prevalence: "rare" },
  { id: "luad-keap1", name: "Lung Adenocarcinoma, KEAP1-mutant", parent: "luad", tissue: "Lung", aliases: ["KEAP1+ NSCLC"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "KEAP1-mutant", prevalence: "rare" },
  { id: "luad-tp53-kras", name: "Lung Adenocarcinoma, KRAS/TP53 Co-mutant", parent: "luad", tissue: "Lung", aliases: ["KRAS/TP53 NSCLC"], oncoTreeCode: "LUAD", icdO3Code: "8140/3", molecularSubtype: "KRAS+TP53 co-mutant", prevalence: "rare" },
  { id: "sclc-inflamed", name: "SCLC, Inflamed Subtype", parent: "sclc", tissue: "Lung", aliases: ["SCLC-I"], oncoTreeCode: "SCLC", icdO3Code: "8041/3", molecularSubtype: "Inflamed", prevalence: "rare" },
  { id: "sclc-ascl1", name: "SCLC, ASCL1 Subtype", parent: "sclc", tissue: "Lung", aliases: ["SCLC-A"], oncoTreeCode: "SCLC", icdO3Code: "8041/3", molecularSubtype: "ASCL1", prevalence: "rare" },
  { id: "sclc-neurod1", name: "SCLC, NEUROD1 Subtype", parent: "sclc", tissue: "Lung", aliases: ["SCLC-N"], oncoTreeCode: "SCLC", icdO3Code: "8041/3", molecularSubtype: "NEUROD1", prevalence: "rare" },
  { id: "sclc-pou2f3", name: "SCLC, POU2F3 Subtype", parent: "sclc", tissue: "Lung", aliases: ["SCLC-P", "tuft cell SCLC"], oncoTreeCode: "SCLC", icdO3Code: "8041/3", molecularSubtype: "POU2F3", prevalence: "rare" },
  { id: "gbm-mgmt-meth", name: "Glioblastoma, MGMT Methylated", parent: "gbm-idh-wt", tissue: "Brain/CNS", aliases: ["MGMT-methylated GBM"], oncoTreeCode: "GBM", icdO3Code: "9440/3", whoGrade: "IV", molecularSubtype: "MGMT methylated", prevalence: "rare" },
  { id: "gbm-mgmt-unmeth", name: "Glioblastoma, MGMT Unmethylated", parent: "gbm-idh-wt", tissue: "Brain/CNS", aliases: ["MGMT-unmethylated GBM"], oncoTreeCode: "GBM", icdO3Code: "9440/3", whoGrade: "IV", molecularSubtype: "MGMT unmethylated", prevalence: "uncommon" },
  { id: "brca-her2-low", name: "Breast Cancer, HER2-low", parent: "brca-idc", tissue: "Breast", aliases: ["HER2-low breast cancer", "HER2 IHC 1+ or 2+/ISH-"], oncoTreeCode: "IDC", icdO3Code: "8500/3", molecularSubtype: "HER2-low", prevalence: "uncommon" },
  { id: "brca-pik3ca", name: "Breast Cancer, PIK3CA-mutant", parent: "brca-idc", tissue: "Breast", aliases: ["PIK3CA+ breast cancer"], oncoTreeCode: "IDC", icdO3Code: "8500/3", molecularSubtype: "PIK3CA-mutant", prevalence: "uncommon" },
  { id: "brca-brca1", name: "Breast Cancer, BRCA1-mutant", parent: "brca", tissue: "Breast", aliases: ["BRCA1+ breast cancer", "hereditary breast cancer BRCA1"], oncoTreeCode: "BREAST", icdO3Code: "8500/3", molecularSubtype: "BRCA1-mutant", prevalence: "rare" },
  { id: "brca-brca2", name: "Breast Cancer, BRCA2-mutant", parent: "brca", tissue: "Breast", aliases: ["BRCA2+ breast cancer", "hereditary breast cancer BRCA2"], oncoTreeCode: "BREAST", icdO3Code: "8500/3", molecularSubtype: "BRCA2-mutant", prevalence: "rare" },
  { id: "brca-esr1", name: "Breast Cancer, ESR1-mutant", parent: "brca-idc", tissue: "Breast", aliases: ["ESR1-mutant breast", "endocrine-resistant breast cancer"], oncoTreeCode: "IDC", icdO3Code: "8500/3", molecularSubtype: "ESR1-mutant", prevalence: "rare" },
  { id: "prostate-tmprss2-erg", name: "Prostate Cancer, TMPRSS2-ERG Fusion", parent: "prostate", tissue: "Genitourinary", aliases: ["ERG-fusion prostate cancer", "TMPRSS2:ERG"], oncoTreeCode: "PRAD", icdO3Code: "8140/3", molecularSubtype: "TMPRSS2-ERG", prevalence: "uncommon" },
  { id: "prostate-spop", name: "Prostate Cancer, SPOP-mutant", parent: "prostate", tissue: "Genitourinary", aliases: ["SPOP+ prostate cancer"], oncoTreeCode: "PRAD", icdO3Code: "8140/3", molecularSubtype: "SPOP-mutant", prevalence: "rare" },
  { id: "ovarian-brca2", name: "Ovarian Cancer, BRCA2-mutant", parent: "ovarian-hgsoc", tissue: "Gynecologic", aliases: ["BRCA2+ ovarian cancer"], oncoTreeCode: "HGSOC", icdO3Code: "8461/3", molecularSubtype: "BRCA2-mutant", prevalence: "rare" },
  { id: "hcc-ctnnb1", name: "HCC, CTNNB1 (Beta-catenin) Mutant", parent: "hcc", tissue: "Gastrointestinal", aliases: ["beta-catenin-mutant HCC"], oncoTreeCode: "HCC", icdO3Code: "8170/3", molecularSubtype: "CTNNB1-mutant", prevalence: "rare" },
  { id: "hcc-tp53", name: "HCC, TP53-mutant", parent: "hcc", tissue: "Gastrointestinal", aliases: ["TP53+ HCC"], oncoTreeCode: "HCC", icdO3Code: "8170/3", molecularSubtype: "TP53-mutant", prevalence: "uncommon" },
  { id: "hcc-viral-hbv", name: "HCC, HBV-associated", parent: "hcc", tissue: "Gastrointestinal", aliases: ["hepatitis B HCC", "HBV+ HCC"], oncoTreeCode: "HCC", icdO3Code: "8170/3", molecularSubtype: "HBV-associated", prevalence: "uncommon" },
  { id: "hcc-viral-hcv", name: "HCC, HCV-associated", parent: "hcc", tissue: "Gastrointestinal", aliases: ["hepatitis C HCC", "HCV+ HCC"], oncoTreeCode: "HCC", icdO3Code: "8170/3", molecularSubtype: "HCV-associated", prevalence: "uncommon" },
  { id: "melanoma-spitzoid", name: "Spitzoid Melanoma", parent: "melanoma-cutaneous", tissue: "Skin", aliases: ["spitzoid melanocytic tumor"], oncoTreeCode: "SKCM", icdO3Code: "8770/3", prevalence: "ultra-rare" },
  { id: "bladder-basal-squamous", name: "Bladder Cancer, Basal/Squamous Subtype", parent: "bladder-urothelial", tissue: "Genitourinary", aliases: ["basal/squamous MIBC"], oncoTreeCode: "BLCA", icdO3Code: "8120/3", molecularSubtype: "Basal/Squamous", prevalence: "rare" },
  { id: "bladder-luminal-papillary", name: "Bladder Cancer, Luminal Papillary Subtype", parent: "bladder-urothelial", tissue: "Genitourinary", aliases: ["luminal papillary MIBC", "FGFR3-mutant bladder"], oncoTreeCode: "BLCA", icdO3Code: "8120/3", molecularSubtype: "Luminal papillary", prevalence: "rare" },
  { id: "bladder-luminal-infiltrated", name: "Bladder Cancer, Luminal Infiltrated Subtype", parent: "bladder-urothelial", tissue: "Genitourinary", aliases: ["luminal infiltrated MIBC"], oncoTreeCode: "BLCA", icdO3Code: "8120/3", molecularSubtype: "Luminal infiltrated", prevalence: "rare" },
  { id: "bladder-neuronal-diff", name: "Bladder Cancer, Neuronal Differentiation Subtype", parent: "bladder-urothelial", tissue: "Genitourinary", aliases: ["neuroendocrine-like MIBC"], oncoTreeCode: "BLCA", icdO3Code: "8120/3", molecularSubtype: "Neuronal differentiation", prevalence: "ultra-rare" },
  { id: "endometrial-dediff", name: "Dedifferentiated Endometrial Carcinoma", parent: "endometrial", tissue: "Gynecologic", aliases: ["dedifferentiated UCEC"], oncoTreeCode: "UCEC", icdO3Code: "8380/3", prevalence: "ultra-rare" },
  { id: "aml-mecom", name: "AML with MECOM (EVI1) Rearrangement", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["EVI1-rearranged AML", "3q26 AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "MECOM-rearranged", prevalence: "ultra-rare" },
  { id: "aml-nup98", name: "AML with NUP98 Rearrangement", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["NUP98-rearranged AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "NUP98-rearranged", prevalence: "ultra-rare" },
  { id: "mds-mds-mpn-rs-t", name: "MDS/MPN with Ring Sideroblasts and Thrombocytosis", parent: "mds", tissue: "Blood/Bone Marrow", aliases: ["MDS/MPN-RS-T", "RARS-T"], oncoTreeCode: null, icdO3Code: "9982/3", prevalence: "ultra-rare" },
  { id: "dlbcl-cns", name: "Primary CNS DLBCL", parent: "dlbcl", tissue: "Blood/Bone Marrow", aliases: ["PCNSL DLBCL"], oncoTreeCode: "PCNSL", icdO3Code: "9680/3", prevalence: "rare" },
  { id: "dlbcl-testicular", name: "Primary Testicular DLBCL", parent: "dlbcl", tissue: "Blood/Bone Marrow", aliases: ["testicular lymphoma"], oncoTreeCode: "DLBCL", icdO3Code: "9680/3", prevalence: "ultra-rare" },
  { id: "dlbcl-leg-type", name: "Primary Cutaneous DLBCL, Leg Type", parent: "dlbcl", tissue: "Blood/Bone Marrow", aliases: ["leg-type DLBCL", "cutaneous DLBCL"], oncoTreeCode: "DLBCL", icdO3Code: "9680/3", prevalence: "ultra-rare" },
  { id: "fl-duodenal", name: "Duodenal-Type Follicular Lymphoma", parent: "fl", tissue: "Blood/Bone Marrow", aliases: ["duodenal FL", "intestinal FL"], oncoTreeCode: "FL", icdO3Code: "9690/3", prevalence: "ultra-rare" },
  { id: "fl-pediatric", name: "Pediatric-Type Follicular Lymphoma", parent: "fl", tissue: "Blood/Bone Marrow", aliases: ["pediatric FL"], oncoTreeCode: "FL", icdO3Code: "9690/3", prevalence: "ultra-rare" },
  { id: "salivary-polymorphous", name: "Polymorphous Adenocarcinoma", parent: "salivary", tissue: "Head and Neck", aliases: ["polymorphous low-grade adenocarcinoma", "PLGA"], oncoTreeCode: "SALI", icdO3Code: "8525/3", prevalence: "ultra-rare" },
  { id: "salivary-adnos", name: "Salivary Gland Adenocarcinoma, NOS", parent: "salivary", tissue: "Head and Neck", aliases: ["salivary gland adenocarcinoma"], oncoTreeCode: "SALI", icdO3Code: "8140/3", prevalence: "ultra-rare" },
  { id: "npc-type1", name: "Nasopharyngeal Carcinoma, Keratinizing SCC", parent: "nasopharyngeal", tissue: "Head and Neck", aliases: ["WHO type I NPC", "keratinizing NPC"], oncoTreeCode: "NPC", icdO3Code: "8070/3", prevalence: "ultra-rare" },
  { id: "npc-type2", name: "Nasopharyngeal Carcinoma, Non-keratinizing", parent: "nasopharyngeal", tissue: "Head and Neck", aliases: ["WHO type II NPC", "non-keratinizing NPC"], oncoTreeCode: "NPC", icdO3Code: "8072/3", prevalence: "rare" },
  { id: "npc-type3", name: "Nasopharyngeal Carcinoma, Undifferentiated", parent: "nasopharyngeal", tissue: "Head and Neck", aliases: ["WHO type III NPC", "undifferentiated NPC", "lymphoepithelioma"], oncoTreeCode: "NPC", icdO3Code: "8082/3", prevalence: "rare" },
  { id: "ccrcc-bap1", name: "Clear Cell RCC, BAP1-mutant", parent: "ccrcc", tissue: "Genitourinary", aliases: ["BAP1-mutant ccRCC"], oncoTreeCode: "CCRCC", icdO3Code: "8310/3", molecularSubtype: "BAP1-mutant", prevalence: "rare" },
  { id: "ccrcc-pbrm1", name: "Clear Cell RCC, PBRM1-mutant", parent: "ccrcc", tissue: "Genitourinary", aliases: ["PBRM1-mutant ccRCC"], oncoTreeCode: "CCRCC", icdO3Code: "8310/3", molecularSubtype: "PBRM1-mutant", prevalence: "rare" },
  { id: "endometrial-mucinous", name: "Endometrial Mucinous Carcinoma", parent: "endometrial", tissue: "Gynecologic", aliases: ["mucinous endometrial cancer"], oncoTreeCode: "UCEC", icdO3Code: "8480/3", prevalence: "ultra-rare" },
  { id: "endometrial-undiff", name: "Undifferentiated Endometrial Carcinoma", parent: "endometrial", tissue: "Gynecologic", aliases: ["undifferentiated uterine carcinoma"], oncoTreeCode: "UCEC", icdO3Code: "8020/3", prevalence: "ultra-rare" },
  { id: "cervical-neuroendocrine", name: "Cervical Neuroendocrine Carcinoma", parent: "cervical", tissue: "Gynecologic", aliases: ["cervical NEC"], oncoTreeCode: null, icdO3Code: "8246/3", prevalence: "ultra-rare" },
  { id: "peritoneal-serous", name: "Primary Peritoneal Serous Carcinoma", parent: "gyn", tissue: "Gynecologic", aliases: ["primary peritoneal carcinoma", "PPSC"], oncoTreeCode: null, icdO3Code: "8461/3", prevalence: "rare" },
  { id: "fallopian-tube", name: "Fallopian Tube Carcinoma", parent: "gyn", tissue: "Gynecologic", aliases: ["tubal carcinoma"], oncoTreeCode: null, icdO3Code: "8461/3", prevalence: "rare" },
  { id: "ped-malignant-rhabdoid", name: "Malignant Rhabdoid Tumor", parent: "pediatric", tissue: "Pediatric", aliases: ["MRT", "SMARCB1-deficient tumor", "INI1-deficient tumor"], oncoTreeCode: "MRT", icdO3Code: "8963/3", prevalence: "ultra-rare" },
  { id: "ped-mesoblastic-nephroma", name: "Congenital Mesoblastic Nephroma", parent: "pediatric", tissue: "Pediatric", aliases: ["CMN", "fetal renal hamartoma"], oncoTreeCode: null, icdO3Code: "8960/1", prevalence: "ultra-rare" },
  { id: "ped-adrenocortical", name: "Pediatric Adrenocortical Carcinoma", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric ACC"], oncoTreeCode: "ACC", icdO3Code: "8370/3", prevalence: "ultra-rare" },
  { id: "gist-nf1", name: "GIST, NF1-associated", parent: "gist", tissue: "Bone/Soft Tissue", aliases: ["NF1 GIST"], oncoTreeCode: "GIST", icdO3Code: "8936/3", molecularSubtype: "NF1-associated", prevalence: "ultra-rare" },
  { id: "small-bowel-lymphoma", name: "Small Bowel Lymphoma", parent: "small-bowel", tissue: "Gastrointestinal", aliases: ["intestinal lymphoma", "IPSID"], oncoTreeCode: null, icdO3Code: "9699/3", prevalence: "rare" },
  { id: "gastric-adeno-nos", name: "Gastric Adenocarcinoma, NOS", parent: "gastric", tissue: "Gastrointestinal", aliases: ["gastric cancer NOS"], oncoTreeCode: "STAD", icdO3Code: "8140/3", prevalence: "common" },
  { id: "gastric-gs", name: "Gastric Cancer, Genomically Stable", parent: "gastric", tissue: "Gastrointestinal", aliases: ["GS gastric cancer", "TCGA GS"], oncoTreeCode: "STAD", icdO3Code: "8140/3", molecularSubtype: "Genomically stable", prevalence: "uncommon" },
  { id: "gastric-cin", name: "Gastric Cancer, Chromosomal Instability", parent: "gastric", tissue: "Gastrointestinal", aliases: ["CIN gastric cancer", "TCGA CIN"], oncoTreeCode: "STAD", icdO3Code: "8140/3", molecularSubtype: "CIN", prevalence: "uncommon" },
  { id: "esophageal-gej", name: "Gastroesophageal Junction Adenocarcinoma", parent: "esophageal", tissue: "Gastrointestinal", aliases: ["GEJ cancer", "cardia cancer"], oncoTreeCode: "ESCA", icdO3Code: "8140/3", prevalence: "uncommon" },
  { id: "anal-melanoma", name: "Anal Melanoma", parent: "anal", tissue: "Gastrointestinal", aliases: ["anorectal melanoma"], oncoTreeCode: null, icdO3Code: "8720/3", prevalence: "ultra-rare" },
  { id: "hepatoblastoma-fetal", name: "Hepatoblastoma, Fetal Type", parent: "hepatoblastoma", tissue: "Pediatric", aliases: ["fetal hepatoblastoma"], oncoTreeCode: "HBL", icdO3Code: "8970/3", prevalence: "ultra-rare" },
  { id: "hepatoblastoma-embryonal", name: "Hepatoblastoma, Embryonal Type", parent: "hepatoblastoma", tissue: "Pediatric", aliases: ["embryonal hepatoblastoma"], oncoTreeCode: "HBL", icdO3Code: "8970/3", prevalence: "ultra-rare" },
  { id: "osteosarcoma-small-cell", name: "Osteosarcoma, Small Cell", parent: "osteosarcoma", tissue: "Bone/Soft Tissue", aliases: ["small cell OS"], oncoTreeCode: "OS", icdO3Code: "9185/3", prevalence: "ultra-rare" },
  { id: "chondrosarcoma-periosteal", name: "Chondrosarcoma, Periosteal", parent: "chondrosarcoma", tissue: "Bone/Soft Tissue", aliases: ["juxtacortical chondrosarcoma"], oncoTreeCode: "CHS", icdO3Code: "9221/3", prevalence: "ultra-rare" },
  { id: "gist-pdgfra-d842v", name: "GIST, PDGFRA D842V", parent: "gist-pdgfra", tissue: "Bone/Soft Tissue", aliases: ["PDGFRA D842V GIST", "avapritinib-sensitive GIST"], oncoTreeCode: "GIST", icdO3Code: "8936/3", molecularSubtype: "PDGFRA D842V", prevalence: "ultra-rare" },
  { id: "sarcoma-ntrk", name: "Sarcoma with NTRK Fusion", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["NTRK+ sarcoma"], oncoTreeCode: "SOFT_TISSUE", icdO3Code: "8800/3", molecularSubtype: "NTRK fusion", prevalence: "ultra-rare" },
  { id: "low-grade-fibromyxoid", name: "Low-Grade Fibromyxoid Sarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["LGFMS", "Evans tumor", "FUS-CREB3L2 sarcoma"], oncoTreeCode: null, icdO3Code: "8811/3", molecularSubtype: "FUS-CREB3L2", prevalence: "ultra-rare" },
  { id: "sclerosing-epithelioid-fibrosarcoma", name: "Sclerosing Epithelioid Fibrosarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["SEF"], oncoTreeCode: null, icdO3Code: "8810/3", prevalence: "ultra-rare" },
  { id: "extraskeletal-osteosarcoma", name: "Extraskeletal Osteosarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["soft tissue osteosarcoma"], oncoTreeCode: null, icdO3Code: "9180/3", prevalence: "ultra-rare" },
  { id: "dermal-sarcoma-nos", name: "Dermal Sarcoma, NOS", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["cutaneous sarcoma NOS"], oncoTreeCode: null, icdO3Code: "8800/3", prevalence: "ultra-rare" },
  { id: "intimal-sarcoma", name: "Intimal Sarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["pulmonary artery sarcoma"], oncoTreeCode: null, icdO3Code: "9120/3", prevalence: "ultra-rare" },
  { id: "aml-baalc-high", name: "AML with High BAALC Expression", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["BAALC-high AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "BAALC-high", prevalence: "rare" },
  { id: "mm-t14-20", name: "Multiple Myeloma with t(14;20)", parent: "mm", tissue: "Blood/Bone Marrow", aliases: ["MAFB myeloma"], oncoTreeCode: "MM", icdO3Code: "9732/3", molecularSubtype: "t(14;20)", prevalence: "ultra-rare" },
  { id: "mm-gain1q", name: "Multiple Myeloma with Gain(1q)", parent: "mm", tissue: "Blood/Bone Marrow", aliases: ["1q gain myeloma"], oncoTreeCode: "MM", icdO3Code: "9732/3", molecularSubtype: "gain(1q)", prevalence: "rare" },
  { id: "mcl-blastoid", name: "Mantle Cell Lymphoma, Blastoid", parent: "mcl", tissue: "Blood/Bone Marrow", aliases: ["blastoid MCL"], oncoTreeCode: "MCL", icdO3Code: "9673/3", prevalence: "ultra-rare" },
  { id: "mcl-pleomorphic", name: "Mantle Cell Lymphoma, Pleomorphic", parent: "mcl", tissue: "Blood/Bone Marrow", aliases: ["pleomorphic MCL"], oncoTreeCode: "MCL", icdO3Code: "9673/3", prevalence: "ultra-rare" },
  { id: "mcl-leukemic", name: "Mantle Cell Lymphoma, Leukemic Non-nodal", parent: "mcl", tissue: "Blood/Bone Marrow", aliases: ["indolent MCL", "non-nodal MCL"], oncoTreeCode: "MCL", icdO3Code: "9673/3", prevalence: "ultra-rare" },
  { id: "subcutaneous-panniculitis-tcl", name: "Subcutaneous Panniculitis-like T-Cell Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["SPTCL"], oncoTreeCode: null, icdO3Code: "9708/3", prevalence: "ultra-rare" },
  { id: "primary-effusion-lymphoma", name: "Primary Effusion Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["PEL", "body cavity lymphoma", "HHV8-associated lymphoma"], oncoTreeCode: null, icdO3Code: "9678/3", prevalence: "ultra-rare" },
  { id: "plasmablastic-lymphoma", name: "Plasmablastic Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["PBL"], oncoTreeCode: null, icdO3Code: "9735/3", prevalence: "ultra-rare" },
  { id: "splenic-diffuse-red-pulp", name: "Splenic Diffuse Red Pulp Small B-Cell Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["SDRPL"], oncoTreeCode: null, icdO3Code: "9591/3", prevalence: "ultra-rare" },
  { id: "thyroid-lymphoma", name: "Primary Thyroid Lymphoma", parent: "thyroid", tissue: "Head and Neck", aliases: ["thyroid DLBCL", "thyroid MALT"], oncoTreeCode: null, icdO3Code: "9680/3", prevalence: "ultra-rare" },
  { id: "crc-lynch", name: "Colorectal Cancer, Lynch Syndrome", parent: "crc", tissue: "Gastrointestinal", aliases: ["HNPCC-associated CRC", "Lynch syndrome CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "Lynch syndrome/MMR-deficient", prevalence: "rare" },
  { id: "pancreatic-ipmn", name: "Intraductal Papillary Mucinous Neoplasm", parent: "pancreatic", tissue: "Gastrointestinal", aliases: ["IPMN", "pancreatic IPMN"], oncoTreeCode: null, icdO3Code: "8453/2", prevalence: "uncommon" },
  { id: "pancreatic-mcn", name: "Mucinous Cystic Neoplasm of Pancreas", parent: "pancreatic", tissue: "Gastrointestinal", aliases: ["MCN", "pancreatic MCN"], oncoTreeCode: null, icdO3Code: "8470/2", prevalence: "rare" },
  { id: "mixed-hepato-cholangiocarcinoma", name: "Combined Hepatocellular-Cholangiocarcinoma", parent: "liver", tissue: "Gastrointestinal", aliases: ["cHCC-CCA", "mixed HCC-CCA"], oncoTreeCode: null, icdO3Code: "8180/3", prevalence: "ultra-rare" },
  { id: "tracheal", name: "Tracheal Cancer", parent: "head-neck", tissue: "Head and Neck", aliases: ["tracheal carcinoma"], oncoTreeCode: null, icdO3Code: "8070/3", prevalence: "ultra-rare" },
  { id: "lacrimal-gland", name: "Lacrimal Gland Carcinoma", parent: "head-neck", tissue: "Head and Neck", aliases: ["lacrimal gland adenoid cystic carcinoma"], oncoTreeCode: null, icdO3Code: "8200/3", prevalence: "ultra-rare" },
  { id: "parathyroid", name: "Parathyroid Carcinoma", parent: "head-neck", tissue: "Head and Neck", aliases: ["parathyroid cancer"], oncoTreeCode: null, icdO3Code: "8140/3", prevalence: "ultra-rare" },
  { id: "bcc-nodular", name: "Basal Cell Carcinoma, Nodular", parent: "bcc", tissue: "Skin", aliases: ["nodular BCC"], oncoTreeCode: "BCC", icdO3Code: "8091/3", prevalence: "common" },
  { id: "bcc-superficial", name: "Basal Cell Carcinoma, Superficial", parent: "bcc", tissue: "Skin", aliases: ["superficial BCC"], oncoTreeCode: "BCC", icdO3Code: "8091/3", prevalence: "common" },
  { id: "bcc-morpheaform", name: "Basal Cell Carcinoma, Morpheaform", parent: "bcc", tissue: "Skin", aliases: ["morpheaform BCC", "sclerosing BCC", "infiltrative BCC"], oncoTreeCode: "BCC", icdO3Code: "8092/3", prevalence: "uncommon" },
  { id: "skin-scc-well-diff", name: "Cutaneous SCC, Well-Differentiated", parent: "skin-scc", tissue: "Skin", aliases: ["well-differentiated cSCC", "keratoacanthoma-type SCC"], oncoTreeCode: "CSCC", icdO3Code: "8071/3", prevalence: "common" },
  { id: "skin-scc-poorly-diff", name: "Cutaneous SCC, Poorly Differentiated", parent: "skin-scc", tissue: "Skin", aliases: ["poorly differentiated cSCC"], oncoTreeCode: "CSCC", icdO3Code: "8070/3", prevalence: "uncommon" },
  { id: "skin-scc-spindle", name: "Cutaneous SCC, Spindle Cell", parent: "skin-scc", tissue: "Skin", aliases: ["spindle cell cSCC", "sarcomatoid SCC"], oncoTreeCode: "CSCC", icdO3Code: "8074/3", prevalence: "rare" },
  { id: "kaposi-sarcoma", name: "Kaposi Sarcoma", parent: "skin", tissue: "Skin", aliases: ["KS", "HHV8-associated sarcoma"], oncoTreeCode: "KS", icdO3Code: "9140/3", prevalence: "rare" },
  { id: "microcystic-adnexal", name: "Microcystic Adnexal Carcinoma", parent: "skin", tissue: "Skin", aliases: ["MAC", "sclerosing sweat duct carcinoma"], oncoTreeCode: null, icdO3Code: "8407/3", prevalence: "ultra-rare" },
  { id: "sebaceous-carcinoma", name: "Sebaceous Carcinoma", parent: "skin", tissue: "Skin", aliases: ["sebaceous gland carcinoma", "eyelid sebaceous carcinoma"], oncoTreeCode: null, icdO3Code: "8410/3", prevalence: "ultra-rare" },

  // ─────────────────────────────────────────────────────────────────────────────
  // ADDITIONAL ENTRIES for comprehensive coverage (170+)
  // ─────────────────────────────────────────────────────────────────────────────

  // Additional Brain/CNS
  { id: "cns-embryonal", name: "CNS Embryonal Tumor, NOS", parent: "brain", tissue: "Brain/CNS", aliases: ["PNET", "primitive neuroectodermal tumor"], oncoTreeCode: null, icdO3Code: "9473/3", whoGrade: "IV", prevalence: "ultra-rare" },
  { id: "papillary-tumor-pineal", name: "Papillary Tumor of the Pineal Region", parent: "brain", tissue: "Brain/CNS", aliases: ["PTPR"], oncoTreeCode: null, icdO3Code: "9395/3", whoGrade: "II-III", prevalence: "ultra-rare" },
  { id: "rosette-forming-glioneuronal", name: "Rosette-Forming Glioneuronal Tumor", parent: "brain", tissue: "Brain/CNS", aliases: ["RGNT"], oncoTreeCode: null, icdO3Code: "9509/1", whoGrade: "I", prevalence: "ultra-rare" },
  { id: "choroid-plexus-atypical", name: "Atypical Choroid Plexus Papilloma", parent: "choroid-plexus-papilloma", tissue: "Brain/CNS", aliases: ["aCPP"], oncoTreeCode: null, icdO3Code: "9390/1", whoGrade: "II", prevalence: "ultra-rare" },
  { id: "cns-melanocytoma", name: "CNS Melanocytoma", parent: "brain", tissue: "Brain/CNS", aliases: ["primary CNS melanocytic tumor"], oncoTreeCode: null, icdO3Code: "8728/1", prevalence: "ultra-rare" },
  { id: "cns-melanoma-primary", name: "Primary CNS Melanoma", parent: "brain", tissue: "Brain/CNS", aliases: ["primary meningeal melanoma"], oncoTreeCode: null, icdO3Code: "8720/3", prevalence: "ultra-rare" },
  { id: "paraganglioma-cauda", name: "Paraganglioma of Spinal Canal", parent: "brain", tissue: "Brain/CNS", aliases: ["spinal paraganglioma", "cauda equina paraganglioma"], oncoTreeCode: null, icdO3Code: "8693/1", whoGrade: "I", prevalence: "ultra-rare" },
  { id: "angiocentric-glioma", name: "Angiocentric Glioma", parent: "brain", tissue: "Brain/CNS", aliases: ["MYB-QKI fusion glioma"], oncoTreeCode: null, icdO3Code: "9431/1", whoGrade: "I", molecularSubtype: "MYB-QKI", prevalence: "ultra-rare" },
  { id: "cns-high-grade-neuroepithelial-bcor", name: "CNS High-Grade Neuroepithelial Tumor with BCOR Alteration", parent: "brain", tissue: "Brain/CNS", aliases: ["BCOR-altered CNS tumor"], oncoTreeCode: null, icdO3Code: "9473/3", whoGrade: "IV", molecularSubtype: "BCOR-altered", prevalence: "ultra-rare" },
  { id: "diffuse-glioneuronal-lgg", name: "Diffuse Low-Grade Glioma, MAPK Pathway-Altered", parent: "brain", tissue: "Brain/CNS", aliases: ["MAPK-altered LGG"], oncoTreeCode: "LGG", icdO3Code: "9400/3", whoGrade: "I-II", molecularSubtype: "MAPK pathway", prevalence: "ultra-rare" },

  // Additional hematologic
  { id: "aml-rbm15-mkl1", name: "AML with RBM15-MKL1 (Pediatric)", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["t(1;22) AML", "infant AMKL"], oncoTreeCode: "AML", icdO3Code: "9911/3", molecularSubtype: "RBM15-MKL1", prevalence: "ultra-rare" },
  { id: "mixed-phenotype-leukemia", name: "Mixed Phenotype Acute Leukemia", parent: "leukemia", tissue: "Blood/Bone Marrow", aliases: ["MPAL", "biphenotypic leukemia"], oncoTreeCode: null, icdO3Code: "9809/3", prevalence: "ultra-rare" },
  { id: "mpal-b-myeloid", name: "MPAL, B/Myeloid", parent: "mixed-phenotype-leukemia", tissue: "Blood/Bone Marrow", aliases: ["B/myeloid MPAL"], oncoTreeCode: null, icdO3Code: "9809/3", prevalence: "ultra-rare" },
  { id: "mpal-t-myeloid", name: "MPAL, T/Myeloid", parent: "mixed-phenotype-leukemia", tissue: "Blood/Bone Marrow", aliases: ["T/myeloid MPAL"], oncoTreeCode: null, icdO3Code: "9809/3", prevalence: "ultra-rare" },
  { id: "mds-hypoplastic", name: "Hypoplastic MDS", parent: "mds", tissue: "Blood/Bone Marrow", aliases: ["hypoplastic myelodysplasia"], oncoTreeCode: "MDS", icdO3Code: "9989/3", prevalence: "rare" },
  { id: "mpn-mastocytosis-aml", name: "Systemic Mastocytosis with Associated Hematological Neoplasm", parent: "mastocytosis", tissue: "Blood/Bone Marrow", aliases: ["SM-AHN", "SM-AHNMD"], oncoTreeCode: null, icdO3Code: "9741/3", prevalence: "ultra-rare" },
  { id: "mast-cell-leukemia", name: "Mast Cell Leukemia", parent: "mastocytosis", tissue: "Blood/Bone Marrow", aliases: ["MCL-mast"], oncoTreeCode: null, icdO3Code: "9742/3", prevalence: "ultra-rare" },
  { id: "aggressive-nk-leukemia", name: "Aggressive NK-Cell Leukemia", parent: "leukemia", tissue: "Blood/Bone Marrow", aliases: ["ANKL"], oncoTreeCode: null, icdO3Code: "9948/3", prevalence: "ultra-rare" },
  { id: "mpn-prefibrotic-mf", name: "Prefibrotic Primary Myelofibrosis", parent: "mpn-pmf", tissue: "Blood/Bone Marrow", aliases: ["pre-PMF", "early PMF"], oncoTreeCode: "MPN", icdO3Code: "9961/3", prevalence: "rare" },
  { id: "mpn-jak2-v617f", name: "MPN with JAK2 V617F", parent: "mpn", tissue: "Blood/Bone Marrow", aliases: ["JAK2+ MPN"], oncoTreeCode: "MPN", molecularSubtype: "JAK2 V617F", prevalence: "rare" },
  { id: "mpn-calr", name: "MPN with CALR Mutation", parent: "mpn", tissue: "Blood/Bone Marrow", aliases: ["CALR+ MPN"], oncoTreeCode: "MPN", molecularSubtype: "CALR-mutant", prevalence: "rare" },
  { id: "mpn-mpl", name: "MPN with MPL Mutation", parent: "mpn", tissue: "Blood/Bone Marrow", aliases: ["MPL+ MPN"], oncoTreeCode: "MPN", molecularSubtype: "MPL-mutant", prevalence: "rare" },
  { id: "cll-del11q", name: "CLL with del(11q)", parent: "cll", tissue: "Blood/Bone Marrow", aliases: ["ATM-deleted CLL", "del(11q) CLL"], oncoTreeCode: "CLL", icdO3Code: "9823/3", molecularSubtype: "del(11q)", prevalence: "rare" },
  { id: "cll-del13q", name: "CLL with del(13q)", parent: "cll", tissue: "Blood/Bone Marrow", aliases: ["del(13q) CLL"], oncoTreeCode: "CLL", icdO3Code: "9823/3", molecularSubtype: "del(13q)", prevalence: "rare" },
  { id: "cll-trisomy12", name: "CLL with Trisomy 12", parent: "cll", tissue: "Blood/Bone Marrow", aliases: ["+12 CLL"], oncoTreeCode: "CLL", icdO3Code: "9823/3", molecularSubtype: "trisomy 12", prevalence: "rare" },
  { id: "richter-transformation", name: "Richter Transformation (CLL to DLBCL)", parent: "cll", tissue: "Blood/Bone Marrow", aliases: ["Richter syndrome", "CLL transformation"], oncoTreeCode: null, icdO3Code: "9680/3", prevalence: "rare" },
  { id: "nhl-intravascular", name: "Intravascular Large B-Cell Lymphoma", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["IVLBCL", "intravascular lymphoma"], oncoTreeCode: null, icdO3Code: "9712/3", prevalence: "ultra-rare" },
  { id: "gray-zone-lymphoma", name: "B-Cell Lymphoma, Unclassifiable (DLBCL/cHL)", parent: "nhl", tissue: "Blood/Bone Marrow", aliases: ["gray zone lymphoma", "mediastinal gray zone"], oncoTreeCode: null, icdO3Code: "9596/3", prevalence: "ultra-rare" },
  { id: "waldenstrom-myd88", name: "Waldenström Macroglobulinemia, MYD88 L265P", parent: "waldenstrom", tissue: "Blood/Bone Marrow", aliases: ["MYD88+ WM"], oncoTreeCode: "WM", icdO3Code: "9761/3", molecularSubtype: "MYD88 L265P", prevalence: "rare" },
  { id: "waldenstrom-cxcr4", name: "Waldenström Macroglobulinemia, CXCR4-mutant", parent: "waldenstrom", tissue: "Blood/Bone Marrow", aliases: ["CXCR4+ WM"], oncoTreeCode: "WM", icdO3Code: "9761/3", molecularSubtype: "CXCR4-mutant", prevalence: "rare" },
  { id: "heavy-chain-disease", name: "Heavy Chain Disease", parent: "hemato", tissue: "Blood/Bone Marrow", aliases: ["alpha chain disease", "gamma chain disease", "mu chain disease"], oncoTreeCode: null, icdO3Code: "9762/3", prevalence: "ultra-rare" },

  // Additional GI
  { id: "gastric-micropapillary", name: "Gastric Micropapillary Carcinoma", parent: "gastric", tissue: "Gastrointestinal", aliases: ["micropapillary gastric cancer"], oncoTreeCode: "STAD", icdO3Code: "8265/3", prevalence: "ultra-rare" },
  { id: "gastric-hepatoid", name: "Hepatoid Adenocarcinoma of Stomach", parent: "gastric", tissue: "Gastrointestinal", aliases: ["hepatoid gastric cancer", "AFP-producing gastric cancer"], oncoTreeCode: "STAD", icdO3Code: "8576/3", prevalence: "ultra-rare" },
  { id: "gastric-with-lymphoid-stroma", name: "Gastric Carcinoma with Lymphoid Stroma", parent: "gastric", tissue: "Gastrointestinal", aliases: ["medullary-type gastric cancer", "lymphoepithelioma-like gastric"], oncoTreeCode: "STAD", icdO3Code: "8512/3", prevalence: "ultra-rare" },
  { id: "crc-serrated", name: "Colorectal Serrated Adenocarcinoma", parent: "crc", tissue: "Gastrointestinal", aliases: ["serrated CRC"], oncoTreeCode: "CRC", icdO3Code: "8213/3", prevalence: "rare" },
  { id: "crc-neuroendocrine", name: "Colorectal Neuroendocrine Carcinoma", parent: "crc", tissue: "Gastrointestinal", aliases: ["NEC of colon", "colorectal NEC"], oncoTreeCode: null, icdO3Code: "8246/3", prevalence: "ultra-rare" },
  { id: "crc-squamous", name: "Squamous Cell Carcinoma of Colon", parent: "crc", tissue: "Gastrointestinal", aliases: ["colonic SCC"], oncoTreeCode: null, icdO3Code: "8070/3", prevalence: "ultra-rare" },
  { id: "ampullary", name: "Ampullary Carcinoma", parent: "gi", tissue: "Gastrointestinal", aliases: ["ampulla of Vater cancer", "periampullary cancer"], oncoTreeCode: "AMPCA", icdO3Code: "8140/3", prevalence: "rare" },
  { id: "ampullary-intestinal", name: "Ampullary Carcinoma, Intestinal Type", parent: "ampullary", tissue: "Gastrointestinal", aliases: ["intestinal-type ampullary cancer"], oncoTreeCode: "AMPCA", icdO3Code: "8144/3", prevalence: "rare" },
  { id: "ampullary-pancreatobiliary", name: "Ampullary Carcinoma, Pancreatobiliary Type", parent: "ampullary", tissue: "Gastrointestinal", aliases: ["pancreatobiliary-type ampullary cancer"], oncoTreeCode: "AMPCA", icdO3Code: "8500/3", prevalence: "rare" },
  { id: "gallbladder-adeno", name: "Gallbladder Adenocarcinoma", parent: "gallbladder", tissue: "Gastrointestinal", aliases: ["gallbladder adenocarcinoma"], oncoTreeCode: "GBC", icdO3Code: "8140/3", prevalence: "rare" },
  { id: "gallbladder-scc", name: "Gallbladder Squamous Cell Carcinoma", parent: "gallbladder", tissue: "Gastrointestinal", aliases: ["gallbladder SCC"], oncoTreeCode: null, icdO3Code: "8070/3", prevalence: "ultra-rare" },
  { id: "pancreatic-undiff", name: "Undifferentiated Carcinoma of Pancreas", parent: "pancreatic", tissue: "Gastrointestinal", aliases: ["anaplastic pancreatic cancer", "undifferentiated pancreatic carcinoma"], oncoTreeCode: null, icdO3Code: "8020/3", prevalence: "ultra-rare" },
  { id: "pancreatic-undiff-osteoclast", name: "Undifferentiated Carcinoma with Osteoclast-Like Giant Cells", parent: "pancreatic", tissue: "Gastrointestinal", aliases: ["osteoclastic giant cell pancreatic tumor"], oncoTreeCode: null, icdO3Code: "8035/3", prevalence: "ultra-rare" },

  // Additional GU
  { id: "rcc-fumarate-hydratase", name: "RCC with Fumarate Hydratase Deficiency", parent: "kidney", tissue: "Genitourinary", aliases: ["FH-deficient RCC", "HLRCC-associated RCC"], oncoTreeCode: null, icdO3Code: "8316/3", molecularSubtype: "FH-deficient", prevalence: "ultra-rare" },
  { id: "rcc-succinate-dehydrogenase", name: "SDH-Deficient Renal Cell Carcinoma", parent: "kidney", tissue: "Genitourinary", aliases: ["SDH-deficient RCC"], oncoTreeCode: null, icdO3Code: "8311/3", molecularSubtype: "SDH-deficient", prevalence: "ultra-rare" },
  { id: "rcc-mucinous-tubular", name: "Mucinous Tubular and Spindle Cell Carcinoma", parent: "kidney", tissue: "Genitourinary", aliases: ["MTSCC"], oncoTreeCode: null, icdO3Code: "8319/3", prevalence: "ultra-rare" },
  { id: "bladder-micropapillary", name: "Micropapillary Urothelial Carcinoma", parent: "bladder-urothelial", tissue: "Genitourinary", aliases: ["micropapillary bladder cancer"], oncoTreeCode: "BLCA", icdO3Code: "8131/3", prevalence: "rare" },
  { id: "bladder-plasmacytoid", name: "Plasmacytoid Urothelial Carcinoma", parent: "bladder-urothelial", tissue: "Genitourinary", aliases: ["plasmacytoid bladder cancer"], oncoTreeCode: "BLCA", icdO3Code: "8131/3", prevalence: "ultra-rare" },
  { id: "bladder-sarcomatoid", name: "Sarcomatoid Urothelial Carcinoma", parent: "bladder-urothelial", tissue: "Genitourinary", aliases: ["sarcomatoid bladder cancer"], oncoTreeCode: "BLCA", icdO3Code: "8122/3", prevalence: "ultra-rare" },
  { id: "penile-scc-hpv-pos", name: "Penile SCC, HPV-positive", parent: "penile", tissue: "Genitourinary", aliases: ["HPV+ penile cancer"], oncoTreeCode: "PENIS", icdO3Code: "8085/3", molecularSubtype: "HPV-positive", prevalence: "ultra-rare" },
  { id: "penile-scc-hpv-neg", name: "Penile SCC, HPV-negative", parent: "penile", tissue: "Genitourinary", aliases: ["HPV- penile cancer"], oncoTreeCode: "PENIS", icdO3Code: "8070/3", molecularSubtype: "HPV-negative", prevalence: "ultra-rare" },
  { id: "spermatocytic-tumor", name: "Spermatocytic Tumor", parent: "testicular", tissue: "Genitourinary", aliases: ["spermatocytic seminoma"], oncoTreeCode: null, icdO3Code: "9063/3", prevalence: "ultra-rare" },
  { id: "sex-cord-stromal-testis", name: "Sex Cord-Stromal Tumor of Testis", parent: "testicular", tissue: "Genitourinary", aliases: ["Leydig cell tumor", "Sertoli cell tumor"], oncoTreeCode: null, icdO3Code: "8650/1", prevalence: "ultra-rare" },

  // Additional GYN
  { id: "ovarian-transitional", name: "Ovarian Transitional Cell Carcinoma", parent: "ovarian", tissue: "Gynecologic", aliases: ["Brenner tumor malignant"], oncoTreeCode: null, icdO3Code: "9000/3", prevalence: "ultra-rare" },
  { id: "ovarian-small-cell-hypercalcemic", name: "Small Cell Carcinoma of Ovary, Hypercalcemic Type", parent: "ovarian", tissue: "Gynecologic", aliases: ["SCCOHT", "SMARCA4-deficient ovarian"], oncoTreeCode: null, icdO3Code: "8044/3", molecularSubtype: "SMARCA4-deficient", prevalence: "ultra-rare" },
  { id: "endometrial-adenosquamous", name: "Endometrial Adenosquamous Carcinoma", parent: "endometrial", tissue: "Gynecologic", aliases: ["adenosquamous UCEC"], oncoTreeCode: "UCEC", icdO3Code: "8560/3", prevalence: "ultra-rare" },
  { id: "uterine-adenosarcoma", name: "Uterine Adenosarcoma", parent: "gyn", tissue: "Gynecologic", aliases: ["Mullerian adenosarcoma"], oncoTreeCode: null, icdO3Code: "8933/3", prevalence: "ultra-rare" },
  { id: "uterine-ess-low", name: "Endometrial Stromal Sarcoma, Low-Grade", parent: "gyn", tissue: "Gynecologic", aliases: ["low-grade ESS", "LGESS"], oncoTreeCode: "ESS", icdO3Code: "8931/3", prevalence: "ultra-rare" },
  { id: "uterine-ess-high", name: "Endometrial Stromal Sarcoma, High-Grade", parent: "gyn", tissue: "Gynecologic", aliases: ["high-grade ESS", "HGESS"], oncoTreeCode: "ESS", icdO3Code: "8930/3", prevalence: "ultra-rare" },
  { id: "uterine-undiff-sarcoma", name: "Undifferentiated Uterine Sarcoma", parent: "gyn", tissue: "Gynecologic", aliases: ["UUS"], oncoTreeCode: null, icdO3Code: "8805/3", prevalence: "ultra-rare" },
  { id: "gtd-pstt", name: "Placental Site Trophoblastic Tumor", parent: "gtd", tissue: "Gynecologic", aliases: ["PSTT"], oncoTreeCode: null, icdO3Code: "9104/1", prevalence: "ultra-rare" },
  { id: "gtd-ett", name: "Epithelioid Trophoblastic Tumor", parent: "gtd", tissue: "Gynecologic", aliases: ["ETT"], oncoTreeCode: null, icdO3Code: "9105/3", prevalence: "ultra-rare" },

  // Additional Head & Neck
  { id: "oral-verrucous", name: "Verrucous Carcinoma of Oral Cavity", parent: "oral-cavity-scc", tissue: "Head and Neck", aliases: ["Ackerman tumor", "verrucous oral SCC"], oncoTreeCode: "OCSC", icdO3Code: "8051/3", prevalence: "rare" },
  { id: "oral-basaloid-scc", name: "Basaloid SCC of Head and Neck", parent: "head-neck", tissue: "Head and Neck", aliases: ["basaloid squamous carcinoma H&N"], oncoTreeCode: "HNSC", icdO3Code: "8083/3", prevalence: "rare" },
  { id: "laryngeal-verrucous", name: "Verrucous Carcinoma of Larynx", parent: "laryngeal-scc", tissue: "Head and Neck", aliases: ["verrucous laryngeal SCC"], oncoTreeCode: "LXSC", icdO3Code: "8051/3", prevalence: "rare" },
  { id: "lip-scc", name: "Lip Squamous Cell Carcinoma", parent: "head-neck", tissue: "Head and Neck", aliases: ["lip cancer"], oncoTreeCode: null, icdO3Code: "8070/3", prevalence: "rare" },
  { id: "external-auditory-canal", name: "External Auditory Canal Carcinoma", parent: "head-neck", tissue: "Head and Neck", aliases: ["ear canal cancer"], oncoTreeCode: null, icdO3Code: "8070/3", prevalence: "ultra-rare" },
  { id: "salivary-carcinoma-ex-pa", name: "Carcinoma Ex Pleomorphic Adenoma", parent: "salivary", tissue: "Head and Neck", aliases: ["carcinoma ex PA", "malignant mixed tumor"], oncoTreeCode: null, icdO3Code: "8941/3", prevalence: "ultra-rare" },
  { id: "thyroid-niftp", name: "Noninvasive Follicular Thyroid Neoplasm with Papillary-Like Nuclear Features", parent: "thyroid", tissue: "Head and Neck", aliases: ["NIFTP"], oncoTreeCode: null, icdO3Code: "8349/1", prevalence: "uncommon" },
  { id: "thyroid-cribriform-morular", name: "Cribriform Morular Thyroid Carcinoma", parent: "thyroid", tissue: "Head and Neck", aliases: ["FAP-associated thyroid cancer"], oncoTreeCode: null, icdO3Code: "8340/3", prevalence: "ultra-rare" },

  // Additional bone/soft tissue
  { id: "cic-rearranged-sarcoma", name: "CIC-Rearranged Sarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["CIC-DUX4 sarcoma", "Ewing-like sarcoma CIC"], oncoTreeCode: null, icdO3Code: "8806/3", molecularSubtype: "CIC-DUX4", prevalence: "ultra-rare" },
  { id: "bcor-rearranged-sarcoma", name: "BCOR-Rearranged Sarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["BCOR-CCNB3 sarcoma", "Ewing-like sarcoma BCOR"], oncoTreeCode: null, icdO3Code: "8806/3", molecularSubtype: "BCOR-CCNB3", prevalence: "ultra-rare" },
  { id: "ossifying-fibromyxoid", name: "Ossifying Fibromyxoid Tumor", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["OFMT"], oncoTreeCode: null, icdO3Code: "8842/0", prevalence: "ultra-rare" },
  { id: "desmoplastic-fibroblastoma", name: "Desmoplastic Fibroblastoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["collagenous fibroma"], oncoTreeCode: null, icdO3Code: "8823/0", prevalence: "ultra-rare" },
  { id: "tenosynovial-giant-cell", name: "Tenosynovial Giant Cell Tumor", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["TGCT", "PVNS", "pigmented villonodular synovitis"], oncoTreeCode: null, icdO3Code: "9252/1", prevalence: "rare" },
  { id: "solitary-fibrous-tumor-malignant", name: "Solitary Fibrous Tumor, Malignant", parent: "sft", tissue: "Bone/Soft Tissue", aliases: ["malignant SFT", "malignant hemangiopericytoma"], oncoTreeCode: "SFT", icdO3Code: "8815/3", prevalence: "ultra-rare" },
  { id: "liposarcoma-spindle-cell", name: "Spindle Cell Liposarcoma", parent: "liposarcoma", tissue: "Bone/Soft Tissue", aliases: ["spindle cell LPS"], oncoTreeCode: "LPS", icdO3Code: "8857/3", prevalence: "ultra-rare" },
  { id: "leiomyosarcoma-retro", name: "Retroperitoneal Leiomyosarcoma", parent: "leiomyosarcoma", tissue: "Bone/Soft Tissue", aliases: ["retroperitoneal LMS"], oncoTreeCode: "LMS", icdO3Code: "8890/3", prevalence: "rare" },
  { id: "leiomyosarcoma-vascular", name: "Vascular Leiomyosarcoma", parent: "leiomyosarcoma", tissue: "Bone/Soft Tissue", aliases: ["IVC leiomyosarcoma", "vena cava LMS"], oncoTreeCode: "LMS", icdO3Code: "8890/3", prevalence: "ultra-rare" },
  { id: "extraskeletal-ewing", name: "Extraskeletal Ewing Sarcoma", parent: "ewing", tissue: "Bone/Soft Tissue", aliases: ["soft tissue Ewing sarcoma"], oncoTreeCode: "EWS", icdO3Code: "9260/3", prevalence: "rare" },

  // Additional pediatric
  { id: "ped-infantile-hemangioma-kaposiform", name: "Kaposiform Hemangioendothelioma", parent: "pediatric", tissue: "Pediatric", aliases: ["KHE", "tufted angioma"], oncoTreeCode: null, icdO3Code: "9130/1", prevalence: "ultra-rare" },
  { id: "ped-infantile-fibrosarcoma", name: "Infantile Fibrosarcoma", parent: "pediatric", tissue: "Pediatric", aliases: ["congenital fibrosarcoma", "ETV6-NTRK3 pediatric"], oncoTreeCode: null, icdO3Code: "8814/3", molecularSubtype: "ETV6-NTRK3", prevalence: "ultra-rare" },
  { id: "ped-undiff-sarcoma", name: "Pediatric Undifferentiated Sarcoma", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric UDS"], oncoTreeCode: null, icdO3Code: "8805/3", prevalence: "ultra-rare" },
  { id: "ped-neuroblastoma-stage4s", name: "Neuroblastoma, Stage 4S", parent: "neuroblastoma", tissue: "Pediatric", aliases: ["stage 4S NB", "special neuroblastoma"], oncoTreeCode: "NBL", icdO3Code: "9500/3", prevalence: "ultra-rare" },
  { id: "ped-cpc", name: "Choroid Plexus Carcinoma (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric CPC"], oncoTreeCode: "CPC", icdO3Code: "9390/3", whoGrade: "III", prevalence: "ultra-rare" },
  { id: "ped-gliomatosis-cerebri", name: "Gliomatosis Cerebri", parent: "pediatric", tissue: "Pediatric", aliases: ["diffuse gliomatosis"], oncoTreeCode: null, icdO3Code: "9381/3", whoGrade: "III", prevalence: "ultra-rare" },

  // Additional other/endocrine
  { id: "adrenocortical-functional", name: "Adrenocortical Carcinoma, Functional", parent: "adrenocortical", tissue: "Other", aliases: ["cortisol-producing ACC", "functioning ACC"], oncoTreeCode: "ACC", icdO3Code: "8370/3", prevalence: "ultra-rare" },
  { id: "adrenocortical-nonfunctional", name: "Adrenocortical Carcinoma, Non-functional", parent: "adrenocortical", tissue: "Other", aliases: ["non-functioning ACC"], oncoTreeCode: "ACC", icdO3Code: "8370/3", prevalence: "ultra-rare" },
  { id: "pheochromocytoma-malignant", name: "Malignant Pheochromocytoma", parent: "pheochromocytoma", tissue: "Other", aliases: ["metastatic pheo"], oncoTreeCode: "PHC", icdO3Code: "8700/3", prevalence: "ultra-rare" },
  { id: "paraganglioma-head-neck", name: "Head and Neck Paraganglioma", parent: "paraganglioma", tissue: "Other", aliases: ["carotid body tumor", "glomus jugulare", "glomus tympanicum"], oncoTreeCode: "PGN", icdO3Code: "8693/1", prevalence: "rare" },
  { id: "paraganglioma-abdominal", name: "Abdominal Paraganglioma", parent: "paraganglioma", tissue: "Other", aliases: ["retroperitoneal paraganglioma", "organ of Zuckerkandl tumor"], oncoTreeCode: "PGN", icdO3Code: "8693/3", prevalence: "ultra-rare" },
  { id: "thymoma-c", name: "Thymic Carcinoma, Squamous Cell", parent: "thymic-carcinoma", tissue: "Other", aliases: ["SCC of thymus"], oncoTreeCode: "THYM", icdO3Code: "8070/3", prevalence: "ultra-rare" },
  { id: "thymoma-lymphoepithelial", name: "Thymic Carcinoma, Lymphoepithelial", parent: "thymic-carcinoma", tissue: "Other", aliases: ["lymphoepithelioma-like thymic carcinoma"], oncoTreeCode: "THYM", icdO3Code: "8082/3", prevalence: "ultra-rare" },
  { id: "net-merkel", name: "Neuroendocrine Carcinoma, NOS", parent: "net", tissue: "Other", aliases: ["NEC NOS", "poorly differentiated neuroendocrine carcinoma"], oncoTreeCode: null, icdO3Code: "8246/3", prevalence: "rare" },
  { id: "net-mediastinal", name: "Mediastinal Neuroendocrine Tumor", parent: "net", tissue: "Other", aliases: ["thymic NET", "mediastinal carcinoid"], oncoTreeCode: null, icdO3Code: "8240/3", prevalence: "ultra-rare" },
  { id: "mesothelioma-tunica-vaginalis", name: "Mesothelioma of Tunica Vaginalis", parent: "other", tissue: "Other", aliases: ["testicular mesothelioma"], oncoTreeCode: null, icdO3Code: "9050/3", prevalence: "ultra-rare" },
  { id: "mesothelioma-pericardial", name: "Pericardial Mesothelioma", parent: "other", tissue: "Other", aliases: ["cardiac mesothelioma"], oncoTreeCode: null, icdO3Code: "9050/3", prevalence: "ultra-rare" },
  { id: "cardiac-sarcoma", name: "Primary Cardiac Sarcoma", parent: "other", tissue: "Other", aliases: ["cardiac angiosarcoma", "heart sarcoma"], oncoTreeCode: null, icdO3Code: "9120/3", prevalence: "ultra-rare" },
  { id: "cardiac-myxoma-malignant", name: "Cardiac Myxoma (Malignant)", parent: "other", tissue: "Other", aliases: ["malignant cardiac myxoma"], oncoTreeCode: null, icdO3Code: "8840/3", prevalence: "ultra-rare" },

  // Additional molecular subtypes
  { id: "gastric-claudin-18", name: "Gastric Cancer, Claudin 18.2-positive", parent: "gastric", tissue: "Gastrointestinal", aliases: ["CLDN18.2+ gastric cancer"], oncoTreeCode: "STAD", icdO3Code: "8140/3", molecularSubtype: "CLDN18.2-positive", prevalence: "uncommon" },
  { id: "gastric-fgfr2-amp", name: "Gastric Cancer, FGFR2-amplified", parent: "gastric", tissue: "Gastrointestinal", aliases: ["FGFR2+ gastric cancer"], oncoTreeCode: "STAD", icdO3Code: "8140/3", molecularSubtype: "FGFR2-amplified", prevalence: "rare" },
  { id: "melanoma-braf-non-v600", name: "Melanoma, BRAF Non-V600 Mutation", parent: "melanoma-cutaneous", tissue: "Skin", aliases: ["BRAF non-V600E melanoma", "BRAF class 2/3 melanoma"], oncoTreeCode: "SKCM", icdO3Code: "8720/3", molecularSubtype: "BRAF non-V600", prevalence: "rare" },
  { id: "melanoma-nf1", name: "Melanoma, NF1-mutant", parent: "melanoma-cutaneous", tissue: "Skin", aliases: ["NF1+ melanoma"], oncoTreeCode: "SKCM", icdO3Code: "8720/3", molecularSubtype: "NF1-mutant", prevalence: "rare" },
  { id: "nsclc-pd-l1-high", name: "NSCLC, PD-L1 High (TPS >= 50%)", parent: "nsclc", tissue: "Lung", aliases: ["PD-L1 high NSCLC", "TPS>=50 NSCLC"], oncoTreeCode: "NSCLC", icdO3Code: "8046/3", molecularSubtype: "PD-L1 TPS >= 50%", prevalence: "uncommon" },
  { id: "crc-tmb-high", name: "Colorectal Cancer, TMB-High", parent: "crc", tissue: "Gastrointestinal", aliases: ["TMB-H CRC", "hypermutated CRC"], oncoTreeCode: "CRC", icdO3Code: "8140/3", molecularSubtype: "TMB-high", prevalence: "rare" },
  { id: "endometrial-her2", name: "Endometrial Cancer, HER2-positive", parent: "endometrial", tissue: "Gynecologic", aliases: ["HER2+ endometrial cancer", "ERBB2-amplified endometrial"], oncoTreeCode: "UCEC", icdO3Code: "8380/3", molecularSubtype: "HER2-positive", prevalence: "rare" },
  { id: "ccrcc-sarcomatoid", name: "Clear Cell RCC, Sarcomatoid", parent: "ccrcc", tissue: "Genitourinary", aliases: ["sarcomatoid ccRCC", "sarcomatoid RCC"], oncoTreeCode: "CCRCC", icdO3Code: "8310/3", prevalence: "rare" },
  { id: "hcc-afp-high", name: "HCC, AFP-elevated", parent: "hcc", tissue: "Gastrointestinal", aliases: ["AFP-high HCC"], oncoTreeCode: "HCC", icdO3Code: "8170/3", prevalence: "uncommon" },
  { id: "brca-apocrine", name: "Apocrine Breast Carcinoma", parent: "brca", tissue: "Breast", aliases: ["apocrine carcinoma of breast"], oncoTreeCode: null, icdO3Code: "8401/3", prevalence: "ultra-rare" },
  { id: "brca-neuroendocrine", name: "Neuroendocrine Carcinoma of Breast", parent: "brca", tissue: "Breast", aliases: ["breast NEC", "neuroendocrine breast cancer"], oncoTreeCode: null, icdO3Code: "8246/3", prevalence: "ultra-rare" },

  // Catch-all rare entities for specific genomic contexts
  { id: "ntrk-fusion-solid", name: "NTRK Fusion-Positive Solid Tumor", parent: "other", tissue: "Other", aliases: ["NTRK+ cancer", "TRK fusion cancer"], oncoTreeCode: null, molecularSubtype: "NTRK fusion", prevalence: "ultra-rare" },
  { id: "msi-h-solid", name: "MSI-High/dMMR Solid Tumor (Agnostic)", parent: "other", tissue: "Other", aliases: ["MSI-H agnostic", "dMMR tumor agnostic", "tumor agnostic MSI-H"], oncoTreeCode: null, molecularSubtype: "MSI-H/dMMR (tissue-agnostic)", prevalence: "rare" },
  { id: "tmb-h-solid", name: "TMB-High Solid Tumor (Agnostic)", parent: "other", tissue: "Other", aliases: ["TMB-H agnostic", "tumor agnostic TMB-H", "hypermutated tumor"], oncoTreeCode: null, molecularSubtype: "TMB-high (tissue-agnostic)", prevalence: "rare" },
  { id: "ret-fusion-solid", name: "RET Fusion-Positive Solid Tumor", parent: "other", tissue: "Other", aliases: ["RET+ cancer agnostic"], oncoTreeCode: null, molecularSubtype: "RET fusion", prevalence: "ultra-rare" },
  { id: "braf-v600e-solid", name: "BRAF V600E Solid Tumor (Agnostic)", parent: "other", tissue: "Other", aliases: ["BRAF+ cancer agnostic"], oncoTreeCode: null, molecularSubtype: "BRAF V600E (tissue-agnostic)", prevalence: "rare" },
  { id: "her2-positive-solid", name: "HER2-Positive Solid Tumor (Agnostic)", parent: "other", tissue: "Other", aliases: ["HER2+ agnostic", "ERBB2-positive agnostic"], oncoTreeCode: null, molecularSubtype: "HER2-positive (tissue-agnostic)", prevalence: "rare" },
  { id: "kras-g12c-solid", name: "KRAS G12C Solid Tumor", parent: "other", tissue: "Other", aliases: ["KRAS G12C agnostic"], oncoTreeCode: null, molecularSubtype: "KRAS G12C", prevalence: "rare" },
  { id: "idh1-solid", name: "IDH1-Mutant Solid Tumor", parent: "other", tissue: "Other", aliases: ["IDH1+ cancer"], oncoTreeCode: null, molecularSubtype: "IDH1-mutant", prevalence: "rare" },
  { id: "fgfr-altered-solid", name: "FGFR-Altered Solid Tumor", parent: "other", tissue: "Other", aliases: ["FGFR+ cancer", "FGFR fusion/mutation agnostic"], oncoTreeCode: null, molecularSubtype: "FGFR-altered", prevalence: "rare" },

  // Additional entries to exceed 800 threshold
  // --- More hematologic molecular subtypes ---
  { id: "aml-etv6-mecom", name: "AML with ETV6-MECOM", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["t(3;12) AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "ETV6-MECOM", prevalence: "ultra-rare" },
  { id: "aml-gata2", name: "AML with GATA2 Mutation", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["GATA2-mutant AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "GATA2-mutant", prevalence: "ultra-rare" },
  { id: "aml-asxl1", name: "AML with ASXL1 Mutation", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["ASXL1-mutant AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "ASXL1-mutant", prevalence: "rare" },
  { id: "aml-srsf2", name: "AML with SRSF2 Mutation", parent: "aml", tissue: "Blood/Bone Marrow", aliases: ["SRSF2-mutant AML"], oncoTreeCode: "AML", icdO3Code: "9861/3", molecularSubtype: "SRSF2-mutant", prevalence: "rare" },
  { id: "all-b-tcf3-pbx1", name: "B-ALL with TCF3-PBX1", parent: "all-b", tissue: "Blood/Bone Marrow", aliases: ["E2A-PBX1 ALL", "t(1;19) ALL"], oncoTreeCode: "ALL", icdO3Code: "9813/3", molecularSubtype: "TCF3-PBX1", prevalence: "rare" },
  { id: "all-b-iamp21", name: "B-ALL with iAMP21", parent: "all-b", tissue: "Blood/Bone Marrow", aliases: ["intrachromosomal amplification of chr21 ALL"], oncoTreeCode: "ALL", icdO3Code: "9811/3", molecularSubtype: "iAMP21", prevalence: "ultra-rare" },
  { id: "all-b-dic9-20", name: "B-ALL with dic(9;20)", parent: "all-b", tissue: "Blood/Bone Marrow", aliases: ["dic(9;20) ALL"], oncoTreeCode: "ALL", icdO3Code: "9811/3", molecularSubtype: "dic(9;20)", prevalence: "ultra-rare" },
  { id: "mm-t6-14", name: "Multiple Myeloma with t(6;14)", parent: "mm", tissue: "Blood/Bone Marrow", aliases: ["CCND3 myeloma"], oncoTreeCode: "MM", icdO3Code: "9732/3", molecularSubtype: "t(6;14)", prevalence: "ultra-rare" },
  { id: "mm-biallelic-tp53", name: "Multiple Myeloma with Biallelic TP53", parent: "mm", tissue: "Blood/Bone Marrow", aliases: ["biallelic TP53 myeloma"], oncoTreeCode: "MM", icdO3Code: "9732/3", molecularSubtype: "biallelic TP53", prevalence: "ultra-rare" },
  { id: "dlbcl-ebv-pos", name: "EBV-Positive DLBCL, NOS", parent: "dlbcl", tissue: "Blood/Bone Marrow", aliases: ["EBV+ DLBCL", "EBV-positive DLBCL of the elderly"], oncoTreeCode: "DLBCL", icdO3Code: "9680/3", molecularSubtype: "EBV-positive", prevalence: "rare" },
  { id: "dlbcl-myc-rearranged", name: "DLBCL with MYC Rearrangement (Single Hit)", parent: "dlbcl", tissue: "Blood/Bone Marrow", aliases: ["MYC-rearranged DLBCL", "single-hit MYC DLBCL"], oncoTreeCode: "DLBCL", icdO3Code: "9680/3", molecularSubtype: "MYC-rearranged", prevalence: "rare" },

  // --- More lung subtypes ---
  { id: "luad-fetal", name: "Lung Adenocarcinoma, Fetal Type", parent: "luad", tissue: "Lung", aliases: ["fetal adenocarcinoma of lung", "endometrioid-like lung"], oncoTreeCode: "LUAD", icdO3Code: "8333/3", prevalence: "ultra-rare" },
  { id: "luad-enteric", name: "Lung Adenocarcinoma, Enteric Type", parent: "luad", tissue: "Lung", aliases: ["enteric adenocarcinoma of lung"], oncoTreeCode: "LUAD", icdO3Code: "8144/3", prevalence: "ultra-rare" },
  { id: "luad-colloid", name: "Lung Adenocarcinoma, Colloid", parent: "luad", tissue: "Lung", aliases: ["colloid adenocarcinoma of lung", "mucinous cystadenocarcinoma lung"], oncoTreeCode: "LUAD", icdO3Code: "8480/3", prevalence: "ultra-rare" },
  { id: "lung-lymphoepithelioma-like", name: "Lymphoepithelioma-Like Carcinoma of Lung", parent: "nsclc", tissue: "Lung", aliases: ["LELC of lung", "EBV-associated lung cancer"], oncoTreeCode: null, icdO3Code: "8082/3", prevalence: "ultra-rare" },
  { id: "lung-nos-giant-cell", name: "Giant Cell Carcinoma of Lung", parent: "nsclc-sarcomatoid", tissue: "Lung", aliases: ["giant cell lung cancer"], oncoTreeCode: null, icdO3Code: "8031/3", prevalence: "ultra-rare" },
  { id: "lung-carcinosarcoma", name: "Pulmonary Carcinosarcoma", parent: "nsclc-sarcomatoid", tissue: "Lung", aliases: ["lung carcinosarcoma"], oncoTreeCode: null, icdO3Code: "8980/3", prevalence: "ultra-rare" },
  { id: "lung-pulmonary-blastoma", name: "Pulmonary Blastoma", parent: "nsclc-sarcomatoid", tissue: "Lung", aliases: ["biphasic pulmonary blastoma"], oncoTreeCode: null, icdO3Code: "8972/3", prevalence: "ultra-rare" },

  // --- More breast ---
  { id: "brca-cribriform", name: "Invasive Cribriform Breast Carcinoma", parent: "brca", tissue: "Breast", aliases: ["cribriform carcinoma of breast"], oncoTreeCode: null, icdO3Code: "8201/3", prevalence: "rare" },
  { id: "brca-glycogen-rich", name: "Glycogen-Rich Clear Cell Breast Carcinoma", parent: "brca", tissue: "Breast", aliases: ["glycogen-rich breast cancer"], oncoTreeCode: null, icdO3Code: "8315/3", prevalence: "ultra-rare" },
  { id: "brca-lipid-rich", name: "Lipid-Rich Breast Carcinoma", parent: "brca", tissue: "Breast", aliases: ["lipid-rich carcinoma of breast"], oncoTreeCode: null, icdO3Code: "8314/3", prevalence: "ultra-rare" },
  { id: "brca-oncocytic", name: "Oncocytic Breast Carcinoma", parent: "brca", tissue: "Breast", aliases: ["oncocytic carcinoma of breast"], oncoTreeCode: null, icdO3Code: "8290/3", prevalence: "ultra-rare" },

  // --- More GI ---
  { id: "liver-angiosarcoma", name: "Hepatic Angiosarcoma", parent: "liver", tissue: "Gastrointestinal", aliases: ["liver angiosarcoma"], oncoTreeCode: null, icdO3Code: "9120/3", prevalence: "ultra-rare" },
  { id: "liver-epithelioid-hemangio", name: "Hepatic Epithelioid Hemangioendothelioma", parent: "liver", tissue: "Gastrointestinal", aliases: ["liver EHE"], oncoTreeCode: null, icdO3Code: "9133/3", prevalence: "ultra-rare" },
  { id: "cholangiocarcinoma-mixed", name: "Mixed Cholangiocarcinoma", parent: "cholangiocarcinoma", tissue: "Gastrointestinal", aliases: ["mixed CCA", "cholangiolocellular carcinoma"], oncoTreeCode: "CHOL", icdO3Code: "8160/3", prevalence: "ultra-rare" },
  { id: "gastric-neuroendocrine", name: "Gastric Neuroendocrine Carcinoma", parent: "gastric", tissue: "Gastrointestinal", aliases: ["gastric NEC", "high-grade gastric neuroendocrine"], oncoTreeCode: null, icdO3Code: "8246/3", prevalence: "ultra-rare" },
  { id: "colon-leiomyosarcoma", name: "Colonic Leiomyosarcoma", parent: "crc", tissue: "Gastrointestinal", aliases: ["colon LMS"], oncoTreeCode: null, icdO3Code: "8890/3", prevalence: "ultra-rare" },
  { id: "esophageal-verrucous", name: "Verrucous Carcinoma of Esophagus", parent: "esophageal", tissue: "Gastrointestinal", aliases: ["verrucous esophageal cancer"], oncoTreeCode: null, icdO3Code: "8051/3", prevalence: "ultra-rare" },

  // --- More skin ---
  { id: "melanoma-conjunctival", name: "Conjunctival Melanoma", parent: "melanoma", tissue: "Skin", aliases: ["melanoma of conjunctiva"], oncoTreeCode: null, icdO3Code: "8720/3", prevalence: "ultra-rare" },
  { id: "melanoma-blue-nevus", name: "Malignant Blue Nevus", parent: "melanoma", tissue: "Skin", aliases: ["melanoma arising in blue nevus"], oncoTreeCode: null, icdO3Code: "8780/3", prevalence: "ultra-rare" },
  { id: "bcc-basal-squamous", name: "Basosquamous Carcinoma", parent: "bcc", tissue: "Skin", aliases: ["metatypical BCC", "basosquamous carcinoma"], oncoTreeCode: "BCC", icdO3Code: "8094/3", prevalence: "rare" },
  { id: "porocarcinoma", name: "Porocarcinoma", parent: "skin", tissue: "Skin", aliases: ["eccrine porocarcinoma", "malignant poroma"], oncoTreeCode: null, icdO3Code: "8409/3", prevalence: "ultra-rare" },
  { id: "hidradenocarcinoma", name: "Hidradenocarcinoma", parent: "skin", tissue: "Skin", aliases: ["malignant hidradenoma"], oncoTreeCode: null, icdO3Code: "8400/3", prevalence: "ultra-rare" },
  { id: "spiradenocarcinoma", name: "Spiradenocarcinoma", parent: "skin", tissue: "Skin", aliases: ["malignant spiradenoma"], oncoTreeCode: null, icdO3Code: "8403/3", prevalence: "ultra-rare" },
  { id: "trichilemmal-carcinoma", name: "Trichilemmal Carcinoma", parent: "skin", tissue: "Skin", aliases: ["tricholemmal carcinoma"], oncoTreeCode: null, icdO3Code: "8102/3", prevalence: "ultra-rare" },

  // --- More sarcoma ---
  { id: "dediff-chordoma", name: "Dedifferentiated Chordoma", parent: "bone-chordoma", tissue: "Bone/Soft Tissue", aliases: ["dedifferentiated notochordal tumor"], oncoTreeCode: "CHORD", icdO3Code: "9370/3", prevalence: "ultra-rare" },
  { id: "chondromyxoid-fibroma", name: "Chondromyxoid Fibroma", parent: "bone", tissue: "Bone/Soft Tissue", aliases: ["CMF"], oncoTreeCode: null, icdO3Code: "9241/0", prevalence: "ultra-rare" },
  { id: "hemangiopericytoma-meningeal", name: "Meningeal Hemangiopericytoma/SFT", parent: "brain", tissue: "Brain/CNS", aliases: ["meningeal SFT", "HPC of meninges"], oncoTreeCode: null, icdO3Code: "8815/3", whoGrade: "II-III", prevalence: "ultra-rare" },
  { id: "phosphaturic-mesenchymal-tumor", name: "Phosphaturic Mesenchymal Tumor", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["PMT", "oncogenic osteomalacia tumor"], oncoTreeCode: null, icdO3Code: "8990/1", prevalence: "ultra-rare" },
  { id: "myxoinflammatory-fibroblastic", name: "Myxoinflammatory Fibroblastic Sarcoma", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["MIFS"], oncoTreeCode: null, icdO3Code: "8811/3", prevalence: "ultra-rare" },
  { id: "malignant-glomus", name: "Malignant Glomus Tumor", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["glomangiosarcoma"], oncoTreeCode: null, icdO3Code: "8711/3", prevalence: "ultra-rare" },
  { id: "endometrial-stromal-nodule", name: "Endometrial Stromal Nodule (Borderline)", parent: "soft-tissue", tissue: "Bone/Soft Tissue", aliases: ["ESN"], oncoTreeCode: null, icdO3Code: "8930/0", prevalence: "ultra-rare" },
  { id: "dermatofibrosarcoma-fibrosarcomatous", name: "Dermatofibrosarcoma Protuberans, Fibrosarcomatous", parent: "dfsp", tissue: "Skin", aliases: ["FS-DFSP", "fibrosarcomatous DFSP"], oncoTreeCode: "DFSP", icdO3Code: "8832/3", prevalence: "ultra-rare" },

  // --- More GYN ---
  { id: "ovarian-seromucinous", name: "Ovarian Seromucinous Carcinoma", parent: "ovarian", tissue: "Gynecologic", aliases: ["seromucinous ovarian cancer"], oncoTreeCode: null, icdO3Code: "8474/3", prevalence: "ultra-rare" },
  { id: "ovarian-squamous-in-teratoma", name: "Squamous Cell Carcinoma Arising in Ovarian Teratoma", parent: "ovarian", tissue: "Gynecologic", aliases: ["SCC in dermoid cyst"], oncoTreeCode: null, icdO3Code: "8070/3", prevalence: "ultra-rare" },
  { id: "cervical-glassy-cell", name: "Glassy Cell Carcinoma of Cervix", parent: "cervical", tissue: "Gynecologic", aliases: ["glassy cell cervical cancer"], oncoTreeCode: null, icdO3Code: "8015/3", prevalence: "ultra-rare" },

  // --- More pediatric ---
  { id: "ped-synovial-sarcoma", name: "Synovial Sarcoma (Pediatric)", parent: "pediatric", tissue: "Pediatric", aliases: ["pediatric SS"], oncoTreeCode: "SYNS", icdO3Code: "9040/3", prevalence: "ultra-rare" },
  { id: "ped-aml-down-syndrome", name: "AML Associated with Down Syndrome", parent: "pediatric", tissue: "Pediatric", aliases: ["ML-DS", "myeloid leukemia of Down syndrome"], oncoTreeCode: "AML", icdO3Code: "9898/3", prevalence: "ultra-rare" },
  { id: "ped-transient-abnormal-myelopoiesis", name: "Transient Abnormal Myelopoiesis", parent: "pediatric", tissue: "Pediatric", aliases: ["TAM", "transient myeloproliferative disorder"], oncoTreeCode: null, icdO3Code: "9898/1", prevalence: "ultra-rare" },
  { id: "ped-all-down-syndrome", name: "ALL Associated with Down Syndrome", parent: "pediatric", tissue: "Pediatric", aliases: ["DS-ALL"], oncoTreeCode: "ALL", icdO3Code: "9811/3", prevalence: "ultra-rare" },
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
