import React from "react";
import { Route, Routes } from "react-router-dom";
// import Login from "./auth/Login";s
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import { useSelector } from "react-redux";
import MainPage from "../../pages/MainPage";
import styled from "styled-components";

import loadable from "@loadable/component";
import ChromeExtensionPage from "../../pages/ChromeExtensionPage";
import AdsensePage from "../../pages/AdsensePage";
import SharePage from "../../pages/SharePage";

const Aboutpage = loadable(() => import("../AboutPage/AboutPage"));
const UserInfomation = loadable(() =>
  import("../UserInfomation/Userinfomation")
);
const NotFound = loadable(() => import("../Utils/NotFound/NotFound"));
const Login = loadable(() => import("./auth/Login"));
const Profile = loadable(() => import("./profile/Profile"));
const EditUser = loadable(() => import("./profile/EditUser"));
const ResetPassword = loadable(() => import("./auth/ResetPassword"));
const ForgotPassword = loadable(() => import("./auth/ForgotPassword"));

const Section = styled.section``;
function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;

  return (
    <Section>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/adsense" element={<AdsensePage />} />

        <Route path="/share/:folder_id" element={<SharePage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/userauth" element={<UserInfomation />} />
        <Route
          path="/logintest"
          element={isLogged ? <NotFound /> : <Login />}
        />
        <Route
          path="/registertest"
          element={isLogged ? <NotFound /> : <Register />}
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
        <Route path="/chrome_extension" element={<ChromeExtensionPage />} />
        {/* <Route path="/adsense" element={<AdsensePage />} /> */}
      </Routes>
    </Section>
  );
}

export default Body;
