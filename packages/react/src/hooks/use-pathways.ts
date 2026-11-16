import type { PathwayAnalysis } from "@oncograph/core";
import { useFetch, type UseFetchResult } from "./use-fetch";

/**
 * Analyze pathway involvement for a set of genes.
 * GET /pathways?genes={gene1},{gene2},{gene3}
 */
export function usePathways(genes: string[]): UseFetchResult<PathwayAnalysis> {
  const joined = genes.map(encodeURIComponent).join(",");
  return useFetch<PathwayAnalysis>(
    `/pathways?genes=${joined}`,
    genes.length > 0,
  );
}
