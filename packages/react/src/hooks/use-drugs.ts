import type { Drug } from "@oncograph/core";
import { useFetch, type UseFetchResult } from "./use-fetch";

/**
 * Fetch drugs targeting a given molecular target.
 * GET /drugs/{target}
 */
export function useDrugs(target: string): UseFetchResult<Drug[]> {
  const encoded = encodeURIComponent(target);
  return useFetch<Drug[]>(
    `/drugs/${encoded}`,
    target.length > 0,
    (raw) => ((raw as Record<string, unknown>).items as Drug[]) ?? [],
  );
}
