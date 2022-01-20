import React from "react";
import styled from "styled-components";
import Colors from "../../Colors";
import Login from "./Login.styled";

const IsNotLoggedInEl = styled.div`
  display: flex;
  column-gap: 0.3rem;
`;

const SignUp = styled(Login)``;

const IsNotLoggedIn = ({ handleSignUp, handleLogin }) => {
  return (
    <IsNotLoggedInEl>
      <SignUp onClick={handleSignUp}>Sign Up</SignUp>
      <Login onClick={handleLogin}>Login</Login>
    </IsNotLoggedInEl>
  );
};

export default IsNotLoggedIn;
