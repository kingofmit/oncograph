import React, { useState } from "react";
import type { CancerType } from "@oncograph/core";
import { CancerTypePicker } from "@oncograph/react";
import { DatasetsSection } from "./sections/DatasetsSection";
import { BiomarkersSection } from "./sections/BiomarkersSection";
import { DrugsSection } from "./sections/DrugsSection";
import { PathwaysSection } from "./sections/PathwaysSection";
import { SurvivalSection } from "./sections/SurvivalSection";
import { CompletenessSection } from "./sections/CompletenessSection";
import { TrialsSection } from "./sections/TrialsSection";

type Tab =
  | "datasets"
  | "biomarkers"
  | "drugs"
  | "pathways"
  | "survival"
  | "completeness"
  | "trials";

const TABS: { key: Tab; label: string }[] = [
  { key: "datasets", label: "Datasets" },
  { key: "biomarkers", label: "Biomarkers" },
  { key: "drugs", label: "Drugs" },
  { key: "pathways", label: "Pathways" },
  { key: "survival", label: "Survival" },
  { key: "completeness", label: "Completeness" },
  { key: "trials", label: "Trials" },
];

export function App() {
  const [selectedCancerType, setSelectedCancerType] =
    useState<CancerType | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("datasets");

  return (
    <main className="container">
      <header>
        <h1>OncoGraph</h1>
        <p>Federated cancer data discovery and exploration</p>
      </header>

      <section>
        <h2>Select a Cancer Type</h2>
        <CancerTypePicker onSelect={setSelectedCancerType} />
      </section>

      {selectedCancerType && (
        <>
          <article>
            <header>
              <h2>{selectedCancerType.name}</h2>
              <p>
                Tissue: {selectedCancerType.tissue}
                {selectedCancerType.oncoTreeCode &&
                  ` | OncoTree: ${selectedCancerType.oncoTreeCode}`}
                {selectedCancerType.prevalence &&
                  ` | Prevalence: ${selectedCancerType.prevalence}`}
              </p>
            </header>
          </article>

          <nav>
            <ul>
              {TABS.map((tab) => (
                <li key={tab.key}>
                  <a
                    href={`#${tab.key}`}
                    aria-current={activeTab === tab.key ? "page" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(tab.key);
                    }}
                  >
                    {tab.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section>
            {activeTab === "datasets" && (
              <DatasetsSection cancerType={selectedCancerType} />
            )}
            {activeTab === "biomarkers" && (
              <BiomarkersSection cancerType={selectedCancerType} />
            )}
            {activeTab === "drugs" && (
              <DrugsSection cancerType={selectedCancerType} />
            )}
            {activeTab === "pathways" && (
              <PathwaysSection cancerType={selectedCancerType} />
            )}
            {activeTab === "survival" && (
              <SurvivalSection cancerType={selectedCancerType} />
            )}
            {activeTab === "completeness" && (
              <CompletenessSection cancerType={selectedCancerType} />
            )}
            {activeTab === "trials" && (
              <TrialsSection cancerType={selectedCancerType} />
            )}
          </section>
        </>
      )}
    </main>
  );
}
