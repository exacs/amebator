import React, { useState } from "react";
import Canvas from "./Canvas";
import Controls from "./Controls";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Slider({ children, value, onChange }) {
  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ textAlign: "left", padding: "4px" }}>{children}</div>
      <input
        type="range"
        min="1"
        max="100"
        value={value}
        className="slider"
        onChange={(e) => onChange(parseInt(e.currentTarget.value, 10))}
      />
    </div>
  );
}

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
    <div className="App">
      <main className="App-header">
        <div style={{ position: "relative" }}>
          <Canvas data={data} />
          <DndProvider backend={HTML5Backend}>
            <Controls points={points} movePoint={movePoint} />
          </DndProvider>
        </div>
        <div style={{ width: "320px" }}>
          Number of points: {amount * 2 + 1}
          <button onClick={() => setAmountAndPoints(amount + 1)}>+</button>
          <button onClick={() => setAmountAndPoints(amount - 1)}>-</button>
        </div>
        <div style={{ width: "320px" }}>
          <Slider value={firstRadius} onChange={setFirstRadius}>
            First radius
          </Slider>
          <Slider value={lastRadius} onChange={setLastRadius}>
            Last radius
          </Slider>
        </div>
      </main>
    </div>
  );
}

export default App;
