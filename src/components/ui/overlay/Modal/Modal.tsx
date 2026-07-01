import { useEffect } from "react";
import styles from "./Modal.module.css";
import type { ModalProps } from "./types";

export function Modal({
  isOpen,
  title,
  children,
  onClose,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {title && <h2>{title}</h2>}

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}