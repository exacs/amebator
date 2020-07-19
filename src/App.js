import React from "react";
import "./App.css";
import Amebator from "./components/Amebator";

export default function App() {
  return (
    <div>
      <div className="App-nav-container"></div>

      <main className="App-body">
        <Amebator />
      </main>
    </div>
  );
}
