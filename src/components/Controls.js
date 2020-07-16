import React from "react";
import { useDrag, useDrop } from "react-dnd";

import "./Knob.css";

const ItemType = "KNOB";

function Knob({ id, top, left }) {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging) {
    return (
      <div ref={drag} className="Knob">
        <div className="Knob-handler" />
      </div>
    )
  }

  return (
    <div
      ref={drag}
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

export default function Controls({ points, movePoint }) {
  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);

      movePoint(item.id, [left, top]);
    },
  });
  return (
    <div
      ref={drop}
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
