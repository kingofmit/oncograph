import type { Biomarker } from "@oncograph/core";
import { useFetch, type UseFetchResult } from "./use-fetch";

/**
 * Fetch biomarkers for a given cancer type.
 * GET /biomarkers/{cancerType}
 */
export function useBiomarkers(cancerType: string): UseFetchResult<Biomarker[]> {
  const encoded = encodeURIComponent(cancerType);
  return useFetch<Biomarker[]>(
    `/biomarkers/${encoded}`,
    cancerType.length > 0,
  );
}
