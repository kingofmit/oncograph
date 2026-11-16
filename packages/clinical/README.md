<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# @oncograph/clinical

Clinical repositories, datasets, standards, ClinicalTrials.gov client, and Cancer Data Aggregator client for OncoGraph.

[![npm](https://img.shields.io/npm/v/@oncograph/clinical)](https://www.npmjs.com/package/@oncograph/clinical)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Install

```bash
npm install @oncograph/clinical
```

## Usage

### Repositories and Datasets

Access 9 clinical repositories (SEER, UK Biobank, CDA, CPTAC, PDC, HTAN, MMRF CoMMpass, OncoKB, CIViC) and 8 clinical datasets.

```ts
import { CLINICAL_REPOSITORIES, CLINICAL_DATASETS } from "@oncograph/clinical";

// List repositories
for (const repo of CLINICAL_REPOSITORIES) {
  console.log(`${repo.abbreviation}: ${repo.name} — ${repo.scale}`);
}
// SEER: Surveillance, Epidemiology, and End Results — Millions of cancer cases, 48% U.S. coverage
// UKB: UK Biobank — 500,000 participants
// CDA: Cancer Data Aggregator — Aggregates 2.5+ PB across CRDC nodes
// ...

// Find pan-cancer datasets
const panCancer = CLINICAL_DATASETS.filter((ds) =>
  ds.cancerTypes.includes("pan-cancer"),
);
for (const ds of panCancer) {
  console.log(`${ds.name}: ${ds.patientCount?.toLocaleString() ?? "N/A"} patients`);
}
```

### Clinical Standards

5 interoperability standards used across the ecosystem.

```ts
import { CLINICAL_STANDARDS } from "@oncograph/clinical";

for (const std of CLINICAL_STANDARDS) {
  console.log(`${std.abbreviation}: ${std.purpose}`);
}
// mCODE: Standardized oncology clinical data model built on HL7 FHIR...
// OncoTree: Hierarchical tumor type classification with 800+ entries...
// HGNC: Authoritative gene naming standard...
// DRS: Cloud-agnostic file retrieval API...
// Passports: Federated single sign-on for controlled-access genomic data...
```

### ClinicalTrials.gov Client

Search clinical trials using the ClinicalTrials.gov v2 API.

```ts
import { ClinicalTrialsClient } from "@oncograph/clinical";

const client = new ClinicalTrialsClient();

// Search for recruiting glioblastoma trials
const { trials, totalCount, nextPageToken } = await client.searchTrials(
  "glioblastoma",          // condition
  "temozolomide",          // intervention (optional)
  "RECRUITING",            // status filter (optional)
  { pageSize: 10 },
);

console.log(`${totalCount} total trials found`);
for (const trial of trials) {
  console.log(`${trial.nctId}: ${trial.title}`);
  console.log(`  Phase ${trial.phase} — ${trial.status}`);
  console.log(`  Interventions: ${trial.interventions.join(", ")}`);
}

// Get a specific trial by NCT ID
const trial = await client.getTrial("NCT04396860");
console.log(trial?.title);
```

### Cancer Data Aggregator (CDA) Client

Query subjects and files across GDC, PDC, and IDC through a unified API.

```ts
import { CDAClient } from "@oncograph/clinical";

const cda = new CDAClient();

// Query subjects by cancer type
const subjects = await cda.querySubjects({ cancerType: "Glioblastoma" });
for (const s of subjects) {
  console.log(`${s.subjectId}: ${s.cancerType} — repos: ${s.repositories.join(", ")}`);
}

// Cross-domain query with pagination
const { subjects: samples, totalCount } = await cda.querySamples("Breast Cancer", {
  limit: 50,
  offset: 0,
});
console.log(`${totalCount} total subjects`);

// Get subject counts by repository
const counts = await cda.getSubjectCounts("TCGA-GBM");
console.log(counts.byRepository); // { GDC: 617, IDC: 262, PDC: 99 }

// Get files for a subject
const files = await cda.getFiles(subjects[0].subjectId);
for (const f of files) {
  console.log(`${f.repository}: ${f.dataCategory} — ${f.fileName}`);
}
```

## API

### Constants

| Export | Description |
|--------|-------------|
| `CLINICAL_REPOSITORIES` | 9 clinical data repositories |
| `CLINICAL_DATASETS` | 8 clinical datasets with FAIR scores and demographic bias annotations |
| `CLINICAL_STANDARDS` | 5 clinical interoperability standards (mCODE, OncoTree, HGNC, GA4GH DRS, Passports) |

### Classes

| Class | Description |
|-------|-------------|
| `ClinicalTrialsClient` | ClinicalTrials.gov v2 client with methods: `searchTrials()`, `getTrial()` |
| `CDAClient` | Cancer Data Aggregator client with methods: `querySubjects()`, `querySamples()`, `getSubjectCounts()`, `getFiles()` |

### Key Types

| Type | Description |
|------|-------------|
| `CDASubject` | Subject with cancer type, repositories, demographics |
| `CDASubjectCounts` | Aggregated counts by site, cancer type, and repository |
| `CDAFile` | File with data category, format, size, and source repository |

## Part of OncoGraph

OncoGraph is an open-source federated cancer data discovery engine with 802 cancer types, 104 biomarkers, 66 drugs, and 53 datasets across 29 repositories.

- [GitHub](https://github.com/kingofmit/oncograph)
- [Documentation](https://github.com/kingofmit/oncograph#readme)

## License

[MIT](../../LICENSE)
