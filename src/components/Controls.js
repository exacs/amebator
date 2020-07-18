import React from "react";
import "./Knob.css";

function Knob({ top, left }) {
  return (
    <div
      className="Knob"
      style={{
        top,
        left,
      }}
    >
      <div className="Knob-handler" />
    </div>
  );
}

export default function Controls({ points }) {
  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        position: "absolute",
        top: "1px",
        left: "1px",
      }}
    >
      {points.map((point, i) => (
        <Knob key={i} id={i} top={point[1]} left={point[0]} />
      ))}
    </div>
  );
}
