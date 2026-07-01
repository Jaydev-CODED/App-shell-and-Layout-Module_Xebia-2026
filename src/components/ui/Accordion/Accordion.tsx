import React, { useState } from "react";
import "./Accordion.css";

export interface AccordionItem {
  id: string;
  title: string | React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpandedIds?: string[];
  className?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultExpandedIds = [],
  className = "",
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setExpandedIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`accordion-item ${isExpanded ? "accordion-item-expanded" : ""}`}
          >
            <button
              type="button"
              className="accordion-header font-label-md"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isExpanded}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-header-${item.id}`}
            >
              <span className="accordion-title">{item.title}</span>
              <span className="accordion-arrow material-symbols-outlined" aria-hidden="true">
                {isExpanded ? "expand_less" : "expand_more"}
              </span>
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-header-${item.id}`}
              className="accordion-panel"
              style={{
                display: isExpanded ? "block" : "none",
              }}
            >
              <div className="accordion-content font-body-md text-body-md">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
