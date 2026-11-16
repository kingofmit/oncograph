<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# @oncograph/imaging

Cancer imaging repositories, 15 imaging collections, and IDC API client for OncoGraph.

[![npm](https://img.shields.io/npm/v/@oncograph/imaging)](https://www.npmjs.com/package/@oncograph/imaging)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Install

```bash
npm install @oncograph/imaging
```

## Usage

### Repositories and Collections

Access 3 imaging repositories (TCIA, IDC, NLST) and 15 imaging collections (BraTS, LIDC-IDRI, CAMELYON, and more).

```ts
import { IMAGING_REPOSITORIES, IMAGING_DATASETS } from "@oncograph/imaging";

// List all imaging repositories
for (const repo of IMAGING_REPOSITORIES) {
  console.log(`${repo.abbreviation}: ${repo.name} — ${repo.scale}`);
}
// TCIA: The Cancer Imaging Archive — 70,000+ patients, 200+ collections
// IDC: Imaging Data Commons — 60+ million DICOM images, cloud-native
// NLST: National Lung Screening Trial — 26,000+ participants, 75,000+ CT scans

// Filter collections by cancer type
const brainImaging = IMAGING_DATASETS.filter((ds) =>
  ds.cancerTypes.includes("gbm") || ds.cancerTypes.includes("lgg"),
);
for (const ds of brainImaging) {
  console.log(`${ds.name} — ${ds.patientCount ?? "N/A"} patients (${ds.accessModel})`);
}
// Brain Tumor Segmentation (BraTS) — 2000 patients (open)
// REMBRANDT — 671 patients (open)
// TCGA-GBM Radiology Collection — 262 patients (open)
// ...

// List all collections with their formats
for (const ds of IMAGING_DATASETS) {
  console.log(`${ds.name}: ${ds.formats?.join(", ") ?? "N/A"}`);
}
```

### IDC API Client

Query the NCI Imaging Data Commons for cloud-hosted DICOM collections.

```ts
import { IDCClient } from "@oncograph/imaging";

const idc = new IDCClient();

// Get all available collections
const collections = await idc.getCollections();
for (const c of collections) {
  console.log(`${c.collectionId}: ${c.cancerType} — ${c.subjectCount} subjects`);
}

// Get studies for a collection
const studies = await idc.getStudies("tcga_gbm");
for (const s of studies) {
  console.log(`${s.patientId}: ${s.modality.join(", ")} — ${s.instanceCount} instances`);
}

// Get DICOM series for a study
const series = await idc.getSeries(studies[0].studyInstanceUID);
for (const s of series) {
  console.log(`${s.modality}: ${s.seriesDescription} (${s.instanceCount} instances)`);
}
```

## API

### Constants

| Export | Description |
|--------|-------------|
| `IMAGING_REPOSITORIES` | 3 imaging repositories (TCIA, IDC, NLST) |
| `IMAGING_DATASETS` | 15 imaging collections with FAIR scores |

### Classes

| Class | Description |
|-------|-------------|
| `IDCClient` | IDC API client with methods: `getCollections()`, `getStudies()`, `getSeries()` |

### Key Types

| Type | Description |
|------|-------------|
| `IDCCollection` | Imaging collection with cancer type, subject count, DOI |
| `IDCStudy` | DICOM study with modality, series count, instance count |
| `IDCSeries` | DICOM series with modality, body part, manufacturer |

## Part of OncoGraph

OncoGraph is an open-source federated cancer data discovery engine with 802 cancer types, 104 biomarkers, 66 drugs, and 53 datasets across 29 repositories.

- [GitHub](https://github.com/kingofmit/oncograph)
- [Documentation](https://github.com/kingofmit/oncograph#readme)

## License

[MIT](../../LICENSE)
