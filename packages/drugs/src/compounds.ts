import { Drug } from "@oncograph/core";

export const KEY_DRUGS: Drug[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // EGFR Tyrosine Kinase Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "osimertinib",
    name: "Osimertinib",
    aliases: ["Tagrisso", "AZD9291"],
    targets: ["EGFR", "EGFR T790M", "EGFR exon 19 del", "EGFR L858R"],
    mechanism: "Third-generation irreversible EGFR TKI selective for sensitizing and T790M resistance mutations",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "EGFR TKI",
    fdaApprovalIndications: [
      "2015: Metastatic NSCLC with EGFR T790M after prior EGFR TKI",
      "2018: First-line metastatic NSCLC with EGFR exon 19 del or L858R",
      "2020: Adjuvant NSCLC after resection with EGFR exon 19 del or L858R"
    ],
    associatedBiomarkers: ["egfr-l858r", "egfr-exon19del", "egfr-t790m"],
    combinationRegimens: ["osimertinib + chemotherapy (pemetrexed/platinum)"]
  },
  {
    id: "erlotinib",
    name: "Erlotinib",
    aliases: ["Tarceva", "OSI-774"],
    targets: ["EGFR"],
    mechanism: "First-generation reversible EGFR TKI",
    cancerTypes: ["nsclc", "paad"],
    approvalStatus: "approved",
    drugClass: "EGFR TKI",
    fdaApprovalIndications: [
      "2004: Locally advanced or metastatic NSCLC after prior chemotherapy",
      "2013: First-line metastatic NSCLC with EGFR exon 19 del or L858R",
      "2005: Advanced pancreatic cancer in combination with gemcitabine"
    ],
    associatedBiomarkers: ["egfr-l858r", "egfr-exon19del"],
    combinationRegimens: ["erlotinib + gemcitabine", "erlotinib + ramucirumab"]
  },
  {
    id: "gefitinib",
    name: "Gefitinib",
    aliases: ["Iressa", "ZD1839"],
    targets: ["EGFR"],
    mechanism: "First-generation reversible EGFR TKI",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "EGFR TKI",
    fdaApprovalIndications: [
      "2015: First-line metastatic NSCLC with EGFR exon 19 del or L858R"
    ],
    associatedBiomarkers: ["egfr-l858r", "egfr-exon19del"]
  },
  {
    id: "afatinib",
    name: "Afatinib",
    aliases: ["Gilotrif", "BIBW 2992"],
    targets: ["EGFR", "HER2", "HER4"],
    mechanism: "Second-generation irreversible pan-HER TKI",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "EGFR TKI",
    fdaApprovalIndications: [
      "2013: First-line metastatic NSCLC with EGFR exon 19 del or L858R",
      "2016: Metastatic squamous NSCLC after prior platinum chemotherapy"
    ],
    associatedBiomarkers: ["egfr-l858r", "egfr-exon19del"]
  },
  {
    id: "amivantamab",
    name: "Amivantamab",
    aliases: ["Rybrevant", "JNJ-61186372"],
    targets: ["EGFR", "MET"],
    mechanism: "Bispecific EGFR-MET antibody with immune cell-directing activity",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "EGFR TKI",
    fdaApprovalIndications: [
      "2021: Locally advanced or metastatic NSCLC with EGFR exon 20 insertion mutations after prior platinum chemotherapy",
      "2024: First-line metastatic NSCLC with EGFR exon 20 insertion mutations with chemotherapy"
    ],
    associatedBiomarkers: ["egfr-l858r", "met-amp"],
    combinationRegimens: ["amivantamab + lazertinib", "amivantamab + carboplatin + pemetrexed"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ALK Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "crizotinib",
    name: "Crizotinib",
    aliases: ["Xalkori", "PF-02341066"],
    targets: ["ALK", "ROS1", "MET"],
    mechanism: "First-generation ALK/ROS1/MET TKI",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "ALK inhibitor",
    fdaApprovalIndications: [
      "2011: ALK-positive metastatic NSCLC",
      "2016: ROS1-positive metastatic NSCLC"
    ],
    associatedBiomarkers: ["alk", "ros1"]
  },
  {
    id: "alectinib",
    name: "Alectinib",
    aliases: ["Alecensa", "CH5424802"],
    targets: ["ALK"],
    mechanism: "Second-generation selective ALK inhibitor with CNS penetration",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "ALK inhibitor",
    fdaApprovalIndications: [
      "2015: ALK-positive metastatic NSCLC after crizotinib progression",
      "2017: First-line ALK-positive metastatic NSCLC"
    ],
    associatedBiomarkers: ["alk"]
  },
  {
    id: "brigatinib",
    name: "Brigatinib",
    aliases: ["Alunbrig", "AP26113"],
    targets: ["ALK", "EGFR"],
    mechanism: "Next-generation ALK inhibitor active against multiple ALK resistance mutations",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "ALK inhibitor",
    fdaApprovalIndications: [
      "2017: ALK-positive metastatic NSCLC after crizotinib progression",
      "2020: First-line ALK-positive metastatic NSCLC"
    ],
    associatedBiomarkers: ["alk"]
  },
  {
    id: "lorlatinib",
    name: "Lorlatinib",
    aliases: ["Lorbrena", "PF-06463922"],
    targets: ["ALK", "ROS1"],
    mechanism: "Third-generation macrocyclic ALK/ROS1 inhibitor with broad resistance mutation coverage and CNS activity",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "ALK inhibitor",
    fdaApprovalIndications: [
      "2018: ALK-positive metastatic NSCLC after second-generation ALK TKI",
      "2021: First-line ALK-positive metastatic NSCLC"
    ],
    associatedBiomarkers: ["alk", "ros1"]
  },
  {
    id: "ceritinib",
    name: "Ceritinib",
    aliases: ["Zykadia", "LDK378"],
    targets: ["ALK"],
    mechanism: "Second-generation ALK inhibitor",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "ALK inhibitor",
    fdaApprovalIndications: [
      "2014: ALK-positive metastatic NSCLC after crizotinib progression",
      "2017: First-line ALK-positive metastatic NSCLC"
    ],
    associatedBiomarkers: ["alk"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // BRAF Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "vemurafenib",
    name: "Vemurafenib",
    aliases: ["Zelboraf", "PLX4032"],
    targets: ["BRAF V600E"],
    mechanism: "Selective BRAF V600 kinase inhibitor",
    cancerTypes: ["skcm"],
    approvalStatus: "approved",
    drugClass: "BRAF inhibitor",
    fdaApprovalIndications: [
      "2011: Unresectable or metastatic melanoma with BRAF V600E mutation"
    ],
    associatedBiomarkers: ["braf-mel"],
    combinationRegimens: ["vemurafenib + cobimetinib"]
  },
  {
    id: "dabrafenib",
    name: "Dabrafenib",
    aliases: ["Tafinlar", "GSK2118436"],
    targets: ["BRAF V600E", "BRAF V600K"],
    mechanism: "Selective BRAF V600 kinase inhibitor",
    cancerTypes: ["skcm", "nsclc", "thca"],
    approvalStatus: "approved",
    drugClass: "BRAF inhibitor",
    fdaApprovalIndications: [
      "2013: Unresectable or metastatic melanoma with BRAF V600E",
      "2017: Metastatic NSCLC with BRAF V600E (with trametinib)",
      "2018: Locally advanced or metastatic anaplastic thyroid cancer with BRAF V600E (with trametinib)",
      "2022: Unresectable or metastatic solid tumors with BRAF V600E (with trametinib, tumor-agnostic)"
    ],
    associatedBiomarkers: ["braf-mel", "braf-v600e-cns", "braf-thca"],
    combinationRegimens: ["dabrafenib + trametinib"]
  },
  {
    id: "encorafenib",
    name: "Encorafenib",
    aliases: ["Braftovi", "LGX818"],
    targets: ["BRAF"],
    mechanism: "Selective BRAF V600 kinase inhibitor with prolonged target dissociation",
    cancerTypes: ["crc", "skcm"],
    approvalStatus: "approved",
    drugClass: "BRAF inhibitor",
    fdaApprovalIndications: [
      "2018: Unresectable or metastatic melanoma with BRAF V600E/K (with binimetinib)",
      "2020: Metastatic CRC with BRAF V600E after prior therapy (with cetuximab)",
      "2023: First-line metastatic CRC with BRAF V600E (with cetuximab + chemotherapy)"
    ],
    associatedBiomarkers: ["braf-mel", "braf-v600e"],
    combinationRegimens: ["encorafenib + binimetinib", "encorafenib + cetuximab", "encorafenib + cetuximab + FOLFIRI"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MEK Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "trametinib",
    name: "Trametinib",
    aliases: ["Mekinist", "GSK1120212"],
    targets: ["MEK1", "MEK2"],
    mechanism: "Allosteric MEK1/2 inhibitor",
    cancerTypes: ["skcm", "nsclc", "thca"],
    approvalStatus: "approved",
    drugClass: "MEK inhibitor",
    fdaApprovalIndications: [
      "2013: Unresectable or metastatic melanoma with BRAF V600E/K",
      "2014: Melanoma with BRAF V600E/K in combination with dabrafenib",
      "2017: NSCLC with BRAF V600E (with dabrafenib)",
      "2018: Anaplastic thyroid cancer with BRAF V600E (with dabrafenib)",
      "2022: BRAF V600E solid tumors, tumor-agnostic (with dabrafenib)"
    ],
    associatedBiomarkers: ["braf-mel", "braf-v600e-cns", "braf-thca"],
    combinationRegimens: ["dabrafenib + trametinib"]
  },
  {
    id: "binimetinib",
    name: "Binimetinib",
    aliases: ["Mektovi", "MEK162"],
    targets: ["MEK1", "MEK2"],
    mechanism: "Selective allosteric MEK1/2 inhibitor",
    cancerTypes: ["skcm"],
    approvalStatus: "approved",
    drugClass: "MEK inhibitor",
    fdaApprovalIndications: [
      "2018: Unresectable or metastatic melanoma with BRAF V600E/K (with encorafenib)"
    ],
    associatedBiomarkers: ["braf-mel"],
    combinationRegimens: ["encorafenib + binimetinib"]
  },
  {
    id: "cobimetinib",
    name: "Cobimetinib",
    aliases: ["Cotellic", "GDC-0973"],
    targets: ["MEK1"],
    mechanism: "Selective MEK1 inhibitor",
    cancerTypes: ["skcm"],
    approvalStatus: "approved",
    drugClass: "MEK inhibitor",
    fdaApprovalIndications: [
      "2015: Unresectable or metastatic melanoma with BRAF V600E/K (with vemurafenib)"
    ],
    associatedBiomarkers: ["braf-mel"],
    combinationRegimens: ["vemurafenib + cobimetinib"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Immune Checkpoint Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "pembrolizumab",
    name: "Pembrolizumab",
    aliases: ["Keytruda", "MK-3475", "lambrolizumab"],
    targets: ["PD-1"],
    mechanism: "Humanized anti-PD-1 monoclonal antibody blocking PD-1/PD-L1 interaction",
    cancerTypes: ["nsclc", "skcm", "crc-msi", "blca", "hnscc", "gastric", "brca-tnbc", "endometrial", "kirc", "hcc"],
    approvalStatus: "approved",
    drugClass: "Checkpoint inhibitor (PD-1)",
    fdaApprovalIndications: [
      "2014: Unresectable or metastatic melanoma",
      "2015: Metastatic NSCLC with PD-L1 TPS >= 50%, first-line",
      "2017: MSI-H/dMMR solid tumors (tumor-agnostic)",
      "2017: Locally advanced or metastatic urothelial carcinoma",
      "2018: Metastatic NSCLC first-line with chemotherapy",
      "2019: Metastatic or recurrent HNSCC first-line",
      "2020: TMB-H solid tumors >= 10 mut/Mb (tumor-agnostic)",
      "2020: Metastatic TNBC with PD-L1 CPS >= 10 (with chemotherapy)",
      "2021: Adjuvant melanoma after resection",
      "2023: Advanced endometrial carcinoma with dMMR (with lenvatinib for pMMR)"
    ],
    associatedBiomarkers: ["pdl1", "msi", "msi-agnostic", "tmb-h", "tmb-agnostic", "dmmr"],
    combinationRegimens: ["pembrolizumab + carboplatin + pemetrexed", "pembrolizumab + carboplatin + paclitaxel", "pembrolizumab + lenvatinib", "pembrolizumab + axitinib"]
  },
  {
    id: "nivolumab",
    name: "Nivolumab",
    aliases: ["Opdivo", "BMS-936558", "MDX-1106"],
    targets: ["PD-1"],
    mechanism: "Fully human anti-PD-1 monoclonal antibody",
    cancerTypes: ["nsclc", "skcm", "kirc", "hcc", "crc-msi", "blca", "hnscc", "gastric"],
    approvalStatus: "approved",
    drugClass: "Checkpoint inhibitor (PD-1)",
    fdaApprovalIndications: [
      "2014: Unresectable or metastatic melanoma",
      "2015: Metastatic squamous NSCLC after prior platinum chemotherapy",
      "2015: Advanced renal cell carcinoma after prior anti-angiogenic therapy",
      "2016: Classical Hodgkin lymphoma after auto-HSCT and brentuximab vedotin",
      "2017: MSI-H/dMMR metastatic CRC after fluoropyrimidine/oxaliplatin/irinotecan",
      "2020: First-line advanced HCC (with ipilimumab)",
      "2022: Adjuvant NSCLC after resection and platinum-based chemotherapy"
    ],
    associatedBiomarkers: ["pdl1", "msi", "dmmr"],
    combinationRegimens: ["nivolumab + ipilimumab", "nivolumab + cabozantinib", "nivolumab + chemotherapy"]
  },
  {
    id: "atezolizumab",
    name: "Atezolizumab",
    aliases: ["Tecentriq", "MPDL3280A"],
    targets: ["PD-L1"],
    mechanism: "Humanized anti-PD-L1 monoclonal antibody",
    cancerTypes: ["nsclc", "sclc", "blca", "hcc", "brca-tnbc"],
    approvalStatus: "approved",
    drugClass: "Checkpoint inhibitor (PD-L1)",
    fdaApprovalIndications: [
      "2016: Locally advanced or metastatic urothelial carcinoma after platinum chemotherapy",
      "2016: Metastatic NSCLC after prior chemotherapy",
      "2019: First-line extensive-stage SCLC (with carboplatin/etoposide)",
      "2020: First-line metastatic NSCLC (with bevacizumab + chemotherapy for non-squamous)",
      "2021: Adjuvant NSCLC after resection with PD-L1 >= 1%",
      "2020: Unresectable HCC (with bevacizumab)"
    ],
    associatedBiomarkers: ["pdl1"],
    combinationRegimens: ["atezolizumab + bevacizumab", "atezolizumab + carboplatin + etoposide", "atezolizumab + bevacizumab + carboplatin + paclitaxel", "atezolizumab + nab-paclitaxel"]
  },
  {
    id: "durvalumab",
    name: "Durvalumab",
    aliases: ["Imfinzi", "MEDI4736"],
    targets: ["PD-L1"],
    mechanism: "Fully human anti-PD-L1 monoclonal antibody",
    cancerTypes: ["nsclc", "sclc", "blca", "hcc", "chol"],
    approvalStatus: "approved",
    drugClass: "Checkpoint inhibitor (PD-L1)",
    fdaApprovalIndications: [
      "2017: Locally advanced or metastatic urothelial carcinoma after platinum chemotherapy",
      "2018: Unresectable stage III NSCLC after chemoradiation (consolidation)",
      "2020: Extensive-stage SCLC first-line (with etoposide/platinum)",
      "2022: Advanced biliary tract cancer (with gemcitabine/cisplatin)",
      "2023: Unresectable HCC (with tremelimumab)"
    ],
    associatedBiomarkers: ["pdl1"],
    combinationRegimens: ["durvalumab + tremelimumab", "durvalumab + gemcitabine + cisplatin", "durvalumab + etoposide + platinum"]
  },
  {
    id: "ipilimumab",
    name: "Ipilimumab",
    aliases: ["Yervoy", "MDX-010", "BMS-734016"],
    targets: ["CTLA-4"],
    mechanism: "Fully human anti-CTLA-4 monoclonal antibody augmenting T-cell activation",
    cancerTypes: ["skcm", "kirc", "nsclc", "hcc", "crc-msi", "meso"],
    approvalStatus: "approved",
    drugClass: "Checkpoint inhibitor (CTLA-4)",
    fdaApprovalIndications: [
      "2011: Unresectable or metastatic melanoma",
      "2018: Advanced renal cell carcinoma first-line (with nivolumab)",
      "2018: MSI-H/dMMR metastatic CRC (with nivolumab)",
      "2020: Metastatic NSCLC first-line (with nivolumab +/- chemotherapy)",
      "2020: Unresectable malignant pleural mesothelioma (with nivolumab)",
      "2020: Advanced HCC (with nivolumab)"
    ],
    associatedBiomarkers: ["msi", "dmmr"],
    combinationRegimens: ["nivolumab + ipilimumab"]
  },
  {
    id: "cemiplimab",
    name: "Cemiplimab",
    aliases: ["Libtayo", "REGN2810"],
    targets: ["PD-1"],
    mechanism: "Fully human anti-PD-1 monoclonal antibody",
    cancerTypes: ["nsclc", "skcm"],
    approvalStatus: "approved",
    drugClass: "Checkpoint inhibitor (PD-1)",
    fdaApprovalIndications: [
      "2018: Metastatic or locally advanced cutaneous squamous cell carcinoma",
      "2021: First-line advanced NSCLC with PD-L1 TPS >= 50%",
      "2021: Advanced basal cell carcinoma after hedgehog inhibitor"
    ],
    associatedBiomarkers: ["pdl1"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // HER2-Targeted Therapies
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "trastuzumab",
    name: "Trastuzumab",
    aliases: ["Herceptin"],
    targets: ["HER2"],
    mechanism: "Humanized anti-HER2 monoclonal antibody blocking receptor dimerization and signaling",
    cancerTypes: ["brca", "brca-her2", "gastric"],
    approvalStatus: "approved",
    drugClass: "HER2-targeted antibody",
    fdaApprovalIndications: [
      "1998: HER2-positive metastatic breast cancer",
      "2006: Adjuvant HER2-positive breast cancer",
      "2010: HER2-positive metastatic gastric/GEJ adenocarcinoma (with chemotherapy)"
    ],
    associatedBiomarkers: ["her2", "her2-gastric"],
    combinationRegimens: ["trastuzumab + pertuzumab + docetaxel", "trastuzumab + chemotherapy", "trastuzumab + pertuzumab (CRC)"]
  },
  {
    id: "pertuzumab",
    name: "Pertuzumab",
    aliases: ["Perjeta"],
    targets: ["HER2"],
    mechanism: "Humanized anti-HER2 monoclonal antibody blocking HER2 dimerization (different epitope from trastuzumab)",
    cancerTypes: ["brca", "brca-her2"],
    approvalStatus: "approved",
    drugClass: "HER2-targeted antibody",
    fdaApprovalIndications: [
      "2012: HER2-positive metastatic breast cancer (with trastuzumab + docetaxel)",
      "2013: Neoadjuvant HER2-positive breast cancer (with trastuzumab + chemotherapy)",
      "2017: Adjuvant HER2-positive breast cancer (with trastuzumab + chemotherapy)"
    ],
    associatedBiomarkers: ["her2"],
    combinationRegimens: ["trastuzumab + pertuzumab + docetaxel", "trastuzumab + pertuzumab + chemotherapy"]
  },
  {
    id: "t-dxd",
    name: "Trastuzumab Deruxtecan",
    aliases: ["Enhertu", "T-DXd", "DS-8201a", "fam-trastuzumab deruxtecan-nxki"],
    targets: ["HER2"],
    mechanism: "Anti-HER2 antibody-drug conjugate with topoisomerase I inhibitor payload and bystander killing effect",
    cancerTypes: ["brca", "brca-her2", "nsclc", "gastric", "crc"],
    approvalStatus: "approved",
    drugClass: "Antibody-drug conjugate (HER2)",
    fdaApprovalIndications: [
      "2019: HER2-positive metastatic breast cancer after two or more prior anti-HER2 regimens",
      "2022: HER2-low metastatic breast cancer after prior chemotherapy",
      "2023: HER2-positive metastatic NSCLC after prior therapy",
      "2023: Locally advanced or metastatic HER2-positive gastric/GEJ adenocarcinoma",
      "2024: HER2-positive metastatic CRC after prior therapy"
    ],
    associatedBiomarkers: ["her2", "her2-crc", "her2-gastric"]
  },
  {
    id: "lapatinib",
    name: "Lapatinib",
    aliases: ["Tykerb", "GW572016"],
    targets: ["HER2", "EGFR"],
    mechanism: "Dual EGFR/HER2 reversible TKI",
    cancerTypes: ["brca", "brca-her2"],
    approvalStatus: "approved",
    drugClass: "HER2-targeted TKI",
    fdaApprovalIndications: [
      "2007: HER2-positive advanced breast cancer after prior trastuzumab (with capecitabine)",
      "2010: HER2-positive HR-positive metastatic breast cancer (with letrozole)"
    ],
    associatedBiomarkers: ["her2"],
    combinationRegimens: ["lapatinib + capecitabine", "lapatinib + letrozole", "lapatinib + trastuzumab"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CDK4/6 Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "palbociclib",
    name: "Palbociclib",
    aliases: ["Ibrance", "PD-0332991"],
    targets: ["CDK4", "CDK6"],
    mechanism: "Selective CDK4/6 inhibitor causing G1 cell cycle arrest",
    cancerTypes: ["brca"],
    approvalStatus: "approved",
    drugClass: "CDK4/6 inhibitor",
    fdaApprovalIndications: [
      "2015: HR-positive HER2-negative advanced breast cancer first-line (with letrozole)",
      "2016: HR-positive HER2-negative advanced breast cancer after prior endocrine therapy (with fulvestrant)"
    ],
    associatedBiomarkers: ["er"],
    combinationRegimens: ["palbociclib + letrozole", "palbociclib + fulvestrant"]
  },
  {
    id: "ribociclib",
    name: "Ribociclib",
    aliases: ["Kisqali", "LEE011"],
    targets: ["CDK4", "CDK6"],
    mechanism: "Selective CDK4/6 inhibitor causing G1 cell cycle arrest",
    cancerTypes: ["brca"],
    approvalStatus: "approved",
    drugClass: "CDK4/6 inhibitor",
    fdaApprovalIndications: [
      "2017: HR-positive HER2-negative advanced breast cancer first-line (with aromatase inhibitor)",
      "2018: HR-positive HER2-negative advanced breast cancer (with fulvestrant)",
      "2024: Early-stage HR-positive HER2-negative breast cancer adjuvant (with endocrine therapy)"
    ],
    associatedBiomarkers: ["er"],
    combinationRegimens: ["ribociclib + letrozole", "ribociclib + fulvestrant", "ribociclib + endocrine therapy"]
  },
  {
    id: "abemaciclib",
    name: "Abemaciclib",
    aliases: ["Verzenio", "LY2835219"],
    targets: ["CDK4", "CDK6"],
    mechanism: "Selective CDK4/6 inhibitor with greater CDK4 selectivity; can be used as monotherapy",
    cancerTypes: ["brca"],
    approvalStatus: "approved",
    drugClass: "CDK4/6 inhibitor",
    fdaApprovalIndications: [
      "2017: HR-positive HER2-negative advanced breast cancer after prior endocrine therapy and chemotherapy (monotherapy)",
      "2017: HR-positive HER2-negative advanced breast cancer (with fulvestrant)",
      "2021: Adjuvant HR-positive HER2-negative high-risk early breast cancer (with endocrine therapy)"
    ],
    associatedBiomarkers: ["er", "ki67"],
    combinationRegimens: ["abemaciclib + fulvestrant", "abemaciclib + endocrine therapy"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // PARP Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "olaparib",
    name: "Olaparib",
    aliases: ["Lynparza", "AZD2281"],
    targets: ["PARP1", "PARP2"],
    mechanism: "PARP inhibitor causing synthetic lethality in homologous recombination-deficient tumors",
    cancerTypes: ["brca", "ov", "prad", "paad"],
    approvalStatus: "approved",
    drugClass: "PARP inhibitor",
    fdaApprovalIndications: [
      "2014: Germline BRCA-mutated advanced ovarian cancer after three or more prior lines",
      "2018: Maintenance for BRCA-mutated advanced ovarian cancer after platinum response",
      "2019: Maintenance for advanced ovarian cancer regardless of BRCA status (first-line with bevacizumab for HRD+)",
      "2020: Germline BRCA-mutated HER2-negative metastatic breast cancer",
      "2020: Metastatic castration-resistant prostate cancer with HRR gene mutations",
      "2020: Germline BRCA-mutated metastatic pancreatic cancer maintenance after platinum"
    ],
    associatedBiomarkers: ["brca1", "brca2", "brca-ov", "brca-prad", "hrd"],
    combinationRegimens: ["olaparib + bevacizumab", "olaparib + abiraterone"]
  },
  {
    id: "rucaparib",
    name: "Rucaparib",
    aliases: ["Rubraca", "AG-014699", "CO-338"],
    targets: ["PARP1", "PARP2", "PARP3"],
    mechanism: "PARP inhibitor with activity in BRCA-mutated and HRD tumors",
    cancerTypes: ["ov", "prad"],
    approvalStatus: "approved",
    drugClass: "PARP inhibitor",
    fdaApprovalIndications: [
      "2016: BRCA-mutated advanced ovarian cancer after two or more prior lines",
      "2018: Maintenance for recurrent ovarian cancer after platinum response",
      "2020: BRCA-mutated metastatic castration-resistant prostate cancer after prior AR-directed therapy and taxane"
    ],
    associatedBiomarkers: ["brca1", "brca2", "brca-ov", "brca-prad", "hrd"]
  },
  {
    id: "niraparib",
    name: "Niraparib",
    aliases: ["Zejula", "MK-4827"],
    targets: ["PARP1", "PARP2"],
    mechanism: "PARP inhibitor effective regardless of BRCA status in ovarian cancer maintenance",
    cancerTypes: ["ov"],
    approvalStatus: "approved",
    drugClass: "PARP inhibitor",
    fdaApprovalIndications: [
      "2017: Maintenance for recurrent ovarian cancer after platinum response (regardless of BRCA status)",
      "2020: First-line maintenance for advanced ovarian cancer after platinum response (HRD-positive)",
      "2020: Advanced ovarian cancer after three or more prior lines (BRCA-mutated or HRD-positive)"
    ],
    associatedBiomarkers: ["brca1", "brca2", "brca-ov", "hrd"]
  },
  {
    id: "talazoparib",
    name: "Talazoparib",
    aliases: ["Talzenna", "BMN-673"],
    targets: ["PARP1", "PARP2"],
    mechanism: "PARP inhibitor with potent PARP trapping activity",
    cancerTypes: ["brca", "prad"],
    approvalStatus: "approved",
    drugClass: "PARP inhibitor",
    fdaApprovalIndications: [
      "2018: Germline BRCA-mutated HER2-negative locally advanced or metastatic breast cancer",
      "2023: HRR gene-mutated metastatic castration-resistant prostate cancer (with enzalutamide)"
    ],
    associatedBiomarkers: ["brca1", "brca2"],
    combinationRegimens: ["talazoparib + enzalutamide"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Antibody-Drug Conjugates (ADCs)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sacituzumab-govitecan",
    name: "Sacituzumab Govitecan",
    aliases: ["Trodelvy", "IMMU-132"],
    targets: ["Trop-2"],
    mechanism: "Anti-Trop-2 antibody-drug conjugate with SN-38 (topoisomerase I inhibitor) payload",
    cancerTypes: ["brca-tnbc", "blca"],
    approvalStatus: "approved",
    drugClass: "Antibody-drug conjugate (Trop-2)",
    fdaApprovalIndications: [
      "2020: Metastatic triple-negative breast cancer after two or more prior lines",
      "2021: HR-positive HER2-negative metastatic breast cancer after endocrine therapy and two or more prior chemotherapies",
      "2021: Locally advanced or metastatic urothelial cancer after platinum and checkpoint inhibitor"
    ],
    associatedBiomarkers: ["trop2-blca"]
  },
  {
    id: "enfortumab-vedotin",
    name: "Enfortumab Vedotin",
    aliases: ["Padcev", "EV", "ASG-22ME"],
    targets: ["Nectin-4"],
    mechanism: "Anti-Nectin-4 antibody-drug conjugate with MMAE (microtubule-disrupting) payload",
    cancerTypes: ["blca"],
    approvalStatus: "approved",
    drugClass: "Antibody-drug conjugate (Nectin-4)",
    fdaApprovalIndications: [
      "2019: Locally advanced or metastatic urothelial cancer after prior platinum and checkpoint inhibitor",
      "2023: First-line locally advanced or metastatic urothelial cancer (with pembrolizumab)"
    ],
    associatedBiomarkers: ["nectin4"],
    combinationRegimens: ["enfortumab vedotin + pembrolizumab"]
  },
  {
    id: "polatuzumab-vedotin",
    name: "Polatuzumab Vedotin",
    aliases: ["Polivy", "DCDS4501A"],
    targets: ["CD79b"],
    mechanism: "Anti-CD79b antibody-drug conjugate with MMAE payload targeting B cells",
    cancerTypes: ["dlbcl"],
    approvalStatus: "approved",
    drugClass: "Antibody-drug conjugate (CD79b)",
    fdaApprovalIndications: [
      "2019: Relapsed/refractory DLBCL after two or more prior lines (with bendamustine + rituximab)",
      "2023: Previously untreated DLBCL (with R-CHP regimen)"
    ],
    combinationRegimens: ["polatuzumab vedotin + bendamustine + rituximab", "pola-R-CHP"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // KRAS Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sotorasib",
    name: "Sotorasib",
    aliases: ["Lumakras", "AMG 510"],
    targets: ["KRAS G12C"],
    mechanism: "First-in-class covalent KRAS G12C inhibitor locking KRAS in inactive GDP-bound state",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "KRAS inhibitor",
    fdaApprovalIndications: [
      "2021: KRAS G12C-mutated locally advanced or metastatic NSCLC after prior systemic therapy"
    ],
    associatedBiomarkers: ["kras-g12c"]
  },
  {
    id: "adagrasib",
    name: "Adagrasib",
    aliases: ["Krazati", "MRTX849"],
    targets: ["KRAS G12C"],
    mechanism: "Covalent KRAS G12C inhibitor with long half-life and CNS penetration",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "KRAS inhibitor",
    fdaApprovalIndications: [
      "2022: KRAS G12C-mutated locally advanced or metastatic NSCLC after prior systemic therapy"
    ],
    associatedBiomarkers: ["kras-g12c"],
    combinationRegimens: ["adagrasib + cetuximab"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Hormonal Therapies
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "tamoxifen",
    name: "Tamoxifen",
    aliases: ["Nolvadex", "Soltamox"],
    targets: ["Estrogen receptor"],
    mechanism: "Selective estrogen receptor modulator (SERM) with antagonist activity in breast tissue",
    cancerTypes: ["brca"],
    approvalStatus: "approved",
    drugClass: "Hormonal therapy (SERM)",
    fdaApprovalIndications: [
      "1977: Metastatic breast cancer",
      "1986: Adjuvant ER-positive breast cancer",
      "1998: Breast cancer risk reduction in high-risk women",
      "2000: Ductal carcinoma in situ (DCIS) after surgery and radiation"
    ],
    associatedBiomarkers: ["er", "pr"]
  },
  {
    id: "letrozole",
    name: "Letrozole",
    aliases: ["Femara"],
    targets: ["Aromatase (CYP19A1)"],
    mechanism: "Non-steroidal aromatase inhibitor suppressing peripheral estrogen synthesis",
    cancerTypes: ["brca"],
    approvalStatus: "approved",
    drugClass: "Hormonal therapy (aromatase inhibitor)",
    fdaApprovalIndications: [
      "1997: Advanced breast cancer in postmenopausal women after anti-estrogen therapy",
      "2001: First-line advanced HR-positive breast cancer in postmenopausal women",
      "2004: Extended adjuvant HR-positive early breast cancer after 5 years of tamoxifen",
      "2005: Adjuvant HR-positive early breast cancer in postmenopausal women"
    ],
    associatedBiomarkers: ["er", "pr"],
    combinationRegimens: ["letrozole + palbociclib", "letrozole + ribociclib"]
  },
  {
    id: "enzalutamide",
    name: "Enzalutamide",
    aliases: ["Xtandi", "MDV3100"],
    targets: ["Androgen receptor"],
    mechanism: "Second-generation androgen receptor signaling inhibitor blocking AR nuclear translocation",
    cancerTypes: ["prad"],
    approvalStatus: "approved",
    drugClass: "Hormonal therapy (AR antagonist)",
    fdaApprovalIndications: [
      "2012: Metastatic castration-resistant prostate cancer after prior docetaxel",
      "2014: Metastatic castration-resistant prostate cancer pre-chemotherapy",
      "2019: Non-metastatic castration-resistant prostate cancer",
      "2020: Metastatic castration-sensitive prostate cancer"
    ],
    associatedBiomarkers: ["ar-v7"],
    combinationRegimens: ["enzalutamide + talazoparib"]
  },
  {
    id: "abiraterone",
    name: "Abiraterone",
    aliases: ["Zytiga", "CB-7598"],
    targets: ["CYP17A1"],
    mechanism: "CYP17 inhibitor blocking androgen biosynthesis in adrenal glands and tumor",
    cancerTypes: ["prad"],
    approvalStatus: "approved",
    drugClass: "Hormonal therapy (CYP17 inhibitor)",
    fdaApprovalIndications: [
      "2011: Metastatic castration-resistant prostate cancer after prior docetaxel (with prednisone)",
      "2012: Metastatic castration-resistant prostate cancer pre-chemotherapy (with prednisone)",
      "2018: Metastatic high-risk castration-sensitive prostate cancer (with prednisone)"
    ],
    associatedBiomarkers: ["ar-v7"],
    combinationRegimens: ["abiraterone + prednisone", "abiraterone + olaparib"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // BCR-ABL Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "imatinib",
    name: "Imatinib",
    aliases: ["Gleevec", "STI571"],
    targets: ["BCR-ABL", "KIT", "PDGFRA"],
    mechanism: "Multi-target TKI inhibiting BCR-ABL, KIT, and PDGFRA kinases",
    cancerTypes: ["cml", "all", "sarc"],
    approvalStatus: "approved",
    drugClass: "BCR-ABL TKI",
    fdaApprovalIndications: [
      "2001: Philadelphia chromosome-positive CML (chronic phase)",
      "2002: KIT-positive unresectable/metastatic GIST",
      "2006: Adjuvant KIT-positive GIST after resection",
      "2006: Ph+ ALL (with chemotherapy)"
    ],
    associatedBiomarkers: ["bcr-abl", "kit-gist", "ckit-mel", "pdgfra-gist"]
  },
  {
    id: "dasatinib",
    name: "Dasatinib",
    aliases: ["Sprycel", "BMS-354825"],
    targets: ["BCR-ABL", "SRC family"],
    mechanism: "Second-generation BCR-ABL/SRC family kinase inhibitor active against most imatinib-resistant mutations",
    cancerTypes: ["cml", "all"],
    approvalStatus: "approved",
    drugClass: "BCR-ABL TKI",
    fdaApprovalIndications: [
      "2006: CML with resistance or intolerance to imatinib (all phases)",
      "2010: Newly diagnosed chronic phase CML",
      "2017: Ph+ ALL in combination with chemotherapy (pediatric)"
    ],
    associatedBiomarkers: ["bcr-abl"]
  },
  {
    id: "nilotinib",
    name: "Nilotinib",
    aliases: ["Tasigna", "AMN107"],
    targets: ["BCR-ABL"],
    mechanism: "Second-generation BCR-ABL TKI with higher potency and selectivity than imatinib",
    cancerTypes: ["cml"],
    approvalStatus: "approved",
    drugClass: "BCR-ABL TKI",
    fdaApprovalIndications: [
      "2007: CML with resistance or intolerance to imatinib (chronic and accelerated phase)",
      "2010: Newly diagnosed chronic phase Ph+ CML"
    ],
    associatedBiomarkers: ["bcr-abl"]
  },
  {
    id: "ponatinib",
    name: "Ponatinib",
    aliases: ["Iclusig", "AP24534"],
    targets: ["BCR-ABL", "BCR-ABL T315I"],
    mechanism: "Third-generation BCR-ABL TKI active against T315I gatekeeper mutation",
    cancerTypes: ["cml", "all"],
    approvalStatus: "approved",
    drugClass: "BCR-ABL TKI",
    fdaApprovalIndications: [
      "2012: CML or Ph+ ALL resistant or intolerant to prior TKI therapy",
      "2016: CML or Ph+ ALL with T315I mutation"
    ],
    associatedBiomarkers: ["bcr-abl"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // VEGF / Angiogenesis Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "bevacizumab",
    name: "Bevacizumab",
    aliases: ["Avastin"],
    targets: ["VEGF-A"],
    mechanism: "Humanized anti-VEGF-A monoclonal antibody inhibiting tumor angiogenesis",
    cancerTypes: ["crc", "nsclc", "gbm", "ov", "kirc", "hcc"],
    approvalStatus: "approved",
    drugClass: "Anti-angiogenic (VEGF antibody)",
    fdaApprovalIndications: [
      "2004: First-line metastatic CRC (with fluoropyrimidine-based chemotherapy)",
      "2006: First-line non-squamous NSCLC (with carboplatin/paclitaxel)",
      "2009: Recurrent glioblastoma",
      "2009: Metastatic renal cell carcinoma (with interferon alfa)",
      "2014: Platinum-resistant recurrent ovarian cancer",
      "2018: Advanced ovarian cancer first-line (with chemotherapy, then maintenance with olaparib for HRD+)"
    ],
    associatedBiomarkers: ["vhl"],
    combinationRegimens: ["bevacizumab + FOLFOX", "bevacizumab + FOLFIRI", "bevacizumab + carboplatin + paclitaxel", "bevacizumab + atezolizumab", "bevacizumab + olaparib"]
  },
  {
    id: "sunitinib",
    name: "Sunitinib",
    aliases: ["Sutent", "SU11248"],
    targets: ["VEGFR1/2/3", "PDGFR", "KIT", "FLT3", "RET"],
    mechanism: "Multi-target receptor TKI inhibiting VEGFR, PDGFR, KIT, FLT3, and RET",
    cancerTypes: ["kirc", "sarc", "paad"],
    approvalStatus: "approved",
    drugClass: "Multi-target TKI (anti-angiogenic)",
    fdaApprovalIndications: [
      "2006: Advanced renal cell carcinoma",
      "2006: Imatinib-resistant or -intolerant GIST",
      "2011: Progressive well-differentiated pancreatic neuroendocrine tumors"
    ],
    associatedBiomarkers: ["vhl", "kit-gist"]
  },
  {
    id: "lenvatinib",
    name: "Lenvatinib",
    aliases: ["Lenvima", "E7080"],
    targets: ["VEGFR1/2/3", "FGFR1-4", "PDGFRA", "RET", "KIT"],
    mechanism: "Multi-kinase inhibitor targeting VEGFR, FGFR, PDGFR, RET, and KIT",
    cancerTypes: ["thca", "hcc", "kirc", "endometrial"],
    approvalStatus: "approved",
    drugClass: "Multi-target TKI (anti-angiogenic)",
    fdaApprovalIndications: [
      "2015: Radioactive iodine-refractory differentiated thyroid cancer",
      "2016: Advanced renal cell carcinoma after prior anti-angiogenic therapy (with everolimus)",
      "2018: First-line unresectable HCC",
      "2019: Advanced endometrial carcinoma after prior systemic therapy (with pembrolizumab)",
      "2021: First-line advanced renal cell carcinoma (with pembrolizumab)"
    ],
    combinationRegimens: ["lenvatinib + pembrolizumab", "lenvatinib + everolimus"]
  },
  {
    id: "cabozantinib",
    name: "Cabozantinib",
    aliases: ["Cabometyx", "Cometriq", "XL184"],
    targets: ["VEGFR2", "MET", "AXL", "RET", "ROS1", "FLT3"],
    mechanism: "Multi-target TKI with potent activity against VEGFR2, MET, and AXL",
    cancerTypes: ["kirc", "hcc", "thca"],
    approvalStatus: "approved",
    drugClass: "Multi-target TKI (anti-angiogenic)",
    fdaApprovalIndications: [
      "2012: Progressive metastatic medullary thyroid cancer",
      "2016: Advanced renal cell carcinoma after prior anti-angiogenic therapy",
      "2021: First-line advanced renal cell carcinoma (with nivolumab)",
      "2019: HCC after prior sorafenib"
    ],
    combinationRegimens: ["cabozantinib + nivolumab"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // IDH Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "vorasidenib",
    name: "Vorasidenib",
    aliases: ["Voranigo", "AG-881"],
    targets: ["IDH1", "IDH2"],
    mechanism: "Dual IDH1/IDH2 inhibitor with CNS penetration for brain tumors",
    cancerTypes: ["lgg"],
    approvalStatus: "approved",
    drugClass: "IDH inhibitor",
    fdaApprovalIndications: [
      "2024: Grade 2 astrocytoma or oligodendroglioma with IDH1 or IDH2 mutation after prior surgery"
    ],
    associatedBiomarkers: ["idh1", "idh2"]
  },
  {
    id: "ivosidenib",
    name: "Ivosidenib",
    aliases: ["Tibsovo", "AG-120"],
    targets: ["IDH1"],
    mechanism: "Selective IDH1 inhibitor reducing 2-hydroxyglutarate oncometabolite",
    cancerTypes: ["aml", "chol"],
    approvalStatus: "approved",
    drugClass: "IDH inhibitor",
    fdaApprovalIndications: [
      "2018: Relapsed/refractory AML with IDH1 mutation",
      "2019: Newly diagnosed AML with IDH1 mutation in patients 75+ or unfit for intensive chemotherapy",
      "2021: Previously treated locally advanced or metastatic cholangiocarcinoma with IDH1 mutation"
    ],
    associatedBiomarkers: ["idh1", "idh1-aml", "idh1-chol"]
  },
  {
    id: "enasidenib",
    name: "Enasidenib",
    aliases: ["Idhifa", "AG-221"],
    targets: ["IDH2"],
    mechanism: "Selective IDH2 inhibitor inducing differentiation of leukemic blasts",
    cancerTypes: ["aml"],
    approvalStatus: "approved",
    drugClass: "IDH inhibitor",
    fdaApprovalIndications: [
      "2017: Relapsed/refractory AML with IDH2 mutation"
    ],
    associatedBiomarkers: ["idh2", "idh2-aml"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // FLT3 Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "midostaurin",
    name: "Midostaurin",
    aliases: ["Rydapt", "PKC412"],
    targets: ["FLT3", "KIT", "PDGFR", "PKC"],
    mechanism: "Multi-kinase inhibitor active against FLT3-ITD and FLT3-TKD mutations",
    cancerTypes: ["aml"],
    approvalStatus: "approved",
    drugClass: "FLT3 inhibitor",
    fdaApprovalIndications: [
      "2017: Newly diagnosed FLT3-mutated AML (with standard cytarabine + daunorubicin induction and cytarabine consolidation)",
      "2017: Advanced systemic mastocytosis"
    ],
    associatedBiomarkers: ["flt3-itd", "flt3-tkd"],
    combinationRegimens: ["midostaurin + cytarabine + daunorubicin (7+3)"]
  },
  {
    id: "gilteritinib",
    name: "Gilteritinib",
    aliases: ["Xospata", "ASP2215"],
    targets: ["FLT3", "AXL"],
    mechanism: "Selective FLT3/AXL inhibitor active against FLT3-ITD and TKD resistance mutations",
    cancerTypes: ["aml"],
    approvalStatus: "approved",
    drugClass: "FLT3 inhibitor",
    fdaApprovalIndications: [
      "2018: Relapsed/refractory FLT3-mutated AML"
    ],
    associatedBiomarkers: ["flt3-itd", "flt3-tkd"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // BTK / BCL-2 Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "ibrutinib",
    name: "Ibrutinib",
    aliases: ["Imbruvica", "PCI-32765"],
    targets: ["BTK"],
    mechanism: "First-in-class covalent irreversible BTK inhibitor disrupting B-cell receptor signaling",
    cancerTypes: ["cll", "lymphoma", "dlbcl"],
    approvalStatus: "approved",
    drugClass: "BTK inhibitor",
    fdaApprovalIndications: [
      "2013: Relapsed/refractory mantle cell lymphoma",
      "2014: CLL/SLL (including del(17p))",
      "2015: Waldenstrom macroglobulinemia",
      "2017: Marginal zone lymphoma after prior anti-CD20 therapy",
      "2017: Chronic graft-versus-host disease"
    ],
    associatedBiomarkers: ["del17p-cll"],
    combinationRegimens: ["ibrutinib + rituximab", "ibrutinib + venetoclax"]
  },
  {
    id: "venetoclax",
    name: "Venetoclax",
    aliases: ["Venclexta", "ABT-199"],
    targets: ["BCL-2"],
    mechanism: "Selective BCL-2 inhibitor restoring apoptotic signaling in BCL-2-dependent tumors",
    cancerTypes: ["cll", "aml"],
    approvalStatus: "approved",
    drugClass: "BCL-2 inhibitor",
    fdaApprovalIndications: [
      "2016: CLL with del(17p) after prior therapy",
      "2018: CLL/SLL with or without del(17p) (with obinutuzumab or rituximab)",
      "2018: Newly diagnosed AML in patients 75+ or unfit for intensive chemotherapy (with azacitidine, decitabine, or low-dose cytarabine)"
    ],
    associatedBiomarkers: ["del17p-cll", "t1418-fl"],
    combinationRegimens: ["venetoclax + obinutuzumab", "venetoclax + rituximab", "venetoclax + azacitidine"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // NTRK / ROS1 Inhibitors
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "larotrectinib",
    name: "Larotrectinib",
    aliases: ["Vitrakvi", "LOXO-101"],
    targets: ["TRKA", "TRKB", "TRKC"],
    mechanism: "Selective pan-TRK inhibitor for NTRK fusion-positive tumors (tumor-agnostic)",
    cancerTypes: ["nsclc", "thca", "sarc", "crc"],
    approvalStatus: "approved",
    drugClass: "TRK inhibitor",
    fdaApprovalIndications: [
      "2018: NTRK gene fusion-positive solid tumors without known acquired resistance mutation (tumor-agnostic)"
    ],
    associatedBiomarkers: ["ntrk-fusion", "ntrk-agnostic"]
  },
  {
    id: "entrectinib",
    name: "Entrectinib",
    aliases: ["Rozlytrek", "RXDX-101"],
    targets: ["TRKA", "TRKB", "TRKC", "ROS1", "ALK"],
    mechanism: "Pan-TRK/ROS1/ALK inhibitor with CNS activity for fusion-positive tumors",
    cancerTypes: ["nsclc", "thca", "sarc", "crc"],
    approvalStatus: "approved",
    drugClass: "TRK/ROS1 inhibitor",
    fdaApprovalIndications: [
      "2019: NTRK gene fusion-positive solid tumors (tumor-agnostic)",
      "2019: ROS1-positive metastatic NSCLC"
    ],
    associatedBiomarkers: ["ntrk-fusion", "ntrk-agnostic", "ros1"]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Other Targeted Therapies
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "alpelisib",
    name: "Alpelisib",
    aliases: ["Piqray", "BYL719"],
    targets: ["PI3K alpha"],
    mechanism: "Alpha-specific PI3K inhibitor for PIK3CA-mutated tumors",
    cancerTypes: ["brca"],
    approvalStatus: "approved",
    drugClass: "PI3K inhibitor",
    fdaApprovalIndications: [
      "2019: HR-positive HER2-negative PIK3CA-mutated advanced breast cancer after prior endocrine therapy (with fulvestrant)"
    ],
    associatedBiomarkers: ["pik3ca"],
    combinationRegimens: ["alpelisib + fulvestrant"]
  },
  {
    id: "selpercatinib",
    name: "Selpercatinib",
    aliases: ["Retevmo", "LOXO-292"],
    targets: ["RET"],
    mechanism: "Highly selective RET kinase inhibitor active against diverse RET alterations",
    cancerTypes: ["nsclc", "thca"],
    approvalStatus: "approved",
    drugClass: "RET inhibitor",
    fdaApprovalIndications: [
      "2020: Metastatic RET fusion-positive NSCLC",
      "2020: Advanced RET-mutant medullary thyroid cancer requiring systemic therapy",
      "2020: Advanced RET fusion-positive thyroid cancer requiring systemic therapy after prior treatment",
      "2022: First-line RET fusion-positive NSCLC"
    ],
    associatedBiomarkers: ["ret-fusion", "ret-ptc"]
  },
  {
    id: "capmatinib",
    name: "Capmatinib",
    aliases: ["Tabrecta", "INC280"],
    targets: ["MET"],
    mechanism: "Selective MET inhibitor for MET exon 14 skipping and MET amplification",
    cancerTypes: ["nsclc"],
    approvalStatus: "approved",
    drugClass: "MET inhibitor",
    fdaApprovalIndications: [
      "2020: Metastatic NSCLC with MET exon 14 skipping mutation"
    ],
    associatedBiomarkers: ["met-exon14", "met-amp"]
  },
  {
    id: "erdafitinib",
    name: "Erdafitinib",
    aliases: ["Balversa", "JNJ-42756493"],
    targets: ["FGFR1", "FGFR2", "FGFR3", "FGFR4"],
    mechanism: "Pan-FGFR kinase inhibitor for FGFR-altered tumors",
    cancerTypes: ["blca"],
    approvalStatus: "approved",
    drugClass: "FGFR inhibitor",
    fdaApprovalIndications: [
      "2019: Locally advanced or metastatic urothelial carcinoma with susceptible FGFR3 or FGFR2 alterations after prior platinum chemotherapy",
      "2024: Advanced urothelial carcinoma with susceptible FGFR3 alterations after prior anti-PD-(L)1 therapy"
    ],
    associatedBiomarkers: ["fgfr3-blca"]
  },
  {
    id: "avapritinib",
    name: "Avapritinib",
    aliases: ["Ayvakit", "BLU-285"],
    targets: ["PDGFRA D842V", "KIT"],
    mechanism: "Selective KIT/PDGFRA inhibitor designed for activation loop mutations including PDGFRA D842V",
    cancerTypes: ["sarc"],
    approvalStatus: "approved",
    drugClass: "KIT/PDGFRA inhibitor",
    fdaApprovalIndications: [
      "2020: Unresectable or metastatic GIST harboring PDGFRA exon 18 mutation including D842V",
      "2021: Advanced systemic mastocytosis"
    ],
    associatedBiomarkers: ["pdgfra-gist", "kit-gist"]
  },
  {
    id: "temozolomide",
    name: "Temozolomide",
    aliases: ["TMZ", "Temodar", "Temodal"],
    targets: ["DNA alkylation"],
    mechanism: "Oral alkylating agent prodrug delivering methyl groups to DNA guanine O6 position",
    cancerTypes: ["gbm", "lgg"],
    approvalStatus: "approved",
    drugClass: "Alkylating agent",
    fdaApprovalIndications: [
      "1999: Refractory anaplastic astrocytoma",
      "2005: Newly diagnosed glioblastoma concurrent with and adjuvant to radiation (Stupp protocol)"
    ],
    associatedBiomarkers: ["mgmt"],
    combinationRegimens: ["temozolomide + radiation (Stupp protocol)", "temozolomide + lomustine"]
  },
  {
    id: "lomustine",
    name: "Lomustine",
    aliases: ["CCNU", "CeeNU", "Gleostine"],
    targets: ["DNA alkylation", "DNA crosslinking"],
    mechanism: "Nitrosourea alkylating agent crossing the blood-brain barrier",
    cancerTypes: ["gbm", "lgg"],
    approvalStatus: "approved",
    drugClass: "Alkylating agent (nitrosourea)",
    fdaApprovalIndications: [
      "1976: Brain tumors (primary and metastatic)",
      "1976: Hodgkin lymphoma (second-line)"
    ],
    associatedBiomarkers: ["mgmt"],
    combinationRegimens: ["lomustine + temozolomide", "PCV (procarbazine + lomustine + vincristine)"]
  },
];
