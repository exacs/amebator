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

function RadiusKnob ({ x, y, r, onChange }) {
  const [position, setPosition] = useState({
    x: x + r,
    y: y
  })

  function onDrag () {

  }

  return (
    <Draggable position={position} onDrag={onDrag}>
      <div className='Knob-handler-2' />
    </Draggable>
  )
}

export default function Controls({ circles, moveCenter }) {
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
        />
      ))}
    </div>
  );
}
