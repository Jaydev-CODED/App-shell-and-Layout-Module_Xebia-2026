import React, { useState } from "react";
import styles from "./Tooltip.module.css";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export default function Tooltip({
  content,
  children,
  position = "top",
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={`${styles.container} ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`${styles.tooltip} ${styles[position]} font-body-sm text-body-sm shadow-lg`}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
}
