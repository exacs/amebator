import React from "react";
import "./switch.css";

export default function Switch ({ options, value, onChange }) {
  return (
    <div className="Switch">
      {
        options.map(option => (
          <button
            onClick={() => onChange(option)}
            className={`Switch-option ${value === option && 'Switch-active'}`}
          >
            {option}
          </button>
        ))
      }
    </div>
  )
}
