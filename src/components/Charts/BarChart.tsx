import { useState } from "react";
import Card from "../Card";

export interface BarChartData {
  label: string;
  value: number;
}

export interface BarChartProps {
  title: string;
  subtitle?: string;
  data: BarChartData[];
  yMax?: number;
  yAxisLabelCount?: number;
  className?: string;
}

export default function BarChart({
  title,
  subtitle,
  data,
  yMax = 4000,
  yAxisLabelCount = 4,
  className = "",
}: BarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate Y axis lines
  const yLines = Array.from({ length: yAxisLabelCount + 1 }, (_, i) => {
    const val = Math.round((yMax / yAxisLabelCount) * (yAxisLabelCount - i));
    const percentage = (i / yAxisLabelCount) * 100;
    return { val, percentage };
  });

  // Series colors from DESIGN.md (charts 1 to 6)
  const colors = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
    "var(--color-chart-5)",
    "var(--color-chart-6)",
  ];

  return (
    <Card elevation="flat" className={`bar-chart-card ${className}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-background mb-1">{title}</h3>
          {subtitle && <p className="font-body-sm text-body-sm text-text-secondary">{subtitle}</p>}
        </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-2 px-2 pb-6 border-b border-surface-card relative" style={{ height: "256px" }}>
        {/* Y Axis Labels */}
        <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[10px] font-label-sm text-outline z-10">
          {yLines.map((line, idx) => (
            <span key={idx}>{line.val >= 1000 ? `${(line.val / 1000).toFixed(0)}k` : line.val}</span>
          ))}
        </div>

        {/* Grid Lines */}
        <div className="absolute left-8 right-0 top-0 bottom-6 flex flex-col justify-between z-0 pointer-events-none">
          {yLines.map((_, idx) => (
            <div key={idx} className="w-full border-t border-surface-variant/50" />
          ))}
        </div>

        {/* Bars Container */}
        <div className="w-full h-full flex items-end justify-between gap-2 pl-10 z-10">
          {data.map((item, index) => {
            const barHeightPercentage = Math.min((item.value / yMax) * 100, 100);
            const color = colors[index % colors.length];
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="w-full h-full flex flex-col justify-end items-center relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Custom Glassmorphic Tooltip */}
                {isHovered && (
                  <div
                    className="absolute bg-inverse-surface/90 backdrop-blur-md text-on-primary font-label-sm text-xs py-1 px-2 rounded whitespace-nowrap shadow-sm z-20 pointer-events-none"
                    style={{
                      bottom: `calc(${barHeightPercentage}% + 8px)`,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    {item.value.toLocaleString()} {item.label}
                  </div>
                )}

                <div
                  className="w-full rounded-t-sm transition-opacity cursor-pointer"
                  style={{
                    height: `${barHeightPercentage}%`,
                    backgroundColor: color,
                    opacity: isHovered ? 0.8 : 1,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between pl-10 pr-2 mt-2 font-label-sm text-[10px] text-text-secondary">
        {data.map((item, index) => (
          <span key={index} className="w-full text-center truncate">
            {item.label.toUpperCase()}
          </span>
        ))}
      </div>
    </Card>
  );
}
