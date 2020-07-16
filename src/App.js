import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as DefaultLink,
  useRouteMatch
} from "react-router-dom";
import "./App.css";
import Amebator from "./components/Amebator"

function Link ({ children, to }) {
  const match = useRouteMatch({
    path: to,
    exact: true
  })
  const className = [
    'App-nav-link',
    match ? 'App-nav-link-selected' : ''
  ].join(' ')

  return (
    <DefaultLink to={to} className={className}>{children}</DefaultLink>
  )
}

export default function App() {
  return (
    <Router>
      <div className="App-nav-container">
        <nav className="App-nav">
          <Link to="/">Amebator classic</Link>
          <Link to="/2">Amebator II</Link>
        </nav>
      </div>

      <main className="App-body">
        <Switch>
          <Route path="/2">
            <Horizon />
          </Route>
          <Route path="/">
            <Amebator />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

function Horizon() {
  return <h2>Amebator with centers and tangents</h2>;
}
