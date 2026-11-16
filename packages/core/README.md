<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# @oncograph/core

Foundational types, cancer taxonomy, data registry, and discovery engine for the OncoGraph ecosystem.

[![npm](https://img.shields.io/npm/v/@oncograph/core)](https://www.npmjs.com/package/@oncograph/core)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Install

```bash
npm install @oncograph/core
```

## Usage

### Cancer Taxonomy

OncoGraph includes 802 cancer types aligned to OncoTree and ICD-O-3, organized in a hierarchical tree.

```ts
import { CANCER_TYPES, searchCancerTypes, getCancerTree, getTissues } from "@oncograph/core";

// Search for a cancer type
const matches = searchCancerTypes("glioblastoma");
console.log(matches[0].name); // "Glioblastoma"
console.log(matches[0].oncoTreeCode); // "GBM"
console.log(matches[0].icdO3Code); // "9440/3"

// Get the full subtree for a cancer type
const tree = getCancerTree("gbm");
console.log(tree.map((t) => t.name));
// ["Glioblastoma", "Glioblastoma, IDH-wildtype", "Glioblastoma, IDH-wt, Classical", ...]

// List all tissues
const tissues = getTissues(); // ["Brain/CNS", "Breast", "Lung", ...]
```

### Data Registry

The `DataRegistry` is the central store for repositories, datasets, biomarkers, drugs, and trials.

```ts
import { DataRegistry } from "@oncograph/core";

const registry = new DataRegistry();

// Register data sources
registry.registerRepository({ id: "gdc", name: "Genomic Data Commons", /* ... */ });
registry.registerDataset({ id: "tcga", repositoryId: "gdc", cancerTypes: ["pan-cancer"], /* ... */ });
registry.registerBiomarker({ id: "idh1", gene: "IDH1", cancerTypes: ["gbm", "lgg"], /* ... */ });

// Query the registry
const datasets = registry.findDatasets("gbm", ["genomic"]);
const biomarkers = registry.findBiomarkers("gbm");
const repos = registry.getAllRepositories();
```

### Discovery Engine

The `discover()` function provides multi-modal cancer data discovery across the entire registry.

```ts
import { discover, DataRegistry } from "@oncograph/core";

const result = discover(
  {
    cancerType: "glioblastoma",
    dataTypes: ["genomic", "imaging"],
    accessModel: ["open"],
    includeBiomarkers: true,
    includeDrugs: true,
    includeTrials: true,
  },
  registry,
);

console.log(result.cancerType?.name); // "Glioblastoma"
console.log(result.datasets.length);  // matching datasets
console.log(result.biomarkers.length); // relevant biomarkers
console.log(result.drugs.length);      // targeted therapies
```

### Data Completeness Scoring

```ts
import { computeCompleteness } from "@oncograph/core";

const score = computeCompleteness("gbm", registry);
console.log(score.score);       // 0.83 (proportion of modalities covered)
console.log(score.gaps);        // ["drug-sensitivity"] — missing modalities
console.log(score.modalities);  // { genomic: true, imaging: true, clinical: true, ... }
```

### FAIR Compliance

```ts
import { assessFAIR, fairTotal } from "@oncograph/core";

const fair = assessFAIR(dataset);
console.log(fair); // { findability: 0.95, accessibility: 0.85, interoperability: 0.9, reusability: 0.9 }
console.log(fairTotal(fair)); // 0.9
```

### Cross-Reference Engine

```ts
import { CrossReferenceRegistry, PROJECT_CROSS_REFERENCES } from "@oncograph/core";

const xref = new CrossReferenceRegistry();
xref.registerBatch(PROJECT_CROSS_REFERENCES);

const tcgaGbm = xref.findBySample("TCGA-GBM");
console.log(tcgaGbm?.repositories.map((r) => r.repositoryId));
// ["gdc", "tcia", "cda", "depmap"]
```

### HTTP Client

```ts
import { HttpClient } from "@oncograph/core";

const client = new HttpClient({
  baseUrl: "https://api.example.com",
  timeout: 30_000,
  retries: 3,
  cacheTtlMs: 5 * 60 * 1000,
});

const data = await client.get<MyType>("/endpoint", { param: "value" });
const gql = await client.graphql<MyData>("/graphql", query, variables);
```

## API

### Types

| Type | Description |
|------|-------------|
| `CancerType` | Cancer type with OncoTree code, ICD-O-3, WHO grade, molecular subtype |
| `Repository` | Data repository in the federated ecosystem |
| `Dataset` | Dataset within a repository, with FAIR scores and demographic bias annotations |
| `Biomarker` | Cancer biomarker with clinical significance, linked drugs, companion diagnostics |
| `Drug` | Drug with targets, mechanism, FDA indications, drug class |
| `ClinicalTrial` | Clinical trial with NCT ID, phase, status, interventions |
| `CrossReference` | Cross-reference linking a sample across repositories |
| `DataCompletenessScore` | Completeness score across data modalities |
| `FAIRScore` | FAIR compliance score (Findability, Accessibility, Interoperability, Reusability) |
| `Pathway` | Cancer signaling pathway with genes and therapeutic vulnerabilities |
| `SurvivalData` | Survival statistics with Kaplan-Meier curve data |
| `DiscoveryQuery` | Query parameters for the discovery engine |
| `DiscoveryResult` | Full result of a discovery query |

### Functions

| Function | Description |
|----------|-------------|
| `searchCancerTypes(query)` | Search the taxonomy by name, alias, or OncoTree code |
| `getCancerTree(typeId)` | Get a cancer type and all its subtypes |
| `getTissues()` | List all tissue categories |
| `discover(query, registry)` | Execute a multi-modal discovery query |
| `computeCompleteness(cancerTypeId, registry)` | Score data completeness across modalities |
| `assessFAIR(dataset)` | Assess FAIR compliance for a dataset |
| `fairTotal(score)` | Compute aggregate FAIR score (0-1) |

### Classes

| Class | Description |
|-------|-------------|
| `DataRegistry` | Central registry for repositories, datasets, biomarkers, drugs, trials |
| `CrossReferenceRegistry` | Registry for cross-references linking samples across repositories |
| `HttpClient` | HTTP client with retry, caching, timeout, and GraphQL support |

## Part of OncoGraph

OncoGraph is an open-source federated cancer data discovery engine with 802 cancer types, 104 biomarkers, 66 drugs, and 53 datasets across 29 repositories.

- [GitHub](https://github.com/kingofmit/oncograph)
- [Documentation](https://github.com/kingofmit/oncograph#readme)

## License

[MIT](../../LICENSE)
