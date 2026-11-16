/** A cancer type in the OncoTree-based taxonomy */
export interface CancerType {
  id: string;
  name: string;
  parent: string | null;
  tissue: string;
  aliases: string[];
  oncoTreeCode: string | null;
  icdO3Code?: string;
  whoGrade?: string;
  molecularSubtype?: string;
  prevalence?: "common" | "uncommon" | "rare" | "ultra-rare";
}

/** A data repository in the federated ecosystem */
export interface Repository {
  id: string;
  name: string;
  abbreviation: string;
  url: string;
  apiUrl: string | null;
  dataTypes: DataType[];
  accessModel: AccessModel;
  organization: string;
  description: string;
  scale: string;
}

/** Types of data available */
export type DataType =
  | "genomic" | "transcriptomic" | "proteomic" | "epigenomic"
  | "imaging" | "histopathology" | "clinical" | "drug-sensitivity"
  | "cell-line" | "epidemiological" | "biomarker" | "trial"
  | "pharmacogenomic" | "functional";

/** Access model for a repository or dataset */
export type AccessModel = "open" | "controlled" | "federated" | "commercial";

/** Demographic bias annotation for a dataset */
export interface DemographicBias {
  description: string;
  ancestryBreakdown?: Record<string, number>;
  limitation: string;
}

/** FAIR compliance score */
export interface FAIRScore {
  findability: number;
  accessibility: number;
  interoperability: number;
  reusability: number;
}

/** A dataset within a repository */
export interface Dataset {
  id: string;
  repositoryId: string;
  name: string;
  description: string;
  cancerTypes: string[];
  dataTypes: DataType[];
  patientCount: number | null;
  sampleCount: number | null;
  url: string | null;
  accessModel: AccessModel;
  lastUpdated: string | null;
  doi?: string;
  license?: string;
  formats?: string[];
  demographicBias?: DemographicBias;
  fairScore?: FAIRScore;
}

/** A biomarker relevant to a cancer type */
export interface Biomarker {
  id: string;
  name: string;
  gene: string | null;
  type: BiomarkerType;
  cancerTypes: string[];
  clinicalSignificance: ClinicalSignificance[];
  description: string;
  mutationType?: string;
  companionDiagnostics?: string[];
  linkedDrugs?: string[];
  source?: "OncoKB" | "CIViC" | "NCCN" | "published";
  prevalenceByType?: Record<string, number>;
}

/** Biomarker molecular type */
export type BiomarkerType =
  | "mutation" | "expression" | "fusion" | "amplification"
  | "deletion" | "methylation" | "protein" | "msi"
  | "signature" | "cytogenetic" | "cnv";

/** Clinical significance of a biomarker */
export type ClinicalSignificance =
  | "diagnostic" | "prognostic" | "predictive" | "therapeutic-target";

/** A clinical trial */
export interface ClinicalTrial {
  id: string;
  nctId: string;
  title: string;
  phase: "I" | "I/II" | "II" | "II/III" | "III" | "IV" | "N/A";
  status: "recruiting" | "active" | "completed" | "terminated" | "withdrawn";
  cancerTypes: string[];
  interventions: string[];
  url: string;
  eligibilitySummary?: string;
  enrollment?: number;
  sponsor?: string;
  biomarkers?: string[];
}

/** A drug with sensitivity data */
export interface Drug {
  id: string;
  name: string;
  aliases: string[];
  targets: string[];
  mechanism: string;
  cancerTypes: string[];
  approvalStatus: "approved" | "investigational" | "preclinical";
  drugClass?: string;
  fdaApprovalIndications?: string[];
  associatedBiomarkers?: string[];
  combinationRegimens?: string[];
}

/** Cross-reference linking a sample across repositories */
export interface CrossReference {
  sampleId: string;
  cancerType: string;
  repositories: { repositoryId: string; datasetId: string; dataTypes: DataType[]; url?: string }[];
}

/** Data completeness score for a cancer type */
export interface DataCompletenessScore {
  cancerTypeId: string;
  modalities: Record<string, boolean>;
  score: number;
  gaps: string[];
}

/** Cancer signaling pathway */
export interface Pathway {
  id: string;
  name: string;
  source: "KEGG" | "Reactome";
  sourceId: string;
  genes: string[];
  description: string;
  therapeuticVulnerabilities: string[];
}

/** Result of a pathway analysis */
export interface PathwayAnalysis {
  mutatedGenes: string[];
  affectedPathways: Pathway[];
  downstreamEffects: string[];
  drugTargets: { drug: string; target: string; pathway: string }[];
}

/** Survival data for a cancer type + biomarker combination */
export interface SurvivalData {
  cancerType: string;
  biomarker: string | null;
  fiveYearSurvival: number;
  medianSurvivalMonths: number | null;
  hazardRatio: number | null;
  source: "TCGA" | "SEER" | "published";
  citation: string | null;
  sampleSize: number;
  kmCurvePoints?: { months: number; survival: number }[];
}

/** Clinical data standard */
export interface ClinicalStandard {
  id: string;
  name: string;
  abbreviation: string;
  url: string;
  purpose: string;
}

/** Query to the discovery engine */
export interface DiscoveryQuery {
  cancerType: string;
  dataTypes?: DataType[];
  accessModel?: AccessModel[];
  includeTrials?: boolean;
  includeDrugs?: boolean;
  includeBiomarkers?: boolean;
}

/** Query result */
export interface DiscoveryResult {
  query: DiscoveryQuery;
  cancerType: CancerType | null;
  datasets: Dataset[];
  biomarkers: Biomarker[];
  drugs: Drug[];
  trials: ClinicalTrial[];
  repositories: Repository[];
  timestamp: number;
  disclaimer: string;
  completeness?: DataCompletenessScore;
}
