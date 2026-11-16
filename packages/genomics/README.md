<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# @oncograph/genomics

Genomic repositories, datasets, 104 cancer biomarkers, and GDC GraphQL client for OncoGraph.

[![npm](https://img.shields.io/npm/v/@oncograph/genomics)](https://www.npmjs.com/package/@oncograph/genomics)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Install

```bash
npm install @oncograph/genomics
```

## Usage

### Repositories and Datasets

Access 11 genomic repositories (GDC, ICGC, GENIE, cBioPortal, COSMIC, PCAWG, dbGaP, GEO, ENCODE, GTEx, gnomAD) and 25 datasets (TCGA, TARGET, ICGC ARGO, CPTAC, CGGA, GLASS, and more).

```ts
import { GENOMIC_REPOSITORIES, GENOMIC_DATASETS } from "@oncograph/genomics";

// List all genomic repositories
for (const repo of GENOMIC_REPOSITORIES) {
  console.log(`${repo.abbreviation}: ${repo.name} (${repo.scale})`);
}
// GDC: Genomic Data Commons (2.5+ PB across 80+ projects, 85,000+ cases)
// ICGC: ICGC ARGO (25,000 tumor-normal pairs across 22 jurisdictions)
// ...

// Find datasets for a specific cancer type
const gbmDatasets = GENOMIC_DATASETS.filter((ds) =>
  ds.cancerTypes.includes("gbm") || ds.cancerTypes.includes("pan-cancer"),
);
console.log(gbmDatasets.map((ds) => ds.name));
// ["The Cancer Genome Atlas", "TCGA Glioblastoma Multiforme", "CPTAC Glioblastoma Proteogenomics", ...]
```

### Biomarkers

104 clinically relevant cancer biomarkers with linked drugs, companion diagnostics, and prevalence data.

```ts
import { CANCER_BIOMARKERS } from "@oncograph/genomics";

// Find biomarkers for a cancer type
const gbmBiomarkers = CANCER_BIOMARKERS.filter((bm) =>
  bm.cancerTypes.includes("gbm"),
);
for (const bm of gbmBiomarkers) {
  console.log(`${bm.name} (${bm.gene ?? "N/A"}) — ${bm.clinicalSignificance.join(", ")}`);
  if (bm.linkedDrugs) console.log(`  Drugs: ${bm.linkedDrugs.join(", ")}`);
}
// IDH1 Mutation (IDH1) — diagnostic, prognostic
//   Drugs: vorasidenib, ivosidenib
// MGMT Promoter Methylation (MGMT) — predictive
//   Drugs: temozolomide
// ...

// Find biomarkers with companion diagnostics
const withCDx = CANCER_BIOMARKERS.filter((bm) => bm.companionDiagnostics?.length);
console.log(withCDx.map((bm) => `${bm.name}: ${bm.companionDiagnostics!.join(", ")}`));
```

### GDC GraphQL Client

Query the NCI Genomic Data Commons via their GraphQL API.

```ts
import { GDCClient } from "@oncograph/genomics";

const gdc = new GDCClient(); // optional: pass a dbGaP token for controlled access

// Get all brain cancer projects
const projects = await gdc.getProjects("Brain");
for (const p of projects) {
  console.log(`${p.projectId}: ${p.summary.caseCount} cases, ${p.summary.fileCount} files`);
}

// Get cases for a specific project
const { cases, total } = await gdc.getCases("TCGA-GBM", { size: 10 });
console.log(`${total} total cases`);
for (const c of cases) {
  console.log(`${c.submitterId} — ${c.primarySite}, ${c.demographic?.gender}`);
}

// Get files for a case
const files = await gdc.getFiles(cases[0].caseId);
console.log(files.map((f) => `${f.dataCategory}: ${f.fileName}`));

// Search projects and cases
const results = await gdc.search("Glioblastoma");
console.log(`${results.totalProjects} projects, ${results.totalCases} cases`);
```

## API

### Constants

| Export | Description |
|--------|-------------|
| `GENOMIC_REPOSITORIES` | 11 genomic data repositories |
| `GENOMIC_DATASETS` | 25 genomic datasets with FAIR scores and demographic bias annotations |
| `CANCER_BIOMARKERS` | 104 cancer biomarkers with linked drugs and companion diagnostics |

### Classes

| Class | Description |
|-------|-------------|
| `GDCClient` | GDC GraphQL client with methods: `getProjects()`, `getCases()`, `getFiles()`, `getProject()`, `search()` |

### Key Types

| Type | Description |
|------|-------------|
| `GDCProject` | GDC project with case/file counts and data categories |
| `GDCCase` | GDC case with demographics |
| `GDCFile` | GDC file with data category, type, and format |
| `GDCSearchResult` | Combined project and case search results |

## Part of OncoGraph

OncoGraph is an open-source federated cancer data discovery engine with 802 cancer types, 104 biomarkers, 66 drugs, and 53 datasets across 29 repositories.

- [GitHub](https://github.com/kingofmit/oncograph)
- [Documentation](https://github.com/kingofmit/oncograph#readme)

## License

[MIT](../../LICENSE)
