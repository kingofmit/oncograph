import React from "react";
import type { CancerType } from "@oncograph/core";
import { useBiomarkers, BiomarkerTable } from "@oncograph/react";

interface BiomarkersSectionProps {
  cancerType: CancerType;
}

export function BiomarkersSection({ cancerType }: BiomarkersSectionProps) {
  const { data, loading, error } = useBiomarkers(cancerType.id);

  if (error) {
    return (
      <section>
        <p role="alert">Error loading biomarkers: {error.message}</p>
      </section>
    );
  }

  return (
    <section aria-busy={loading}>
      <h3>Biomarkers {data ? `(${data.length})` : ""}</h3>
      {loading && <p>Loading biomarkers...</p>}
      {data && data.length === 0 && <p>No biomarkers found.</p>}
      {data && data.length > 0 && <BiomarkerTable biomarkers={data} />}
    </section>
  );
}
