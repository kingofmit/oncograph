import { ClinicalStandard } from "@oncograph/core";

export const CLINICAL_STANDARDS: ClinicalStandard[] = [
  { id: "mcode", name: "Minimal Common Oncology Data Elements", abbreviation: "mCODE", url: "https://mcodeinitiative.org", purpose: "Standardized oncology clinical data model built on HL7 FHIR. Ensures semantic interoperability across cancer registries." },
  { id: "oncotree", name: "OncoTree", abbreviation: "OncoTree", url: "https://oncotree.mskcc.org", purpose: "Hierarchical tumor type classification with 800+ entries. Standard ontology for cancer type identification." },
  { id: "hgnc", name: "HUGO Gene Nomenclature Committee", abbreviation: "HGNC", url: "https://www.genenames.org", purpose: "Authoritative gene naming standard ensuring consistent gene references across datasets." },
  { id: "ga4gh-drs", name: "GA4GH Data Repository Service", abbreviation: "DRS", url: "https://www.ga4gh.org/product/data-repository-service-drs", purpose: "Cloud-agnostic file retrieval API. Access genomic files across GDC, IDC, PDC without vendor lock-in." },
  { id: "ga4gh-passports", name: "GA4GH Passports", abbreviation: "Passports", url: "https://www.ga4gh.org/product/ga4gh-passports", purpose: "Federated single sign-on for controlled-access genomic data across international repositories." },
];
