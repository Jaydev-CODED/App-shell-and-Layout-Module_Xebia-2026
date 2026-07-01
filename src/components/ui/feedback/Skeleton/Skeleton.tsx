import styles from "./Skeleton.module.css";
import type { SkeletonProps } from "./types";

export function Skeleton({
  width,
  height,
  variant = "rect",
  className = "",
}: SkeletonProps) {
  const isCircle = variant === "circle";
  const defaultHeight = variant === "text" ? "14px" : "100%";

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={{
        width: width || (isCircle ? "40px" : "100%"),
        height: height || (isCircle ? "40px" : defaultHeight),
      }}
    />
  );
}
