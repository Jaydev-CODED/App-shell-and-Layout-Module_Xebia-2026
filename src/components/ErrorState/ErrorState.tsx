import "./ErrorState.css";
import type { ReactNode } from "react";

interface ErrorStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function ErrorState({
  title,
  description,
  action,
}: ErrorStateProps) {
  return (
    <div className="error-state">
      <div className="error-icon">⚠️</div>

      <h2>{title}</h2>

      <p>{description}</p>

      {action && (
        <div className="error-action">
          {action}
        </div>
      )}
    </div>
  );
}