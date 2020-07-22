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

function App() {
  const { data, setData, setCircles, setSize } = useAmebaState(2);

  function moveCenter(i, { x, y }) {
    setCircles(replace(data.circles, i, { x, y }));
  }

  function changeRadius(i, r) {
    setCircles(replace(data.circles, i, { r }));
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
          onSetAmount={(amount) => setSize(amount)}
        />
      </div>
    </div>
  );
}

export default App;
