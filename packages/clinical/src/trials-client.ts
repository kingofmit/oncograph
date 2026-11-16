/**
 * Client for the ClinicalTrials.gov v2 REST API.
 * Endpoint: https://clinicaltrials.gov/api/v2/studies
 */

import { HttpClient, ClinicalTrial } from "@oncograph/core";

/* ------------------------------------------------------------------ */
/*  Raw API types (ClinicalTrials.gov v2 response shapes)              */
/* ------------------------------------------------------------------ */

interface CTGovStudy {
  protocolSection: {
    identificationModule: {
      nctId: string;
      briefTitle: string;
      officialTitle?: string;
    };
    statusModule: {
      overallStatus: string;
    };
    designModule?: {
      phases?: string[];
    };
    descriptionModule?: {
      briefSummary?: string;
    };
    conditionsModule?: {
      conditions?: string[];
    };
    armsInterventionsModule?: {
      interventions?: {
        name: string;
        type: string;
        description?: string;
      }[];
    };
    eligibilityModule?: {
      eligibilityCriteria?: string;
    };
    sponsorCollaboratorsModule?: {
      leadSponsor?: {
        name?: string;
      };
    };
    designModule2?: {
      enrollmentInfo?: {
        count?: number;
      };
    };
  };
}

interface CTGovResponse {
  studies: CTGovStudy[];
  totalCount: number;
  nextPageToken?: string;
}

/* ------------------------------------------------------------------ */
/*  Client                                                             */
/* ------------------------------------------------------------------ */

export class ClinicalTrialsClient {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient({
      baseUrl: "https://clinicaltrials.gov/api/v2",
      cacheTtlMs: 24 * 60 * 60 * 1000, // 24-hour cache
    });
  }

  /**
   * Search for clinical trials by condition, with optional intervention and status filters.
   */
  async searchTrials(
    condition: string,
    intervention?: string,
    status?: string,
    options?: { pageSize?: number; pageToken?: string },
  ): Promise<{ trials: ClinicalTrial[]; nextPageToken: string | null; totalCount: number }> {
    const params: Record<string, string> = {
      "query.cond": condition,
      pageSize: String(options?.pageSize ?? 20),
    };

    if (intervention) {
      params["query.intr"] = intervention;
    }

    if (status) {
      params["filter.overallStatus"] = status;
    }

    if (options?.pageToken) {
      params["pageToken"] = options.pageToken;
    }

    const data = await this.http.get<CTGovResponse>("/studies", params);
    return {
      trials: (data.studies ?? []).map(mapStudyToTrial),
      nextPageToken: data.nextPageToken ?? null,
      totalCount: data.totalCount,
    };
  }

  /**
   * Get a specific trial by its NCT ID.
   */
  async getTrial(nctId: string): Promise<ClinicalTrial | null> {
    try {
      const study = await this.http.get<CTGovStudy>(`/studies/${nctId}`);
      return mapStudyToTrial(study);
    } catch {
      return null;
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Mapper                                                             */
/* ------------------------------------------------------------------ */

function mapPhase(phases?: string[]): ClinicalTrial["phase"] {
  if (!phases || phases.length === 0) return "N/A";
  const joined = phases.join("/").toUpperCase();
  if (joined.includes("PHASE1") && joined.includes("PHASE2")) return "I/II";
  if (joined.includes("PHASE2") && joined.includes("PHASE3")) return "II/III";
  if (joined.includes("PHASE1")) return "I";
  if (joined.includes("PHASE2")) return "II";
  if (joined.includes("PHASE3")) return "III";
  if (joined.includes("PHASE4")) return "IV";
  return "N/A";
}

function mapStatus(raw: string): ClinicalTrial["status"] {
  const normalized = raw.toUpperCase().replace(/[\s_-]+/g, "_");
  if (normalized.includes("RECRUITING") && !normalized.includes("NOT")) return "recruiting";
  if (normalized.includes("ACTIVE")) return "active";
  if (normalized.includes("COMPLETED")) return "completed";
  if (normalized.includes("TERMINATED")) return "terminated";
  if (normalized.includes("WITHDRAWN")) return "withdrawn";
  return "active";
}

function mapStudyToTrial(study: CTGovStudy): ClinicalTrial {
  const proto = study.protocolSection;
  const nctId = proto.identificationModule.nctId;

  return {
    id: nctId,
    nctId,
    title: proto.identificationModule.briefTitle,
    phase: mapPhase(proto.designModule?.phases),
    status: mapStatus(proto.statusModule.overallStatus),
    cancerTypes: proto.conditionsModule?.conditions ?? [],
    interventions: (proto.armsInterventionsModule?.interventions ?? []).map((i) => i.name),
    url: `https://clinicaltrials.gov/study/${nctId}`,
    eligibilitySummary: proto.eligibilityModule?.eligibilityCriteria ?? undefined,
    sponsor: proto.sponsorCollaboratorsModule?.leadSponsor?.name ?? undefined,
  };
}
