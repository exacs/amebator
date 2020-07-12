import React, {useState} from 'react';
import Canvas from './Canvas'
import Controls from './Controls'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './App.css';

function App() {
  const [points, setPoints] = useState([
    [150, 150],
    [300, 150],
    [300, 375]
  ])

  function movePoint (i, coords) {
    setPoints(points.map((point, j) => {
      if (j !== i) return point

      return coords
    }))
  }

  return (
    <div className="App">
      <main className="App-header">
        <div style={{padding: '32px'}}>
          Welcome to the amebator
        </div>
        <div style={{position: 'relative'}}>
          <Canvas points={points} />
          <DndProvider backend={HTML5Backend}>
            <Controls points={points} movePoint={movePoint} />
          </DndProvider>
        </div>
      </main>
    </div>
  );
}

export default App;
