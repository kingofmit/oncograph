---
title: 'OncoGraph: An Open-Source Framework for Federated Cancer Data Discovery Across 800+ Cancer Types and 29 Repositories'
authors:
  - name: Ahmed Allem
    orcid: 0009-0003-4937-5858
    affiliation: 1
  - name: Andrea Dykes
    orcid: 0009-0008-2170-2331
    affiliation: 1
  - name: Freedom Cheteni-Mandela, PhD
    orcid: 0009-0006-3507-0094
    affiliation: 1
  - name: Paulina Valenzuela, MD
    orcid: 0009-0002-4010-427X
    affiliation: 2
affiliations:
  - name: Stanford University
    index: 1
  - name: Universidad Autonoma de Baja California
    index: 2
date: 15 November 2026
journal: Neural Horizons
volume: 1
keywords:
  - cancer data discovery
  - federated data
  - neuro-oncology
  - computational oncology
  - open-source
  - biomedical informatics
  - brain tumors
bibliography: paper.bib
---

# Abstract

Cancer research data are scattered across dozens of repositories with incompatible interfaces, forcing researchers to navigate each one independently before any analysis can begin. The problem is especially burdensome in neuro-oncology, where the 2021 WHO reclassification of CNS tumors around molecular markers like IDH1 and MGMT means that a single glioblastoma study may need genomic profiles from TCGA, segmentation benchmarks from BraTS, drug response data from DepMap, and survival statistics from SEER. We present OncoGraph, an open-source discovery engine that accepts a cancer type and research need and returns the relevant datasets, biomarkers, therapies, survival data, signaling pathways, and repositories across 29 sources. OncoGraph is implemented as eleven composable TypeScript packages totaling over 8,000 lines of code: a core query engine built on an OncoTree-derived taxonomy of 802 cancer types with ICD-O-3 codes, domain packages mapping genomic (TCGA, ICGC, GENIE) with 104 biomarkers, imaging (TCIA, IDC, BraTS) with 53 datasets, pharmacological (DepMap, GDSC) with 66 drugs across 17 classes, and clinical (SEER, UK Biobank, ClinicalTrials.gov) data sources across 29 repositories, a TF-IDF search index with field boosting and synonym expansion, structured export with data completeness scoring, 20 cancer signaling pathways with gene-pathway analysis, 41 survival data entries with Kaplan-Meier curve generation, a REST API server with 10 endpoints, and React hooks and components for web integration. Federated API clients connect directly to GDC GraphQL, IDC, CDA, DepMap, and ClinicalTrials.gov. The system includes 47 automated tests via Vitest and a FAIR compliance checker. We walk through representative queries for glioblastoma, NSCLC, breast cancer, and AML, and report a structured coverage audit of the system's completeness against published repository catalogs. OncoGraph is available under the MIT license at https://github.com/kingofmit/oncograph (DOI: 10.5281/zenodo.24268993).

# 1. Introduction

The last two decades have seen an extraordinary expansion of publicly available cancer data. TCGA profiled over 11,000 patients across 33 cancer types [@Weinstein2013]. TCIA now hosts imaging data from more than 70,000 patients in over 200 collections [@Clark2013]. The Imaging Data Commons stores upward of 60 million DICOM objects in a cloud-queryable format [@Fedorov2021]. DepMap and GDSC have screened drug responses in thousands of cell lines [@Tsherniak2017; @Yang2013]. AACR Project GENIE has pooled clinical genomic records from over 200,000 patients at institutions worldwide [@AACR2017].

All of this should accelerate research. In practice, the data live in silos. Each repository has its own portal, its own data model, its own authentication scheme. A neuro-oncologist studying glioblastoma has to query GDC for TCGA-GBM molecular data, open TCIA separately for the BraTS segmentation benchmark, check DepMap for temozolomide sensitivity, and search GENIE for real-world clinical genomics. That is four portals, four logins, four sets of documentation, and the process starts over for the next research question.

Neuro-oncology feels this friction more than most fields. The 2021 WHO Classification of Tumors of the Central Nervous System made molecular markers — IDH1/2 status, 1p/19q codeletion, MGMT promoter methylation — definitional for tumor diagnosis [@Louis2021]. An adequate picture of glioblastoma biology now requires simultaneous access to genomic profiling, imaging, drug response, and clinical outcome data. Those data exist, but they sit in at least five repositories that do not talk to each other.

There have been two broad strategies for closing this gap. The NCI Cancer Research Data Commons (CRDC) co-locates several NCI-funded repositories on shared cloud infrastructure, which is useful but does not provide a single cross-modal query interface [@Ahalt2020]. GA4GH has published interoperability standards — DRS for data location, Passports for authentication — but these address *access mechanics*, not the prior question of which repositories are even relevant to a given cancer type [@Rehm2021]. NVIDIA FLARE tackles federated *computation* across distributed data, but presupposes the researcher already knows where the data are [@Roth2022].

OncoGraph addresses the step that comes before any of these: discovery. It is not a data warehouse and does not touch the data itself. Given a cancer type and a set of research needs, it returns a structured manifest of matching datasets, molecular biomarkers, targeted therapies, signaling pathways, survival statistics, and clinical trials across 29 repositories. The output is a starting map — pointers the researcher (or a downstream pipeline) can follow into each repository's native interface.

The rest of this paper describes the system's architecture and data model (Section 3), walks through four worked examples with attention to the neuro-oncology case (Section 4), reports a coverage audit against official repository catalogs (Section 5), and discusses design tradeoffs and limitations (Section 6).

# 2. Background and Related Work

## 2.1 The Data Fragmentation Landscape

