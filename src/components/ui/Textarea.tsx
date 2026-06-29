import React from "react";
import "./Textarea.css";

interface TextareaProps {
  label?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  label,
  placeholder,
  rows = 4,
  value,
  onChange,
}: TextareaProps) => {
  return (
    <div className="textarea-group">
      {label && <label>{label}</label>}
      <textarea
        className="textarea"
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;