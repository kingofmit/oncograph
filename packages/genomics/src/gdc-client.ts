/**
 * Client for the NCI Genomic Data Commons (GDC) GraphQL API.
 * Endpoint: https://api.gdc.cancer.gov/v0/graphql
 */

import { HttpClient } from "@oncograph/core";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface GDCProject {
  projectId: string;
  name: string;
  primarySite: string[];
  diseaseType: string[];
  program: { name: string };
  summary: {
    caseCount: number;
    fileCount: number;
    dataCategories: { dataCategoryName: string; caseCount: number }[];
  };
}

export interface GDCCase {
  caseId: string;
  submitterId: string;
  projectId: string;
  primarySite: string;
  diseaseType: string;
  demographic: {
    gender: string | null;
    race: string | null;
    ethnicity: string | null;
    vitalStatus: string | null;
  } | null;
}

export interface GDCCaseResult {
  cases: GDCCase[];
  total: number;
}

export interface GDCFile {
  fileId: string;
  fileName: string;
  dataCategory: string;
  dataType: string;
  dataFormat: string;
  fileSize: number;
  accessType: string;
}

export interface GDCSearchResult {
  projects: GDCProject[];
  cases: GDCCase[];
  totalProjects: number;
  totalCases: number;
}

/* ------------------------------------------------------------------ */
/*  GraphQL fragments / queries                                        */
/* ------------------------------------------------------------------ */

const PROJECTS_QUERY = `
  query ProjectsQuery($filters: FiltersArgument, $size: Int) {
    projectsViewer: repository {
      projects {
        hits(filters: $filters, first: $size) {
          total
          edges {
            node {
              project_id
              name
              primary_site
              disease_type
              program { name }
              summary {
                case_count
                file_count
                data_categories { data_category case_count }
              }
            }
          }
        }
      }
    }
  }
`;

const CASES_QUERY = `
  query CasesQuery($filters: FiltersArgument, $size: Int, $from: Int) {
    repository {
      cases {
        hits(filters: $filters, first: $size, offset: $from) {
          total
          edges {
            node {
              case_id
              submitter_id
              project { project_id }
              primary_site
              disease_type
              demographic { gender race ethnicity vital_status }
            }
          }
        }
      }
    }
  }
`;

