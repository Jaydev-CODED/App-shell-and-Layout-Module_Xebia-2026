import React from "react";
import "./Select.css";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: (string | SelectOption)[];
  error?: string | boolean;
  helperText?: string;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      placeholder = "Select Option",
      disabled = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const helperId = `${selectId}-helper`;

    return (
      <div className={`select-group ${hasError ? "select-group-error" : ""} ${disabled ? "select-group-disabled" : ""} ${className}`}>
        {label && (
          <label htmlFor={selectId} className="select-label font-label-sm">
            {label}
          </label>
        )}

        <div className="select-container">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className="select font-body-md"
            aria-invalid={hasError}
            aria-describedby={helperText || error ? helperId : undefined}
            defaultValue=""
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {options.map((opt, index) => {
              const optionVal = typeof opt === "string" ? opt : opt.value;
              const optionLabel = typeof opt === "string" ? opt : opt.label;
              return (
                <option key={index} value={optionVal}>
                  {optionLabel}
                </option>
              );
            })}
          </select>

          <span className="select-arrow material-symbols-outlined" aria-hidden="true">
            expand_more
          </span>
        </div>

        {hasError && typeof error === "string" && (
          <span id={helperId} className="select-error-text font-body-sm" role="alert">
            {error}
          </span>
        )}

        {!hasError && helperText && (
          <span id={helperId} className="select-helper-text font-body-sm">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;