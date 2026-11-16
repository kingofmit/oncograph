import { DiscoveryResult } from "@oncograph/core";

export function datasetsToCSV(result: DiscoveryResult): string {
  const header = "name,repository,data_types,access,patients,url,description";
  const rows = result.datasets.map((ds) =>
    `"${ds.name}","${ds.repositoryId}","${ds.dataTypes.join("; ")}","${ds.accessModel}","${ds.patientCount ?? ""}","${ds.url ?? ""}","${ds.description}"`
  );
  return [header, ...rows].join("\n");
}

export function biomarkersToCSV(result: DiscoveryResult): string {
  const header = "name,gene,type,significance,description";
  const rows = result.biomarkers.map((bm) =>
    `"${bm.name}","${bm.gene ?? ""}","${bm.type}","${bm.clinicalSignificance}","${bm.description}"`
  );
  return [header, ...rows].join("\n");
}
