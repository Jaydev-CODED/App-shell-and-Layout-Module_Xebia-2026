import "./Card.css";
import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Card({
  title,
  subtitle,
  children,
  className = "",
  style,
}: CardProps) {
  return (
    <div
  className={`card ${className}`}
  style={style}
>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="card-content">{children}</div>
    </div>
  );
}