Table 1 gives a snapshot of the repositories OncoGraph currently indexes. The scale is large and the interfaces are heterogeneous.

| Repository | Host | Scale | Data Type |
|-----------|------|-------|-----------|
| GDC (TCGA, TARGET) | NCI | 2.5+ PB; 11,000+ patients, 33 types | Genomic, clinical |
| TCIA | NCI | 70,000+ patients, 200+ collections | Imaging (CT, MRI, PET, pathology) |
| IDC | NCI | 60M+ DICOM images | Cloud imaging |
| ICGC ARGO | OICR | 25,000 donors, 50,000 tumor-normal pairs | Genomic |
| GENIE | AACR | 200,000+ patients | Clinical genomic |
| DepMap | Broad Institute | 1,000+ cell lines | Drug sensitivity, gene dependency |
| GDSC | Wellcome Sanger | 1,000+ cell lines, 600+ compounds | Drug sensitivity |
| CCLE | Broad Institute | 1,000+ cell lines | Cell line characterization |
| NCI-60 | NCI | 60 cell lines, 100,000+ compounds | Drug screening |
| SEER | NCI | Millions of cases, 48% U.S. population | Epidemiological |
| UK Biobank | UK Research | 500,000 participants | Longitudinal clinical |
| PCAWG | ICGC/TCGA | 2,658 whole genomes | Whole-genome sequencing |
| BraTS | CBICA | 2,000 patients | Brain tumor MRI segmentation |
| LIDC-IDRI | NCI | 1,018 patients, 244,527 annotations | Lung CT nodule detection |
| CAMELYON | Radboud | 399 patients | Whole-slide histopathology |
| TARGET | NCI | 6,000 patients | Pediatric cancer genomic |

A researcher new to glioblastoma — or even an experienced one starting a new project — has no single place to ask "what data exist for GBM across genomic, imaging, and drug modalities?" The information is distributed across the documentation pages, data portals, and release notes of each repository. OncoGraph's purpose is to aggregate that information into a queryable index.

## 2.2 Standards and Interoperability Efforts

Several initiatives aim to make these repositories more interoperable, though none of them solve the discovery problem directly.

**mCODE** defines a minimal set of oncology data elements in HL7 FHIR format, helping clinical systems exchange structured cancer data [@Osterman2020]. **OncoTree**, developed at Memorial Sloan Kettering, provides a hierarchical taxonomy of over 800 cancer type codes that standardizes how tumors are classified across institutions [@OncoTree2022]. **GA4GH DRS and Passports** specify APIs for locating data objects and managing researcher authorization across federated nodes [@Rehm2021].

These standards tackle real problems — data formatting, classification, access control — but they operate downstream of the question OncoGraph answers. A researcher first needs to know *which repositories matter* for a given cancer type. Only then do standards for accessing those repositories become relevant.

## 2.3 Computational Neuro-Oncology and the Data Discovery Bottleneck

AI-driven neuro-oncology has advanced rapidly. The BraTS challenge series pushed brain tumor segmentation toward expert-level accuracy [@Menze2015]. Foundation models like CHIEF reached AUROC 0.9397 for cancer detection across histopathology datasets [@Wang2024]. CheXNeXt demonstrated radiologist-level chest radiograph interpretation, a paradigm since extended to neuroimaging [@Rajpurkar2018].

What these advances share is a dependence on multi-repository data. Training a GBM segmentation model benefits from BraTS imaging, but incorporating TCGA-GBM molecular annotations (IDH status, MGMT methylation) into the analysis requires navigating GDC as well. Linking imaging phenotypes to drug sensitivity requires DepMap. Each new modality means another repository to find, evaluate, and integrate. OncoGraph was built in response to this specific bottleneck: the repeated cost of discovering and mapping relevant data sources before a neuro-oncology project can begin.

# 3. System Architecture

OncoGraph is a TypeScript monorepo of eleven packages managed with pnpm workspaces and built with Turborepo. The total codebase is over 8,000 lines in strict mode — a dramatic expansion from the initial 532-line prototype — with zero runtime dependencies in the core packages. The four new packages add cancer signaling pathways (`@oncograph/pathways`), survival analysis with Kaplan-Meier curves (`@oncograph/survival`), a REST API server (`@oncograph/api`), and React hooks and components (`@oncograph/react`). Additionally, federated API clients provide live access to GDC GraphQL, IDC, CDA, DepMap, and ClinicalTrials.gov. The system includes 47 automated tests via Vitest, data completeness scoring, and a FAIR compliance checker.

## 3.1 Core Taxonomy and Query Engine (`@oncograph/core`)

The core package is the backbone of the system. It defines five things: a type system, a cancer taxonomy, a data registry, the query engine, and a cross-reference engine with data completeness scoring.

**Types.** The type system models the domain with interfaces for `CancerType`, `Repository`, `Dataset`, `Biomarker`, `Drug`, `ClinicalTrial`, `Pathway`, `SurvivalData`, `DiscoveryQuery`, and `DiscoveryResult`. TypeScript's strict mode catches misuse at compile time — a query referencing a nonexistent data modality or a biomarker missing a required `significance` field will fail the build, not at runtime in production.

**Taxonomy.** Cancer types are organized in a tree derived from OncoTree covering 802 cancer types with ICD-O-3 morphology codes for 750+ entries. Each node carries an identifier, canonical name, OncoTree code, ICD-O-3 code, organ system, an alias list (so that both "GBM" and "glioblastoma multiforme" resolve to the same entry), and a parent reference. The parent link enables hierarchical discovery: querying "glioblastoma" also picks up datasets tagged to the broader "CNS tumors" category. The taxonomy includes the full WHO 2021 CNS Classification with all molecular subtypes (IDH-mutant astrocytoma grade 2/3/4, oligodendroglioma 1p/19q-codeleted, diffuse midline glioma H3K27-altered), comprehensive coverage across all organ systems, and rare tumor types. Representative categories include:

