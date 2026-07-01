import "./Alert.css";

export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertProps {
  title: string;
  description?: string;
  variant?: AlertVariant;
  onClose?: () => void;
  className?: string;
}

const alertIcons: Record<AlertVariant, string> = {
  success: "check_circle",
  error: "error",
  warning: "warning",
  info: "info",
};

export default function Alert({
  title,
  description,
  variant = "info",
  onClose,
  className = "",
}: AlertProps) {
  const iconName = alertIcons[variant];

  return (
    <div className={`alert alert-${variant} ${className}`} role="alert">
      <span className="alert-icon material-symbols-outlined" aria-hidden="true">
        {iconName}
      </span>
      <div className="alert-body">
        <h5 className="alert-title font-label-md">{title}</h5>
        {description && <p className="alert-description font-body-sm">{description}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="alert-close-btn"
          aria-label="Close alert"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            close
          </span>
        </button>
      )}
    </div>
  );
}
