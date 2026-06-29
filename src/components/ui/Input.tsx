import React from "react";
import "./Input.css";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  placeholder,
  value,
  type = "text",
  disabled = false,
  onChange,
}: InputProps) => {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}

      <input
        className="input"
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;