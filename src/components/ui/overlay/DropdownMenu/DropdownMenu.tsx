import React, { useState, useRef, useEffect } from "react";
import styles from "./DropdownMenu.module.css";

export interface DropdownMenuItem {
  label?: string;
  icon?: string; // Material symbol icon name
  onClick?: () => void;
  isDivider?: boolean;
  isDestructive?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  className?: string;
}

export default function DropdownMenu({
  trigger,
  items,
  align = "left",
  className = "",
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (onClick?: () => void) => {
    if (onClick) onClick();
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      <div onClick={() => setIsOpen((prev) => !prev)} className={styles.triggerWrapper}>
        {trigger}
      </div>

      {isOpen && (
        <div className={`${styles.menu} ${styles[align]}`}>
          {items.map((item, index) => {
            if (item.isDivider) {
              return <div key={`divider-${index}`} className={styles.divider} />;
            }

            return (
              <button
                key={`item-${index}`}
                type="button"
                className={`${styles.item} ${item.isDestructive ? styles.destructive : ""} font-body-md`}
                onClick={() => handleItemClick(item.onClick)}
              >
                {item.icon && (
                  <span className={`${styles.icon} material-symbols-outlined`} aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