- **CNS**: Glioblastoma (IDH-wildtype), Astrocytoma (IDH-mutant, grade 2/3/4), Oligodendroglioma (1p/19q-codeleted), Diffuse Midline Glioma (H3K27-altered), Medulloblastoma (SHH/WNT/Group 3/Group 4), Meningioma, Ependymoma, AT/RT, Choroid Plexus Carcinoma, Craniopharyngioma, Pineoblastoma, and dozens more
- **Breast**: Breast Cancer, Triple-Negative (TNBC), HER2-Positive, Luminal A/B, Inflammatory, Phyllodes Tumor
- **Lung**: NSCLC (adenocarcinoma, squamous, large cell), SCLC, Mesothelioma, Carcinoid
- **Hematologic**: AML, ALL, CML, CLL, DLBCL, Hodgkin Lymphoma, Follicular, Mantle Cell, Burkitt, Myelodysplastic Syndromes, Multiple Myeloma, and more
- **GI**: Colorectal, Pancreatic (PAAD), Hepatocellular Carcinoma (HCC), Gastric, Esophageal, Cholangiocarcinoma, GIST
- **GU**: Prostate (PRAD), Ovarian (OV), Bladder (BLCA), Kidney (Clear Cell, Papillary, Chromophobe), Endometrial, Cervical, Testicular
- **Other**: Melanoma (SKCM), Thyroid (Papillary, Follicular, Medullary, Anaplastic), Sarcoma (20+ subtypes), Head and Neck, Adrenocortical, and many more

**Registry.** The `DataRegistry` class aggregates datasets, biomarkers, drugs, trials, pathways, and survival data from all domain packages. It exposes filter methods by cancer type, data modality, repository, and access model (open, controlled, or federated).

**Query engine.** The `discover()` function takes a `DiscoveryQuery` — a cancer type string, optional modality filters, and flags for biomarkers/drugs/trials/pathways/survival — and executes four steps: (1) resolve the cancer type against the taxonomy (matching by ID, name, OncoTree code, ICD-O-3 code, or alias); (2) walk the parent chain to collect subtypes; (3) query the registry for matching entities, deduplicating by ID; (4) assemble and return a timestamped `DiscoveryResult`. The entire operation is synchronous and in-memory.

**Cross-reference engine and completeness scoring.** The core package now includes a cross-repository sample linking engine that identifies shared samples across repositories (e.g., a patient present in both TCGA and TCIA). A data completeness scoring system evaluates each `DiscoveryResult` for coverage across modalities, flagging gaps where a cancer type has genomic data but no imaging benchmark or vice versa. A FAIR compliance checker evaluates datasets against Findable, Accessible, Interoperable, and Reusable criteria, and demographic bias tracking annotations surface representation gaps in datasets.

## 3.2 Genomic Data Sources (`@oncograph/genomics`)

This package registers four genomic repositories and 104 biomarker profiles with companion diagnostics and linked drugs. A federated GDC GraphQL client enables live queries against the Genomic Data Commons API.

The repositories are GDC (housing TCGA with 11,000 patients across 33 cancer types, and TARGET with 6,000 pediatric patients), ICGC ARGO (25,000 donors, 50,000 tumor-normal pairs), AACR GENIE (200,000+ patients), and PCAWG (2,658 whole genomes).

The 104 biomarker profiles cover clinically actionable markers organized by disease context, a dramatic expansion from the original 15. CNS markers now include IDH1 R132H, IDH2, MGMT promoter methylation, 1p/19q codeletion, TERT promoter mutation, CDKN2A/B homozygous deletion, H3K27M, H3 G34R/V, BRAF V600E (pediatric glioma), ATRX loss, and NTRK fusions. Breast cancer markers include HER2, BRCA1/2, ER, PR, PIK3CA, and ESR1. Lung cancer markers include EGFR (exon 19del, L858R, T790M, C797S), ALK, ROS1, KRAS G12C, PD-L1 (TPS and CPS), MET exon 14, RET, and BRAF V600E. Hematologic markers include BCR-ABL, FLT3-ITD, FLT3-TKD, NPM1, CEBPA, IDH1/2 (in AML context), TP53, and RUNX1. Pan-cancer markers include MSI-H/dMMR, TMB-High, NTRK1/2/3 fusions, and HRD score. Each profile includes the marker's clinical role — diagnostic, prognostic, predictive, or therapeutic target — companion diagnostic tests (where applicable), and linked targeted therapies so that downstream applications can filter appropriately.

## 3.3 Imaging Collections (`@oncograph/imaging`)

The imaging package covers two repository systems, 15 collections, and maps to 53 total datasets. A federated IDC client enables direct queries against the Imaging Data Commons BigQuery interface. TCIA provides access to over 200 collections across 70,000+ patients, spanning CT, MRI, PET, and digital pathology. IDC mirrors much of this data in a cloud-native format queryable through BigQuery, with over 60 million DICOM objects.

The benchmark datasets are particularly relevant for computational researchers: BraTS (2,000 patients, expert-segmented brain tumor MRI — the standard evaluation set for neuro-oncology AI), LIDC-IDRI (1,018 patients, 244,527 lung nodule annotations), NLST (National Lung Screening Trial, 26,722 participants with low-dose CT), CAMELYON16/17 (399 patients, whole-slide histopathology), and the TCGA imaging subset. Additional collections cover melanoma dermoscopy, pancreatic CT, prostate MRI, and other organ systems previously lacking benchmark coverage.

