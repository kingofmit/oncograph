import type { Pathway } from "@oncograph/core";

/**
 * Comprehensive database of cancer signaling pathways.
 * Sources: KEGG Pathway Database, Reactome Knowledgebase.
 */
export const CANCER_PATHWAYS: Pathway[] = [
  {
    id: "mapk-erk",
    name: "MAPK/ERK Signaling",
    source: "KEGG",
    sourceId: "hsa04010",
    genes: [
      "KRAS", "NRAS", "HRAS", "BRAF", "RAF1", "ARAF",
      "MAP2K1", "MAP2K2", "MAPK1", "MAPK3", "NF1", "SOS1",
      "GRB2", "SHOC2", "DUSP4", "DUSP6",
    ],
    description:
      "RAS-RAF-MEK-ERK cascade that transduces growth factor receptor signals to drive cell proliferation, differentiation, and survival. Constitutive activation is among the most common oncogenic drivers across solid tumors.",
    therapeuticVulnerabilities: [
      "Sotorasib (KRAS G12C)",
      "Adagrasib (KRAS G12C)",
      "Dabrafenib (BRAF V600E)",
      "Vemurafenib (BRAF V600E)",
      "Encorafenib (BRAF V600E)",
      "Trametinib (MEK1/2)",
      "Cobimetinib (MEK1/2)",
      "Binimetinib (MEK1/2)",
      "Selumetinib (MEK1/2)",
    ],
  },
  {
    id: "pi3k-akt-mtor",
    name: "PI3K/AKT/mTOR Signaling",
    source: "KEGG",
    sourceId: "hsa04151",
    genes: [
      "PIK3CA", "PIK3R1", "PTEN", "AKT1", "AKT2", "AKT3",
      "MTOR", "TSC1", "TSC2", "RPTOR", "RICTOR", "RPS6KB1",
      "STK11", "RHEB", "PIK3CB",
    ],
    description:
      "Central regulator of cell growth, metabolism, and survival. PI3K phosphorylates PIP2 to PIP3, activating AKT and downstream mTOR complexes. PTEN loss or PIK3CA gain-of-function mutations are among the most frequent alterations in cancer.",
    therapeuticVulnerabilities: [
      "Alpelisib (PI3K-alpha)",
      "Idelalisib (PI3K-delta)",
      "Copanlisib (pan-PI3K)",
      "Everolimus (mTOR)",
      "Temsirolimus (mTOR)",
      "Capivasertib (AKT)",
      "Ipatasertib (AKT)",
    ],
  },
  {
    id: "wnt-beta-catenin",
    name: "Wnt/\u03B2-catenin Signaling",
    source: "KEGG",
    sourceId: "hsa04310",
    genes: [
      "APC", "CTNNB1", "AXIN1", "AXIN2", "GSK3B",
      "RNF43", "ZNRF3", "RSPO2", "RSPO3", "TCF7L2",
      "WNT1", "WNT3A", "FZD7", "LRP5", "LRP6",
    ],
    description:
      "Governs cell fate, proliferation, and stem-cell maintenance. APC loss (common in colorectal cancer) stabilizes beta-catenin, leading to constitutive transcription of proliferative target genes.",
    therapeuticVulnerabilities: [
      "Porcupine inhibitors (WNT secretion)",
      "Tankyrase inhibitors (beta-catenin degradation)",
      "DKN-01 (DKK1 antibody)",
    ],
  },
  {
    id: "p53",
    name: "p53 Tumor Suppressor",
    source: "KEGG",
    sourceId: "hsa04115",
    genes: [
      "TP53", "MDM2", "MDM4", "CDKN2A", "ATM", "ATR",
      "CHEK1", "CHEK2", "BAX", "BBC3", "PMAIP1",
    ],
    description:
      "Master tumor suppressor that integrates DNA damage, oncogene activation, and metabolic stress signals to trigger cell cycle arrest, senescence, or apoptosis. TP53 is the most frequently mutated gene across all human cancers.",
    therapeuticVulnerabilities: [
      "Idasanutlin (MDM2 inhibitor)",
      "APR-246 (Eprenetapopt, mutant p53 reactivator)",
      "Navtemadlin (MDM2 inhibitor)",
      "KAT6A/B inhibitors (for p53 wildtype)",
    ],
  },
  {
    id: "rb-cell-cycle",
    name: "Rb/Cell Cycle Control",
    source: "KEGG",
    sourceId: "hsa04110",
    genes: [
      "RB1", "CDK4", "CDK6", "CDK2", "CCND1", "CCND2",
      "CCND3", "CCNE1", "CDKN2A", "CDKN2B", "CDKN1A",
      "CDKN1B", "E2F1", "E2F3",
    ],
    description:
      "Rb protein restricts S-phase entry by sequestering E2F transcription factors. CDK4/6-cyclin D phosphorylates Rb, releasing E2F. Loss of RB1, CDKN2A, or CDK4/6 amplification removes this checkpoint.",
    therapeuticVulnerabilities: [
      "Palbociclib (CDK4/6)",
      "Ribociclib (CDK4/6)",
      "Abemaciclib (CDK4/6)",
      "Trilaciclib (CDK4/6)",
    ],
  },
  {
    id: "notch",
    name: "Notch Signaling",
    source: "KEGG",
    sourceId: "hsa04330",
    genes: [
      "NOTCH1", "NOTCH2", "NOTCH3", "NOTCH4",
      "JAG1", "JAG2", "DLL1", "DLL3", "DLL4",
      "RBPJ", "MAML1", "FBXW7", "HES1", "HEY1",
    ],
    description:
      "Juxtacrine signaling pathway controlling cell fate decisions, differentiation, and stem cell maintenance. Activating NOTCH1 mutations are frequent in T-ALL; loss-of-function mutations occur in squamous cell carcinomas.",
    therapeuticVulnerabilities: [
      "Gamma-secretase inhibitors (Nirogacestat)",
      "DLL3-targeting antibody-drug conjugates (Rovalpituzumab tesirine)",
      "Tarlatamab (DLL3 BiTE)",
    ],
  },
  {
    id: "hedgehog",
    name: "Hedgehog Signaling",
    source: "KEGG",
    sourceId: "hsa04340",
    genes: [
      "SHH", "IHH", "DHH", "PTCH1", "PTCH2",
      "SMO", "GLI1", "GLI2", "GLI3", "SUFU",
    ],
    description:
      "Developmental pathway that, when aberrantly activated, drives basal cell carcinoma and medulloblastoma. Ligand binding to PTCH1 relieves SMO inhibition, activating GLI transcription factors.",
    therapeuticVulnerabilities: [
      "Vismodegib (SMO inhibitor)",
      "Sonidegib (SMO inhibitor)",
      "Glasdegib (SMO inhibitor)",
    ],
  },
  {
    id: "jak-stat",
    name: "JAK/STAT Signaling",
    source: "KEGG",
    sourceId: "hsa04630",
    genes: [
      "JAK1", "JAK2", "JAK3", "TYK2",
      "STAT3", "STAT5A", "STAT5B", "STAT1",
      "SOCS1", "SOCS3", "CISH", "SHP2",
    ],
    description:
      "Cytokine receptor signaling pathway that activates STAT transcription factors. JAK2 V617F is the hallmark mutation of myeloproliferative neoplasms. Constitutive STAT3 activation promotes survival and immune evasion.",
    therapeuticVulnerabilities: [
      "Ruxolitinib (JAK1/2)",
      "Fedratinib (JAK2)",
      "Pacritinib (JAK2)",
      "Momelotinib (JAK1/2)",
      "Tofacitinib (JAK1/3)",
    ],
  },
  {
    id: "nf-kb",
    name: "NF-\u03BAB Signaling",
    source: "KEGG",
    sourceId: "hsa04064",
    genes: [
      "NFKB1", "NFKB2", "RELA", "RELB", "REL",
      "IKBKB", "IKBKG", "CHUK", "NFKBIA",
      "TRAF2", "TRAF6", "MYD88", "CARD11", "BCL10", "MALT1",
    ],
    description:
      "Central mediator of inflammatory and immune signaling that promotes cell survival, proliferation, and cytokine production. Constitutive NF-kB activation occurs in many lymphomas (especially DLBCL) and solid tumors.",
    therapeuticVulnerabilities: [
      "Bortezomib (proteasome/NF-kB)",
      "Carfilzomib (proteasome/NF-kB)",
      "Ibrutinib (BTK, upstream of NF-kB in B cells)",
      "Lenalidomide (IKZF1/3 degradation, NF-kB modulation)",
    ],
  },
  {
    id: "tgf-beta",
    name: "TGF-\u03B2 Signaling",
    source: "KEGG",
    sourceId: "hsa04350",
    genes: [
      "TGFBR1", "TGFBR2", "SMAD2", "SMAD3", "SMAD4",
      "SMAD7", "TGFB1", "TGFB2", "BMP4", "ACVR1",
    ],
    description:
      "Context-dependent pathway that suppresses epithelial proliferation early in tumorigenesis but promotes invasion, metastasis, and immune evasion in advanced disease. SMAD4 loss is common in pancreatic and colorectal cancers.",
    therapeuticVulnerabilities: [
      "Galunisertib (TGFBR1 kinase inhibitor)",
      "Bintrafusp alfa (bifunctional anti-PD-L1/TGF-beta trap)",
    ],
  },
  {
    id: "hippo",
    name: "Hippo Signaling",
    source: "KEGG",
    sourceId: "hsa04390",
    genes: [
      "YAP1", "WWTR1", "LATS1", "LATS2",
      "STK3", "STK4", "NF2", "SAV1",
      "MOB1A", "MOB1B", "TEAD1", "TEAD4",
    ],
    description:
      "Regulates organ size and tissue homeostasis by controlling YAP/TAZ transcriptional co-activators. NF2 loss (mesothelioma, schwannoma) or YAP amplification leads to uncontrolled proliferation and resistance to contact inhibition.",
    therapeuticVulnerabilities: [
      "TEAD inhibitors (VT3989, IK-930)",
      "YAP-TEAD interaction disruptors",
      "Verteporfin (experimental YAP inhibitor)",
    ],
  },
  {
    id: "hrr-dna-repair",
    name: "Homologous Recombination Repair",
    source: "Reactome",
    sourceId: "R-HSA-5693532",
    genes: [
      "BRCA1", "BRCA2", "RAD51", "PALB2",
      "RAD51C", "RAD51D", "BARD1", "BRIP1",
      "ATM", "ATR", "CHEK1", "CHEK2", "NBN",
    ],
    description:
      "High-fidelity repair of DNA double-strand breaks. BRCA1/2 loss creates homologous recombination deficiency (HRD), generating synthetic lethality with PARP inhibition. HRD is prevalent in ovarian, breast, pancreatic, and prostate cancers.",
    therapeuticVulnerabilities: [
      "Olaparib (PARP1/2)",
      "Niraparib (PARP1/2)",
      "Rucaparib (PARP1/2/3)",
      "Talazoparib (PARP1/2)",
      "Veliparib (PARP1/2)",
    ],
  },
  {
    id: "mmr",
    name: "Mismatch Repair",
    source: "KEGG",
    sourceId: "hsa03430",
    genes: [
      "MLH1", "MSH2", "MSH6", "PMS2",
      "MSH3", "EXO1", "PCNA",
    ],
    description:
      "Repairs base-base mismatches and insertion/deletion loops arising during DNA replication. Loss of MMR proteins causes microsatellite instability (MSI-H), high tumor mutational burden, and neoantigen load, conferring sensitivity to immune checkpoint inhibitors.",
    therapeuticVulnerabilities: [
      "Pembrolizumab (anti-PD-1, FDA-approved for MSI-H/dMMR tumors)",
      "Nivolumab (anti-PD-1)",
      "Dostarlimab (anti-PD-1, approved for dMMR endometrial cancer)",
      "Ipilimumab + Nivolumab (anti-CTLA-4 + anti-PD-1)",
    ],
  },
  {
    id: "rtk",
    name: "Receptor Tyrosine Kinase Signaling",
    source: "KEGG",
    sourceId: "hsa04014",
    genes: [
      "EGFR", "ERBB2", "ERBB3", "MET", "FGFR1", "FGFR2",
      "FGFR3", "RET", "ALK", "ROS1", "NTRK1", "NTRK2",
      "NTRK3", "KIT", "PDGFRA", "PDGFRB", "FLT3",
    ],
    description:
      "Receptor tyrosine kinases transduce extracellular growth factor signals to intracellular cascades (MAPK, PI3K, STAT). Activating mutations, amplifications, and fusions are targetable oncogenic drivers across many cancer types.",
    therapeuticVulnerabilities: [
      "Osimertinib (EGFR T790M)",
      "Erlotinib (EGFR)",
      "Gefitinib (EGFR)",
      "Trastuzumab (HER2)",
      "Pertuzumab (HER2)",
      "T-DXd (HER2 ADC)",
      "Capmatinib (MET exon 14)",
      "Tepotinib (MET exon 14)",
      "Erdafitinib (FGFR)",
      "Pemigatinib (FGFR)",
      "Selpercatinib (RET)",
      "Pralsetinib (RET)",
      "Crizotinib (ALK/ROS1)",
      "Alectinib (ALK)",
      "Lorlatinib (ALK)",
      "Larotrectinib (NTRK)",
      "Entrectinib (NTRK/ROS1)",
      "Imatinib (KIT/PDGFRA)",
      "Sunitinib (multi-RTK)",
      "Midostaurin (FLT3)",
      "Gilteritinib (FLT3)",
    ],
  },
  {
    id: "vegf-angiogenesis",
    name: "VEGF/Angiogenesis Signaling",
    source: "KEGG",
    sourceId: "hsa04370",
    genes: [
      "VEGFA", "VEGFB", "VEGFC", "KDR", "FLT1",
      "FLT4", "NRP1", "HIF1A", "EPAS1", "VHL",
    ],
    description:
      "VEGF ligands bind VEGFR receptors to promote angiogenesis, vascular permeability, and endothelial survival. Tumors co-opt this pathway for blood supply. VHL loss in renal cell carcinoma stabilizes HIF, upregulating VEGF.",
    therapeuticVulnerabilities: [
      "Bevacizumab (anti-VEGF antibody)",
      "Ramucirumab (anti-VEGFR2)",
      "Sorafenib (multi-kinase/VEGFR)",
      "Sunitinib (multi-kinase/VEGFR)",
      "Pazopanib (VEGFR)",
      "Axitinib (VEGFR)",
      "Cabozantinib (VEGFR/MET)",
      "Lenvatinib (VEGFR/FGFR)",
    ],
  },
  {
    id: "apoptosis",
    name: "Apoptosis",
    source: "KEGG",
    sourceId: "hsa04210",
    genes: [
      "BCL2", "BCL2L1", "MCL1", "BAX", "BAK1",
      "BID", "BIM", "CASP3", "CASP8", "CASP9",
      "APAF1", "XIAP", "BIRC5", "FAS", "FASLG",
    ],
    description:
      "Programmed cell death executed through intrinsic (mitochondrial) and extrinsic (death receptor) cascades. BCL2 overexpression (common in CLL and follicular lymphoma) blocks apoptosis, enabling malignant cell accumulation.",
    therapeuticVulnerabilities: [
      "Venetoclax (BCL2)",
      "Navitoclax (BCL2/BCL-XL)",
      "AMG 176 (MCL1)",
      "TRAIL receptor agonists",
      "SMAC mimetics (IAP antagonists)",
    ],
  },
  {
    id: "chromatin-remodeling",
    name: "Chromatin Remodeling (SWI/SNF Complex)",
    source: "Reactome",
    sourceId: "R-HSA-3247509",
    genes: [
      "ARID1A", "ARID1B", "ARID2", "SMARCB1", "SMARCA4",
      "SMARCA2", "PBRM1", "ATRX", "DAXX", "BRD4",
      "BRD7", "SMARCE1",
    ],
    description:
      "SWI/SNF complexes remodel chromatin to regulate gene expression. Loss-of-function mutations in SWI/SNF subunits occur in ~20% of all cancers, disrupting gene regulation and creating dependencies on residual complex members and EZH2.",
    therapeuticVulnerabilities: [
      "EZH2 inhibitors (Tazemetostat, for SMARCB1-deficient tumors)",
      "BET inhibitors (targeting BRD4)",
      "HDAC inhibitors (Vorinostat, Romidepsin)",
      "SMARCA2 degraders (for SMARCA4-deficient tumors)",
    ],
  },
  {
    id: "idh-metabolic",
    name: "IDH/Metabolic Reprogramming",
    source: "Reactome",
    sourceId: "R-HSA-2978092",
    genes: [
      "IDH1", "IDH2", "SDH", "SDHA", "SDHB",
      "FH", "PKM", "HIF1A",
    ],
    description:
      "IDH1/2 gain-of-function mutations produce the oncometabolite 2-hydroxyglutarate (2-HG), which inhibits alpha-ketoglutarate-dependent dioxygenases, causing DNA and histone hypermethylation. Common in gliomas, AML, and cholangiocarcinoma.",
    therapeuticVulnerabilities: [
      "Ivosidenib (IDH1)",
      "Enasidenib (IDH2)",
      "Vorasidenib (dual IDH1/2, CNS-penetrant)",
      "Olutasidenib (IDH1)",
    ],
  },
  {
    id: "epigenetic",
    name: "Epigenetic Regulation",
    source: "Reactome",
    sourceId: "R-HSA-212300",
    genes: [
      "DNMT3A", "DNMT3B", "DNMT1", "TET1", "TET2",
      "EZH2", "KMT2A", "KMT2C", "KMT2D", "KDM6A",
      "SETD2", "NSD1", "NSD2", "ASXL1",
    ],
    description:
      "Enzymes controlling DNA methylation and histone modifications that govern gene expression programs. Mutations in epigenetic regulators are especially common in hematologic malignancies and often represent early clonal events.",
    therapeuticVulnerabilities: [
      "Azacitidine (DNMT inhibitor)",
      "Decitabine (DNMT inhibitor)",
      "Tazemetostat (EZH2 inhibitor)",
      "Pinometostat (DOT1L inhibitor, for KMT2A-rearranged)",
      "Enasidenib (IDH2)",
      "Vorinostat (HDAC inhibitor)",
      "Panobinostat (HDAC inhibitor)",
    ],
  },
  {
    id: "immune-checkpoint",
    name: "Immune Checkpoint Signaling",
    source: "KEGG",
    sourceId: "hsa04514",
    genes: [
      "CD274", "PDCD1LG2", "PDCD1", "CTLA4",
      "LAG3", "HAVCR2", "TIGIT", "VSIR",
      "CD80", "CD86", "CD28", "IDO1", "B2M",
      "JAK1", "JAK2",
    ],
    description:
      "Tumors exploit immune checkpoint ligands (PD-L1, CTLA-4 ligands) to evade T cell-mediated killing. Loss of B2M or JAK1/2 can confer resistance to checkpoint blockade. High TMB and MSI-H predict checkpoint inhibitor response.",
    therapeuticVulnerabilities: [
      "Pembrolizumab (anti-PD-1)",
      "Nivolumab (anti-PD-1)",
      "Atezolizumab (anti-PD-L1)",
      "Durvalumab (anti-PD-L1)",
      "Avelumab (anti-PD-L1)",
      "Ipilimumab (anti-CTLA-4)",
      "Tremelimumab (anti-CTLA-4)",
      "Relatlimab (anti-LAG-3)",
      "Tiragolumab (anti-TIGIT)",
    ],
  },
];

/** Look up a pathway by its id. */
export function getPathway(id: string): Pathway | undefined {
  return CANCER_PATHWAYS.find((p) => p.id === id);
}

/** Look up a pathway by gene membership (case-insensitive). */
export function getPathwaysByGene(gene: string): Pathway[] {
  const g = gene.toUpperCase();
  return CANCER_PATHWAYS.filter((p) => p.genes.includes(g));
}
