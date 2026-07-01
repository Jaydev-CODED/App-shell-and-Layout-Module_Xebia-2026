import { useEffect } from "react";
import styles from "./Toast.module.css";
import type { ToastProps } from "./types";

export function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {message}
    </div>
  );
}