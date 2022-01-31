import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import IsLoggedIn from "./IsLoggedIn";
import IsNotLoggedIn from "./IsNotLoggedIn";

const LoginSignEl = styled.div`
  position: absolute;
  right: 0;
  top: ${(props) => (props.isClickedProfile ? "calc(100% + 1rem);" : "1rem")};
  visibility: ${(props) => (props.isClickedProfile ? "visible" : "hidden")};
  opacity: ${(props) => (props.isClickedProfile ? "1" : "0")};

  transition: 100ms;
  z-index: -1;
  /* display: ${(props) => (props.isClickedProfile ? "flex" : "none")}; */
  display: flex;

  align-items: center;
  justify-content: center;
  column-gap: 0.6rem;
  /* padding-right: 10px; */
  @media (max-width: 870px) {
  }
`;

const LoginSign = ({ isClickedProfile, setIsClickedProfile }) => {
  // const { loginUser, setLoginUser } = useContext(UserContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  // FIXME: handlers
  // 바깥 클릭하면 로그인 사라지게하기
  const onClickOutside = (e) => {
    let isTarget = false;
    if (e.target === document.querySelector(".navbar__icons")) {
      return;
    }
    e.target === document.querySelector(".navbar__icons") && (isTarget = true);
    e.target === document.querySelector(".navbar__icons svg") &&
      (isTarget = true);
    document.querySelectorAll(".navbar__icons svg path").forEach((path) => {
      e.target === path && (isTarget = true);
    });
    if (isTarget) {
      return;
    }

    isClickedProfile && setIsClickedProfile(false);
  };
  window.addEventListener("click", onClickOutside);

  const handleLogout = (e) => {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
    setIsClickedProfile(false);
  };

  const handleLogin = (e) => {
    navigate("/login");
    setIsClickedProfile(false);
  };

  const handleSignUp = (e) => {
    navigate("/signup");
    setIsClickedProfile(false);
  };

  return (
    <LoginSignEl isClickedProfile={isClickedProfile}>
      {token ? (
        <IsLoggedIn handleLogout={handleLogout} />
      ) : (
        <IsNotLoggedIn
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          isClickedProfile={isClickedProfile}
        />
      )}
    </LoginSignEl>
  );
};

export default LoginSign;
