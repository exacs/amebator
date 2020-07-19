import React from "react";
import Draggable from 'react-draggable';
import "./Knob.css";

function Knob({ x, y }) {
  function onDrag (e, position) {
    console.log(position.x, position.y)
  }

  return (
    <Draggable
      position={{x, y}}
      onDrag={onDrag}
    >
      <div className="Knob-handler" />
    </Draggable>
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
        <Knob y={circle.y} x={circle.x} />
      ))}
    </div>
  );
}
