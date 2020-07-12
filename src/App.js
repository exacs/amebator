import React from 'react';
import Canvas from './Canvas'
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="App-header">
        <div style={{padding: '32px'}}>
          Welcome to the amebator
        </div>
        <Canvas />
      </main>
    </div>
  );
}

export default App;
