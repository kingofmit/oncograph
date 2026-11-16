import { DiscoveryResult } from "@oncograph/core";

export function datasetsToCSV(result: DiscoveryResult): string {
  const header = "name,repository,data_types,access,patients,url,description";
  const rows = result.datasets.map((ds) =>
    `"${ds.name}","${ds.repositoryId}","${ds.dataTypes.join("; ")}","${ds.accessModel}","${ds.patientCount ?? ""}","${ds.url ?? ""}","${ds.description}"`
  );
  return [header, ...rows].join("\n");
}

export function biomarkersToCSV(result: DiscoveryResult): string {
  const header = "name,gene,type,significance,linked_drugs,description";
  const rows = result.biomarkers.map((bm) =>
    `"${bm.name}","${bm.gene ?? ""}","${bm.type}","${bm.clinicalSignificance.join("; ")}","${(bm.linkedDrugs ?? []).join("; ")}","${bm.description}"`
  );
  return [header, ...rows].join("\n");
}

export function drugsToCSV(result: DiscoveryResult): string {
  const header = "name,aliases,targets,mechanism,class,approval_status,indications";
  const rows = result.drugs.map((d) =>
    `"${d.name}","${d.aliases.join("; ")}","${d.targets.join("; ")}","${d.mechanism}","${d.drugClass ?? ""}","${d.approvalStatus}","${(d.fdaApprovalIndications ?? []).join("; ")}"`
  );
  return [header, ...rows].join("\n");
}

export function trialsToCSV(result: DiscoveryResult): string {
  const header = "nct_id,title,phase,status,interventions,url";
  const rows = result.trials.map((t) =>
    `"${t.nctId}","${t.title}","${t.phase}","${t.status}","${t.interventions.join("; ")}","${t.url}"`
  );
  return [header, ...rows].join("\n");
}
