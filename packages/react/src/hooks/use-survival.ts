import type { SurvivalData } from "@oncograph/core";
import { useFetch, type UseFetchResult } from "./use-fetch";

/**
 * Fetch survival statistics for a cancer type, optionally stratified by biomarker.
 * GET /survival?cancer={cancer}&biomarker={biomarker}
 */
export function useSurvival(
  cancer: string,
  biomarker?: string,
): UseFetchResult<SurvivalData> {
  const params = new URLSearchParams({ cancer });
  if (biomarker) {
    params.set("biomarker", biomarker);
  }
  return useFetch<SurvivalData>(
    `/survival?${params.toString()}`,
    cancer.length > 0,
  );
}
