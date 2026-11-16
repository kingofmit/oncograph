import React from "react";
import type { CancerType } from "@oncograph/core";
import { useSurvival } from "@oncograph/react";

interface SurvivalSectionProps {
  cancerType: CancerType;
}

function KaplanMeierCurve({
  points,
}: {
  points: { months: number; survival: number }[];
}) {
  if (points.length === 0) return null;

  const width = 400;
  const height = 250;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const maxMonths = Math.max(...points.map((p) => p.months));
  const xScale = (m: number) => padding.left + (m / maxMonths) * plotW;
  const yScale = (s: number) => padding.top + (1 - s) * plotH;

  // Build step-function polyline points
  const polyPoints: string[] = [];
  for (let i = 0; i < points.length; i++) {
    const { months, survival } = points[i];
    if (i > 0) {
      // Horizontal step from previous point
      polyPoints.push(`${xScale(months)},${yScale(points[i - 1].survival)}`);
    }
    polyPoints.push(`${xScale(months)},${yScale(survival)}`);
  }

  // X-axis ticks
  const xTicks: number[] = [];
  const step = Math.ceil(maxMonths / 5);
  for (let t = 0; t <= maxMonths; t += step) {
    xTicks.push(t);
  }

  // Y-axis ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1.0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: "100%" }}>
      {/* Axes */}
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={padding.top + plotH}
        stroke="currentColor"
        strokeWidth={1}
      />
      <line
        x1={padding.left}
        y1={padding.top + plotH}
        x2={padding.left + plotW}
        y2={padding.top + plotH}
        stroke="currentColor"
        strokeWidth={1}
      />

      {/* X-axis ticks and labels */}
      {xTicks.map((t) => (
        <g key={`x-${t}`}>
          <line
            x1={xScale(t)}
            y1={padding.top + plotH}
            x2={xScale(t)}
            y2={padding.top + plotH + 5}
            stroke="currentColor"
            strokeWidth={1}
          />
          <text
            x={xScale(t)}
            y={padding.top + plotH + 18}
            textAnchor="middle"
            fontSize={10}
            fill="currentColor"
          >
            {t}
          </text>
        </g>
      ))}

      {/* Y-axis ticks and labels */}
      {yTicks.map((t) => (
        <g key={`y-${t}`}>
          <line
            x1={padding.left - 5}
            y1={yScale(t)}
            x2={padding.left}
            y2={yScale(t)}
            stroke="currentColor"
            strokeWidth={1}
          />
          <text
            x={padding.left - 10}
            y={yScale(t) + 3}
            textAnchor="end"
            fontSize={10}
            fill="currentColor"
          >
            {(t * 100).toFixed(0)}%
          </text>
        </g>
      ))}

      {/* Axis labels */}
      <text
        x={padding.left + plotW / 2}
        y={height - 4}
        textAnchor="middle"
        fontSize={11}
        fill="currentColor"
      >
        Months
      </text>
      <text
        x={12}
        y={padding.top + plotH / 2}
        textAnchor="middle"
        fontSize={11}
        fill="currentColor"
        transform={`rotate(-90, 12, ${padding.top + plotH / 2})`}
      >
        Survival
      </text>

      {/* KM Curve */}
      <polyline
        points={polyPoints.join(" ")}
        fill="none"
        stroke="var(--pico-primary)"
        strokeWidth={2}
      />
    </svg>
  );
}

export function SurvivalSection({ cancerType }: SurvivalSectionProps) {
  const { data, loading, error } = useSurvival(cancerType.id);

  if (error) {
    return (
      <section>
        <p role="alert">Error loading survival data: {error.message}</p>
      </section>
    );
  }

  return (
    <section aria-busy={loading}>
      <h3>Survival Statistics</h3>
      {loading && <p>Loading survival data...</p>}
      {!loading && !data && <p>No survival data available.</p>}

      {data && (
        <>
          <article>
            <dl>
              <dt>5-Year Survival Rate</dt>
              <dd>{(data.fiveYearSurvival * 100).toFixed(1)}%</dd>
              {data.medianSurvivalMonths != null && (
                <>
                  <dt>Median Survival</dt>
                  <dd>{data.medianSurvivalMonths} months</dd>
                </>
              )}
              {data.hazardRatio != null && (
                <>
                  <dt>Hazard Ratio</dt>
                  <dd>{data.hazardRatio}</dd>
                </>
              )}
              <dt>Source</dt>
              <dd>{data.source}</dd>
              {data.citation && (
                <>
                  <dt>Citation</dt>
                  <dd>{data.citation}</dd>
                </>
              )}
              <dt>Sample Size</dt>
              <dd>{data.sampleSize.toLocaleString()}</dd>
            </dl>
          </article>

          {data.kmCurvePoints && data.kmCurvePoints.length > 0 && (
            <article>
              <header>
                <h4>Kaplan-Meier Survival Curve</h4>
              </header>
              <KaplanMeierCurve points={data.kmCurvePoints} />
            </article>
          )}
        </>
      )}
    </section>
  );
}
