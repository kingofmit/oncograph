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

  const width = 500;
  const height = 300;
  const padding = { top: 25, right: 25, bottom: 45, left: 55 };
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
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="km-chart"
      style={{
        background: "rgba(5, 10, 14, 0.6)",
        borderRadius: "8px",
        border: "1px solid rgba(0, 229, 204, 0.1)",
      }}
    >
      {/* Grid lines */}
      {yTicks.map((t) => (
        <line
          key={`gy-${t}`}
          className="grid-line"
          x1={padding.left}
          y1={yScale(t)}
          x2={padding.left + plotW}
          y2={yScale(t)}
        />
      ))}
      {xTicks.map((t) => (
        <line
          key={`gx-${t}`}
          className="grid-line"
          x1={xScale(t)}
          y1={padding.top}
          x2={xScale(t)}
          y2={padding.top + plotH}
        />
      ))}

      {/* Axes */}
      <line
        className="axis"
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={padding.top + plotH}
      />
      <line
        className="axis"
        x1={padding.left}
        y1={padding.top + plotH}
        x2={padding.left + plotW}
        y2={padding.top + plotH}
      />

      {/* X-axis ticks and labels */}
      {xTicks.map((t) => (
        <g key={`x-${t}`}>
          <line
            className="axis"
            x1={xScale(t)}
            y1={padding.top + plotH}
            x2={xScale(t)}
            y2={padding.top + plotH + 5}
          />
          <text
            className="tick-label"
            x={xScale(t)}
            y={padding.top + plotH + 18}
            textAnchor="middle"
          >
            {t}
          </text>
        </g>
      ))}

      {/* Y-axis ticks and labels */}
      {yTicks.map((t) => (
        <g key={`y-${t}`}>
          <line
            className="axis"
            x1={padding.left - 5}
            y1={yScale(t)}
            x2={padding.left}
            y2={yScale(t)}
          />
          <text
            className="tick-label"
            x={padding.left - 10}
            y={yScale(t) + 3}
            textAnchor="end"
          >
            {(t * 100).toFixed(0)}%
          </text>
        </g>
      ))}

      {/* Axis labels */}
      <text
        className="axis-title"
        x={padding.left + plotW / 2}
        y={height - 6}
        textAnchor="middle"
      >
        Months
      </text>
      <text
        className="axis-title"
        x={14}
        y={padding.top + plotH / 2}
        textAnchor="middle"
        transform={`rotate(-90, 14, ${padding.top + plotH / 2})`}
      >
        Survival
      </text>

      {/* Area fill under curve */}
      <defs>
        <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00e5cc" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00e5cc" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        className="curve-area"
        points={`${polyPoints.join(" ")} ${xScale(points[points.length - 1].months)},${yScale(0)} ${xScale(points[0].months)},${yScale(0)}`}
      />

      {/* KM Curve */}
      <polyline className="curve" points={polyPoints.join(" ")} />

      {/* Data points (red dots like the DNA banner) */}
      {points.map((p, i) => (
        <circle
          key={i}
          className="data-point"
          cx={xScale(p.months)}
          cy={yScale(p.survival)}
          r={3.5}
        />
      ))}
    </svg>
  );
}

export function SurvivalSection({ cancerType }: SurvivalSectionProps) {
  const { data, loading, error } = useSurvival(cancerType.id);

  if (error) {
    return (
      <div className="error">Error loading survival data: {error.message}</div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <span className="loading-spinner" />
        Loading survival data...
      </div>
    );
  }

  if (!data) {
    return <div className="empty">No survival data available.</div>;
  }

  return (
    <div>
      <div className="section-header">
        <h3>Survival Statistics</h3>
      </div>

      <div className="glass" style={{ marginBottom: "1.5rem" }}>
        <div className="stats-row">
          <div className="stat-item">
            <span className={data.fiveYearSurvival < 0.3 ? "stat-glow-red" : "stat-glow"}>
              {(data.fiveYearSurvival * 100).toFixed(1)}%
            </span>
            <span className="stat-label">5-Year Survival Rate</span>
          </div>
          {data.medianSurvivalMonths != null && (
            <div className="stat-item">
              <span className="stat-glow">{data.medianSurvivalMonths}</span>
              <span className="stat-label">Median Survival (months)</span>
            </div>
          )}
          {data.hazardRatio != null && (
            <div className="stat-item">
              <span className="stat-glow">{data.hazardRatio}</span>
              <span className="stat-label">Hazard Ratio</span>
            </div>
          )}
          <div className="stat-item">
            <span className="stat-glow">
              {data.sampleSize.toLocaleString()}
            </span>
            <span className="stat-label">Sample Size</span>
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <span
            style={{
              fontSize: "0.8rem",
              color: "#5a8a8a",
            }}
          >
            Source: {data.source}
            {data.citation && ` -- ${data.citation}`}
          </span>
        </div>
      </div>

      {data.kmCurvePoints && data.kmCurvePoints.length > 0 && (
        <div>
          <div className="section-header">
            <h3>Kaplan-Meier Survival Curve</h3>
          </div>
          <KaplanMeierCurve points={data.kmCurvePoints} />
        </div>
      )}
    </div>
  );
}
