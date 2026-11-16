/** A cancer type in the OncoTree-based taxonomy */
export interface CancerType {
  id: string;
  name: string;
  parent: string | null;
  tissue: string;
  aliases: string[];
  oncoTreeCode: string | null;
}

/** A data repository in the federated ecosystem */
export interface Repository {
  id: string;
  name: string;
  abbreviation: string;
  url: string;
  apiUrl: string | null;
  dataTypes: DataType[];
  accessModel: "open" | "controlled" | "federated" | "commercial";
  organization: string;
  description: string;
  scale: string;
}

/** Types of data available */
export type DataType =
  | "genomic" | "transcriptomic" | "proteomic" | "epigenomic"
  | "imaging" | "histopathology" | "clinical" | "drug-sensitivity"
  | "cell-line" | "epidemiological" | "biomarker" | "trial";

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
  accessModel: "open" | "controlled" | "federated";
  lastUpdated: string | null;
}

/** A biomarker relevant to a cancer type */
export interface Biomarker {
  id: string;
  name: string;
  gene: string | null;
  type: "mutation" | "expression" | "fusion" | "amplification" | "deletion" | "methylation" | "protein";
  cancerTypes: string[];
  clinicalSignificance: "diagnostic" | "prognostic" | "predictive" | "therapeutic-target";
  description: string;
}

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
}

/** Query to the discovery engine */
export interface DiscoveryQuery {
  cancerType: string;
  dataTypes?: DataType[];
  accessModel?: ("open" | "controlled" | "federated")[];
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
}
