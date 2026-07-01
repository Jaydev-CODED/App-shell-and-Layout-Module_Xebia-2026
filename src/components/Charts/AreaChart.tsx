import React, { useRef, useState, useEffect } from "react";
import Card from "../Card";

export interface AreaChartDataset {
  label: string;
  data: number[];
  color: string;
  opacity?: number;
}

export interface AreaChartProps {
  title: string;
  subtitle?: string;
  labels: string[];
  datasets: AreaChartDataset[];
  yMax?: number;
  className?: string;
}

export default function AreaChart({
  title,
  subtitle,
  labels,
  datasets,
  yMax = 1000,
  className = "",
}: AreaChartProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [svgWidth, setSvgWidth] = useState(400);
  const [svgHeight, setSvgHeight] = useState(160);
  const [hoverX, setHoverX] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSvgWidth(entry.contentRect.width || 400);
        setSvgHeight(entry.contentRect.height || 160);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setHoverX(x);
  };

  const handleMouseLeave = () => {
    setHoverX(null);
  };

  // Stack datasets
  // For each index, accumulate values of datasets below it
  const stackedData = datasets.map((dataset, dsIdx) => {
    return dataset.data.map((val, valIdx) => {
      let sum = val;
      for (let i = 0; i < dsIdx; i++) {
        sum += datasets[i].data[valIdx];
      }
      return sum;
    });
  });

  // Convert values to SVG path instructions
  // Datasets are drawn from back to front (bottom to top).
  const generateAreaPath = (stackedVals: number[]) => {
    if (stackedVals.length === 0) return "";
    const len = stackedVals.length;

    const pathPoints = stackedVals.map((val, idx) => {
      const x = idx === 0 ? 0 : (idx / (len - 1)) * svgWidth;
      const y = svgHeight - (val / yMax) * svgHeight;
      return `${x} ${y}`;
    });

    // Start from bottom-left, draw to points, down to bottom-right, then close to bottom-left
    return `M 0 ${svgHeight} L ${pathPoints.join(" L ")} L ${svgWidth} ${svgHeight} Z`;
  };

  // Y-axis labels division lines
  const gridLinesCount = 3;
  const yAxisValues = Array.from({ length: gridLinesCount }, (_, i) => {
    const val = Math.round((yMax / (gridLinesCount - 1)) * (gridLinesCount - 1 - i));
    return val;
  });

  return (
    <Card elevation="flat" className={`area-chart-card ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-background mb-1">{title}</h3>
          {subtitle && <p className="font-body-sm text-body-sm text-text-secondary">{subtitle}</p>}
        </div>
      </div>

      {/* Dataset legends */}
      <div className="flex gap-4 mb-4">
        {datasets.map((dataset, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div
              className="w-3 h-1 rounded-full"
              style={{ backgroundColor: dataset.color }}
            />
            <span className="font-label-sm text-[11px] text-text-secondary">{dataset.label}</span>
          </div>
        ))}
      </div>

      <div className="h-56 relative w-full pt-2 pb-6" style={{ height: "224px" }}>
        {/* Y Axis Labels */}
        <div className="absolute left-0 top-2 bottom-6 w-8 flex flex-col justify-between text-[10px] font-label-sm text-outline z-10">
          {yAxisValues.map((val, idx) => (
            <span key={idx}>{val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}</span>
          ))}
        </div>

        {/* SVG stacked area chart */}
        <div className="absolute left-8 right-0 top-2 bottom-6 z-10 border-l border-b border-surface-variant">
          <svg
            ref={containerRef}
            width="100%"
            height="100%"
            style={{ width: "100%", height: "100%" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Draw from bottom dataset to top dataset */}
            {stackedData.map((datasetValues, idx) => {
              const dataset = datasets[idx];
              const pathD = generateAreaPath(datasetValues);
              return (
                <path
                  key={idx}
                  d={pathD}
                  fill={dataset.color}
                  opacity={dataset.opacity || 0.8}
                />
              );
            })}

            {/* Hover line divider */}
            {hoverX !== null && (
              <line
                x1={hoverX}
                y1={0}
                x2={hoverX}
                y2={svgHeight}
                stroke="var(--color-primary)"
                strokeDasharray="4"
                strokeOpacity="0.5"
                strokeWidth="1"
                style={{ cursor: "ew-resize" }}
              />
            )}
          </svg>
        </div>
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between pl-8 pr-0 font-label-sm text-[10px] text-text-secondary">
        {labels.map((lbl, idx) => (
          <span key={idx}>{lbl}</span>
        ))}
      </div>
    </Card>
  );
}
