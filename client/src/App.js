import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./routers/MainPage";
import SearchPage from "./routers/SearchPage";

const App = () => {
  return (
    // 이름 ururl유알유알엘
    <Router>
      <Switch>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
