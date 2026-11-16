/**
 * Client for the Cancer Data Aggregator (CDA) API.
 * CDA provides a unified interface to query subjects and files across
 * GDC, PDC, and IDC repositories.
 *
 * Endpoint: https://cda.datacommons.cancer.gov/api/v1
 */

import { HttpClient } from "@oncograph/core";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CDASubject {
  subjectId: string;
  cancerType: string | null;
  primarySite: string | null;
  repositories: string[];
  gender: string | null;
  race: string | null;
  ethnicity: string | null;
  vitalStatus: string | null;
}

export interface CDASubjectCounts {
  projectId: string;
  totalSubjects: number;
  bySite: Record<string, number>;
  byCancerType: Record<string, number>;
  byRepository: Record<string, number>;
}

export interface CDAFile {
  fileId: string;
  fileName: string;
  dataCategory: string | null;
  dataType: string | null;
  fileFormat: string | null;
  fileSize: number | null;
  repository: string;
}

/* ------------------------------------------------------------------ */
/*  Raw API types                                                      */
/* ------------------------------------------------------------------ */

interface RawCDASubject {
  subject_id: string;
  disease_type?: string | null;
  primary_site?: string | null;
  source?: string[];
  sex?: string | null;
  race?: string | null;
  ethnicity?: string | null;
  vital_status?: string | null;
}

interface RawCDAFile {
  file_id: string;
  file_name: string;
  data_category?: string | null;
  data_type?: string | null;
  file_format?: string | null;
  file_size?: number | null;
  source?: string;
}

interface CDAQueryResponse<T> {
  result: T[];
  total_row_count: number;
}

/* ------------------------------------------------------------------ */
/*  Client                                                             */
/* ------------------------------------------------------------------ */

export class CDAClient {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient({
      baseUrl: "https://cda.datacommons.cancer.gov/api/v1",
      cacheTtlMs: 5 * 60 * 1000,
    });
  }

  /**
   * Query subjects across GDC, PDC, and IDC.
   */
  async querySubjects(options: {
    cancerType?: string;
    dataType?: string;
  }): Promise<CDASubject[]> {
    const filters: string[] = [];
    if (options.cancerType) {
      filters.push(`disease_type = '${escapeSql(options.cancerType)}'`);
    }
    if (options.dataType) {
      filters.push(`data_type = '${escapeSql(options.dataType)}'`);
    }

    const body = {
      node_type: "subject",
      ...(filters.length > 0 ? { query: filters.join(" AND ") } : {}),
      limit: 100,
      offset: 0,
    };

    const data = await this.http.post<CDAQueryResponse<RawCDASubject>>("/subjects/query", body);
    return (data.result ?? []).map(mapSubject);
  }

  /**
   * Cross-domain query for samples by cancer type.
   */
  async querySamples(
    cancerType: string,
    options?: { limit?: number; offset?: number },
  ): Promise<{ subjects: CDASubject[]; totalCount: number }> {
    const body = {
      node_type: "subject",
      query: `disease_type = '${escapeSql(cancerType)}'`,
      limit: options?.limit ?? 100,
      offset: options?.offset ?? 0,
    };

    const data = await this.http.post<CDAQueryResponse<RawCDASubject>>("/subjects/query", body);
    return {
      subjects: (data.result ?? []).map(mapSubject),
      totalCount: data.total_row_count,
    };
  }

  /**
   * Get subject counts for a project, broken down by repository.
   */
  async getSubjectCounts(projectId: string): Promise<CDASubjectCounts> {
    const body = {
      node_type: "subject",
      query: `project_id = '${escapeSql(projectId)}'`,
      limit: 0,
      offset: 0,
    };

    const data = await this.http.post<CDAQueryResponse<RawCDASubject>>("/subjects/query", body);
    const subjects = (data.result ?? []).map(mapSubject);

    const bySite: Record<string, number> = {};
    const byRepository: Record<string, number> = {};
    const byCancerType: Record<string, number> = {};

    for (const subject of subjects) {
      if (subject.primarySite) {
        bySite[subject.primarySite] = (bySite[subject.primarySite] ?? 0) + 1;
      }
      if (subject.cancerType) {
        byCancerType[subject.cancerType] = (byCancerType[subject.cancerType] ?? 0) + 1;
      }
      for (const repo of subject.repositories) {
        byRepository[repo] = (byRepository[repo] ?? 0) + 1;
      }
    }

    return {
      projectId,
      totalSubjects: data.total_row_count,
      bySite,
      byCancerType,
      byRepository,
    };
  }

  /**
   * Get files associated with a specific subject.
   */
  async getFiles(subjectId: string): Promise<CDAFile[]> {
    const body = {
      node_type: "file",
      query: `subject_id = '${escapeSql(subjectId)}'`,
      limit: 200,
      offset: 0,
    };

    const data = await this.http.post<CDAQueryResponse<RawCDAFile>>("/files/query", body);
    return (data.result ?? []).map(mapFile);
  }
}

/* ------------------------------------------------------------------ */
/*  Mappers                                                            */
/* ------------------------------------------------------------------ */

function mapSubject(raw: RawCDASubject): CDASubject {
  return {
    subjectId: raw.subject_id,
    cancerType: raw.disease_type ?? null,
    primarySite: raw.primary_site ?? null,
    repositories: raw.source ?? [],
    gender: raw.sex ?? null,
    race: raw.race ?? null,
    ethnicity: raw.ethnicity ?? null,
    vitalStatus: raw.vital_status ?? null,
  };
}

function mapFile(raw: RawCDAFile): CDAFile {
  return {
    fileId: raw.file_id,
    fileName: raw.file_name,
    dataCategory: raw.data_category ?? null,
    dataType: raw.data_type ?? null,
    fileFormat: raw.file_format ?? null,
    fileSize: raw.file_size ?? null,
    repository: raw.source ?? "unknown",
  };
}

/** Basic SQL-injection prevention for CDA query strings. */
function escapeSql(value: string): string {
  return value.replace(/'/g, "''");
}
