import React from "react";
import "./App.css";
import PersistentDrawerLeft from "./components/dashboard";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import SignIn from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={PersistentDrawerLeft} />
          <Route path="/login" component={SignIn} />
          <Route path="/registiration" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
