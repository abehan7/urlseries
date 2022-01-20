import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { UserContext } from "../../App";
import Icon from "./Icon.styled";
import IsLoggedIn from "./IsLoggedIn";
import IsNotLoggedIn from "./IsNotLoggedIn";

const LoginSignEl = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.6rem;
  padding-right: 10px;
  @media (max-width: 870px) {
    /* position: static; */
  }
`;
const SearchIcon = styled(Icon)`
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 1.8rem;
  height: 1.8rem;
  border: 3px solid #fff;
  cursor: pointer;

  @media (max-width: 870px) {
    display: flex;
  }
`;

const LoginSign = () => {
  // const { loginUser, setLoginUser } = useContext(UserContext);

  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
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
      <SearchIcon>
        <FaSearch />
      </SearchIcon>
      {token ? (
        <IsLoggedIn handleLogout={handleLogout} />
      ) : (
        <IsNotLoggedIn handleLogin={handleLogin} handleSignUp={handleSignUp} />
      )}
    </LoginSignEl>
  );
};

export default LoginSign;
