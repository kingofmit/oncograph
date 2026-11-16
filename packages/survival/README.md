<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# @oncograph/survival

44 survival data entries with Kaplan-Meier curve data for major cancer types and biomarker subgroups.

[![npm](https://img.shields.io/npm/v/@oncograph/survival)](https://www.npmjs.com/package/@oncograph/survival)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Install

```bash
npm install @oncograph/survival
```

## Usage

### Querying Survival Data

Covers GBM, breast cancer, lung cancer, colorectal cancer, AML, CML, melanoma, ovarian, prostate, pancreatic, and more.

```ts
import { getSurvival, getAllSurvivalData } from "@oncograph/survival";

// Get overall survival for a cancer type
const gbm = getSurvival("Glioblastoma");
console.log(gbm?.fiveYearSurvival);       // 0.065
console.log(gbm?.medianSurvivalMonths);   // 15
console.log(gbm?.source);                 // "TCGA"
console.log(gbm?.sampleSize);             // 617

// Access Kaplan-Meier curve points
if (gbm?.kmCurvePoints) {
  for (const point of gbm.kmCurvePoints) {
    console.log(`${point.months} months: ${(point.survival * 100).toFixed(1)}% survival`);
  }
}

// Get survival for a specific biomarker subgroup
const mgmt = getSurvival("Glioblastoma", "MGMT methylated");
console.log(mgmt?.fiveYearSurvival);       // higher than unmethylated
console.log(mgmt?.medianSurvivalMonths);   // longer median survival

// List all survival entries
const all = getAllSurvivalData();
console.log(`${all.length} survival entries across ${new Set(all.map((s) => s.cancerType)).size} cancer types`);
```

### Biomarker Comparisons

Compare survival between biomarker-positive and overall (unselected) populations.

```ts
import { getSurvivalComparison } from "@oncograph/survival";

// Compare MGMT methylated vs overall GBM
const comparison = getSurvivalComparison("Glioblastoma", "MGMT methylated");
if (comparison) {
  console.log(`MGMT methylated: ${comparison.positive.medianSurvivalMonths} months median`);
  console.log(`Overall GBM:     ${comparison.negative?.medianSurvivalMonths} months median`);
  console.log(`Hazard ratio:    ${comparison.positive.hazardRatio}`);
}

// Compare HER2+ vs overall breast cancer
const brca = getSurvivalComparison("Breast Cancer", "HER2");
if (brca) {
  console.log(`HER2+: ${(brca.positive.fiveYearSurvival * 100).toFixed(1)}% 5-year`);
  console.log(`Overall: ${(brca.negative!.fiveYearSurvival * 100).toFixed(1)}% 5-year`);
}

// Compare ALK+ vs overall NSCLC
const lung = getSurvivalComparison("Non-Small Cell Lung Cancer", "ALK");
```

## API

### Constants

| Export | Description |
|--------|-------------|
| `SURVIVAL_DATABASE` | 44 survival data entries from TCGA, SEER, and published studies |

### Functions

| Function | Description |
|----------|-------------|
| `getSurvival(cancerType, biomarker?)` | Get survival data for a cancer type, optionally filtered by biomarker (case-insensitive substring match) |
| `getSurvivalComparison(cancerType, biomarkerPositive)` | Compare biomarker-positive vs overall survival for a cancer type |
| `getAllSurvivalData()` | Return all entries in the survival database |

### Key Types

| Type | Description |
|------|-------------|
| `SurvivalData` | Survival entry with 5-year survival, median months, hazard ratio, source, sample size, and KM curve points |

## Part of OncoGraph

OncoGraph is an open-source federated cancer data discovery engine with 802 cancer types, 104 biomarkers, 66 drugs, and 53 datasets across 29 repositories.

- [GitHub](https://github.com/kingofmit/oncograph)
- [Documentation](https://github.com/kingofmit/oncograph#readme)

## License

[MIT](../../LICENSE)
