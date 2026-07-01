import { useEffect } from "react";
import styles from "./Toast.module.css";
import type { ToastProps } from "./types";

const toastIcons = {
  success: "check_circle",
  error: "error",
  warning: "warning",
  info: "info",
};

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

  const iconName = toastIcons[type];

  return (
    <div className={`${styles.toast} ${styles[type]} shadow-lg`} role="status">
      <span className={`${styles.icon} material-symbols-outlined`} aria-hidden="true">
        {iconName}
      </span>
      <span className={`${styles.message} font-label-sm`}>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="Close notification"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            close
          </span>
        </button>
      )}
    </div>
  );
}