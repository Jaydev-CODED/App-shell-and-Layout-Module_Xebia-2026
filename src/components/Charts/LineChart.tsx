import { useState, useRef, useEffect } from "react";
import Card from "../Card";

export interface LineChartData {
  label: string;
  value: number;
}

export interface LineChartProps {
  title: string;
  subtitle?: string;
  data: LineChartData[];
  yMax?: number;
  trend?: string;
  trendDirection?: "up" | "down";
  className?: string;
}

export default function LineChart({
  title,
  subtitle,
  data,
  yMax = 100,
  trend,
  trendDirection = "up",
  className = "",
}: LineChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<SVGSVGElement>(null);
  const [svgWidth, setSvgWidth] = useState(400);
  const [svgHeight, setSvgHeight] = useState(200);

  // Resize listener to make SVG responsive
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSvgWidth(entry.contentRect.width || 400);
        setSvgHeight(entry.contentRect.height || 200);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const points = data.map((item, idx) => {
    const x = idx === 0 ? 0 : (idx / (data.length - 1)) * svgWidth;
    const y = svgHeight - (item.value / yMax) * svgHeight;
    return { x, y, label: item.label, value: item.value };
  });

  // Generate cubic bezier curve points for smooth lines
  const generatePath = () => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const cpX1 = curr.x + (next.x - curr.x) / 2;
      const cpY1 = curr.y;
      const cpX2 = curr.x + (next.x - curr.x) / 2;
      const cpY2 = next.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
    }
    return d;
  };

  const linePath = generatePath();
  const areaPath = points.length > 0 ? `${linePath} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z` : "";

  // Grid lines (e.g. 4 divisions)
  const gridDivisions = 4;
  const yAxisLabels = Array.from({ length: gridDivisions }, (_, i) => {
    const val = Math.round((yMax / (gridDivisions - 1)) * (gridDivisions - 1 - i));
    const y = (i / (gridDivisions - 1)) * (svgHeight - 20) + 10;
    return { val, y };
  });

  return (
    <Card elevation="flat" className={`line-chart-card ${className}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-background mb-1">{title}</h3>
          {subtitle && <p className="font-body-sm text-body-sm text-text-secondary">{subtitle}</p>}
        </div>
        {trend && (
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1 font-label-sm text-sm px-2 py-1 rounded ${
                trendDirection === "up" ? "text-success bg-success/10" : "text-error bg-error/10"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {trendDirection === "up" ? "trending_up" : "trending_down"}
              </span>
              {trend}
            </span>
          </div>
        )}
      </div>

      <div className="h-64 relative w-full pt-4 pb-6" style={{ height: "256px" }}>
        {/* Y Axis Labels */}
        <div className="absolute left-0 top-4 bottom-6 w-8 flex flex-col justify-between text-[10px] font-label-sm text-outline z-10">
          {yAxisLabels.map((lbl, idx) => (
            <span key={idx}>{lbl.val}%</span>
          ))}
        </div>

        {/* Grid Lines */}
        <div className="absolute left-8 right-0 top-4 bottom-6 flex flex-col justify-between z-0 pointer-events-none">
          {yAxisLabels.map((_, idx) => (
            <div key={idx} className="w-full border-t border-surface-variant/50" />
          ))}
        </div>

        {/* SVG Area */}
        <div className="absolute left-8 right-0 top-4 bottom-6 z-10">
          <svg
            ref={containerRef}
            className="overflow-visible"
            width="100%"
            height="100%"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Area Gradient Defs */}
            <defs>
              <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary-container)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--color-primary-container)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Filled Area */}
            {areaPath && <path d={areaPath} fill="url(#areaGradient)" />}

            {/* Line Stroke */}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="var(--color-primary-container)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            )}

            {/* Interactive Circles & Tooltips */}
            {points.map((pt, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <g key={idx}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 6 : 4}
                    fill={isHovered ? "var(--color-primary-container)" : "#FFFFFF"}
                    stroke="var(--color-primary-container)"
                    strokeWidth="2"
                    style={{ cursor: "crosshair" }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  />

                  {isHovered && (
                    <g transform={`translate(${pt.x - 45}, ${pt.y - 45})`}>
                      <rect
                        width="90"
                        height="34"
                        rx="6"
                        fill="rgba(255,255,255,0.92)"
                        stroke="var(--color-surface-card)"
                        className="shadow-md"
                        style={{ backdropFilter: "blur(4px)" }}
                      />
                      <text
                        x="45"
                        y="21"
                        textAnchor="middle"
                        fill="var(--color-on-background)"
                        fontFamily="var(--font-sans)"
                        fontSize="11"
                        fontWeight="600"
                      >
                        {pt.value}% {pt.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between pl-8 pr-0 mt-2 font-label-sm text-[10px] text-text-secondary border-t border-surface-card pt-2">
        {data.map((item, index) => (
          <span key={index}>{item.label}</span>
        ))}
      </div>
    </Card>
  );
}