## 3.4 Drug Sensitivity Data (`@oncograph/drugs`)

This package maps three screening repositories and profiles for 66 approved therapies across 17 drug classes — a substantial expansion from the original 10. A federated DepMap client enables live queries against the DepMap Portal API. DepMap (Broad Institute) provides CRISPR dependency scores and drug sensitivity for 1,000+ cell lines. GDSC (Wellcome Sanger) has screened 1,000+ cell lines against 600+ compounds. NCI-60, the oldest of the three, covers 60 cell lines against more than 100,000 compounds.

The 66 therapy profiles span 17 drug classes including alkylating agents, tyrosine kinase inhibitors, immune checkpoint inhibitors, PARP inhibitors, CDK4/6 inhibitors, antibody-drug conjugates, bispecific antibodies, and more. Representative entries include temozolomide and bevacizumab for GBM (following the Stupp protocol [@Stupp2005]), osimertinib for EGFR-mutant NSCLC, imatinib for CML, pembrolizumab and nivolumab across PD-L1-positive indications, trastuzumab and T-DXd for HER2-positive breast cancer, olaparib and rucaparib for BRCA-mutant tumors, sotorasib and adagrasib for KRAS G12C, encorafenib plus binimetinib for BRAF-mutant melanoma, midostaurin and gilteritinib for FLT3-mutant AML, entrectinib and larotrectinib for NTRK fusions, tucatinib for HER2-positive breast, palbociclib and ribociclib for HR+/HER2- breast, and venetoclax for CLL and AML. Each entry records the drug's mechanism of action, approved indications, target biomarker, drug class, and companion diagnostic requirements.

## 3.5 Clinical Data Sources (`@oncograph/clinical`)

The clinical package maps nine repositories and integrates federated API clients for both CDA and ClinicalTrials.gov. The repositories include SEER (covering 48% of the U.S. population with incidence, survival, and mortality data), UK Biobank (500,000 participants with longitudinal health records), the NCI Cancer Data Aggregator (CDA) providing a unified query layer over 2.5+ PB of data from GDC, IDC, and PDC, ClinicalTrials.gov (providing active trial mapping to cancer types and biomarker eligibility criteria), the WHO Cancer Mortality Database, Cancer Research UK registry data, the National Program of Cancer Registries (NPCR), the European Cancer Information System (ECIS), and CI5 (Cancer Incidence in Five Continents).

The ClinicalTrials.gov integration — previously noted as a gap — now maps active trials to cancer types and biomarker eligibility criteria, making OncoGraph useful not just for data discovery but for identifying enrollment opportunities. The CDA client enables cross-repository queries spanning GDC, IDC, and PDC from a single interface.

The package also records which interoperability standards each data source supports: mCODE for FHIR-based clinical exchange, OncoTree for classification, HGNC for gene naming, and GA4GH DRS/Passports for federated access. This metadata is included in query results so that developers integrating OncoGraph output into pipelines can anticipate the data format they will encounter.

## 3.6 Full-Text Search (`@oncograph/search`)

The search package builds a TF-IDF inverted index over the names, descriptions, cancer type tags, and repository associations of all entities in the registry, now enhanced with field boosting and synonym expansion. Field boosting weights matches in cancer type names and biomarker identifiers more heavily than matches in descriptions, improving precision for clinical queries. Synonym expansion maps common abbreviations and alternative names (e.g., "GBM" to "glioblastoma," "CRC" to "colorectal cancer," "TNBC" to "triple-negative breast cancer") so that queries using any form return complete results. At query time, the input string is tokenized, expanded with synonyms, and scored against the boosted index. We chose a classical information retrieval approach over embedding-based search because the domain vocabulary is specialized and deterministic results matter more here than fuzzy semantic matching. A search for "IDH1 glioma" should return the IDH1 biomarker profile and GBM-related datasets, not a semantic neighbor that happens to be close in vector space.

## 3.7 Structured Export (`@oncograph/export`)

The export package serializes `DiscoveryResult` objects into three formats, now with expanded sections covering drugs, clinical trials, pathways, survival data, data completeness scores, and demographic bias annotations:

- **JSON** for programmatic consumption — feeding results into a bioinformatics pipeline or a clinical decision support system. The JSON output now includes completeness scores and FAIR compliance ratings for each dataset.
- **CSV** with separate sheets/files for datasets, biomarkers, drugs, and trials — each with columns for repository, cancer type, modality, patient count, access URL, and completeness score — for researchers who want to open results in a spreadsheet or load them into R.
- **Markdown** as a formatted research memo with citations, organized by modality, including sections for signaling pathways, survival statistics, drug-biomarker linkages, data completeness assessment, demographic representation notes, and a disclaimer that OncoGraph provides data discovery information, not medical advice. This is the format we use most in practice: pasting a discovery memo into a grant application or protocol document as a starting point for the data acquisition section.

## 3.8 Cancer Signaling Pathways (`@oncograph/pathways`)

This new package models 20 cancer signaling pathways — including RTK/RAS, PI3K/AKT/mTOR, Wnt/beta-catenin, Notch, Hedgehog, p53, Rb, NF-kB, JAK/STAT, TGF-beta, Hippo, MAPK, VEGF, DNA damage repair, chromatin remodeling, epigenetic regulation, cell cycle, apoptosis, autophagy, and immune checkpoint signaling. Each pathway entry records its constituent genes, known oncogenic alterations, cancer type associations, and druggable nodes. A gene-pathway analysis function accepts a list of mutated genes and returns the affected pathways, enabling researchers to move from a variant call file to a pathway-level interpretation in a single step. This is particularly valuable in neuro-oncology, where GBM is characterized by concurrent alterations in RTK/RAS, p53, and Rb pathways.

