import React, { useState } from "react";
import Draggable from "react-draggable";
import { getTangent, getMinusRadius } from "../draw-ameba/geometry";
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

function TangentKnob({ circle0, circle1, radius, onChange }) {
  function onDrag(e, position) {
    const d0 = getMinusRadius(position, circle0, circle0.r);
    const d1 = getMinusRadius(position, circle1, circle1.r);

    const e0 = Math.atan2(position.y - circle0.y, position.x - circle0.x)
    const e1 = Math.atan2(circle1.y - circle0.y, circle1.x - circle0.x)

    const sign = e0 < e1 ? 1 : -1;

    onChange(sign * Math.max(d0, d1));
  }

  const center = getTangent(circle0, circle1, Math.abs(radius), radius > 0);

  return (
    <Draggable position={center} onDrag={onDrag}>
      <div className="Knob-handler-3" />
    </Draggable>
  );
}

export default function Controls({
  data: { circles, radii },
  moveCenter,
  changeRadius,
  changeTangentRadius,
}) {
  const tangents = [];

  for (let i = 0; i < circles.length; i++) {
    const circle0 = circles[i];
    const circle1 = circles[(i + 1) % circles.length];
    const radius = radii[i];

    tangents.push({ circle0, circle1, radius });
  }

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
      {tangents.map((t, i) => (
        <TangentKnob
          key={i}
          circle0={t.circle0}
          circle1={t.circle1}
          radius={t.radius}
          onChange={(r) => changeTangentRadius(i, r)}
        />
      ))}
    </div>
  );
}
