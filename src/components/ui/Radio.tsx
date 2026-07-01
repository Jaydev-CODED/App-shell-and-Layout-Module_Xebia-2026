import React from "react";
import "./Radio.css";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | boolean;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      error,
      disabled = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`radio-wrapper ${hasError ? "radio-wrapper-error" : ""} ${disabled ? "radio-wrapper-disabled" : ""} ${className}`}>
        <label htmlFor={radioId} className="radio-label">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            disabled={disabled}
            className="radio-input"
            aria-invalid={hasError}
            {...props}
          />
          <span className="radio-text font-body-md">{label}</span>
        </label>
      </div>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;