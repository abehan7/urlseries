import React from "react";
import { Route, Routes } from "react-router-dom";
// import LoginT from "./auth/LoginT";s
import RegisterT from "./auth/RegisterT";
import ActivationEmail from "./auth/ActivationEmail";
import { useSelector } from "react-redux";
import MainPage from "../../routers/MainPage";
import styled from "styled-components";

import loadable from "@loadable/component";
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

const Section = styled.section``;
function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;

  // // const navigate = useNavigate();
  // navigate.listen((location) => {
  //   ReactGA.set({ page: location.pathname });
  //   ReactGA.pageview(location.pathname);
  // });

  return (
    <Section>
      <Routes>
        {/* <RouteChangeTracker /> */}
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
    </Section>
  );
}

export default Body;
