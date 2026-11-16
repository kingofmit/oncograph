<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# @oncograph/export

Export OncoGraph discovery results to JSON, CSV, and Markdown formats.

[![npm](https://img.shields.io/npm/v/@oncograph/export)](https://www.npmjs.com/package/@oncograph/export)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Install

```bash
npm install @oncograph/export
```

## Usage

### JSON Export

```ts
import { discover } from "@oncograph/core";
import { toJSON } from "@oncograph/export";

const result = discover({ cancerType: "glioblastoma" }, registry);

// Pretty-printed JSON
const json = toJSON(result);
console.log(json);

// Compact JSON
const compact = toJSON(result, false);
```

### CSV Export

Separate CSV exporters for datasets, biomarkers, drugs, and trials.

```ts
import { datasetsToCSV, biomarkersToCSV, drugsToCSV, trialsToCSV } from "@oncograph/export";

const result = discover({ cancerType: "breast cancer" }, registry);

// Export datasets to CSV
const datasetsCsv = datasetsToCSV(result);
// name,repository,data_types,access,patients,url,description
// "TCGA Breast Invasive Carcinoma","gdc","genomic; transcriptomic; clinical","controlled","1098",...

// Export biomarkers to CSV
const biomarkersCsv = biomarkersToCSV(result);
// name,gene,type,significance,linked_drugs,description

// Export drugs to CSV
const drugsCsv = drugsToCSV(result);
// name,aliases,targets,mechanism,class,approval_status,indications

// Export trials to CSV
const trialsCsv = trialsToCSV(result);
// nct_id,title,phase,status,interventions,url
```

### Markdown Export

Generate a comprehensive discovery report in Markdown with completeness scores, FAIR annotations, and demographic bias notes.

```ts
import { toMarkdown } from "@oncograph/export";

const markdown = toMarkdown(result);
console.log(markdown);
// # Cancer Data Discovery Report
// **Query:** glioblastoma
// **Resolved:** Glioblastoma (Brain/CNS)
//
// ## Data Completeness
// **Score:** 83%
// **Missing modalities:** drug-sensitivity
//
// ## Available Datasets
// ### The Cancer Genome Atlas
// - **Repository:** gdc
// - **Data types:** genomic, transcriptomic, epigenomic, clinical
// - **FAIR:** F=1.0 A=0.9 I=0.9 R=0.9
// - **Bias note:** TCGA participants are predominantly of European ancestry...
//
// ## Key Biomarkers
// - **IDH1 Mutation** (IDH1) — diagnostic, prognostic. ...
//   - Linked drugs: vorasidenib, ivosidenib
//
// ## Targeted Therapies
// - **Temozolomide** (TMZ, Temodar, Temodal) — Oral alkylating agent...
//
// ## Clinical Trials
// ...
```

## API

### Functions

| Function | Description |
|----------|-------------|
| `toJSON(result, pretty?)` | Export a `DiscoveryResult` to JSON string (default: pretty-printed) |
| `datasetsToCSV(result)` | Export datasets from a `DiscoveryResult` to CSV |
| `biomarkersToCSV(result)` | Export biomarkers from a `DiscoveryResult` to CSV |
| `drugsToCSV(result)` | Export drugs from a `DiscoveryResult` to CSV |
| `trialsToCSV(result)` | Export trials from a `DiscoveryResult` to CSV |
| `toMarkdown(result)` | Export a `DiscoveryResult` to a full Markdown report |

## Part of OncoGraph

OncoGraph is an open-source federated cancer data discovery engine with 802 cancer types, 104 biomarkers, 66 drugs, and 53 datasets across 29 repositories.

- [GitHub](https://github.com/kingofmit/oncograph)
- [Documentation](https://github.com/kingofmit/oncograph#readme)

## License

[MIT](../../LICENSE)
