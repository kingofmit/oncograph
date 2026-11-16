import React from "react";
import type { CancerType } from "@oncograph/core";
import { useTrials, TrialList } from "@oncograph/react";

interface TrialsSectionProps {
  cancerType: CancerType;
}

export function TrialsSection({ cancerType }: TrialsSectionProps) {
  const { data, loading, error } = useTrials(cancerType.id);

  if (error) {
    return (
      <section>
        <p role="alert">Error loading trials: {error.message}</p>
      </section>
    );
  }

  return (
    <section aria-busy={loading}>
      <h3>Clinical Trials {data ? `(${data.length})` : ""}</h3>
      {loading && <p>Loading trials...</p>}
      {data && data.length === 0 && <p>No clinical trials found.</p>}
      {data && data.length > 0 && (
        <>
          <TrialList trials={data} />
          <p>
            <small>
              Note: Trial data is limited to pre-populated entries. For
              comprehensive results, consult ClinicalTrials.gov directly.
            </small>
          </p>
        </>
      )}
    </section>
  );
}
