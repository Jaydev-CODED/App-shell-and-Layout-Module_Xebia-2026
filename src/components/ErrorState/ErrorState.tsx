import React from "react";
import "./ErrorState.css";

export interface ErrorStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function ErrorState({
  title,
  description,
  icon,
  action,
  className = "",
}: ErrorStateProps) {
  return (
    <div className={`error-state level-1-card-error ${className}`}>
      <div className="error-icon-container">
        {icon ?? (
          <span className="material-symbols-outlined text-error text-5xl" aria-hidden="true">
            error
          </span>
        )}
      </div>

      <h4 className="error-title font-headline-sm text-headline-sm">{title}</h4>

      <p className="error-description font-body-md text-body-md">{description}</p>

      {action && <div className="error-action">{action}</div>}
    </div>
  );
}