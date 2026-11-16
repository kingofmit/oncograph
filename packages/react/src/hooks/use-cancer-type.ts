import type { CancerType } from "@oncograph/core";
import { useFetch, type UseFetchResult } from "./use-fetch";

/**
 * Search cancer types by query string.
 * Fetches from GET /discover?cancer={query} and extracts the cancerType field.
 */
export function useCancerType(query: string): UseFetchResult<CancerType[]> {
  const encoded = encodeURIComponent(query);
  return useFetch<CancerType[]>(
    `/discover?cancer=${encoded}`,
    query.length > 0,
  );
}
