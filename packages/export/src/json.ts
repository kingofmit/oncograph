import { DiscoveryResult } from "@oncograph/core";
export function toJSON(result: DiscoveryResult, pretty = true): string {
  return JSON.stringify(result, null, pretty ? 2 : 0);
}