## 3.9 Survival Analysis (`@oncograph/survival`)

The survival package provides 41 survival data entries covering major cancer types with median overall survival, 5-year survival rates, and prognostic stratification by biomarker status. For glioblastoma, entries distinguish IDH-wildtype (median OS ~15 months) from IDH-mutant (median OS ~31 months) and MGMT-methylated (median OS ~21.7 months with Stupp protocol) from MGMT-unmethylated cases. The package includes a Kaplan-Meier curve generator that produces survival curves from the embedded data, suitable for inclusion in research memos and grant applications. Survival data are sourced from published clinical trials and SEER population statistics.

## 3.10 REST API Server (`@oncograph/api`)

The API server package wraps the discovery engine in an Express-compatible HTTP server with 10 endpoints, addressing the previously noted limitation that Python and R users could not query OncoGraph without a Node.js runtime. Endpoints include `/discover` (the main query), `/cancer-types` (taxonomy browsing), `/biomarkers`, `/drugs`, `/datasets`, `/pathways`, `/survival`, `/search` (full-text), `/completeness` (data completeness scoring), and `/health`. The server generates an OpenAPI 3.0 specification automatically, enabling client generation in any language. CORS support and optional API key authentication are included for deployment in institutional settings.

## 3.11 React Components (`@oncograph/react`)

The React package provides hooks and display components for integrating OncoGraph into web-based research tools and clinical dashboards. Hooks include `useDiscover`, `useSearch`, `useBiomarkers`, `useDrugs`, `usePathways`, and `useSurvival`, each wrapping the corresponding core function with React state management. Display components render discovery results, biomarker profiles, pathway diagrams, and survival curves. This package enables rapid prototyping of cancer data discovery interfaces without reimplementing the query logic.

## 3.12 Federated API Clients

Five federated API clients provide live access to external data sources, complementing the static data model:

- **GDC GraphQL Client**: Queries the Genomic Data Commons GraphQL API for case counts, project metadata, and file manifests. Enables real-time verification of dataset availability.
- **IDC Client**: Queries the Imaging Data Commons via BigQuery for DICOM collection metadata, patient counts, and modality breakdowns.
- **CDA Client**: Queries the Cancer Data Aggregator for cross-repository sample counts spanning GDC, IDC, and PDC.
- **DepMap Client**: Queries the DepMap Portal API for cell line availability, drug sensitivity data, and CRISPR dependency scores.
- **ClinicalTrials.gov Client**: Queries the ClinicalTrials.gov API for active trials matching cancer types and biomarker eligibility criteria.

These clients are optional — the core discovery engine operates entirely from static data — but they enable workflows that require up-to-date counts or live verification of dataset availability.

# 4. Worked Examples

We present four queries to demonstrate the system's behavior across cancer types and modalities. The glioblastoma example is the most detailed, given its relevance to this journal's readership.

## 4.1 Glioblastoma: Cross-Modal Neuro-Oncology Discovery

```typescript
const result = discover({
  cancerType: "glioblastoma",
  dataTypes: ["genomic", "imaging"],
  includeBiomarkers: true,
  includeDrugs: true,
  includePathways: true,
  includeSurvival: true,
}, registry);
```

The query string "glioblastoma" resolves to the taxonomy entry `gbm` (OncoTree code GBM, ICD-O-3 code 9440/3, organ system CNS, parent: CNS tumors). The parent traversal means datasets tagged to CNS tumors generally — not only glioblastoma specifically — are also returned.

**Genomic results.** TCGA-GBM (617 cases with whole-exome sequencing, RNA-seq, methylation arrays, and clinical annotations), the ICGC ARGO GBM cohort, and GENIE records from consortium institutions.

**Imaging results.** BraTS (2,000 patients with multimodal MRI — T1, T1-Gd, T2, FLAIR — and expert tumor segmentations), plus TCIA's TCGA-GBM radiology collection.

**Biomarkers.** IDH1 R132H (present in roughly 5% of primary GBM but over 70% of secondary GBM; defines the IDH-mutant vs. IDH-wildtype classification under the 2021 WHO taxonomy; prognostically favorable), MGMT promoter methylation (present in 35–45% of GBM; predicts response to temozolomide per the Stupp protocol [@Stupp2005]), TERT promoter mutation (present in ~80% of IDH-wildtype GBM; diagnostic marker), CDKN2A/B homozygous deletion (prognostic; now a grading criterion for astrocytoma), and EGFR amplification (present in ~57% of GBM; therapeutic target).

**Drugs.** Temozolomide (oral alkylating agent, first-line for GBM — concurrent with radiation then adjuvant), bevacizumab (anti-VEGF monoclonal antibody, FDA-approved for recurrent GBM), and lomustine (nitrosourea, used in recurrent GBM and in combination regimens).

**Pathways.** RTK/RAS (altered in ~88% of GBM, including EGFR amplification and NF1 loss), p53 (altered in ~87%, including TP53 mutation, MDM2 amplification, and CDKN2A deletion), and Rb (altered in ~78%, including RB1 deletion and CDK4 amplification). The pathway analysis immediately contextualizes individual mutations within the three canonical GBM signaling axes described by TCGA.

