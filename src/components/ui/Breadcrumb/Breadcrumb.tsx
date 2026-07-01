import React from "react";
import "./Breadcrumb.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export default function Breadcrumb({
  items,
  separator,
  className = "",
}: BreadcrumbProps) {
  return (
    <nav className={`breadcrumb ${className}`} aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="breadcrumb-item font-body-sm text-body-sm">
              {!isLast && item.href ? (
                <a href={item.href} className="breadcrumb-link font-medium">
                  {item.label}
                </a>
              ) : (
                <span className="breadcrumb-current text-on-surface-variant font-semibold" aria-current="page">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  {separator ?? (
                    <span className="material-symbols-outlined text-[16px] separator-chevron">
                      chevron_right
                    </span>
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
