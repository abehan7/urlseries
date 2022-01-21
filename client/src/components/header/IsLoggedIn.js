import React, { useContext } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import styled from "styled-components";
import { HeaderContext } from "./Header";
import Icon from "./Icon.styled";
import Login from "./Login.styled";

const Logout = styled(Login)`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.3rem;
  padding: 0.15rem 0.6rem;
  padding-left: 0;
  @media (max-width: 870px) {
    display: ${(props) => (props.isSearchBarOn ? "none" : "flex")};
  }
`;

const IsLoggedIn = ({ handleLogout }) => {
  const { isSearchBarOn } = useContext(HeaderContext);
  return (
    <Logout onClick={handleLogout} isSearchBarOn={isSearchBarOn}>
      <Icon>
        <BiLogOutCircle />
      </Icon>
      Logout
    </Logout>
  );
};

export default IsLoggedIn;
