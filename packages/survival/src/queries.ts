import type { SurvivalData } from "@oncograph/core";
import { SURVIVAL_DATABASE } from "./survival-data";

/**
 * Retrieve survival data for a cancer type, optionally filtered by biomarker.
 *
 * @param cancerType - Cancer type string (case-insensitive substring match).
 * @param biomarker  - Optional biomarker string (case-insensitive substring match).
 * @returns The first matching SurvivalData entry, or undefined if none found.
 */
export function getSurvival(
  cancerType: string,
  biomarker?: string,
): SurvivalData | undefined {
  const ct = cancerType.toLowerCase();

  return SURVIVAL_DATABASE.find((s) => {
    const typeMatch = s.cancerType.toLowerCase().includes(ct);
    if (!typeMatch) return false;

    if (biomarker === undefined) {
      return s.biomarker === null;
    }
    if (s.biomarker === null) return false;
    return s.biomarker.toLowerCase().includes(biomarker.toLowerCase());
  });
}

/**
 * Compare survival outcomes between biomarker-positive and biomarker-negative
 * (i.e. unselected / overall) populations for a given cancer type.
 *
 * @param cancerType       - Cancer type string (case-insensitive substring match).
 * @param biomarkerPositive - Biomarker string identifying the positive cohort.
 * @returns Object with `positive` (the biomarker-selected entry) and `negative`
 *          (the overall / unselected entry, which may be undefined).
 */
export function getSurvivalComparison(
  cancerType: string,
  biomarkerPositive: string,
): { positive: SurvivalData; negative: SurvivalData | undefined } | undefined {
  const positive = getSurvival(cancerType, biomarkerPositive);
  if (!positive) return undefined;

  const negative = getSurvival(cancerType);
  return { positive, negative };
}

/**
 * Return every entry in the survival database.
 */
export function getAllSurvivalData(): SurvivalData[] {
  return SURVIVAL_DATABASE;
}
