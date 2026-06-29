import React from "react";
import "./Radio.css";

interface RadioProps {
  label: string;
  options: string[];
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({
  label,
  options,
  name = "radio",
  onChange,
}: RadioProps) => {
  return (
    <div className="radio-group">
      <label>{label}</label>

      {options.map((option, index) => (
        <label key={index} className="radio-option">
          <input
            type="radio"
            name={name}
            value={option}
            onChange={onChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Radio;