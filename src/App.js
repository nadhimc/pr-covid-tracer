import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import Notmatch from './Pages/404';
import Tracker from './Pages/Tracker';

function Logout(){
  localStorage.removeItem("user");
  localStorage.removeItem("key");
  return(
    <div>
      <h1 className="text-lg">LOGING OUT</h1>
      <Redirect to="/" />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Auth />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/tracker/:id">
          <Tracker />
        </Route>
        <Route path="/maptracker">
          <p>maptracker</p>
        </Route>
        <Route path="/idchecker">
          <p>Id Checker</p>
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="*">
          <Notmatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
