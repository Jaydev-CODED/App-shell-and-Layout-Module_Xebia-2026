import "./Card.css";
import React, { type ReactNode } from "react";

export type CardElevation = "flat" | "raised" | "glass";

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  subtitle?: ReactNode;
  headerAction?: ReactNode;
  elevation?: CardElevation;
  children: ReactNode;
}

export default function Card({
  title,
  subtitle,
  headerAction,
  elevation = "flat",
  children,
  className = "",
  ...props
}: CardProps) {
  const hasHeader = title || subtitle || headerAction;

  return (
    <div
      className={`card card-${elevation} ${className}`}
      {...props}
    >
      {hasHeader && (
        <div className="card-header">
          <div className="card-header-text">
            {title && (
              <div className="card-title font-headline-sm text-headline-sm">
                {title}
              </div>
            )}
            {subtitle && (
              <div className="card-subtitle font-body-sm text-body-sm text-text-secondary">
                {subtitle}
              </div>
            )}
          </div>
          {headerAction && <div className="card-header-action">{headerAction}</div>}
        </div>
      )}

      <div className="card-content font-body-md text-body-md">{children}</div>
    </div>
  );
}