import { Dataset, FAIRScore } from "./types";

/** Assess FAIR compliance for a dataset */
export function assessFAIR(dataset: Dataset): FAIRScore {
  // Findability: has DOI, has URL, has description
  let findability = 0;
  if (dataset.doi) findability += 0.4;
  if (dataset.url) findability += 0.3;
  if (dataset.description.length > 20) findability += 0.3;

  // Accessibility: has API (via repository), open access, has URL
  let accessibility = 0;
  if (dataset.accessModel === "open") accessibility += 0.5;
  else if (dataset.accessModel === "controlled") accessibility += 0.3;
  else if (dataset.accessModel === "federated") accessibility += 0.2;
  if (dataset.url) accessibility += 0.3;
  if (dataset.lastUpdated) accessibility += 0.2;

  // Interoperability: uses standard formats, standard data types
  let interoperability = 0;
  const standardFormats = ["DICOM", "VCF", "BAM", "CRAM", "FASTQ", "MAF", "GCT", "FHIR", "CSV", "TSV"];
  if (dataset.formats && dataset.formats.some((f) => standardFormats.includes(f))) {
    interoperability += 0.5;
  } else {
    interoperability += 0.2; // assume some standard format
  }
  if (dataset.dataTypes.length > 0) interoperability += 0.3;
  if (dataset.cancerTypes.length > 0) interoperability += 0.2;

  // Reusability: has license, has provenance, has description
  let reusability = 0;
  if (dataset.license) reusability += 0.4;
  if (dataset.description.length > 50) reusability += 0.3;
  if (dataset.lastUpdated) reusability += 0.3;

  return {
    findability: Math.min(findability, 1),
    accessibility: Math.min(accessibility, 1),
    interoperability: Math.min(interoperability, 1),
    reusability: Math.min(reusability, 1),
  };
}

/** Compute aggregate FAIR score (0-1) */
export function fairTotal(score: FAIRScore): number {
  return (score.findability + score.accessibility + score.interoperability + score.reusability) / 4;
}
