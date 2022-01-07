import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import MainPage from "./routers/MainPage";

const App = () => {
  const [user, setLoginUser] = useState({});
  return (
    // 이름 ururl유알유알엘
    <Router>
      <Switch>
        <Route path="/login">
          <Login setLoginUser={setLoginUser} />
        </Route>
        <Route path="/signup">
          <Join />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
