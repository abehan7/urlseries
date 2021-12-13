import React from "react";
import styled from "styled-components";
import { useTheme } from "../context/themeProvider";
import ThemeToggle from "../theme/ThemeToggle";
import Header from "./Header";

const Applayout = ({ children }) => {
  const [ThemeMode, toggleTheme] = useTheme();
  return (
    <WrapContainer>
      <Header />
      <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
        DarkMode
      </ThemeToggle>
      <FlexContainer>{children}</FlexContainer>
    </WrapContainer>
  );
};

export default Applayout;

const WrapContainer = styled.main`
  min-height: 100%;
  position: relative;
`;
