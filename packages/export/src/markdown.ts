import { DiscoveryResult } from "@oncograph/core";

export function toMarkdown(result: DiscoveryResult): string {
  const lines: string[] = [];
  lines.push(`# Cancer Data Discovery Report`);
  lines.push(`**Query:** ${result.query.cancerType}`);
  if (result.cancerType) lines.push(`**Resolved:** ${result.cancerType.name} (${result.cancerType.tissue})`);
  lines.push(`**Generated:** ${new Date(result.timestamp).toISOString()}`);
  lines.push("");

  if (result.datasets.length > 0) {
    lines.push("## Available Datasets");
    for (const ds of result.datasets) {
      lines.push(`### ${ds.name}`);
      lines.push(`- **Repository:** ${ds.repositoryId}`);
      lines.push(`- **Data types:** ${ds.dataTypes.join(", ")}`);
      lines.push(`- **Access:** ${ds.accessModel}`);
      if (ds.patientCount) lines.push(`- **Patients:** ${ds.patientCount.toLocaleString()}`);
      if (ds.url) lines.push(`- **URL:** ${ds.url}`);
      lines.push(`- ${ds.description}`);
      lines.push("");
    }
  }

  if (result.biomarkers.length > 0) {
    lines.push("## Key Biomarkers");
    for (const bm of result.biomarkers) {
      lines.push(`- **${bm.name}**${bm.gene ? ` (${bm.gene})` : ""} — ${bm.clinicalSignificance}. ${bm.description}`);
    }
    lines.push("");
  }

  if (result.drugs.length > 0) {
    lines.push("## Targeted Therapies");
    for (const d of result.drugs) {
      lines.push(`- **${d.name}** (${d.aliases.join(", ")}) — ${d.mechanism}. Targets: ${d.targets.join(", ")}. Status: ${d.approvalStatus}.`);
    }
    lines.push("");
  }

  if (result.trials.length > 0) {
    lines.push("## Clinical Trials");
    for (const t of result.trials) {
      lines.push(`- **${t.title}** (${t.nctId}) — Phase ${t.phase}, ${t.status}. [View](${t.url})`);
    }
    lines.push("");
  }

  lines.push("---");
  lines.push(`*${result.disclaimer}*`);
  return lines.join("\n");
}
