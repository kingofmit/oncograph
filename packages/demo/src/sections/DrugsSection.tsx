import React from "react";
import type { CancerType, Drug } from "@oncograph/core";
import { useFetch, DrugCard } from "@oncograph/react";

interface DrugsSectionProps {
  cancerType: CancerType;
}

export function DrugsSection({ cancerType }: DrugsSectionProps) {
  const { data: drugs, loading, error } = useFetch<Drug[]>(
    `/discover?cancer=${encodeURIComponent(cancerType.id)}`,
    true,
    (raw: any) => raw.drugs ?? [],
  );

  if (error) {
    return (
      <section>
        <p role="alert">Error loading drugs: {error.message}</p>
      </section>
    );
  }

  return (
    <section aria-busy={loading}>
      <h3>Drugs {drugs ? `(${drugs.length})` : ""}</h3>
      {loading && <p>Loading drugs...</p>}
      {drugs && drugs.length === 0 && <p>No drugs found.</p>}
      {drugs &&
        drugs.map((d) => <DrugCard key={d.id} drug={d} />)}
    </section>
  );
}
