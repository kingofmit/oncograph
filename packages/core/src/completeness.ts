import { DataCompletenessScore, DataType } from "./types";
import { DataRegistry } from "./registry";
import { getCancerTree } from "./taxonomy";

/** Standard modalities used for completeness scoring */
const MODALITIES: DataType[] = [
  "genomic", "transcriptomic", "proteomic", "imaging", "clinical", "drug-sensitivity",
];

/** Compute data completeness for a cancer type across all modalities */
export function computeCompleteness(cancerTypeId: string, registry: DataRegistry): DataCompletenessScore {
  const tree = getCancerTree(cancerTypeId);
  const typeIds = tree.map((t) => t.id);

  // Collect all data types available across all datasets for this cancer type
  const availableTypes = new Set<string>();
  for (const typeId of typeIds) {
    const datasets = registry.findDatasets(typeId);
    for (const ds of datasets) {
      for (const dt of ds.dataTypes) availableTypes.add(dt);
    }
  }

  const modalities: Record<string, boolean> = {};
  const gaps: string[] = [];

  for (const modality of MODALITIES) {
    const has = availableTypes.has(modality);
    modalities[modality] = has;
    if (!has) gaps.push(modality);
  }

  const score = Object.values(modalities).filter(Boolean).length / MODALITIES.length;

  return { cancerTypeId, modalities, score, gaps };
}
