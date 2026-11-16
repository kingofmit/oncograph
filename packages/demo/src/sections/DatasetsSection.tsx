import React from "react";
import type { CancerType } from "@oncograph/core";
import { useDatasets, DatasetCard } from "@oncograph/react";

interface DatasetsSectionProps {
  cancerType: CancerType;
}

export function DatasetsSection({ cancerType }: DatasetsSectionProps) {
  const { data, loading, error } = useDatasets(cancerType.id);

  if (error) {
    return (
      <section>
        <p role="alert">Error loading datasets: {error.message}</p>
      </section>
    );
  }

  return (
    <section aria-busy={loading}>
      <h3>Datasets {data ? `(${data.length})` : ""}</h3>
      {loading && <p>Loading datasets...</p>}
      {data && data.length === 0 && <p>No datasets found.</p>}
      {data &&
        data.map((ds) => <DatasetCard key={ds.id} dataset={ds} />)}
    </section>
  );
}