const FILES_QUERY = `
  query FilesQuery($filters: FiltersArgument) {
    repository {
      files {
        hits(filters: $filters, first: 100) {
          total
          edges {
            node {
              file_id
              file_name
              data_category
              data_type
              data_format
              file_size
              access
            }
          }
        }
      }
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Client                                                             */
/* ------------------------------------------------------------------ */

export class GDCClient {
  private http: HttpClient;

  constructor(token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers["X-Auth-Token"] = token;
    }

    this.http = new HttpClient({
      baseUrl: "https://api.gdc.cancer.gov",
      cacheTtlMs: 5 * 60 * 1000, // 5-minute cache
      headers,
    });
  }

  /** Query projects, optionally filtered by cancer type keyword. */
  async getProjects(cancerType?: string): Promise<GDCProject[]> {
    const filters = cancerType
      ? {
          op: "in" as const,
          content: {
            field: "primary_site",
            value: [cancerType],
          },
        }
      : undefined;

    const data = await this.http.graphql<{
      projectsViewer: {
        projects: {
          hits: {
            total: number;
            edges: { node: RawProject }[];
          };
        };
      };
    }>("/v0/graphql", PROJECTS_QUERY, {
      filters: filters ?? null,
      size: 100,
    });

    return data.projectsViewer.projects.hits.edges.map((e) => mapProject(e.node));
  }

  /** Query cases belonging to a project. */
  async getCases(
    projectId: string,
    options?: { size?: number; from?: number },
  ): Promise<GDCCaseResult> {
    const filters = {
      op: "in" as const,
      content: {
        field: "cases.project.project_id",
        value: [projectId],
      },
    };

    const data = await this.http.graphql<{
      repository: {
        cases: {
          hits: {
            total: number;
            edges: { node: RawCase }[];
          };
        };
      };
    }>("/v0/graphql", CASES_QUERY, {
      filters,
      size: options?.size ?? 20,
      from: options?.from ?? 0,
    });

    const hits = data.repository.cases.hits;
    return {
      cases: hits.edges.map((e) => mapCase(e.node)),
      total: hits.total,
    };
  }

  /** Query files associated with a specific case. */
  async getFiles(caseId: string): Promise<GDCFile[]> {
    const filters = {
      op: "in" as const,
      content: {
        field: "cases.case_id",
        value: [caseId],
      },
    };

    const data = await this.http.graphql<{
      repository: {
        files: {
          hits: {
            total: number;
            edges: { node: RawFile }[];
          };
        };
      };
    }>("/v0/graphql", FILES_QUERY, { filters });

    return data.repository.files.hits.edges.map((e) => mapFile(e.node));
  }

  /** Search cases by project ID with pagination options. */
  async searchCases(
    projectId: string,
    options?: { size?: number; from?: number },
  ): Promise<GDCCaseResult> {
    return this.getCases(projectId, options);
  }

  /** Get a single project by its ID. */
  async getProject(projectId: string): Promise<GDCProject | null> {
    const filters = {
      op: "in" as const,
      content: {
        field: "project_id",
        value: [projectId],
      },
    };

    const data = await this.http.graphql<{
      projectsViewer: {
        projects: {
          hits: {
            total: number;
            edges: { node: RawProject }[];
          };
        };
      };
    }>("/v0/graphql", PROJECTS_QUERY, {
      filters,
      size: 1,
    });

    const edges = data.projectsViewer.projects.hits.edges;
    return edges.length > 0 ? mapProject(edges[0].node) : null;
  }

  /** Search files associated with a specific case. */
  async searchFiles(caseId: string): Promise<GDCFile[]> {
    return this.getFiles(caseId);
  }

  /** Search projects and cases matching a free-text query. */
  async search(query: string): Promise<GDCSearchResult> {
    const projectFilters = {
      op: "in" as const,
      content: {
        field: "primary_site",
        value: [query],
      },
    };

    const caseFilters = {
      op: "in" as const,
      content: {
        field: "primary_site",
        value: [query],
      },
    };

    const [projectData, caseData] = await Promise.all([
      this.http.graphql<{
        projectsViewer: {
          projects: {
            hits: { total: number; edges: { node: RawProject }[] };
          };
        };
      }>("/v0/graphql", PROJECTS_QUERY, {
        filters: projectFilters,
        size: 20,
      }),
      this.http.graphql<{
        repository: {
          cases: {
            hits: { total: number; edges: { node: RawCase }[] };
          };
        };
      }>("/v0/graphql", CASES_QUERY, {
        filters: caseFilters,
        size: 20,
        from: 0,
      }),
    ]);

    return {
      projects: projectData.projectsViewer.projects.hits.edges.map((e) => mapProject(e.node)),
      cases: caseData.repository.cases.hits.edges.map((e) => mapCase(e.node)),
      totalProjects: projectData.projectsViewer.projects.hits.total,
      totalCases: caseData.repository.cases.hits.total,
    };
  }
}

/* ------------------------------------------------------------------ */
/*  Raw API shapes & mappers                                           */
/* ------------------------------------------------------------------ */

interface RawProject {
  project_id: string;
  name: string;
  primary_site: string[];
  disease_type: string[];
  program: { name: string };
  summary: {
    case_count: number;
    file_count: number;
    data_categories: { data_category: string; case_count: number }[];
  };
}

interface RawCase {
  case_id: string;
  submitter_id: string;
  project: { project_id: string };
  primary_site: string;
  disease_type: string;
  demographic: {
    gender: string | null;
    race: string | null;
    ethnicity: string | null;
    vital_status: string | null;
  } | null;
}

interface RawFile {
  file_id: string;
  file_name: string;
  data_category: string;
  data_type: string;
  data_format: string;
  file_size: number;
  access: string;
}

function mapProject(raw: RawProject): GDCProject {
  return {
    projectId: raw.project_id,
    name: raw.name,
    primarySite: raw.primary_site,
    diseaseType: raw.disease_type,
    program: raw.program,
    summary: {
      caseCount: raw.summary.case_count,
      fileCount: raw.summary.file_count,
      dataCategories: raw.summary.data_categories.map((dc) => ({
        dataCategoryName: dc.data_category,
        caseCount: dc.case_count,
      })),
    },
  };
}

function mapCase(raw: RawCase): GDCCase {
  return {
    caseId: raw.case_id,
    submitterId: raw.submitter_id,
    projectId: raw.project.project_id,
    primarySite: raw.primary_site,
    diseaseType: raw.disease_type,
    demographic: raw.demographic
      ? {
          gender: raw.demographic.gender,
          race: raw.demographic.race,
          ethnicity: raw.demographic.ethnicity,
          vitalStatus: raw.demographic.vital_status,
        }
      : null,
  };
}

function mapFile(raw: RawFile): GDCFile {
  return {
    fileId: raw.file_id,
    fileName: raw.file_name,
    dataCategory: raw.data_category,
    dataType: raw.data_type,
    dataFormat: raw.data_format,
    fileSize: raw.file_size,
    accessType: raw.access,
  };
}
