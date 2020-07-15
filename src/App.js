import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import Amebator from "./components/Amebator"

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Amebator v0</Link>
            </li>
            <li>
              <Link to="/horizon">Amebator with horizon</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/horizon">
            <Horizon />
          </Route>
          <Route path="/">
            <Amebator />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Horizon() {
  return <h2>Amebator with horizon</h2>;
}
