import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "KNOB";

const knobStyle = {
  position: "absolute",
  border: "#fff 1px solid",
  borderRadius: "100%",
  width: "8px",
  height: "8px",
};

function Knob({ id, top, left }) {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging) {
    return <div ref={drag} />;
  }

  return (
    <div
      ref={drag}
      style={{
        ...knobStyle,
        top,
        left,
      }}
    />
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
