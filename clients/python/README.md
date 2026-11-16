<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

<h3 align="center">oncograph</h3>
<p align="center">Python client for the OncoGraph federated cancer data discovery API</p>

<p align="center">
  <a href="https://pypi.org/project/oncograph/"><img alt="PyPI" src="https://img.shields.io/pypi/v/oncograph" /></a>
  <a href="https://pypi.org/project/oncograph/"><img alt="Python" src="https://img.shields.io/pypi/pyversions/oncograph" /></a>
  <a href="https://github.com/kingofmit/oncograph/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue" /></a>
</p>

---

## Installation

```bash
pip install oncograph
```

Or install from source:

```bash
git clone https://github.com/kingofmit/oncograph.git
cd oncograph/clients/python
pip install .
```

> **Note:** This client requires a running OncoGraph API server. By default it connects to `http://localhost:3737`. See the [main repository](https://github.com/kingofmit/oncograph) for server setup instructions.

## Quick start

```python
from oncograph import OncoGraphClient

client = OncoGraphClient()  # defaults to http://localhost:3737

# Check server health
print(client.health())

# Multi-modal discovery query
result = client.discover("brca", data_types=["genomic", "clinical"])
for ds in result.datasets:
    print(f"{ds.name} ({ds.accessModel}) - {ds.patientCount} patients")

# Biomarkers for a cancer type
biomarkers = client.biomarkers("nsclc")
for b in biomarkers:
    print(f"{b.name}: {b.clinicalSignificance}")

# Drugs targeting a specific gene
drugs = client.drugs("BRAF")
for d in drugs:
    print(f"{d.name} - {d.mechanism} ({d.approvalStatus})")

# Survival statistics
survival = client.survival("brca")
print(f"5-year survival: {survival.fiveYearSurvival}")
print(f"Median survival: {survival.medianSurvivalMonths} months")

# Pathway analysis
pathways = client.pathways(["TP53", "KRAS", "BRAF"])
for p in pathways.affectedPathways:
    print(p)

# Clinical trials
trials = client.trials("nsclc", biomarker="EGFR")
for t in trials:
    print(t)
```

## Connecting to a custom server

```python
client = OncoGraphClient(
    base_url="https://oncograph.example.com",
    timeout=60,
)
```

## API reference

All methods raise `OncoGraphError` on non-200 responses.

| Method | Description | Returns |
|--------|-------------|---------|
| `health()` | Liveness probe | `dict` |
| `discover(cancer, data_types?, access_model?)` | Multi-modal cancer data discovery | `DiscoveryResult` |
| `biomarkers(cancer_type)` | Biomarkers for a cancer type | `list[Biomarker]` |
| `drugs(target)` | Drugs targeting a gene/molecule | `list[Drug]` |
| `datasets(repository)` | Datasets for a repository | `list[Dataset]` |
| `search(query)` | Full-text search | `dict` |
| `pathways(genes)` | Pathway analysis for mutated genes | `PathwayAnalysis` |
| `survival(cancer, biomarker?)` | Survival statistics | `SurvivalData` |
| `completeness(cancer_type)` | Data completeness score | `DataCompletenessScore` |
| `trials(cancer, biomarker?)` | Clinical trials | `list[dict]` |

## Types

All response types are Python dataclasses with a `from_dict` class method:

- `DiscoveryResult` -- aggregated discovery response
- `Dataset` -- dataset metadata (id, name, cancer types, patient count, access model, etc.)
- `Biomarker` -- biomarker information (gene, clinical significance, linked drugs, etc.)
- `Drug` -- drug details (targets, mechanism, approval status, FDA indications, etc.)
- `SurvivalData` -- survival statistics (5-year rate, median months, KM curve points, etc.)
- `PathwayAnalysis` -- pathway analysis results (affected pathways, downstream effects, drug targets)
- `DataCompletenessScore` -- completeness breakdown by modality
- `CancerType` -- cancer type metadata
- `KMCurvePoint` -- Kaplan-Meier curve data point

## License

MIT
