import type { Dataset, DataType } from "@oncograph/core";
import { useFetch, type UseFetchResult } from "./use-fetch";

/**
 * Fetch datasets for a cancer type, optionally filtered by data types.
 * GET /discover?cancer={cancer}&dataTypes={dataTypes}
 */
export function useDatasets(
  cancer: string,
  dataTypes?: DataType[],
): UseFetchResult<Dataset[]> {
  const params = new URLSearchParams({ cancer });
  if (dataTypes && dataTypes.length > 0) {
    params.set("dataTypes", dataTypes.join(","));
  }
  return useFetch<Dataset[]>(
    `/discover?${params.toString()}`,
    cancer.length > 0,
    (raw) => ((raw as Record<string, unknown>).datasets as Dataset[]) ?? [],
  );
}
