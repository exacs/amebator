import React, { useState } from "react";
import Draggable from "react-draggable";
import "./Knob.css";

function Knob({ x, y, onChange }) {
  function onDrag(e, position) {
    onChange({
      x: position.x,
      y: position.y,
    });
  }

  return (
    <Draggable position={{ x, y }} onDrag={onDrag}>
      <div className="Knob-handler" />
    </Draggable>
  );
}

function RadiusKnob({ x, y, r, onChange }) {
  const [angle, setAngle] = useState(0);

  function onDrag(e, position) {
    const newRadius = Math.sqrt((x - position.x) ** 2 + (y - position.y) ** 2);
    const newAngle = Math.atan2(position.y - y, position.x - x);
    setAngle(newAngle);
    onChange(newRadius);
  }

  const position = {
    x: x + r * Math.cos(angle),
    y: y + r * Math.sin(angle),
  };

  return (
    <Draggable position={position} onDrag={onDrag}>
      <div className="Knob-handler-2" />
    </Draggable>
  );
}

export default function Controls({ circles, moveCenter, changeRadius }) {
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
      {circles.map((circle, i) => (
        <Knob
          key={i}
          y={circle.y}
          x={circle.x}
          onChange={(pos) => moveCenter(i, pos)}
        />
      ))}
      {circles.map((circle, i) => (
        <RadiusKnob
          key={i}
          y={circle.y}
          x={circle.x}
          r={circle.r}
          onChange={(r) => changeRadius(i, r)}
        />
      ))}
    </div>
  );
}
