import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="App-header">
        <div style={{padding: '32px'}}>
          Welcome to the amebator
        </div>
        <canvas width="500" height="500" style={{border: '1px solid white'}}>Here is the Canvas</canvas>

      </main>
    </div>
  );
}

export default App;
