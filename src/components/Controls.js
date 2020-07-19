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

export default function Controls({ circles }) {
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
      {circles.map((circle) => (
        <Knob top={circle.y} left={circle.x} />
      ))}
    </div>
  );
}