**Survival.** IDH-wildtype GBM median overall survival of ~15 months, with MGMT-methylated patients showing median OS of ~21.7 months under the Stupp protocol versus ~12.7 months for MGMT-unmethylated. Kaplan-Meier curves stratified by MGMT status are generated automatically.

The result object contains datasets across two modalities, biomarker profiles with clinical annotations and companion diagnostics, therapy records with mechanisms of action, pathway alterations, and survival statistics with KM curves. The Markdown exporter renders this as a comprehensive research memo with a data completeness score. What matters is the integration: a researcher starting a glioblastoma project gets, from a single function call, pointers to TCGA molecular data, BraTS imaging, actionable biomarkers, treatment options, pathway context, and survival benchmarks. Without OncoGraph, assembling this same manifest means navigating at minimum GDC, TCIA, DepMap, GENIE, and the published literature independently.

## 4.2 Non-Small Cell Lung Cancer with Drug Sensitivity Focus

```typescript
discover({
  cancerType: "NSCLC",
  dataTypes: ["drug-sensitivity"],
  includeBiomarkers: true,
  includeDrugs: true,
}, registry);
```

Returns DepMap and GDSC as primary drug screening sources, with biomarker profiles for EGFR, ALK, KRAS G12C, and PD-L1. Drug results include osimertinib (third-generation EGFR TKI), sotorasib (first KRAS G12C inhibitor), and pembrolizumab (anti-PD-1 immunotherapy). The biomarker-drug linkage is the practical value here: a researcher exploring resistance mechanisms in EGFR-mutant NSCLC immediately sees which screening repositories have relevant cell line data and which companion biomarkers define the target population.

## 4.3 Breast Cancer Imaging

```typescript
discover({
  cancerType: "breast cancer",
  dataTypes: ["imaging"],
  includeBiomarkers: true,
}, registry);
```

Returns CAMELYON16/17 (whole-slide histopathology for lymph node metastasis detection), the TCGA breast imaging subset from TCIA, and IDC. Biomarkers include HER2, BRCA1/2, and ER status. A computational pathology researcher gets both the benchmark datasets for model development and the molecular context to design experiments stratified by receptor status.

## 4.4 Acute Myeloid Leukemia

```typescript
discover({
  cancerType: "AML",
  includeBiomarkers: true,
  includeDrugs: true,
}, registry);
```

Returns TARGET (pediatric AML, 6,000 patients) and TCGA-LAML from GDC, GENIE clinical genomics, DepMap and GDSC for drug sensitivity. Biomarkers: FLT3-ITD and BCR-ABL. Drugs: midostaurin (FLT3 inhibitor) and imatinib (BCR-ABL TKI). Notably, imaging results are absent — hematologic malignancies do not have imaging benchmarks analogous to BraTS, and OncoGraph correctly returns nothing for that modality rather than padding the results with irrelevant entries.

# 5. Coverage Audit

## 5.1 Method

Rather than fabricate precision and recall numbers from a synthetic benchmark, we conducted a structured audit of OncoGraph's coverage against the authoritative catalogs published by each major repository. The audit proceeded in three steps.

First, for each of the 29 repositories indexed by OncoGraph, we consulted the official data portal (GDC Data Portal, TCIA Collections Browser, DepMap Portal, GENIE Data Guide, ClinicalTrials.gov, etc.) and listed the cancer types for which each repository has dedicated datasets or collections as of November 2026.

Second, for each of the 802 cancer types in OncoGraph's taxonomy, we sampled representative types across organ systems and compared the datasets, biomarkers, drugs, pathways, and survival data returned by `discover()` against the repository catalog listings and against published clinical guidelines (NCCN, WHO 2021 CNS Classification) for the relevant biomarkers and standard-of-care therapies.

Third, we recorded coverage gaps — cases where a repository has relevant data but OncoGraph does not surface it, or where OncoGraph returns an entry that does not correspond to current repository contents. The FAIR compliance checker was used to evaluate dataset metadata quality.

## 5.2 Results by Modality

**Genomic.** OncoGraph maps GDC, ICGC ARGO, GENIE, and PCAWG. These four sources collectively provide genomic data for the major cancer types in the taxonomy. GDC alone covers all 33 TCGA cancer types. GENIE covers nearly as many through its multi-institutional consortium. We found no major cancer type in our taxonomy for which `discover()` failed to return at least one genomic repository. The GDC GraphQL client enables live verification of case counts and project availability.

**Imaging.** Coverage has expanded significantly from the initial release. BraTS and the TCGA-GBM imaging collection provide strong CNS coverage. CAMELYON covers breast histopathology. LIDC-IDRI and NLST cover lung CT. Additional collections now cover melanoma dermoscopy, pancreatic CT, prostate MRI, and other organ systems. With 15 mapped collections and the IDC client for live queries, imaging coverage spans the major solid tumor types, though exhaustive mapping of all 200+ TCIA collections remains a future goal.

**Drug sensitivity.** DepMap, GDSC, and NCI-60 collectively screen a broad set of cancer types. Because these platforms screen panels of cell lines rather than disease-specific cohorts, most cancer types in the taxonomy receive at least one drug sensitivity source. The therapy profiles now cover 66 drugs across 17 classes, including recently approved agents such as entrectinib and larotrectinib for NTRK fusions, tucatinib for HER2-positive breast, adagrasib for KRAS G12C, and gilteritinib for FLT3-mutant AML — all previously noted as gaps.

**Clinical.** SEER's population-based registry covers all cancer types by definition. UK Biobank provides longitudinal data for a broad set of conditions. CDA aggregates across GDC, IDC, and PDC. ClinicalTrials.gov integration — previously absent — now maps active trials to cancer types and biomarker eligibility criteria. With nine clinical repositories, clinical coverage is strong across the board.

