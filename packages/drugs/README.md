<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# @oncograph/drugs

66 cancer drugs across 17 classes, 6 pharmacology repositories, 5 drug sensitivity datasets, and DepMap API client for OncoGraph.

[![npm](https://img.shields.io/npm/v/@oncograph/drugs)](https://www.npmjs.com/package/@oncograph/drugs)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Install

```bash
npm install @oncograph/drugs
```

## Usage

### Drug Database

Access 66 drugs across 17 classes including EGFR TKIs, ALK inhibitors, BRAF/MEK inhibitors, checkpoint inhibitors, HER2-targeted therapies, CDK4/6 inhibitors, PARP inhibitors, ADCs, KRAS inhibitors, and more.

```ts
import { KEY_DRUGS } from "@oncograph/drugs";

// Find drugs by target
const egfrDrugs = KEY_DRUGS.filter((d) =>
  d.targets.some((t) => t.includes("EGFR")),
);
for (const drug of egfrDrugs) {
  console.log(`${drug.name} (${drug.drugClass}) — ${drug.approvalStatus}`);
  console.log(`  Targets: ${drug.targets.join(", ")}`);
  console.log(`  Indications: ${drug.fdaApprovalIndications?.length ?? 0}`);
}
// Osimertinib (EGFR TKI) — approved
//   Targets: EGFR, EGFR T790M, EGFR exon 19 del, EGFR L858R
//   Indications: 3

// List all drug classes
const classes = [...new Set(KEY_DRUGS.map((d) => d.drugClass).filter(Boolean))];
console.log(classes);
// ["EGFR TKI", "ALK inhibitor", "BRAF inhibitor", "MEK inhibitor",
//  "Checkpoint inhibitor (PD-1)", "Checkpoint inhibitor (PD-L1)", ...]

// Find drugs for a cancer type
const gbmDrugs = KEY_DRUGS.filter((d) => d.cancerTypes.includes("gbm"));
console.log(gbmDrugs.map((d) => d.name));
// ["Bevacizumab", "Temozolomide", "Lomustine"]
```

### Repositories and Sensitivity Datasets

Access 6 pharmacology repositories (DepMap, GDSC, NCI-60, ChEMBL, DrugBank, PharmGKB) and 5 drug sensitivity datasets.

```ts
import { DRUG_REPOSITORIES, DRUG_SENSITIVITY_DATASETS } from "@oncograph/drugs";

// List repositories
for (const repo of DRUG_REPOSITORIES) {
  console.log(`${repo.abbreviation}: ${repo.name} — ${repo.scale}`);
}
// DepMap: Cancer Dependency Map — 1,000+ cell lines, 4,000+ gene knockouts
// GDSC: Genomics of Drug Sensitivity in Cancer — 1,000+ cell lines, 600+ compounds
// NCI-60: NCI-60 Human Tumor Cell Line Screen — 60 cell lines, 100,000+ compounds tested
// ...

// List sensitivity datasets
for (const ds of DRUG_SENSITIVITY_DATASETS) {
  console.log(`${ds.name}: ${ds.sampleCount} cell lines (${ds.accessModel})`);
}
```

### DepMap API Client

Query the Cancer Dependency Map for cell-line data, gene dependencies, and drug sensitivity.

```ts
import { DepMapClient } from "@oncograph/drugs";

const depmap = new DepMapClient();

// Search cell lines by cancer type
const cellLines = await depmap.getCellLines("Glioblastoma");
for (const cl of cellLines) {
  console.log(`${cl.cellLineName} — ${cl.lineage} (${cl.cancerType})`);
}

// Get gene dependency scores for a cell line
const deps = await depmap.getDependencies(cellLines[0].cellLineId);
const topDeps = deps.sort((a, b) => a.dependencyScore - b.dependencyScore).slice(0, 5);
for (const d of topDeps) {
  console.log(`${d.gene}: ${d.dependencyScore.toFixed(3)} (essential: ${d.isCommonEssential})`);
}

// Get CRISPR dependency scores for a gene across all cell lines
const egfrDeps = await depmap.getGeneDependency("EGFR");

// Get drug sensitivity for a cell line
const sensitivities = await depmap.getDrugSensitivity(cellLines[0].cellLineId);
for (const s of sensitivities) {
  console.log(`${s.drugName}: IC50=${s.ic50}, AUC=${s.auc} (${s.sensitivity})`);
}
```

## API

### Constants

| Export | Description |
|--------|-------------|
| `KEY_DRUGS` | 66 drugs with targets, mechanisms, FDA indications, and drug classes |
| `DRUG_REPOSITORIES` | 6 pharmacology repositories |
| `DRUG_SENSITIVITY_DATASETS` | 5 drug sensitivity datasets (DepMap CRISPR, PRISM, GDSC, NCI-60, CCLE) |

### Classes

| Class | Description |
|-------|-------------|
| `DepMapClient` | DepMap API client with methods: `getCellLines()`, `getDependencies()`, `getGeneDependency()`, `getDrugSensitivity()` |

### Key Types

| Type | Description |
|------|-------------|
| `DepMapCellLine` | Cell line with cancer type, lineage, and demographics |
| `DepMapDependency` | Gene dependency score for a cell line |
| `DepMapDrugSensitivity` | Drug sensitivity data with IC50, AUC, and sensitivity classification |

## Part of OncoGraph

OncoGraph is an open-source federated cancer data discovery engine with 802 cancer types, 104 biomarkers, 66 drugs, and 53 datasets across 29 repositories.

- [GitHub](https://github.com/kingofmit/oncograph)
- [Documentation](https://github.com/kingofmit/oncograph#readme)

## License

[MIT](../../LICENSE)
