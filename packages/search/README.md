<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# @oncograph/search

TF-IDF full-text search index with field boosting and synonym expansion for OncoGraph.

[![npm](https://img.shields.io/npm/v/@oncograph/search)](https://www.npmjs.com/package/@oncograph/search)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Install

```bash
npm install @oncograph/search
```

## Usage

### Building an Index

The `CancerSearchIndex` indexes datasets, biomarkers, drugs, pathways, survival data, and clinical trials with field-specific boosting.

```ts
import { CancerSearchIndex } from "@oncograph/search";
import { GENOMIC_DATASETS, CANCER_BIOMARKERS } from "@oncograph/genomics";
import { KEY_DRUGS } from "@oncograph/drugs";

const index = new CancerSearchIndex();

// Index datasets
for (const ds of GENOMIC_DATASETS) {
  index.addDataset(ds);
}

// Index biomarkers
for (const bm of CANCER_BIOMARKERS) {
  index.addBiomarker(bm);
}

// Index drugs
for (const drug of KEY_DRUGS) {
  index.addDrug(drug);
}

console.log(`Indexed ${index.size} entities`);
```

### Searching

Search returns ranked results scored by TF-IDF with field boosting (name 3x, gene 2x, cancer type 2x, description 1x).

```ts
const results = index.search("EGFR lung cancer");

for (const result of results) {
  console.log(`[${result.type}] ${result.id} — score: ${result.score.toFixed(3)}`);
  console.log(`  ${JSON.stringify(result.metadata)}`);
}
// [biomarker] egfr-l858r — score: 0.142
//   {"name":"EGFR L858R","gene":"EGFR"}
// [drug] osimertinib — score: 0.128
//   {"name":"Osimertinib","targets":["EGFR","EGFR T790M",...]}
// [dataset] tcga-luad — score: 0.095
//   {"name":"TCGA Lung Adenocarcinoma","repositoryId":"gdc"}
```

### Synonym Expansion

The index automatically expands common cancer abbreviations and synonyms.

```ts
// Searching "GBM" also matches "glioblastoma" and "glioblastoma multiforme"
const gbmResults = index.search("GBM");

// Searching "CRC" also matches "colorectal", "colon cancer"
const crcResults = index.search("CRC");

// Searching "AML" also matches "acute myeloid leukemia"
const amlResults = index.search("AML");
```

### Indexing All Entity Types

```ts
import { CANCER_PATHWAYS } from "@oncograph/pathways";
import { SURVIVAL_DATABASE } from "@oncograph/survival";

// Index pathways
for (const pathway of CANCER_PATHWAYS) {
  index.addPathway(pathway);
}

// Index survival data
for (const data of SURVIVAL_DATABASE) {
  index.addSurvivalData(data);
}

// Index clinical trials
for (const trial of trials) {
  index.addTrial(trial);
}
```

## API

### Classes

| Class | Description |
|-------|-------------|
| `CancerSearchIndex` | TF-IDF inverted index with field boosting and synonym expansion |

### CancerSearchIndex Methods

| Method | Description |
|--------|-------------|
| `addDataset(ds)` | Index a dataset (name, description, cancer types, data types) |
| `addBiomarker(bm)` | Index a biomarker (name, gene, description, linked drugs, companion diagnostics) |
| `addDrug(drug)` | Index a drug (name, aliases, mechanism, targets, drug class, FDA indications) |
| `addPathway(pathway)` | Index a pathway (name, genes, description, therapeutic vulnerabilities) |
| `addSurvivalData(data)` | Index survival data (cancer type, biomarker, source) |
| `addTrial(trial)` | Index a clinical trial (NCT ID, title, interventions, cancer types) |
| `search(query, limit?)` | Search the index, returning ranked `SearchResult[]` (default limit: 20) |
| `size` | Number of indexed entities |

### Types

| Type | Description |
|------|-------------|
| `SearchResult` | Search result with `id`, `score`, `type`, and `metadata` |

## Part of OncoGraph

OncoGraph is an open-source federated cancer data discovery engine with 802 cancer types, 104 biomarkers, 66 drugs, and 53 datasets across 29 repositories.

- [GitHub](https://github.com/kingofmit/oncograph)
- [Documentation](https://github.com/kingofmit/oncograph#readme)

## License

[MIT](../../LICENSE)
