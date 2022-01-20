import React from "react";

import styled from "styled-components";
import { Fonts } from "../../Themes";

const LoginSignEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  padding-right: 10px;
`;
const Login = styled.span`
  cursor: pointer;
  border: 3px solid #e9ecef;
  border-radius: 10px;
  padding: 0.3rem 0.6rem;
  ${Fonts.GowunBatang}
`;
const Logout = styled(Login)``;
const SignUp = styled(Login)``;

const LoginSign = () => {
  return (
    <LoginSignEl>
      {/* <SignUp>Sign Up</SignUp> */}
      {/* <Login>Login</Login> */}
      <Logout>Logout</Logout>
    </LoginSignEl>
  );
};

export default LoginSign;
