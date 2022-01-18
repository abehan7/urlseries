import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import MainPage from "./routers/MainPage";

const App = () => {
  const [user, setLoginUser] = useState({});
  return (
    // 이름 ururl유알유알엘
    <Router>
      <Routes>
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/signup" element={<Join />} />
        <Route path="/" exact={true} element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
