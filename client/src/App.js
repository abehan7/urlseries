<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/Modals/Join";
=======
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import HeadNav from "./components/Navigator/HeadNav";
>>>>>>> HAN
import MainPage from "./routers/MainPage";

export const UserContext = createContext(null);

const App = () => {
  const [loginUser, setLoginUser] = useState({});

  const initialState = {
    loginUser,
    setLoginUser,
  };
  return (
    <Router>
<<<<<<< HEAD
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
=======
      <UserContext.Provider value={initialState}>
        <HeadNav />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Join />} />
          <Route path="/" exact={true} element={<MainPage />} />
        </Routes>
      </UserContext.Provider>
>>>>>>> HAN
    </Router>
  );
};

export default App;
