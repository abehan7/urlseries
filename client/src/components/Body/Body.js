import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import LoginT from "./auth/LoginT";
import RegisterT from "./auth/RegisterT";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../Utils/NotFound/NotFound";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./profile/Profile";
import EditUser from "./profile/EditUser";

import { useSelector } from "react-redux";
import MainPage from "../../routers/MainPage";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;

  return (
    <section>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route
          path="/logintest"
          element={isLogged ? <NotFound /> : <LoginT />}
        />
        <Route
          path="/registertest"
          element={isLogged ? <NotFound /> : <RegisterT />}
        />
        <Route
          path="/forgot_password"
          element={isLogged ? <NotFound /> : <ForgotPassword />}
        />
        <Route
          path="/user/reset/:token"
          element={isLogged ? <NotFound /> : <ResetPassword />}
        />
        <Route
          path="/user/activate/:activation_token"
          element={<ActivationEmail />}
        />

        <Route
          path="/profile"
          element={isLogged ? <Profile /> : <NotFound />}
        />

        <Route
          path="/edit_user/:id"
          element={isAdmin ? <EditUser /> : <NotFound />}
        />
      </Routes>
    </section>
  );
}

export default Body;
