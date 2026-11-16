<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# oncograph

R client for the [OncoGraph](https://github.com/kingofmit/oncograph) Federated Cancer Data Discovery API.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Installation

Install from GitHub using `devtools`:

```r
# install.packages("devtools")
devtools::install_github("kingofmit/oncograph", subdir = "clients/r")
```

### Dependencies

- [httr](https://cran.r-project.org/package=httr) -- HTTP requests
- [jsonlite](https://cran.r-project.org/package=jsonlite) -- JSON parsing

## Prerequisites

The OncoGraph API server must be running. By default the client connects to
`http://localhost:3737`. See the main repository for instructions on starting
the server.

## Quick Start

```r
library(oncograph)

# Connect to the API (default: http://localhost:3737)
conn <- og_connect()

# Discover all data for a cancer type
result <- og_discover(conn, "breast cancer")

# Get biomarkers
biomarkers <- og_biomarkers(conn, "brca")

# Survival analysis
surv <- og_survival(conn, "breast cancer")

# Stratified survival by biomarker
surv_egfr <- og_survival(conn, "NSCLC", biomarker = "EGFR")

# Pathway analysis for mutated genes
pathways <- og_pathways(conn, c("BRAF", "KRAS", "TP53"))

# Search across all data
results <- og_search(conn, "KRAS mutation")
```

## Function Reference

| Function | Description | Returns |
|---|---|---|
| `og_connect(base_url)` | Create API connection | connection object |
| `og_discover(conn, cancer, ...)` | Multi-modal discovery query | list |
| `og_biomarkers(conn, cancer_type)` | Biomarkers for a cancer type | data.frame |
| `og_drugs(conn, target)` | Drugs by molecular target | data.frame |
| `og_datasets(conn, repository)` | Datasets for a repository | data.frame |
| `og_search(conn, query)` | Full-text search | list |
| `og_pathways(conn, genes)` | Pathway analysis | list |
| `og_survival(conn, cancer, biomarker)` | Survival statistics | list |
| `og_completeness(conn, cancer_type)` | Data completeness score | list |
| `og_trials(conn, cancer, biomarker)` | Clinical trials | data.frame |
| `og_health(conn)` | API health check | list |

## Connecting to a Remote Server

```r
conn <- og_connect("https://api.oncograph.org")
og_health(conn)
```

## License

MIT
