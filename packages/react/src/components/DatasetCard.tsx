import React from "react";
import type { Dataset } from "@oncograph/core";

export interface DatasetCardProps {
  dataset: Dataset;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <article>
      <header>
        <h3>{dataset.name}</h3>
        <span>{dataset.accessModel}</span>
      </header>
      <p>{dataset.description}</p>
      <dl>
        <dt>Repository</dt>
        <dd>{dataset.repositoryId}</dd>
        {dataset.patientCount != null && (
          <>
            <dt>Patients</dt>
            <dd>{dataset.patientCount.toLocaleString()}</dd>
          </>
        )}
        <dt>Data Types</dt>
        <dd>{dataset.dataTypes.join(", ")}</dd>
        <dt>Access</dt>
        <dd>{dataset.accessModel}</dd>
      </dl>
      {dataset.url && (
        <footer>
          <a href={dataset.url} target="_blank" rel="noopener noreferrer">
            View Dataset
          </a>
        </footer>
      )}
    </article>
  );
}
