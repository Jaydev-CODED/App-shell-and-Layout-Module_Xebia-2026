import React from "react";
import "./Switch.css";

interface SwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = ({
  label,
  checked = false,
  onChange,
}: SwitchProps) => {
  return (
    <label className="switch-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
};

export default Switch;