import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import IsLoggedIn from "./IsLoggedIn";
import IsNotLoggedIn from "./IsNotLoggedIn";

const LoginSignEl = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.6rem;
  /* padding-right: 10px; */
  @media (max-width: 870px) {
  }
`;

const LoginSign = () => {
  const [isClickedProfile, setIsClickedProfile] = useState(false);
  // const { loginUser, setLoginUser } = useContext(UserContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  // FIXME: handlers
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <LoginSignEl>
      {token ? (
        <IsLoggedIn handleLogout={handleLogout} />
      ) : (
        <IsNotLoggedIn handleLogin={handleLogin} handleSignUp={handleSignUp} />
      )}
    </LoginSignEl>
  );
};

export default LoginSign;
