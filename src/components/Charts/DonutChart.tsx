import Card from "../Card";

export interface DonutChartItem {
  label: string;
  value: number;
  percentage: number;
  color?: string;
  subtitle?: string;
}

export interface DonutChartProps {
  title: string;
  subtitle?: string;
  data: DonutChartItem[];
  centerValue?: string;
  centerLabel?: string;
  className?: string;
}

export default function DonutChart({
  title,
  subtitle,
  data,
  centerValue,
  centerLabel = "Total",
  className = "",
}: DonutChartProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.32

  const colors = [
    "var(--color-chart-1)",
    "var(--color-chart-3)",
    "var(--color-chart-5)",
    "var(--color-chart-2)",
    "var(--color-chart-4)",
    "var(--color-chart-6)",
  ];

  const slices = data.map((item, idx) => {
    const previousPercentageSum = data.slice(0, idx).reduce((sum, current) => sum + current.percentage, 0);
    const rotation = (previousPercentageSum / 100) * 360;
    return { ...item, rotation, idx };
  });

  return (
    <Card elevation="flat" className={`donut-chart-card flex flex-col ${className}`}>
      <h3 className="font-headline-sm text-headline-sm text-on-background mb-1">{title}</h3>
      {subtitle && <p className="font-body-sm text-body-sm text-text-secondary mb-6">{subtitle}</p>}

      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-12 mt-4">
        {/* SVG Donut */}
        <div className="relative w-48 h-48" style={{ width: "192px", height: "192px" }}>
          <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
            {slices.map((item) => {
              const color = item.color || colors[item.idx % colors.length];
              const dashArray = `${(item.percentage / 100) * circumference} ${circumference}`;

              return (
                <circle
                  key={item.idx}
                  className="transition-all duration-300 cursor-pointer"
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={color}
                  strokeWidth="16"
                  strokeDasharray={dashArray}
                  strokeDashoffset="0"
                  transform={`rotate(${item.rotation} 50 50)`}
                  style={{
                    transformOrigin: "center",
                  }}
                />
              );
            })}
          </svg>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {centerValue && (
              <span className="font-headline-sm text-headline-sm font-bold text-on-background">
                {centerValue}
              </span>
            )}
            <span className="font-label-sm text-[10px] text-text-secondary uppercase tracking-wider">
              {centerLabel}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-4">
          {data.map((item, idx) => {
            const color = item.color || colors[idx % colors.length];
            return (
              <div key={idx} className="flex items-center gap-3 cursor-pointer group">
                <div
                  className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <div className="font-label-md text-label-md text-on-background">{item.label}</div>
                  <div className="font-body-sm text-[11px] text-text-secondary">
                    {item.percentage}% {item.subtitle ? `· ${item.subtitle}` : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
