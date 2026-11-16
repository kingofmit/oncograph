/**
 * Client for the NCI Imaging Data Commons (IDC) API.
 * Uses the IDC API to query DICOM imaging collections, studies, and series.
 *
 * Endpoint: https://api.imaging.datacommons.cancer.gov/v2
 */

import { HttpClient } from "@oncograph/core";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface IDCCollection {
  collectionId: string;
  cancerType: string;
  species: string;
  imageTypes: string;
  subjectCount: number;
  doi: string | null;
  description: string | null;
}

export interface IDCStudy {
  studyInstanceUID: string;
  patientId: string;
  studyDescription: string | null;
  studyDate: string | null;
  modality: string[];
  seriesCount: number;
  instanceCount: number;
}

export interface IDCSeries {
  seriesInstanceUID: string;
  studyInstanceUID: string;
  modality: string;
  seriesDescription: string | null;
  bodyPartExamined: string | null;
  instanceCount: number;
  manufacturer: string | null;
}

/* ------------------------------------------------------------------ */
/*  Raw API types                                                      */
/* ------------------------------------------------------------------ */

interface RawIDCCollection {
  collection_id: string;
  cancer_type: string;
  species: string;
  image_types: string;
  subject_count: number;
  doi?: string | null;
  description?: string | null;
}

interface RawIDCStudy {
  StudyInstanceUID: string;
  PatientID: string;
  StudyDescription?: string | null;
  StudyDate?: string | null;
  Modality?: string[];
  SeriesCount?: number;
  InstanceCount?: number;
}

interface RawIDCSeries {
  SeriesInstanceUID: string;
  StudyInstanceUID: string;
  Modality: string;
  SeriesDescription?: string | null;
  BodyPartExamined?: string | null;
  InstanceCount?: number;
  Manufacturer?: string | null;
}

/* ------------------------------------------------------------------ */
/*  Client                                                             */
/* ------------------------------------------------------------------ */

export class IDCClient {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient({
      baseUrl: "https://api.imaging.datacommons.cancer.gov/v2",
      cacheTtlMs: 10 * 60 * 1000, // 10-minute cache
    });
  }

  /** Get all available collections. */
  async getCollections(): Promise<IDCCollection[]> {
    const data = await this.http.get<{ collections: RawIDCCollection[] }>("/collections");
    return (data.collections ?? []).map(mapCollection);
  }

  /** Get studies belonging to a collection. */
  async getStudies(collectionId: string): Promise<IDCStudy[]> {
    const data = await this.http.get<{ studies: RawIDCStudy[] }>(
      `/collections/${encodeURIComponent(collectionId)}/studies`,
    );
    return (data.studies ?? []).map(mapStudy);
  }

  /** Get DICOM series for a given study. */
  async getSeries(studyInstanceUID: string): Promise<IDCSeries[]> {
    const data = await this.http.get<{ series: RawIDCSeries[] }>(
      `/studies/${encodeURIComponent(studyInstanceUID)}/series`,
    );
    return (data.series ?? []).map(mapSeries);
  }
}

/* ------------------------------------------------------------------ */
/*  Mappers                                                            */
/* ------------------------------------------------------------------ */

function mapCollection(raw: RawIDCCollection): IDCCollection {
  return {
    collectionId: raw.collection_id,
    cancerType: raw.cancer_type,
    species: raw.species,
    imageTypes: raw.image_types,
    subjectCount: raw.subject_count,
    doi: raw.doi ?? null,
    description: raw.description ?? null,
  };
}

function mapStudy(raw: RawIDCStudy): IDCStudy {
  return {
    studyInstanceUID: raw.StudyInstanceUID,
    patientId: raw.PatientID,
    studyDescription: raw.StudyDescription ?? null,
    studyDate: raw.StudyDate ?? null,
    modality: raw.Modality ?? [],
    seriesCount: raw.SeriesCount ?? 0,
    instanceCount: raw.InstanceCount ?? 0,
  };
}

function mapSeries(raw: RawIDCSeries): IDCSeries {
  return {
    seriesInstanceUID: raw.SeriesInstanceUID,
    studyInstanceUID: raw.StudyInstanceUID,
    modality: raw.Modality,
    seriesDescription: raw.SeriesDescription ?? null,
    bodyPartExamined: raw.BodyPartExamined ?? null,
    instanceCount: raw.InstanceCount ?? 0,
    manufacturer: raw.Manufacturer ?? null,
  };
}
