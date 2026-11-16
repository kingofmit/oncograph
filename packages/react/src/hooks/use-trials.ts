import type { ClinicalTrial } from "@oncograph/core";
import { useFetch, type UseFetchResult } from "./use-fetch";

/**
 * Fetch clinical trials for a cancer type, optionally filtered by biomarker.
 * GET /trials?cancer={cancer}&biomarker={biomarker}
 */
export function useTrials(
  cancer: string,
  biomarker?: string,
): UseFetchResult<ClinicalTrial[]> {
  const params = new URLSearchParams({ cancer });
  if (biomarker) {
    params.set("biomarker", biomarker);
  }
  return useFetch<ClinicalTrial[]>(
    `/trials?${params.toString()}`,
    cancer.length > 0,
    (raw) => raw.trials ?? [],
  );
}
