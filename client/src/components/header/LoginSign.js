import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { HeaderContext } from "./Header";
import Icon from "./Icon.styled";
import IsLoggedIn from "./IsLoggedIn";
import IsNotLoggedIn from "./IsNotLoggedIn";
import Profile from "./Profile";

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
  const [isClickedProfile, setIsClickedProfile] = useState(false);
  // const { loginUser, setLoginUser } = useContext(UserContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const { isSearchBarOn, setIsSearchBarOn } = useContext(HeaderContext);

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

  const onClickSearchIcon = (e) => {
    setIsSearchBarOn((val) => !val);
    console.log("안녕");
  };
  return (
    <LoginSignEl>
      {/* <Profile /> */}

      {token ? (
        <IsLoggedIn handleLogout={handleLogout} />
      ) : (
        <IsNotLoggedIn handleLogin={handleLogin} handleSignUp={handleSignUp} />
      )}
      <SearchIcon onClick={onClickSearchIcon}>
        <FaSearch />
      </SearchIcon>
    </LoginSignEl>
  );
};

export default LoginSign;
