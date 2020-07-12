import React from 'react';
import Canvas from './Canvas'
import Controls from './Controls'
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="App-header">
        <div style={{padding: '32px'}}>
          Welcome to the amebator
        </div>
        <div style={{position: 'relative'}}>
          <Canvas />
          <Controls />
        </div>
      </main>
    </div>
  );
}

export default App;
