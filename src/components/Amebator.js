import React, { useState } from "react";
import Canvas from "./Canvas";
import DebugCanvas from "./DebugCanvas";
import CirclesEditor from "./CirclesEditor";
import PlusMinus from "./PlusMinus";
import "./Amebator.css";

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
  const [data, setData] = useState({
    circles: [],
    radii: [],
  });

  function setAmount(value) {
    setData({
      circles: defaultCircles(value),
      radii: Array.from({ length: value }, (_) => 50),
    });
  }

  function moveCenter(i, { x, y }) {
    setData({
      circles: replace(data.circles, i, { x, y }),
      radii: data.radii,
    });
  }

  function changeRadius(i, r) {
    setData({
      circles: replace(data.circles, i, { r }),
      radii: data.radii,
    });
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
        <PlusMinus amount={data.circles.length} onSetAmount={setAmount} />
      </div>
    </div>
  );
}

export default App;
