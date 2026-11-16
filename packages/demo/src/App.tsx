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

const prevalenceBadge: Record<string, string> = {
  common: "badge-green",
  uncommon: "badge-amber",
  rare: "badge-purple",
  "ultra-rare": "badge-red",
};

export function App() {
  const [selectedCancerType, setSelectedCancerType] =
    useState<CancerType | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("datasets");

  return (
    <>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-logo">OncoGraph</span>
          <span className="nav-subtitle">Federated Cancer Data Discovery</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div className="hero-glow" />
        <div className="hero-content container">
          <h1>
            Explore <span className="glow-text">Cancer</span>{" "}
            <span className="glow-text-red">Data</span>
          </h1>
          <p>
            Search across federated repositories, biomarkers, drugs, pathways,
            and clinical trials.
          </p>
          <div className="picker-wrapper">
            <CancerTypePicker onSelect={setSelectedCancerType} />
          </div>
        </div>
      </div>

      <div className="container">
        {selectedCancerType && (
          <>
            {/* Cancer Type Info Card */}
            <div className="glass info-card">
              <div>
                <h2>{selectedCancerType.name}</h2>
              </div>
              <div className="info-badges">
                <span className="badge badge-cyan">
                  {selectedCancerType.tissue}
                </span>
                {selectedCancerType.oncoTreeCode && (
                  <span className="badge badge-blue">
                    OncoTree: {selectedCancerType.oncoTreeCode}
                  </span>
                )}
                {selectedCancerType.icdO3Code && (
                  <span className="badge badge-purple">
                    ICD-O-3: {selectedCancerType.icdO3Code}
                  </span>
                )}
                {selectedCancerType.prevalence && (
                  <span
                    className={`badge ${prevalenceBadge[selectedCancerType.prevalence] ?? "badge-cyan"}`}
                  >
                    {selectedCancerType.prevalence}
                  </span>
                )}
              </div>
            </div>

            {/* Tab Bar */}
            <div className="tab-nav" style={{ marginTop: "2rem" }}>
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={activeTab === tab.key ? "active" : ""}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="content-section" key={activeTab}>
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
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            <strong>Disclaimer:</strong> OncoGraph aggregates publicly available
            cancer research data for informational purposes only. It is not
            intended for clinical decision-making.
          </p>
        </div>
      </footer>
    </>
  );
}