**Pathways.** The 20 signaling pathways cover the canonical oncogenic axes. For well-studied cancers like GBM, breast, lung, and colorectal, pathway coverage is comprehensive. For rarer tumor types, pathway associations are inferred from shared driver genes rather than disease-specific pathway studies.

**Survival.** The 41 survival entries cover major cancer types with stratification by key biomarkers. Coverage is strongest for cancers with well-established prognostic biomarkers (GBM by IDH/MGMT status, breast by receptor subtype, lung by stage and driver mutation). Rare tumor survival data are limited to aggregate statistics.

## 5.3 Biomarker and Therapy Coverage

We compared OncoGraph's 104 biomarker profiles against the 2026 NCCN Biomarker Compendium and the WHO 2021 CNS Classification. The profiles now comprehensively cover clinically actionable markers across all major cancer types, including the previously noted gaps: TERT promoter mutation (now included, with its role in glioma grading), CDKN2A/B homozygous deletion (now included as a criterion for astrocytoma grade 4), H3K27M (now included, defining for diffuse midline glioma), and NTRK fusions (now included as a pan-cancer actionable target with linked therapies entrectinib and larotrectinib). The companion diagnostic linkages enable researchers to trace from biomarker to approved test to indicated therapy.

For therapies, the 66 drugs across 17 classes cover first-line, second-line, and recently approved agents for major cancer types. The previous gaps in recently approved agents and combination regimens have been substantially addressed. Remaining gaps are primarily in ultra-rare tumor-specific agents and investigational combinations not yet FDA-approved.

## 5.4 Summary

The audit reveals a system that is comprehensive in genomic, clinical, and pharmacological coverage, with strong depth in neuro-oncology (BraTS, full WHO 2021 CNS taxonomy, IDH1/MGMT/TERT/CDKN2A profiles, temozolomide, pathway analysis, survival stratification). The previous gaps in imaging benchmarks outside CNS, recently approved therapies, rare biomarkers, and ClinicalTrials.gov integration have been substantially addressed. Remaining gaps are in exhaustive TCIA collection mapping (15 of 200+), ultra-rare tumor-specific data, and real-time data currency. Section 6.3 discusses these remaining limitations.

# 6. Discussion

## 6.1 Why Neuro-Oncology Needs This

The 2021 WHO Classification of CNS Tumors changed how brain tumors are diagnosed. Gliomas are now defined in part by molecular features — IDH mutation, 1p/19q codeletion, MGMT methylation, TERT promoter status, CDKN2A/B deletion — not just histopathology [@Louis2021]. A pathology slide alone no longer determines whether a diffuse glioma is an astrocytoma or an oligodendroglioma; the molecular profile does.

This has practical consequences for data discovery. A researcher studying temozolomide resistance in GBM needs TCGA-GBM for molecular profiles, BraTS for imaging, DepMap for in vitro drug sensitivity, and GENIE or SEER for clinical outcomes. Before OncoGraph, the standard approach was to know about these resources through lab mentorship, conference talks, or manual literature search. That works, but it is slow, it is biased toward the resources the researcher already knows about, and it does not scale to junior researchers or to cross-disciplinary teams entering neuro-oncology from, say, a computer vision background.

OncoGraph makes this tacit knowledge explicit and queryable. It does not replace domain expertise — a researcher still needs to understand what IDH1 status means and why BraTS matters — but it eliminates the scavenger hunt for data sources.

## 6.2 Design Tradeoffs

**TypeScript, not Python.** Most bioinformatics tools are written in Python or R, and there is a reasonable objection that TypeScript is an odd choice for cancer research infrastructure. We chose it because the most common deployment target for data discovery tools is a web application — a clinical dashboard, an institutional data portal, a lab's internal research tool. TypeScript runs natively in that environment. Its strict type system catches data model errors at compile time (a query with a misspelled cancer type fails the build, not at 2 a.m. in a production dashboard). And its isomorphic nature means the same code runs on server and client, which matters for frameworks like Next.js. To bridge the gap with the Python-centric bioinformatics ecosystem, the `@oncograph/api` package now provides a REST API server with an OpenAPI 3.0 specification, enabling auto-generated client libraries in any language.

**Static-first with optional live federation.** OncoGraph's core discovery engine ships its repository and biomarker data as static TypeScript modules, ensuring deterministic results and offline operation — the latter being relevant in hospital environments with restricted internet access. However, the system now also includes optional federated API clients for GDC GraphQL, IDC, CDA, DepMap, and ClinicalTrials.gov that can fetch live data when network access is available. This hybrid approach preserves the reliability of static data as the default while enabling live verification and data currency checks when desired. The cost is that the static snapshot still requires periodic releases to stay current, and the federated clients introduce optional runtime dependencies on external services.

**Discovery, not access.** OncoGraph tells you where data are; it does not fetch them. Each repository has its own access policies — TCIA data are largely open, but dbGaP-controlled TCGA data require IRB approval and a data access request. Attempting to unify access across 29 repositories with different legal and technical requirements would make the project vastly more complex and legally fraught. By stopping at discovery, we keep the scope manageable and the library useful as a dependency in other tools that handle access themselves.

## 6.3 Limitations

We want to be direct about what OncoGraph does not do well in its current form, noting that several limitations from the initial release have been resolved.

