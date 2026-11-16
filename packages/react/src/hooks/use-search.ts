import { useFetch, type UseFetchResult } from "./use-fetch";

export interface SearchResult {
  id: string;
  score: number;
  type: string;
  metadata: Record<string, unknown>;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  total: number;
}

/**
 * Full-text search across the OncoGraph index.
 * GET /search?q={query}
 */
export function useSearch(query: string): UseFetchResult<SearchResponse> {
  const encoded = encodeURIComponent(query);
  return useFetch<SearchResponse>(
    `/search?q=${encoded}`,
    query.length > 0,
  );
}
