<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# @oncograph/api

Hono REST API server exposing OncoGraph's cancer data discovery engine over HTTP with 11 endpoints.

[![npm](https://img.shields.io/npm/v/@oncograph/api)](https://www.npmjs.com/package/@oncograph/api)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Install

```bash
npm install @oncograph/api
```

## Usage

### Starting the Server

```ts
import "@oncograph/api";
// OncoGraph API server running on http://localhost:3737
```

Or set a custom port:

```bash
PORT=8080 npx @oncograph/api
```

### Using the Hono App Programmatically

```ts
import { app } from "@oncograph/api";

// Mount under a prefix in your own Hono app
import { Hono } from "hono";
const myApp = new Hono();
myApp.route("/oncograph", app);
```

### Endpoints

#### Discovery

```bash
# Multi-modal cancer data discovery
curl "http://localhost:3737/discover?cancer=glioblastoma"
curl "http://localhost:3737/discover?cancer=breast+cancer&dataTypes=genomic,imaging&accessModel=open"
```

#### Biomarkers

```bash
# Get biomarkers for a cancer type
curl "http://localhost:3737/biomarkers/gbm"
curl "http://localhost:3737/biomarkers/brca"
```

#### Drugs

```bash
# Find drugs targeting a specific gene
curl "http://localhost:3737/drugs/EGFR"
curl "http://localhost:3737/drugs/BRAF"
```

#### Clinical Trials

```bash
# Search trials by cancer type
curl "http://localhost:3737/trials?cancer=glioblastoma"
curl "http://localhost:3737/trials?cancer=nsclc&biomarker=EGFR"
```

#### Datasets

```bash
# List datasets for a repository
curl "http://localhost:3737/datasets/gdc"
curl "http://localhost:3737/datasets/tcia"
```

#### Full-Text Search

```bash
# Search across all datasets, biomarkers, and drugs
curl "http://localhost:3737/search?q=BRCA1+breast+cancer"
curl "http://localhost:3737/search?q=checkpoint+inhibitor"
```

#### Pathway Analysis

```bash
# Analyze pathways affected by mutated genes
curl "http://localhost:3737/pathways?genes=EGFR,KRAS,PTEN"
curl "http://localhost:3737/pathways?genes=IDH1,TP53,ATRX"
```

#### Survival Statistics

```bash
# Get survival data for a cancer type
curl "http://localhost:3737/survival?cancer=glioblastoma"

# Compare biomarker-positive vs overall survival
curl "http://localhost:3737/survival?cancer=glioblastoma&biomarker=MGMT"
```

#### Data Completeness

```bash
# Get data completeness score for a cancer type
curl "http://localhost:3737/completeness/gbm"
curl "http://localhost:3737/completeness/brca"
```

#### Health and OpenAPI

```bash
# Health check
curl "http://localhost:3737/health"
# {"status":"ok","version":"0.1.0","packages":11,"timestamp":...}

# OpenAPI 3.0 specification
curl "http://localhost:3737/openapi.json"
```

## Endpoints Summary

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Liveness probe |
| `GET` | `/openapi.json` | OpenAPI 3.0 specification |
| `GET` | `/discover?cancer=` | Multi-modal cancer data discovery |
| `GET` | `/biomarkers/:cancerType` | Biomarkers for a cancer type |
| `GET` | `/drugs/:target` | Drugs targeting a specific gene |
| `GET` | `/trials?cancer=` | Clinical trials for a cancer type |
| `GET` | `/datasets/:repository` | Datasets for a repository |
| `GET` | `/search?q=` | Full-text search across all data |
| `GET` | `/pathways?genes=` | Pathway analysis for mutated genes |
| `GET` | `/survival?cancer=` | Survival statistics (optional `&biomarker=`) |
| `GET` | `/completeness/:cancerType` | Data completeness score |

## Part of OncoGraph

OncoGraph is an open-source federated cancer data discovery engine with 802 cancer types, 104 biomarkers, 66 drugs, and 53 datasets across 29 repositories.

- [GitHub](https://github.com/kingofmit/oncograph)
- [Documentation](https://github.com/kingofmit/oncograph#readme)

## License

[MIT](../../LICENSE)
