import React from "react";
import "./Checkbox.css";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | boolean;
  helperText?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      disabled = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const helperId = `${checkboxId}-helper`;

    return (
      <div className={`checkbox-wrapper ${hasError ? "checkbox-wrapper-error" : ""} ${disabled ? "checkbox-wrapper-disabled" : ""} ${className}`}>
        <label htmlFor={checkboxId} className="checkbox-label">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            className="checkbox-input"
            aria-invalid={hasError}
            aria-describedby={helperText || error ? helperId : undefined}
            {...props}
          />
          <span className="checkbox-text font-body-md">{label}</span>
        </label>

        {hasError && typeof error === "string" && (
          <span id={helperId} className="checkbox-error-text font-body-sm" role="alert">
            {error}
          </span>
        )}

        {!hasError && helperText && (
          <span id={helperId} className="checkbox-helper-text font-body-sm">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;