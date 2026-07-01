import React from "react";
import "./Textarea.css";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | boolean;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      disabled = false,
      rows = 4,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const helperId = `${textareaId}-helper`;

    return (
      <div className={`textarea-group ${hasError ? "textarea-group-error" : ""} ${disabled ? "textarea-group-disabled" : ""} ${className}`}>
        {label && (
          <label htmlFor={textareaId} className="textarea-label font-label-sm">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          rows={rows}
          className="textarea font-body-md"
          aria-invalid={hasError}
          aria-describedby={helperText || error ? helperId : undefined}
          {...props}
        />

        {hasError && typeof error === "string" && (
          <span id={helperId} className="textarea-error-text font-body-sm" role="alert">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              error
            </span>
            {error}
          </span>
        )}

        {!hasError && helperText && (
          <span id={helperId} className="textarea-helper-text font-body-sm">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;