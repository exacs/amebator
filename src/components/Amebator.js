import React, { useState } from "react";
import Canvas from "./Canvas";
import Controls from "./Controls";
import PlusMinus from "./PlusMinus"
import Slider from "./Slider"
import "./Amebator.css"


function defaultPoints(amount) {
  const increment = (Math.PI * 2) / (amount);
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

function defaultRadii (amount) {
  return Array.from({ length: amount }, _ => 50)
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

  function setAmountAndPoints(amount) {
    setAmount(amount);
    setPoints(defaultPoints(amount));
    setRadii(defaultRadii(amount))
  }

  const data = {
    circles: [
      [80, 80, 50],
      [220, 130, 70],
      [100, 200, 40]
    ],
    radii: [70, 30, 50]
  };

  return (
    <div className="Amebator">
      <div className="Amebator-canvas-container">
        <Canvas data={data} />
        <Controls points={points} movePoint={movePoint} />
      </div>
      <section className="Amebator-control">
        <div className="Amebator-control-title">Number of points:</div>
        <PlusMinus onSetAmount={setAmountAndPoints} amount={amount} />
      </section>
    </div>
  );
}

export default App;
