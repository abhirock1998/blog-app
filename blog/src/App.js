import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./Sign";
import Header from "./Header";
import Blog from "./Blog";
import { useDataLayerValue } from "./data-layer";
function App() {
  const [{ isUser, user }] = useDataLayerValue();
  return (
    <div className="app">
      <Router>
        <Header showDetails={isUser} user={user} />
        <Switch>
          <Route path="/auth">
            <SignIn />
          </Route>
          <Route path="/">
            <Blog />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
