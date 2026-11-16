import React, { useMemo } from "react";
import type { CancerType } from "@oncograph/core";
import { useBiomarkers, usePathways } from "@oncograph/react";

interface PathwaysSectionProps {
  cancerType: CancerType;
}

export function PathwaysSection({ cancerType }: PathwaysSectionProps) {
  const { data: biomarkers, loading: bmLoading } = useBiomarkers(cancerType.id);

  const genes = useMemo(() => {
    if (!biomarkers) return [];
    const unique = new Set(
      biomarkers.filter((b) => b.gene).map((b) => b.gene!),
    );
    return Array.from(unique);
  }, [biomarkers]);

  const {
    data: analysis,
    loading: pathLoading,
    error,
  } = usePathways(genes);

  const loading = bmLoading || pathLoading;

  if (error) {
    return (
      <div className="error">Error loading pathways: {error.message}</div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <span className="loading-spinner" />
        Loading pathways...
      </div>
    );
  }

  if (!loading && genes.length === 0) {
    return <div className="empty">No biomarker genes found to analyze.</div>;
  }

  return (
    <div>
      {analysis && (
        <>
          {/* Affected Pathways */}
          {analysis.affectedPathways.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <div className="section-header">
                <h3>Affected Pathways</h3>
                <span className="count">
                  {analysis.affectedPathways.length}
                </span>
              </div>
              <div className="grid-2">
                {analysis.affectedPathways.map((pw) => (
                  <div className="glass" key={pw.id}>
                    <div className="card-title">{pw.name}</div>
                    <div className="card-meta" style={{ marginBottom: "0.5rem" }}>
                      <span className="badge badge-cyan">{pw.source}</span>
                      <span className="badge badge-blue">{pw.sourceId}</span>
                    </div>
                    {pw.description && (
                      <div className="pathway-desc">{pw.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drug Targets */}
          {analysis.drugTargets.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <div className="section-header">
                <h3>Drug Targets</h3>
                <span className="count">{analysis.drugTargets.length}</span>
              </div>
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Drug</th>
                      <th>Target</th>
                      <th>Pathway</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.drugTargets.map((dt, i) => (
                      <tr key={i}>
                        <td style={{ color: "#e0f2f1", fontWeight: 500 }}>
                          {dt.drug}
                        </td>
                        <td>
                          <span className="badge badge-cyan">{dt.target}</span>
                        </td>
                        <td>{dt.pathway}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Downstream Effects */}
          {analysis.downstreamEffects.length > 0 && (
            <div>
              <div className="section-header">
                <h3>Downstream Effects</h3>
              </div>
              <div className="glass">
                <ul className="effect-list">
                  {analysis.downstreamEffects.map((effect, i) => (
                    <li key={i}>{effect}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
