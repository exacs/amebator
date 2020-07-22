import React from "react";
import Canvas from "./canvas";
import DebugCanvas from "./debug-canvas";
import CirclesEditor from "./circles-editor";
import PlusMinus from "./plus-minus";
import "./amebator.css";
import useAmebaState from "../hooks/use-ameba-state";

function App() {
  const {
    data,
    setSize,
    setCircleRadius,
    setCircleCenter,
    setTangentRadius,
  } = useAmebaState(2);

  return (
    <div className="Amebator">
      <div className="Amebator-canvas-container">
        <DebugCanvas data={data} />
        <Canvas data={data} />
        <CirclesEditor
          data={data}
          moveCenter={setCircleCenter}
          changeRadius={setCircleRadius}
          changeTangentRadius={setTangentRadius}
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
