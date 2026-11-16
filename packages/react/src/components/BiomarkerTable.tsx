import React from "react";
import type { Biomarker } from "@oncograph/core";

export interface BiomarkerTableProps {
  biomarkers: Biomarker[];
}

export function BiomarkerTable({ biomarkers }: BiomarkerTableProps) {
  return (
    <table>
      <caption>Biomarkers</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Gene</th>
          <th scope="col">Type</th>
          <th scope="col">Significance</th>
          <th scope="col">Linked Drugs</th>
        </tr>
      </thead>
      <tbody>
        {biomarkers.map((bm) => (
          <tr key={bm.id}>
            <td>{bm.name}</td>
            <td>{bm.gene ?? "N/A"}</td>
            <td>{bm.type}</td>
            <td>{bm.clinicalSignificance.join(", ")}</td>
            <td>{bm.linkedDrugs?.join(", ") ?? "None"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
