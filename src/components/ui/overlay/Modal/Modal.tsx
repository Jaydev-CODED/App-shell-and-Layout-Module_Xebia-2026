import { useEffect } from "react";
import styles from "./Modal.module.css";
import type { ModalProps } from "./types";

export function Modal({
  isOpen,
  title,
  children,
  onClose,
  footer,
  className = "",
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={`${styles.modal} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title ? (
            <h3 id="modal-title" className="font-headline-sm text-headline-sm">
              {title}
            </h3>
          ) : (
            <div />
          )}
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className={styles.content}>
          {children}
        </div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}