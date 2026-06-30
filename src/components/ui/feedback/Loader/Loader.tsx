import styles from "./Loader.module.css";
import type { LoaderProps } from "./types";

export function Loader({
  size = "md",
  label = "Loading...",
}: LoaderProps) {
  return (
    <div
      className={styles.container}
      role="status"
      aria-label={label}
    >
      <div className={`${styles.spinner} ${styles[size]}`} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}