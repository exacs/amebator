import React, { useState } from "react";
import Canvas from "./Canvas";
import DebugCanvas from "./DebugCanvas";
import Controls from "./Controls";
import "./Amebator.css";

function replace(arr, i, val) {
  return arr.map((v, j) => (i === j ? { ...v, ...val } : v));
}

function App() {
  const [data, setData] = useState({
    circles: [
      { x: 80, y: 80, r: 50 },
      { x: 220, y: 130, r: 70 },
      { x: 100, y: 200, r: 40 },
    ],
    radii: [70, 30, 50],
  });

  function moveCenter(i, { x, y }) {
    setData({
      circles: replace(data.circles, i, { x, y }),
      radii: data.radii,
    });
  }

  return (
    <div className="Amebator">
      <div className="Amebator-canvas-container">
        <DebugCanvas data={data} />
        <Canvas data={data} />
        <Controls circles={data.circles} moveCenter={moveCenter} />
      </div>
    </div>
  );
}

export default App;
