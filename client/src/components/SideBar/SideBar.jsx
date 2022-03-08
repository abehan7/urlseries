import React from "react";
import styled from "styled-components";
const SideBarEl = styled.div`
  z-index: -1;
  height: 100%;
  width: 200px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const SideBar = () => {
  return <SideBarEl>SideBar</SideBarEl>;
};

export default SideBar;

//  Q space => git branch -a 탈출하는 방법
