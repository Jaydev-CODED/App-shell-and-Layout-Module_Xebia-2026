import React from "react";
import "./Switch.css";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      disabled = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`switch-wrapper ${disabled ? "switch-wrapper-disabled" : ""} ${className}`}>
        {label && (
          <label htmlFor={switchId} className="switch-label font-body-md">
            {label}
          </label>
        )}
        <div className="switch-container">
          <input
            ref={ref}
            id={switchId}
            type="checkbox"
            disabled={disabled}
            className="switch-input"
            {...props}
          />
          <span className="switch-track" />
        </div>
      </div>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;