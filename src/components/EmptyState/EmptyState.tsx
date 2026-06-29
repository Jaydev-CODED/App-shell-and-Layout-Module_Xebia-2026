import "./EmptyState.css";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        {icon ?? "📂"}
      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      {action && (
        <div className="empty-action">
          {action}
        </div>
      )}
    </div>
  );
}