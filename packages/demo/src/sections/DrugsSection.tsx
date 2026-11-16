import React from "react";
import type { CancerType, Drug } from "@oncograph/core";
import { useFetch } from "@oncograph/react";

interface DrugsSectionProps {
  cancerType: CancerType;
}

const approvalBadge: Record<string, string> = {
  approved: "badge-green",
  investigational: "badge-amber",
  preclinical: "badge-red",
};

function DrugGlassCard({ drug }: { drug: Drug }) {
  return (
    <div className="glass">
      <div className="card-title">{drug.name}</div>
      {drug.aliases.length > 0 && (
        <div
          style={{
            fontSize: "0.8rem",
            color: "#5a8a8a",
            marginBottom: "0.5rem",
          }}
        >
          {drug.aliases.join(", ")}
        </div>
      )}
      <div className="card-meta" style={{ marginBottom: "0.75rem" }}>
        <span
          className={`badge ${approvalBadge[drug.approvalStatus] ?? "badge-cyan"}`}
        >
          {drug.approvalStatus}
        </span>
        {drug.drugClass && (
          <span className="badge badge-purple">{drug.drugClass}</span>
        )}
      </div>
      <div className="badges" style={{ marginBottom: "0.75rem" }}>
        {drug.targets.map((t) => (
          <span key={t} className="badge badge-cyan">
            {t}
          </span>
        ))}
      </div>
      <dl className="drug-details">
        <dt>Mechanism</dt>
        <dd>{drug.mechanism}</dd>
      </dl>
      {drug.fdaApprovalIndications &&
        drug.fdaApprovalIndications.length > 0 && (
          <div style={{ marginTop: "0.75rem" }}>
            <div
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#5a8a8a",
                marginBottom: "0.25rem",
              }}
            >
              FDA Indications
            </div>
            <ul className="indications-list">
              {drug.fdaApprovalIndications.map((ind, i) => (
                <li key={i}>{ind}</li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

export function DrugsSection({ cancerType }: DrugsSectionProps) {
  const {
    data: drugs,
    loading,
    error,
  } = useFetch<Drug[]>(
    `/discover?cancer=${encodeURIComponent(cancerType.id)}`,
    true,
    (raw: any) => raw.drugs ?? [],
  );

  if (error) {
    return <div className="error">Error loading drugs: {error.message}</div>;
  }

  if (loading) {
    return (
      <div className="loading">
        <span className="loading-spinner" />
        Loading drugs...
      </div>
    );
  }

  if (drugs && drugs.length === 0) {
    return <div className="empty">No drugs found.</div>;
  }

  return (
    <div>
      <div className="section-header">
        <h3>Drugs</h3>
        {drugs && <span className="count">{drugs.length}</span>}
      </div>
      <div className="grid-2">
        {drugs?.map((d) => (
          <DrugGlassCard key={d.id} drug={d} />
        ))}
      </div>
    </div>
  );
}
