import React, { useState } from "react";
import Canvas from "./canvas";
import DebugCanvas from "./debug-canvas";
import CirclesEditor from "./circles-editor";
import PlusMinus from "./plus-minus";
import "./amebator.css";

function distance(c0, c1) {
  return Math.sqrt((c0.x - c1.x) ** 2 + (c0.y - c1.y) ** 2) - c0.r - c1.r;
}

function replace(arr, i, val) {
  return arr.map((v, j) => (i === j ? { ...v, ...val } : v));
}

function replace2(arr, i, val) {
  return arr.map((v, j) => (i === j ? val : v));
}

function defaultCircles(amount) {
  const increment = (Math.PI * 2) / amount;

  const points = [];

  // Range 250 +/- 100
  for (let i = 0; i < amount; i++) {
    points.push({
      x: 250 + 100 * Math.cos(increment * i),
      y: 250 + 100 * Math.sin(increment * i),
      r: 50,
    });
  }

  return points;
}

function App() {
  const [data, setData] = useState(generateData(2));

  function updateCircles(circles) {
    // Update radii if needed
    const newRadii = [];

    for (let i = 0; i < circles.length; i++) {
      const minDiameter = distance(
        circles[i],
        circles[(i + 1) % circles.length]
      );
      const radius = Math.abs(data.radii[i]);
      const sign = data.radii[i] > 0 ? 1 : -1;

      newRadii.push(sign * Math.max(minDiameter / 2, radius));
    }

    setData({ circles, radii: newRadii });
  }

  function generateData(value) {
    return {
      circles: defaultCircles(value),
      radii: Array.from({ length: value }, (_) => 50),
    };
  }

  function moveCenter(i, { x, y }) {
    updateCircles(replace(data.circles, i, { x, y }));
  }

  function changeRadius(i, r) {
    updateCircles(replace(data.circles, i, { r }));
  }

  function changeTangentRadius(i, r) {
    setData({
      circles: data.circles,
      radii: replace2(data.radii, i, r),
    });
  }

  return (
    <div className="Amebator">
      <div className="Amebator-canvas-container">
        <DebugCanvas data={data} />
        <Canvas data={data} />
        <CirclesEditor
          data={data}
          moveCenter={moveCenter}
          changeRadius={changeRadius}
          changeTangentRadius={changeTangentRadius}
        />
      </div>
      <div className="Amebator-control">
        <PlusMinus
          amount={data.circles.length}
          onSetAmount={(amount) => setData(generateData(amount))}
        />
      </div>
    </div>
  );
}

export default App;
