import React from "react";
import Card from "./Card";

export interface StatisticCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  comparisonText?: string;
  className?: string;
}

export default function StatisticCard({
  title,
  value,
  icon,
  trend,
  trendDirection = "neutral",
  comparisonText,
  className = "",
}: StatisticCardProps) {
  const getTrendColorClass = () => {
    if (trendDirection === "up") return "text-success bg-success/10";
    if (trendDirection === "down") return "text-error bg-error/10";
    return "text-text-secondary bg-surface-container";
  };

  const getTrendIcon = () => {
    if (trendDirection === "up") return "trending_up";
    if (trendDirection === "down") return "trending_down";
    return "trending_flat";
  };

  return (
    <Card elevation="raised" className={`stat-card ${className}`}>
      <div className="stat-card-top flex justify-between items-start mb-4">
        {icon && (
          <div className="stat-card-icon-wrapper w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        {trend && (
          <div className={`stat-card-trend flex items-center gap-1 px-2 py-1 rounded-md font-label-sm text-label-sm ${getTrendColorClass()}`}>
            <span className="material-symbols-outlined text-[16px]">
              {getTrendIcon()}
            </span>
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div className="stat-card-body">
        <h4 className="stat-card-label font-label-md text-label-md text-text-secondary mb-1">
          {title}
        </h4>
        <div className="stat-card-value font-headline-lg text-headline-lg text-on-background">
          {value}
        </div>
        {comparisonText && (
          <div className="stat-card-comparison font-body-sm text-body-sm text-text-secondary mt-2">
            {comparisonText}
          </div>
        )}
      </div>
    </Card>
  );
}
