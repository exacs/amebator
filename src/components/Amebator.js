import React, { useState } from "react";
import Canvas from "./Canvas";
import Controls from "./Controls";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PlusMinus from "./PlusMinus"
import Slider from "./Slider"
import "./Amebator.css"


function defaultPoints(amount) {
  const real = amount * 2 + 1;
  const increment = (Math.PI * 2) / (real + 1);
  const points = [];

  // Range 250 +/- 100
  for (let i = 0; i < real; i++) {
    points.push([
      250 + 100 * Math.cos(increment * i),
      250 + 100 * Math.sin(increment * i),
    ]);
  }

  return points;
}

function App() {
  const [amount, setAmount] = useState(1);
  const [points, setPoints] = useState(defaultPoints(amount));
  const [firstRadius, setFirstRadius] = useState(75);
  const [lastRadius, setLastRadius] = useState(75);

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
  }

  const data = {
    points,
    firstRadius,
    lastRadius,
  };

  return (
    <div className="Amebator">
      <div className="Amebator-canvas-container">
        <Canvas data={data} />
        <DndProvider backend={HTML5Backend}>
          <Controls points={points} movePoint={movePoint} />
        </DndProvider>
      </div>
      <section className="Amebator-control">
        <div className="Amebator-control-title">Number of points:</div>
        <PlusMinus onSetAmount={setAmountAndPoints} amount={amount} />
      </section>
      <section className="Amebator-control">
        <div className="Amebator-control-title">First radius:</div>
        <Slider value={firstRadius} onChange={setFirstRadius} />
      </section>
      <section className="Amebator-control">
        <div className="Amebator-control-title">Last radius:</div>
        <Slider value={lastRadius} onChange={setLastRadius} />
      </section>
    </div>
  );
}

export default App;
