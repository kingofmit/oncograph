import React from "react";
import type { CancerType, ClinicalTrial } from "@oncograph/core";
import { useTrials } from "@oncograph/react";

interface TrialsSectionProps {
  cancerType: CancerType;
}

const statusBadge: Record<string, string> = {
  recruiting: "badge-green",
  active: "badge-cyan",
  completed: "badge-blue",
  terminated: "badge-red",
  withdrawn: "badge-red",
};

function TrialGlassCard({ trial }: { trial: ClinicalTrial }) {
  return (
    <div className="glass">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <a
          href={trial.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 700, fontSize: "0.9rem" }}
        >
          {trial.nctId}
        </a>
        <span className="badge badge-purple">Phase {trial.phase}</span>
        <span
          className={`badge ${statusBadge[trial.status] ?? "badge-cyan"}`}
        >
          {trial.status}
        </span>
      </div>
      <div className="card-title" style={{ fontSize: "0.9rem" }}>
        {trial.title}
      </div>
      {trial.enrollment != null && (
        <div
          style={{
            fontSize: "0.8rem",
            color: "#5a8a8a",
            marginTop: "0.5rem",
          }}
        >
          Enrollment: {trial.enrollment.toLocaleString()}
        </div>
      )}
      {trial.interventions.length > 0 && (
        <div className="badges" style={{ marginTop: "0.5rem" }}>
          {trial.interventions.map((int, i) => (
            <span key={i} className="badge badge-cyan">
              {int}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function TrialsSection({ cancerType }: TrialsSectionProps) {
  const { data, loading, error } = useTrials(cancerType.id);

  if (error) {
    return <div className="error">Error loading trials: {error.message}</div>;
  }

  if (loading) {
    return (
      <div className="loading">
        <span className="loading-spinner" />
        Loading clinical trials...
      </div>
    );
  }

  if (data && data.length === 0) {
    return <div className="empty">No clinical trials found.</div>;
  }

  return (
    <div>
      <div className="section-header">
        <h3>Clinical Trials</h3>
        {data && <span className="count">{data.length}</span>}
      </div>
      <div className="grid-2">
        {data?.map((trial) => (
          <TrialGlassCard key={trial.id} trial={trial} />
        ))}
      </div>
      <div className="trial-note">
        Trial data is limited to pre-populated entries. For comprehensive
        results, consult{" "}
        <a
          href="https://clinicaltrials.gov"
          target="_blank"
          rel="noopener noreferrer"
        >
          ClinicalTrials.gov
        </a>{" "}
        directly.
      </div>
    </div>
  );
}
