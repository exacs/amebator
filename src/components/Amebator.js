import React, { useState } from "react";
import Canvas from "./Canvas";
import Controls from "./Controls";
import PlusMinus from "./PlusMinus";
import Slider from "./Slider";
import "./Amebator.css";

function defaultPoints(amount) {
  const increment = (Math.PI * 2) / amount;
  const points = [];

  // Range 250 +/- 100
  for (let i = 0; i < amount; i++) {
    points.push([
      250 + 100 * Math.cos(increment * i),
      250 + 100 * Math.sin(increment * i),
    ]);
  }

  return points;
}

function defaultRadii(amount) {
  return Array.from({ length: amount }, (_) => 50);
}

function App() {
  const [amount, setAmount] = useState(1);
  const [points, setPoints] = useState(defaultPoints(amount));
  const [radii, setRadii] = useState(defaultRadii(amount));

  function movePoint(i, coords) {
    setPoints(
      points.map((point, j) => {
        if (j !== i) return point;

        return coords;
      })
    );
  }

  const data = {
    circles: [
      { x: 80, y: 80, r: 50 },
      { x: 220, y: 130, r: 70 },
      { x: 100, y: 200, r: 40 },
    ],
    radii: [70, 30, 50],
  };

  return (
    <div className="Amebator">
      <div className="Amebator-canvas-container">
        <Canvas data={data} />
        <Controls circles={data.circles} movePoint={movePoint} />
      </div>
    </div>
  );
}

export default App;
