import { DiscoveryQuery, DiscoveryResult, DataType, Repository } from "./types";
import { searchCancerTypes, getCancerTree } from "./taxonomy";
import { DataRegistry } from "./registry";

const DISCLAIMER = "OncoGraph provides research data discovery information, not medical advice. All data sources retain their original access requirements, licensing, and citation obligations. Consult the source repository for current access policies.";

/** Execute a discovery query */
export function discover(query: DiscoveryQuery, registry: DataRegistry): DiscoveryResult {
  const matched = searchCancerTypes(query.cancerType);
  const cancerType = matched.length > 0 ? matched[0] : null;

  if (!cancerType) {
    return { query, cancerType: null, datasets: [], biomarkers: [], drugs: [], trials: [], repositories: [], timestamp: Date.now(), disclaimer: DISCLAIMER };
  }

  // Include subtypes
  const tree = getCancerTree(cancerType.id);
  const typeIds = tree.map((t) => t.id);

  // Find datasets across all matching types
  const datasets = typeIds.flatMap((id) => registry.findDatasets(id, query.dataTypes));
  const uniqueDatasets = [...new Map(datasets.map((d) => [d.id, d])).values()];

  // Filter by access model if specified
  const filteredDatasets = query.accessModel
    ? uniqueDatasets.filter((d) => query.accessModel!.includes(d.accessModel))
    : uniqueDatasets;

  // Biomarkers
  const biomarkers = query.includeBiomarkers !== false
    ? [...new Map(typeIds.flatMap((id) => registry.findBiomarkers(id)).map((b) => [b.id, b])).values()]
    : [];

  // Drugs
  const drugs = query.includeDrugs !== false
    ? [...new Map(typeIds.flatMap((id) => registry.findDrugs(id)).map((d) => [d.id, d])).values()]
    : [];

  // Trials
  const trials = query.includeTrials !== false
    ? [...new Map(typeIds.flatMap((id) => registry.findTrials(id)).map((t) => [t.id, t])).values()]
    : [];

  // Collect referenced repositories
  const repoIds = new Set(filteredDatasets.map((d) => d.repositoryId));
  const repositories = Array.from(repoIds).map((id) => registry.getRepository(id)).filter((r): r is Repository => r !== undefined);

  return {
    query,
    cancerType,
    datasets: filteredDatasets,
    biomarkers,
    drugs,
    trials,
    repositories,
    timestamp: Date.now(),
    disclaimer: DISCLAIMER,
  };
}
