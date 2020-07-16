import React from "react";
import "./Slider.css"

export default function Slider({ value, onChange }) {
  return (
    <div className="Slider">
      <input
        type="range"
        min="1"
        max="100"
        value={value}
        className="Slider-input"
        onChange={(e) => onChange(parseInt(e.currentTarget.value, 10))}
      />
    </div>
  );
}
