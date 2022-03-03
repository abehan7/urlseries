import React from "react";
import { Route, Routes } from "react-router-dom";
// import LoginT from "./auth/LoginT";s
import RegisterT from "./auth/RegisterT";
import ActivationEmail from "./auth/ActivationEmail";
// import NotFound from "../Utils/NotFound/NotFound";
// import ForgotPassword from "./auth/ForgotPassword";
// import ResetPassword from "./auth/ResetPassword";
// import Profile from "./profile/Profile";
// import EditUser from "./profile/EditUser";
// import Aboutpage from "../AboutPage/AboutPage";
// import UserInfomation from "../UserInfomation/Userinfomation";

import { useSelector } from "react-redux";
import MainPage from "../../routers/MainPage";

import loadable from "@loadable/component";

// const MainPage = loadable(() => import("../../routers/MainPage"));
const Aboutpage = loadable(() => import("../AboutPage/AboutPage"));
const UserInfomation = loadable(() =>
  import("../UserInfomation/Userinfomation")
);
const NotFound = loadable(() => import("../Utils/NotFound/NotFound"));
const LoginT = loadable(() => import("./auth/LoginT"));
const Profile = loadable(() => import("./profile/Profile"));
const EditUser = loadable(() => import("./profile/EditUser"));
const ResetPassword = loadable(() => import("./auth/ResetPassword"));
const ForgotPassword = loadable(() => import("./auth/ForgotPassword"));

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;

  return (
    <section>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/about" element={<Aboutpage />} />

        <Route path="/userauth" element={<UserInfomation />} />

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
