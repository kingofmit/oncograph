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
      <section>
        <p role="alert">Error loading completeness data: {error.message}</p>
      </section>
    );
  }

  return (
    <section aria-busy={loading}>
      <h3>Data Completeness</h3>
      {loading && <p>Loading completeness data...</p>}
      {!loading && !data && <p>No completeness data available.</p>}

      {data && (
        <>
          <article>
            <header>
              <h4>Overall Score: {Math.round(data.score * 100)}%</h4>
            </header>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {Object.entries(data.modalities).map(([modality, available]) => (
                <li key={modality}>
                  <span aria-label={available ? "Available" : "Missing"}>
                    {available ? "[+]" : "[-]"}
                  </span>{" "}
                  {modality}
                </li>
              ))}
            </ul>
          </article>

          {data.gaps.length > 0 && (
            <details open>
              <summary>Gaps ({data.gaps.length})</summary>
              <ul>
                {data.gaps.map((gap) => (
                  <li key={gap}>{gap}</li>
                ))}
              </ul>
            </details>
          )}
        </>
      )}
    </section>
  );
}
