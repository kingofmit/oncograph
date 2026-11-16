import { DataRegistry } from "@oncograph/core";
import { GENOMIC_REPOSITORIES, GENOMIC_DATASETS, CANCER_BIOMARKERS } from "@oncograph/genomics";
import { IMAGING_REPOSITORIES, IMAGING_DATASETS } from "@oncograph/imaging";
import { DRUG_REPOSITORIES, KEY_DRUGS } from "@oncograph/drugs";
import { CLINICAL_REPOSITORIES } from "@oncograph/clinical";

/**
 * Create a fully-populated DataRegistry with all repositories, datasets,
 * biomarkers, and drugs from every OncoGraph data package.
 */
export function createRegistry(): DataRegistry {
  const registry = new DataRegistry();

  // Register all repositories
  for (const r of [
    ...GENOMIC_REPOSITORIES,
    ...IMAGING_REPOSITORIES,
    ...DRUG_REPOSITORIES,
    ...CLINICAL_REPOSITORIES,
  ]) {
    registry.registerRepository(r);
  }

  // Register all datasets
  for (const d of [...GENOMIC_DATASETS, ...IMAGING_DATASETS]) {
    registry.registerDataset(d);
  }

  // Register biomarkers and drugs
  for (const b of CANCER_BIOMARKERS) registry.registerBiomarker(b);
  for (const d of KEY_DRUGS) registry.registerDrug(d);

  return registry;
}
