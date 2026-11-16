import React from "react";
import type { ClinicalTrial } from "@oncograph/core";

export interface TrialListProps {
  trials: ClinicalTrial[];
}

export function TrialList({ trials }: TrialListProps) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {trials.map((trial) => (
        <li key={trial.id}>
          <article>
            <header>
              <a href={trial.url} target="_blank" rel="noopener noreferrer">
                {trial.nctId}
              </a>
              {" - Phase "}
              {trial.phase}
            </header>
            <h4>{trial.title}</h4>
            <dl>
              <dt>Status</dt>
              <dd>{trial.status}</dd>
              {trial.enrollment != null && (
                <>
                  <dt>Enrollment</dt>
                  <dd>{trial.enrollment}</dd>
                </>
              )}
              {trial.interventions.length > 0 && (
                <>
                  <dt>Interventions</dt>
                  <dd>{trial.interventions.join(", ")}</dd>
                </>
              )}
            </dl>
          </article>
        </li>
      ))}
    </ul>
  );
}
