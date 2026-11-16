import type { DiscoveryResult } from "@oncograph/core";
import { useFetch, type UseFetchResult } from "./use-fetch";

/**
 * Full-text search across the OncoGraph index.
 * GET /search?q={query}
 */
export function useSearch(query: string): UseFetchResult<DiscoveryResult> {
  const encoded = encodeURIComponent(query);
  return useFetch<DiscoveryResult>(
    `/search?q=${encoded}`,
    query.length > 0,
  );
}
