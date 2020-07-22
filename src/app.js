import React, { useState } from "react";
import Canvas from "./components/canvas";
import DebugCanvas from "./components/debug-canvas";
import CirclesEditor from "./components/circles-editor";
import PlusMinus from "./components/plus-minus";
import Switch from "./components/switch"
import useAmebaState from "./hooks/use-ameba-state";
import "./app.css";

export default function App() {
  const {
    data,
    setSize,
    setCircleRadius,
    setCircleCenter,
    setTangentRadius,
  } = useAmebaState(4);

  const [menu, setMenu] = useState('Geometry')

  return (
    <main className="App-body">
      <Switch
        options={['Geometry', 'Color']}
        value={menu}
        onChange={value => setMenu(value)}
      />
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
    </main>
  );
}
