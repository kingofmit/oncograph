<p align="center">
  <img src=".github/OncoGraph.png" alt="OncoGraph" />
</p>

<p align="center">
  <a href="https://doi.org/10.5281/zenodo.24268993"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.24268993.svg" alt="DOI" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/typescript-strict-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/repositories-30%2B-teal" alt="30+ Repositories" />
</p>

Open-source federated cancer data discovery engine. Given a cancer type and research need, returns available datasets, biomarkers, targeted therapies, and clinical trials across 30+ repositories.

## Quick Start

```bash
npm install @oncograph/core
```

```typescript
import { discover, DataRegistry } from "@oncograph/core";

const registry = new DataRegistry();
// ... load datasets, biomarkers, drugs

const result = discover({
  cancerType: "glioblastoma",
  dataTypes: ["genomic", "imaging"],
  includeBiomarkers: true,
  includeDrugs: true,
}, registry);

// Returns: TCGA, BraTS, IDH1/MGMT biomarkers,
// temozolomide/bevacizumab, and relevant trials
```

## What It Does

| Query | Returns |
|-------|---------|
| `cancerType: "glioblastoma"` | TCGA, BraTS, IDH1 mutation, MGMT methylation, temozolomide, bevacizumab |
| `cancerType: "NSCLC", dataTypes: ["drug-sensitivity"]` | DepMap, GDSC, EGFR/ALK/KRAS biomarkers, osimertinib, pembrolizumab |
| `cancerType: "breast cancer", dataTypes: ["imaging"]` | CAMELYON, TCGA Pathology, HER2/BRCA1/ER biomarkers, trastuzumab, olaparib |
| `cancerType: "AML"` | TARGET, TCGA, FLT3/BCR-ABL biomarkers, midostaurin, imatinib |

## Packages

| Package | Description |
|---------|-------------|
| `@oncograph/core` | Cancer taxonomy (30+ types), repository registry, discovery query engine |
| `@oncograph/genomics` | TCGA, ICGC ARGO, GENIE datasets; 15+ driver mutation/biomarker profiles |
| `@oncograph/imaging` | TCIA, IDC collections; BraTS, LIDC-IDRI, CAMELYON benchmarks |
| `@oncograph/drugs` | DepMap, CCLE, GDSC; 10+ key targeted therapies with mechanisms |
| `@oncograph/clinical` | SEER, UK Biobank, CDA; mCODE, OncoTree, GA4GH standards |
| `@oncograph/search` | TF-IDF search across all datasets, biomarkers, and drugs |
| `@oncograph/export` | JSON, CSV, and Markdown clinical research memo export |

## Data Sources

**Genomic:** GDC (TCGA, TARGET), ICGC ARGO, AACR GENIE, PCAWG
**Imaging:** TCIA (200+ collections), IDC (60M+ DICOM images), BraTS, LIDC-IDRI, CAMELYON
**Drug Sensitivity:** DepMap, CCLE, GDSC, NCI-60
**Clinical:** SEER, UK Biobank, Cancer Data Aggregator
**Standards:** mCODE (HL7 FHIR), OncoTree, HGNC, GA4GH DRS/Passports

## Authors

- **Ahmed Allem** — University of California, Berkeley
- **Andrea Dykes** — Stanford University
- **Freedom Cheteni-Mandela, PhD** — Stanford University
- **Paulina Valenzuela, MD** — Neural Horizons, Research University

## Development

```bash
git clone https://github.com/kingofmit/oncograph.git
cd oncograph
pnpm install
pnpm build
```

## Disclaimer

OncoGraph provides research data discovery information, not medical advice. All data sources retain their original access requirements, licensing, and citation obligations.

## Support

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](./LICENSE) - Ahmed Allem, Andrea Dykes, Freedom Cheteni-Mandela, Paulina Valenzuela
