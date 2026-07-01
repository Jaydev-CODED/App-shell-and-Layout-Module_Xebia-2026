import React from "react";
import "./Badge.css";

export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary"
  | "secondary"
  // Role Indicators from HTML spec
  | "student"
  | "faculty"
  | "dept-head"
  | "admin"
  | "auditor"
  | "super-admin";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pill?: boolean;
}

export default function Badge({
  children,
  variant = "info",
  className = "",
  pill = false,
}: BadgeProps) {
  return (
    <span
      className={`badge badge-${variant} ${pill ? "badge-pill" : ""} font-label-sm ${className}`}
    >
      {children}
    </span>
  );
}