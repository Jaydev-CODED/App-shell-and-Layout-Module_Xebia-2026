import React from "react";
import "./Select.css";

interface SelectProps {
  label?: string;
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  label,
  options,
  value,
  onChange,
}: SelectProps) => {
  return (
    <div className="select-group">
      {label && <label>{label}</label>}

      <select
        className="select"
        value={value}
        onChange={onChange}
      >
        <option value="">Select an option</option>

        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;