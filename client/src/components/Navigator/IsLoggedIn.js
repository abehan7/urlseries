import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import styled from "styled-components";
import Icon from "./Icon.styled";
import Login from "./Login.styled";

const Logout = styled(Login)`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.3rem;
  padding: 0.15rem 0.6rem;
  padding-left: 0;
`;

const IsLoggedIn = ({ handleLogout }) => {
  return (
    <Logout onClick={handleLogout}>
      <Icon>
        <BiLogOutCircle />
      </Icon>
      Logout
    </Logout>
  );
};

export default IsLoggedIn;
