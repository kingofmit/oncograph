import { Repository } from "@oncograph/core";

export const IMAGING_REPOSITORIES: Repository[] = [
  {
    id: "tcia",
    name: "The Cancer Imaging Archive",
    abbreviation: "TCIA",
    url: "https://www.cancerimagingarchive.net",
    apiUrl: "https://services.cancerimagingarchive.net/nbia-api/services/v1",
    dataTypes: ["imaging", "histopathology"],
    accessModel: "open",
    organization: "NCI/FNIH",
    description:
      "Largest open-access repository of cancer medical images. CT, MRI, PET, and digital pathology across 200+ collections with clinical and genomic annotations.",
    scale: "70,000+ patients, 200+ collections",
  },
  {
    id: "idc",
    name: "Imaging Data Commons",
    abbreviation: "IDC",
    url: "https://learn.canceridc.dev",
    apiUrl: "https://api.imaging.datacommons.cancer.gov",
    dataTypes: ["imaging"],
    accessModel: "open",
    organization: "NCI CRDC",
    description:
      "Cloud-based DICOM imaging repository within the Cancer Research Data Commons. Enables SQL-based queries via Google BigQuery over 60M+ DICOM instances with zero-download analysis workflows.",
    scale: "60+ million DICOM images, cloud-native",
  },
  {
    id: "nlst",
    name: "National Lung Screening Trial",
    abbreviation: "NLST",
    url: "https://cdas.cancer.gov/nlst",
    apiUrl: null,
    dataTypes: ["imaging", "clinical"],
    accessModel: "controlled",
    organization: "NCI",
    description:
      "Landmark randomized controlled trial comparing low-dose CT screening to chest radiography for lung cancer detection. Imaging data with linked clinical outcomes, demographics, and longitudinal follow-up.",
    scale: "26,000+ participants, 75,000+ CT scans",
  },
];
