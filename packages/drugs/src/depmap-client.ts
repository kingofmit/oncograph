/**
 * Client for the DepMap (Cancer Dependency Map) portal API.
 * Provides access to cell-line data, gene dependencies, and drug sensitivity.
 *
 * Endpoint: https://api.depmap.org/api/v1
 */

import { HttpClient } from "@oncograph/core";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface DepMapCellLine {
  cellLineId: string;
  cellLineName: string;
  strippedCellLineName: string;
  cancerType: string;
  cancerSubtype: string | null;
  primaryDisease: string;
  lineage: string;
  lineageSubtype: string | null;
  sex: string | null;
  source: string | null;
}

export interface DepMapDependency {
  gene: string;
  geneId: number;
  cellLineId: string;
  dependencyScore: number;
  isCommonEssential: boolean;
}

export interface DepMapDrugSensitivity {
  drugName: string;
  drugId: string;
  cellLineId: string;
  ic50: number | null;
  auc: number | null;
  sensitivity: "sensitive" | "resistant" | "intermediate";
}

/* ------------------------------------------------------------------ */
/*  Raw API types                                                      */
/* ------------------------------------------------------------------ */

interface RawCellLine {
  depmap_id: string;
  cell_line_name: string;
  stripped_cell_line_name: string;
  primary_disease: string;
  subtype?: string | null;
  lineage: string;
  lineage_subtype?: string | null;
  sex?: string | null;
  source?: string | null;
}

interface RawDependency {
  gene_name: string;
  gene_id: number;
  depmap_id: string;
  dependency_score: number;
  is_common_essential: boolean;
}

interface RawDrugSensitivity {
  drug_name: string;
  drug_id: string;
  depmap_id: string;
  ic50?: number | null;
  auc?: number | null;
}

/* ------------------------------------------------------------------ */
/*  Client                                                             */
/* ------------------------------------------------------------------ */

export class DepMapClient {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient({
      baseUrl: "https://api.depmap.org/api/v1",
      cacheTtlMs: 15 * 60 * 1000, // 15-minute cache
    });
  }

  /** Search cell lines, optionally filtered by cancer type. */
  async getCellLines(cancerType?: string): Promise<DepMapCellLine[]> {
    const params: Record<string, string> = {};
    if (cancerType) {
      params["primary_disease"] = cancerType;
    }

    const data = await this.http.get<{ cell_lines: RawCellLine[] }>("/cell_lines", params);
    return (data.cell_lines ?? []).map(mapCellLine);
  }

  /** Get gene dependency scores for a cell line. */
  async getDependencies(cellLineId: string): Promise<DepMapDependency[]> {
    const data = await this.http.get<{ dependencies: RawDependency[] }>(
      `/cell_lines/${encodeURIComponent(cellLineId)}/dependencies`,
    );
    return (data.dependencies ?? []).map(mapDependency);
  }

  /** Get CRISPR gene dependency scores across cell lines for a specific gene. */
  async getGeneDependency(gene: string): Promise<DepMapDependency[]> {
    const data = await this.http.get<{ dependencies: RawDependency[] }>(
      `/genes/${encodeURIComponent(gene)}/dependencies`,
    );
    return (data.dependencies ?? []).map(mapDependency);
  }

  /** Get drug sensitivity data for a cell line. */
  async getDrugSensitivity(cellLineId: string): Promise<DepMapDrugSensitivity[]> {
    const data = await this.http.get<{ sensitivities: RawDrugSensitivity[] }>(
      `/cell_lines/${encodeURIComponent(cellLineId)}/drug_sensitivities`,
    );
    return (data.sensitivities ?? []).map(mapDrugSensitivity);
  }
}

/* ------------------------------------------------------------------ */
/*  Mappers                                                            */
/* ------------------------------------------------------------------ */

function mapCellLine(raw: RawCellLine): DepMapCellLine {
  return {
    cellLineId: raw.depmap_id,
    cellLineName: raw.cell_line_name,
    strippedCellLineName: raw.stripped_cell_line_name,
    cancerType: raw.primary_disease,
    cancerSubtype: raw.subtype ?? null,
    primaryDisease: raw.primary_disease,
    lineage: raw.lineage,
    lineageSubtype: raw.lineage_subtype ?? null,
    sex: raw.sex ?? null,
    source: raw.source ?? null,
  };
}

function mapDependency(raw: RawDependency): DepMapDependency {
  return {
    gene: raw.gene_name,
    geneId: raw.gene_id,
    cellLineId: raw.depmap_id,
    dependencyScore: raw.dependency_score,
    isCommonEssential: raw.is_common_essential,
  };
}

function mapDrugSensitivity(raw: RawDrugSensitivity): DepMapDrugSensitivity {
  const ic50 = raw.ic50 ?? null;
  const auc = raw.auc ?? null;

  let sensitivity: DepMapDrugSensitivity["sensitivity"] = "intermediate";
  if (ic50 !== null) {
    if (ic50 < 1) sensitivity = "sensitive";
    else if (ic50 > 10) sensitivity = "resistant";
  }

  return {
    drugName: raw.drug_name,
    drugId: raw.drug_id,
    cellLineId: raw.depmap_id,
    ic50,
    auc,
    sensitivity,
  };
}
