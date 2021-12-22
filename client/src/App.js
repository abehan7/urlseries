import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/Modals/Join";
import MainPage from "./routers/MainPage";
import SharePage from "./routers/SharePage";

const App = () => {
  return (
    // 이름 ururl유알유알엘
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
