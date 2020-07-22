import React from "react";
import "./app.css";
import Amebator from "./components/amebator";

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
