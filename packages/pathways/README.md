<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/oncograph/main/.github/OncoGraph.png" alt="OncoGraph" width="600" />
</p>

# @oncograph/pathways

20 cancer signaling pathways from KEGG and Reactome with gene-pathway analysis and drug target mapping.

[![npm](https://img.shields.io/npm/v/@oncograph/pathways)](https://www.npmjs.com/package/@oncograph/pathways)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Install

```bash
npm install @oncograph/pathways
```

## Usage

### Pathway Database

Access 20 cancer signaling pathways including MAPK/ERK, PI3K/AKT/mTOR, Wnt, p53, Rb, Notch, Hedgehog, JAK/STAT, NF-kB, TGF-beta, Hippo, DNA repair, RTK, VEGF, apoptosis, and more.

```ts
import { CANCER_PATHWAYS, getPathway, getPathwaysByGene } from "@oncograph/pathways";

// List all pathways
for (const p of CANCER_PATHWAYS) {
  console.log(`${p.name} (${p.source}: ${p.sourceId}) — ${p.genes.length} genes`);
}
// MAPK/ERK Signaling (KEGG: hsa04010) — 16 genes
// PI3K/AKT/mTOR Signaling (KEGG: hsa04151) — 15 genes
// ...

// Look up a specific pathway
const mapk = getPathway("mapk-erk");
console.log(mapk?.genes); // ["KRAS", "NRAS", "HRAS", "BRAF", ...]
console.log(mapk?.therapeuticVulnerabilities);
// ["Sotorasib (KRAS G12C)", "Dabrafenib (BRAF V600E)", "Trametinib (MEK1/2)", ...]

// Find pathways affected by a gene
const egfrPathways = getPathwaysByGene("EGFR");
console.log(egfrPathways.map((p) => p.name));
// ["RTK Signaling"]
```

### Pathway Analysis

Analyze which pathways are affected by a set of mutated genes and discover drug targets.

```ts
import { analyzePathways } from "@oncograph/pathways";

// Analyze EGFR + KRAS mutations
const analysis = analyzePathways(["EGFR", "KRAS"]);

console.log("Affected pathways:");
for (const p of analysis.affectedPathways) {
  console.log(`  ${p.name}`);
}
// MAPK/ERK Signaling
// RTK Signaling

console.log("Downstream effects:");
for (const effect of analysis.downstreamEffects) {
  console.log(`  ${effect}`);
}
// Constitutive RAS-RAF-MEK-ERK activation drives uncontrolled proliferation...
// Constitutive receptor tyrosine kinase signaling feeds into MAPK, PI3K, and STAT cascades...

console.log("Drug targets:");
for (const dt of analysis.drugTargets) {
  console.log(`  ${dt.drug} -> ${dt.target} (${dt.pathway})`);
}
// Sotorasib (KRAS G12C) -> KRAS (MAPK/ERK Signaling)
// Adagrasib (KRAS G12C) -> KRAS (MAPK/ERK Signaling)
// Dabrafenib (BRAF V600E) -> KRAS (MAPK/ERK Signaling)
// ...

// Analyze a broader mutation profile
const brainAnalysis = analyzePathways(["IDH1", "TP53", "ATRX", "PTEN"]);
console.log(`${brainAnalysis.affectedPathways.length} pathways affected`);
console.log(`${brainAnalysis.drugTargets.length} potential drug targets`);
```

## API

### Constants

| Export | Description |
|--------|-------------|
| `CANCER_PATHWAYS` | 20 KEGG/Reactome cancer signaling pathways with genes and therapeutic vulnerabilities |

### Functions

| Function | Description |
|----------|-------------|
| `getPathway(id)` | Get a pathway by ID |
| `getPathwaysByGene(gene)` | Find all pathways containing a gene (case-insensitive) |
| `analyzePathways(mutatedGenes)` | Analyze affected pathways, downstream effects, and drug targets for a set of mutated genes |

### Key Types

| Type | Description |
|------|-------------|
| `Pathway` | Pathway with ID, name, source, genes, description, and therapeutic vulnerabilities |
| `PathwayAnalysis` | Analysis result with affected pathways, downstream effects, and drug targets |

## Part of OncoGraph

OncoGraph is an open-source federated cancer data discovery engine with 802 cancer types, 104 biomarkers, 66 drugs, and 53 datasets across 29 repositories.

- [GitHub](https://github.com/kingofmit/oncograph)
- [Documentation](https://github.com/kingofmit/oncograph#readme)

## License

[MIT](../../LICENSE)
