import React from 'react';
import Canvas from './Canvas'
import Controls from './Controls'
import './App.css';

function App() {
  const points = [
    [150, 150],
    [300, 150],
    [300, 375]
  ]

  return (
    <div className="App">
      <main className="App-header">
        <div style={{padding: '32px'}}>
          Welcome to the amebator
        </div>
        <div style={{position: 'relative'}}>
          <Canvas points={points} />
          <Controls />
        </div>
      </main>
    </div>
  );
}

export default App;
