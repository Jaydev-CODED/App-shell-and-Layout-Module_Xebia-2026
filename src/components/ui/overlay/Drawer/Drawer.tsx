import React, { useEffect } from "react";
import styles from "./Drawer.module.css";

export interface DrawerProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function Drawer({
  isOpen,
  title,
  onClose,
  children,
  footer,
  className = "",
}: DrawerProps) {
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
      aria-labelledby={title ? "drawer-title" : undefined}
    >
      <div
        className={`${styles.drawer} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title ? (
            <h3 id="drawer-title" className="font-headline-sm text-headline-sm">
              {title}
            </h3>
          ) : (
            <div />
          )}
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close drawer"
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
export { default as Drawer } from "./Drawer";
