import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import MainPage from "./routers/MainPage";

export const UserContext = createContext(null);

const App = () => {
  const [loginUser, setLoginUser] = useState({});

  const initialState = {
    loginUser,
    setLoginUser,
  };
  return (
    // 이름 ururl유알유알엘

    <Router>
      <UserContext.Provider value={initialState}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Join />} />
          <Route path="/" exact={true} element={<MainPage />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
