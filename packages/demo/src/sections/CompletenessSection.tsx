import React from "react";
import type { CancerType } from "@oncograph/core";
import { useCompleteness } from "@oncograph/react";

interface CompletenessSectionProps {
  cancerType: CancerType;
}

export function CompletenessSection({ cancerType }: CompletenessSectionProps) {
  const { data, loading, error } = useCompleteness(cancerType.id);

  if (error) {
    return (
      <div className="error">
        Error loading completeness data: {error.message}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <span className="loading-spinner" />
        Loading completeness data...
      </div>
    );
  }

  if (!data) {
    return <div className="empty">No completeness data available.</div>;
  }

  return (
    <div>
      <div className="section-header">
        <h3>Data Completeness</h3>
      </div>

      <div className="glass" style={{ marginBottom: "1.5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <span className="stat-glow">{Math.round(data.score * 100)}%</span>
          <div className="stat-label">Overall Completeness Score</div>
        </div>

        <hr className="gradient-line" style={{ margin: "1rem 0" }} />

        <div
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#5a8a8a",
            marginBottom: "0.75rem",
          }}
        >
          Modalities
        </div>
        <div>
          {Object.entries(data.modalities).map(([modality, available]) => (
            <div className="modality-item" key={modality}>
              <span
                className={`modality-dot ${available ? "available" : "missing"}`}
              />
              <span style={{ color: available ? "#e0f2f1" : "#5a8a8a" }}>
                {modality}
              </span>
            </div>
          ))}
        </div>
      </div>

      {data.gaps.length > 0 && (
        <div className="glass">
          <div
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#f59e0b",
              marginBottom: "0.75rem",
              fontWeight: 600,
            }}
          >
            Gaps ({data.gaps.length})
          </div>
          <ul className="gap-list">
            {data.gaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
