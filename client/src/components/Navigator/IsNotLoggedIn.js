import React from "react";
import { BiLogInCircle } from "react-icons/bi";
import styled from "styled-components";
import Login from "./Login.styled";

const IsNotLoggedInEl = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  /* row-gap: 0.3rem; */
`;

const SignUp = styled(Login)``;

const IsNotLoggedIn = ({ handleSignUp, handleLogin }) => {
  return (
    <IsNotLoggedInEl>
      <SignUp onClick={handleSignUp}>Sing Up</SignUp>
      <Login onClick={handleLogin}>
        <BiLogInCircle />
        Login
      </Login>
    </IsNotLoggedInEl>
  );
};

export default IsNotLoggedIn;
