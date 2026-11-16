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

  const { data: analysis, loading: pathLoading, error } = usePathways(genes);

  const loading = bmLoading || pathLoading;

  if (error) {
    return (
      <section>
        <p role="alert">Error loading pathways: {error.message}</p>
      </section>
    );
  }

  return (
    <section aria-busy={loading}>
      <h3>Pathway Analysis</h3>
      {loading && <p>Loading pathways...</p>}
      {!loading && genes.length === 0 && (
        <p>No biomarker genes found to analyze.</p>
      )}

      {analysis && (
        <>
          {analysis.affectedPathways.length > 0 && (
            <article>
              <header>
                <h4>Affected Pathways ({analysis.affectedPathways.length})</h4>
              </header>
              <ul>
                {analysis.affectedPathways.map((pw) => (
                  <li key={pw.id}>
                    <strong>{pw.name}</strong> ({pw.source}: {pw.sourceId})
                    {pw.description && <p>{pw.description}</p>}
                  </li>
                ))}
              </ul>
            </article>
          )}

          {analysis.drugTargets.length > 0 && (
            <article>
              <header>
                <h4>Drug Targets ({analysis.drugTargets.length})</h4>
              </header>
              <ul>
                {analysis.drugTargets.map((dt, i) => (
                  <li key={i}>
                    <strong>{dt.drug}</strong> targets {dt.target} in{" "}
                    {dt.pathway}
                  </li>
                ))}
              </ul>
            </article>
          )}

          {analysis.downstreamEffects.length > 0 && (
            <article>
              <header>
                <h4>Downstream Effects</h4>
              </header>
              <ul>
                {analysis.downstreamEffects.map((effect, i) => (
                  <li key={i}>{effect}</li>
                ))}
              </ul>
            </article>
          )}
        </>
      )}
    </section>
  );
}
