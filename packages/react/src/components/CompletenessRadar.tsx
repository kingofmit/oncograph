import React from "react";
import type { DataCompletenessScore } from "@oncograph/core";

export interface CompletenessRadarProps {
  score: DataCompletenessScore;
}

export function CompletenessRadar({ score }: CompletenessRadarProps) {
  const modalities = Object.entries(score.modalities);

  return (
    <section>
      <header>
        <h3>Data Completeness</h3>
        <span>
          Score: {Math.round(score.score * 100)}%
        </span>
      </header>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {modalities.map(([modality, available]) => (
          <li key={modality}>
            <span aria-label={available ? "Available" : "Missing"}>
              {available ? "[+]" : "[-]"}
            </span>{" "}
            {modality}
          </li>
        ))}
      </ul>
      {score.gaps.length > 0 && (
        <details>
          <summary>Gaps ({score.gaps.length})</summary>
          <ul>
            {score.gaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
