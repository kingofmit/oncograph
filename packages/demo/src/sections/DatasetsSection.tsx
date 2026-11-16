import React from "react";
import type { CancerType, Dataset } from "@oncograph/core";
import { useDatasets } from "@oncograph/react";

interface DatasetsSectionProps {
  cancerType: CancerType;
}

const accessBadge: Record<string, string> = {
  open: "badge-green",
  controlled: "badge-amber",
  federated: "badge-blue",
  commercial: "badge-red",
};

function DatasetGlassCard({ dataset }: { dataset: Dataset }) {
  return (
    <div className="glass">
      <div className="card-title">{dataset.name}</div>
      <div className="card-meta" style={{ marginBottom: "0.75rem" }}>
        <span className="badge badge-cyan">{dataset.repositoryId}</span>
        <span className={`badge ${accessBadge[dataset.accessModel] ?? "badge-cyan"}`}>
          {dataset.accessModel}
        </span>
      </div>
      <div className="card-desc">{dataset.description}</div>
      <div className="badges" style={{ marginBottom: "0.75rem" }}>
        {dataset.dataTypes.map((dt) => (
          <span key={dt} className="badge badge-blue">
            {dt}
          </span>
        ))}
      </div>
      {dataset.patientCount != null && (
        <div style={{ marginBottom: "0.5rem" }}>
          <span className="stat-glow" style={{ fontSize: "1.5rem" }}>
            {dataset.patientCount.toLocaleString()}
          </span>
          <div className="stat-label">Patients</div>
        </div>
      )}
      {dataset.url && (
        <a
          className="card-link"
          href={dataset.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Dataset &#8594;
        </a>
      )}
    </div>
  );
}

export function DatasetsSection({ cancerType }: DatasetsSectionProps) {
  const { data, loading, error } = useDatasets(cancerType.id);

  if (error) {
    return <div className="error">Error loading datasets: {error.message}</div>;
  }

  if (loading) {
    return (
      <div className="loading">
        <span className="loading-spinner" />
        Loading datasets...
      </div>
    );
  }

  if (data && data.length === 0) {
    return <div className="empty">No datasets found.</div>;
  }

  return (
    <div>
      <div className="section-header">
        <h3>Datasets</h3>
        {data && <span className="count">{data.length}</span>}
      </div>
      <div className="grid-2">
        {data?.map((ds) => (
          <DatasetGlassCard key={ds.id} dataset={ds} />
        ))}
      </div>
    </div>
  );
}
