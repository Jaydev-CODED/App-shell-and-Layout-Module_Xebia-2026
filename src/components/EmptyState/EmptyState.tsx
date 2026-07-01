import React from "react";
import "./EmptyState.css";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`empty-state level-1-card ${className}`}>
      <div className="empty-icon-container">
        {icon ?? (
          <span className="material-symbols-outlined text-outline text-5xl" aria-hidden="true">
            search_off
          </span>
        )}
      </div>

      <h4 className="empty-title font-headline-sm text-headline-sm">{title}</h4>

      <p className="empty-description font-body-md text-body-md">{description}</p>

      {action && <div className="empty-action">{action}</div>}
    </div>
  );
}