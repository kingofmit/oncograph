<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# @oncograph/react

React hooks and components for building cancer data discovery interfaces with OncoGraph.

[![npm](https://img.shields.io/npm/v/@oncograph/react)](https://www.npmjs.com/package/@oncograph/react)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Install

```bash
npm install @oncograph/react
```

**Peer dependencies:** `react` >= 18

## Usage

### Provider Setup

Wrap your application with `OncoGraphProvider` to configure the API base URL.

```tsx
import { OncoGraphProvider } from "@oncograph/react";

function App() {
  return (
    <OncoGraphProvider apiBaseUrl="http://localhost:3737">
      <MyDashboard />
    </OncoGraphProvider>
  );
}
```

### Hooks

#### useCancerType

```tsx
import { useCancerType } from "@oncograph/react";

function CancerInfo({ cancerType }: { cancerType: string }) {
  const { data, loading, error } = useCancerType(cancerType);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{data?.cancerType?.name}</h2>
      <p>{data?.datasets.length} datasets found</p>
    </div>
  );
}
```

#### useDatasets

```tsx
import { useDatasets } from "@oncograph/react";

function DatasetList({ repository }: { repository: string }) {
  const { data, loading } = useDatasets(repository);

  return (
    <ul>
      {data?.datasets.map((ds) => (
        <li key={ds.id}>{ds.name} — {ds.patientCount?.toLocaleString()} patients</li>
      ))}
    </ul>
  );
}
```

#### useBiomarkers

```tsx
import { useBiomarkers } from "@oncograph/react";

function BiomarkerPanel({ cancerType }: { cancerType: string }) {
  const { data, loading } = useBiomarkers(cancerType);

  return (
    <ul>
      {data?.biomarkers.map((bm) => (
        <li key={bm.id}>
          <strong>{bm.name}</strong> ({bm.gene}) — {bm.clinicalSignificance.join(", ")}
        </li>
      ))}
    </ul>
  );
}
```

#### useDrugs, useTrials, useSearch, usePathways, useSurvival, useCompleteness

```tsx
import { useDrugs, useTrials, useSearch, usePathways, useSurvival, useCompleteness } from "@oncograph/react";

// Find drugs by target
const { data: drugs } = useDrugs("EGFR");

// Search clinical trials
const { data: trials } = useTrials("glioblastoma");

// Full-text search
const { data: searchResults } = useSearch("BRCA1 breast cancer");

// Pathway analysis
const { data: pathways } = usePathways(["EGFR", "KRAS"]);

// Survival statistics
const { data: survival } = useSurvival("glioblastoma", "MGMT");

// Data completeness
const { data: completeness } = useCompleteness("gbm");
```

### Components

#### CancerTypePicker

```tsx
import { CancerTypePicker } from "@oncograph/react";

<CancerTypePicker
  value="gbm"
  onChange={(cancerType) => console.log(cancerType)}
/>
```

#### DatasetCard

```tsx
import { DatasetCard } from "@oncograph/react";

<DatasetCard
  dataset={{
    id: "tcga",
    name: "The Cancer Genome Atlas",
    repositoryId: "gdc",
    dataTypes: ["genomic", "transcriptomic"],
    accessModel: "controlled",
    patientCount: 11000,
    // ...
  }}
/>
```

#### BiomarkerTable

```tsx
import { BiomarkerTable } from "@oncograph/react";

<BiomarkerTable biomarkers={biomarkers} />
```

#### DrugCard

```tsx
import { DrugCard } from "@oncograph/react";

<DrugCard drug={drug} />
```

#### TrialList

```tsx
import { TrialList } from "@oncograph/react";

<TrialList trials={trials} />
```

#### CompletenessRadar

```tsx
import { CompletenessRadar } from "@oncograph/react";

<CompletenessRadar
  score={{
    cancerTypeId: "gbm",
    modalities: { genomic: true, transcriptomic: true, imaging: true, clinical: true, proteomic: true, "drug-sensitivity": false },
    score: 0.83,
    gaps: ["drug-sensitivity"],
  }}
/>
```

## API

### Provider

| Export | Description |
|--------|-------------|
| `OncoGraphProvider` | Context provider configuring the API base URL |
| `useOncoGraphConfig()` | Access the current `OncoGraphConfig` |

### Hooks

| Hook | Description |
|------|-------------|
| `useCancerType(cancerType)` | Discover data for a cancer type |
| `useDatasets(repository)` | List datasets for a repository |
| `useBiomarkers(cancerType)` | Get biomarkers for a cancer type |
| `useDrugs(target)` | Find drugs by gene target |
| `useTrials(cancerType)` | Search clinical trials |
| `useSearch(query)` | Full-text search across all entities |
| `usePathways(genes)` | Analyze pathways for mutated genes |
| `useSurvival(cancerType, biomarker?)` | Get survival statistics |
| `useCompleteness(cancerType)` | Get data completeness score |
| `useFetch(url)` | Low-level fetch hook |

### Components

| Component | Description |
|-----------|-------------|
| `CancerTypePicker` | Searchable cancer type selector |
| `DatasetCard` | Display card for a dataset |
| `BiomarkerTable` | Table of biomarkers with clinical significance |
| `DrugCard` | Display card for a drug with targets and indications |
| `TrialList` | List of clinical trials |
| `CompletenessRadar` | Radar chart of data completeness across modalities |

### Types

| Type | Description |
|------|-------------|
| `OncoGraphConfig` | Provider configuration (`apiBaseUrl`) |
| `UseFetchResult<T>` | Hook result with `data`, `loading`, `error` |
| `SearchResult` | Search result with `id`, `score`, `type`, `metadata` |
| `CancerTypePickerProps` | Props for `CancerTypePicker` |
| `DatasetCardProps` | Props for `DatasetCard` |
| `BiomarkerTableProps` | Props for `BiomarkerTable` |
| `DrugCardProps` | Props for `DrugCard` |
| `TrialListProps` | Props for `TrialList` |
| `CompletenessRadarProps` | Props for `CompletenessRadar` |

## Part of OncoGraph

OncoGraph is an open-source federated cancer data discovery engine with 802 cancer types, 104 biomarkers, 66 drugs, and 53 datasets across 29 repositories.

- [GitHub](https://github.com/kingofmit/oncograph)
- [Documentation](https://github.com/kingofmit/oncograph#readme)

## License

[MIT](../../LICENSE)
