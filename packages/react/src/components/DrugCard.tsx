import React from "react";
import type { Drug } from "@oncograph/core";

export interface DrugCardProps {
  drug: Drug;
}

export function DrugCard({ drug }: DrugCardProps) {
  return (
    <article>
      <header>
        <h3>{drug.name}</h3>
        <span>{drug.approvalStatus}</span>
      </header>
      {drug.aliases.length > 0 && (
        <p>
          <strong>Aliases:</strong> {drug.aliases.join(", ")}
        </p>
      )}
      <dl>
        <dt>Targets</dt>
        <dd>{drug.targets.join(", ")}</dd>
        <dt>Mechanism</dt>
        <dd>{drug.mechanism}</dd>
        {drug.drugClass && (
          <>
            <dt>Class</dt>
            <dd>{drug.drugClass}</dd>
          </>
        )}
        <dt>Approval Status</dt>
        <dd>{drug.approvalStatus}</dd>
        {drug.fdaApprovalIndications && drug.fdaApprovalIndications.length > 0 && (
          <>
            <dt>FDA Indications</dt>
            <dd>{drug.fdaApprovalIndications.join("; ")}</dd>
          </>
        )}
      </dl>
    </article>
  );
}
