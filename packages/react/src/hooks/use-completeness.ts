import type { DataCompletenessScore } from "@oncograph/core";
import { useFetch, type UseFetchResult } from "./use-fetch";

/**
 * Fetch data completeness score for a cancer type.
 * GET /completeness/{cancerType}
 */
export function useCompleteness(cancerType: string): UseFetchResult<DataCompletenessScore> {
  const encoded = encodeURIComponent(cancerType);
  return useFetch<DataCompletenessScore>(
    `/completeness/${encoded}`,
    cancerType.length > 0,
  );
}