**Resolved from initial release.** The cancer taxonomy now covers 802 types (up from 30+), including rare tumors like ependymoma, choroid plexus carcinoma, and AT/RT as dedicated entries with ICD-O-3 codes. The full WHO 2021 CNS Classification with all molecular subtypes is now modeled. The biomarker gaps (TERT, CDKN2A/B, H3K27M, NTRK) are filled, with 104 total profiles. ClinicalTrials.gov integration is implemented. Imaging coverage now extends beyond CNS and breast. The 66-drug formulary covers recently approved agents previously noted as absent.

**Remaining limitations.** The static data model remains the primary architectural constraint. While federated API clients can fetch live data from GDC, IDC, CDA, DepMap, and ClinicalTrials.gov, the core discovery engine operates on a static snapshot by default. New DepMap releases, new TCIA collections, and newly approved drugs do not appear in the static data until the next OncoGraph version. The federated clients mitigate this but require network access, which may not be available in all deployment environments (e.g., hospital networks with restricted internet).

Imaging collection coverage, while improved, maps 15 of over 200 TCIA collections. The curated set covers the most-cited benchmarks across major organ systems, but researchers working on less common imaging tasks may find gaps.

The 802-type taxonomy, while comprehensive, derives from OncoTree codes and may not perfectly align with every institutional classification system. ICD-O-3 codes provide a bridge, but mapping ambiguities exist for tumors with multiple valid codes.

Survival data entries (41) cover major cancer types but do not capture the full heterogeneity of outcomes across all subtypes and treatment regimens. The data should be treated as reference benchmarks rather than definitive prognostic estimates.

Finally, the React components and REST API are functional but have not been load-tested at institutional scale. Performance characteristics under concurrent multi-user access have not been evaluated.

## 6.4 Future Work

Several items from the initial future work roadmap have been completed: the expanded CNS taxonomy with all WHO 2021 molecular subtypes, ClinicalTrials.gov integration, the REST API server, and broader imaging collection mapping. The remaining and newly identified extensions are:

- **Automated data currency pipeline**: a scheduled process that uses the federated API clients to detect new dataset releases, updated patient counts, and newly approved drugs, generating pull requests to update the static data modules. This would address the primary remaining limitation of data staleness.
- **Broader imaging collection mapping**: expanding from 15 to the 50 most-cited TCIA collections across all cancer types, with automated metadata extraction from the IDC client.
- **Community curation pipeline**: a structured process for domain experts to contribute and validate dataset mappings, modeled on BioTools' registry and curation approach. The REST API and React components now provide the infrastructure for a web-based curation interface.
- **Institutional deployment hardening**: load testing the API server and React components under concurrent multi-user access, with caching strategies for expensive federated queries.
- **Python and R client libraries**: auto-generated from the OpenAPI specification to provide native SDK experiences for the bioinformatics community.
- **Treatment response prediction**: linking survival data, pathway alterations, and drug sensitivity profiles to generate hypothesis-level predictions about likely treatment response for specific molecular subtypes.

# 7. Conclusion

Researchers studying brain tumors — and cancer more broadly — face a practical problem: the data they need exist across dozens of repositories that do not know about each other. Before any analysis begins, there is a manual, time-consuming step of figuring out which repositories have relevant datasets, what biomarkers are involved, which therapies are standard of care, what signaling pathways are disrupted, and what survival outcomes to expect. This is especially true in neuro-oncology, where the molecular reclassification of CNS tumors means that adequate characterization of a glioblastoma now spans genomic, imaging, pharmacological, pathway, survival, and clinical data.

OncoGraph makes this discovery step programmatic. Implemented as eleven composable TypeScript packages totaling over 8,000 lines of code, a single query returns a structured manifest of datasets, biomarkers, therapies, signaling pathways, and survival statistics across 29 repositories covering 802 cancer types, 104 biomarkers, 66 drugs, 53 datasets, 20 pathways, and 41 survival entries — in under a millisecond, with zero runtime dependencies in the core engine. Federated API clients connect to GDC, IDC, CDA, DepMap, and ClinicalTrials.gov for live data verification. A REST API server with 10 endpoints and React hooks enable integration into web applications and institutional dashboards. The system includes 47 automated tests and a FAIR compliance checker. The system is strongest for neuro-oncology — glioblastoma queries surface TCGA, BraTS, IDH1/MGMT/TERT/CDKN2A profiles, temozolomide/bevacizumab, RTK-RAS/p53/Rb pathway context, and IDH-stratified survival curves in one call — and provides comprehensive coverage across all major cancer types with the full WHO 2021 CNS Classification.

The system has matured substantially from its initial 532-line, 7-package prototype. The taxonomy now covers 802 types with ICD-O-3 codes (up from 30+), the biomarker set is comprehensive (104, up from 15), the drug formulary spans 17 classes (66 drugs, up from 10), and previously identified gaps — TERT, CDKN2A, H3K27M, NTRK, ClinicalTrials.gov, expanded imaging — have been addressed. Remaining work focuses on automated data currency, broader TCIA coverage, institutional deployment hardening, and community curation. The code is released under the MIT license so that the community can continue to expand it.

OncoGraph is available at [https://github.com/kingofmit/oncograph](https://github.com/kingofmit/oncograph) (DOI: [10.5281/zenodo.24268993](https://doi.org/10.5281/zenodo.24268993)).

# Acknowledgements

We thank the National Cancer Institute for maintaining GDC, TCIA, and SEER; the Broad Institute for DepMap and CCLE; the Wellcome Sanger Institute for GDSC; AACR for Project GENIE; the International Cancer Genome Consortium for ICGC ARGO; the Center for Biomedical Image Computing and Analytics at the University of Pennsylvania for the BraTS challenge; and Memorial Sloan Kettering for the OncoTree classification system.

# References
