import { Repository } from "@oncograph/core";

export const IMAGING_REPOSITORIES: Repository[] = [
  { id: "tcia", name: "The Cancer Imaging Archive", abbreviation: "TCIA", url: "https://www.cancerimagingarchive.net", apiUrl: "https://services.cancerimagingarchive.net/nbia-api/services/v1", dataTypes: ["imaging", "histopathology"], accessModel: "open", organization: "NCI/FNIH", description: "Largest open-access repository of cancer medical images. CT, MRI, PET, and digital pathology.", scale: "70,000+ patients, 200+ collections" },
  { id: "idc", name: "Imaging Data Commons", abbreviation: "IDC", url: "https://learn.canceridc.dev", apiUrl: "https://api.imaging.datacommons.cancer.gov", dataTypes: ["imaging"], accessModel: "open", organization: "NCI CRDC", description: "Cloud-based DICOM imaging with Google BigQuery SQL-based queries. 60M+ DICOM instances.", scale: "60+ million DICOM images" },
];
