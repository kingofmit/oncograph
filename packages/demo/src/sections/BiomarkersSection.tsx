import React from "react";
import type { CancerType, Biomarker } from "@oncograph/core";
import { useBiomarkers } from "@oncograph/react";

interface BiomarkersSectionProps {
  cancerType: CancerType;
}

const significanceBadge: Record<string, string> = {
  diagnostic: "badge-blue",
  prognostic: "badge-purple",
  predictive: "badge-amber",
  "therapeutic-target": "badge-coral",
};

function BiomarkerRow({ bm }: { bm: Biomarker }) {
  return (
    <tr>
      <td style={{ color: "#e0f2f1", fontWeight: 500 }}>{bm.name}</td>
      <td style={{ fontFamily: "monospace", color: "#00e5cc" }}>
        {bm.gene ?? "N/A"}
      </td>
      <td>
        <span className="badge badge-cyan">{bm.type}</span>
      </td>
      <td>
        <div className="badges">
          {bm.clinicalSignificance.map((sig) => (
            <span
              key={sig}
              className={`badge ${significanceBadge[sig] ?? "badge-cyan"}`}
            >
              {sig}
            </span>
          ))}
        </div>
      </td>
      <td>
        {bm.linkedDrugs && bm.linkedDrugs.length > 0 ? (
          <div className="badges">
            {bm.linkedDrugs.map((d) => (
              <span key={d} className="badge badge-cyan">
                {d}
              </span>
            ))}
          </div>
        ) : (
          <span style={{ color: "#5a8a8a" }}>None</span>
        )}
      </td>
    </tr>
  );
}

export function BiomarkersSection({ cancerType }: BiomarkersSectionProps) {
  const { data, loading, error } = useBiomarkers(cancerType.id);

  if (error) {
    return (
      <div className="error">Error loading biomarkers: {error.message}</div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <span className="loading-spinner" />
        Loading biomarkers...
      </div>
    );
  }

  if (data && data.length === 0) {
    return <div className="empty">No biomarkers found.</div>;
  }

  return (
    <div>
      <div className="section-header">
        <h3>Biomarkers</h3>
        {data && <span className="count">{data.length}</span>}
      </div>
      {data && data.length > 0 && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gene</th>
                <th>Type</th>
                <th>Significance</th>
                <th>Linked Drugs</th>
              </tr>
            </thead>
            <tbody>
              {data.map((bm) => (
                <BiomarkerRow key={bm.id} bm={bm} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
