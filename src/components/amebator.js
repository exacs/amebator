import React from "react";
import Canvas from "./canvas";
import DebugCanvas from "./debug-canvas";
import CirclesEditor from "./circles-editor";
import PlusMinus from "./plus-minus";
import "./amebator.css";
import useAmebaState from "../hooks/use-ameba-state";

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
  const { data, setData, updateCircles } = useAmebaState(2);

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
