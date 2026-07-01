import React, { useState } from "react";
import "./Input.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      type = "text",
      disabled = false,
      leftIcon,
      rightIcon,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const hasError = !!error;
    const isPassword = type === "password";
    const isSearch = type === "search";

    // Generate unique ID for accessibility mapping
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const helperId = `${inputId}-helper`;

    // Determine actual type to send to the HTML input
    const actualType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={`input-group ${hasError ? "input-group-error" : ""} ${disabled ? "input-group-disabled" : ""} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="input-label font-label-sm">
            {label}
          </label>
        )}

        <div className="input-container">
          {/* Default left icon for Search */}
          {isSearch && !leftIcon && (
            <span className="input-icon-left material-symbols-outlined" aria-hidden="true">
              search
            </span>
          )}

          {leftIcon && !isSearch && <span className="input-icon-left">{leftIcon}</span>}

          <input
            ref={ref}
            id={inputId}
            type={actualType}
            disabled={disabled}
            className={`input font-body-md ${leftIcon || isSearch ? "input-has-left" : ""} ${rightIcon || isPassword ? "input-has-right" : ""}`}
            aria-invalid={hasError}
            aria-describedby={helperText || error ? helperId : undefined}
            {...props}
          />

          {/* Show/Hide password toggle */}
          {isPassword && (
            <button
              type="button"
              className="input-password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={disabled}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          )}

          {rightIcon && !isPassword && <span className="input-icon-right">{rightIcon}</span>}
        </div>

        {hasError && typeof error === "string" && (
          <span id={helperId} className="input-error-text font-body-sm" role="alert">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              error
            </span>
            {error}
          </span>
        )}

        {!hasError && helperText && (
          <span id={helperId} className="input-helper-text font-body-sm">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;