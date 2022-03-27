import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LeftBox from "../components/ChromeUrlContainer/LeftBox";
import RightBox from "../components/ChromeUrlContainer/RightBox";
import ChromeExtensionSideBar from "../components/SideBar/chrome-ext-sidebar";
import { getToken } from "../redux/ReducersT/tokenReducer";
const ChromeExtensionEl = styled.div`
  z-index: 1;
  height: calc(100vh - 100px);
  display: flex;
`;

const ChromeExtension = () => {
  const token = useSelector(getToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
  }, [token]);
  return (
    <ChromeExtensionEl>
      <ChromeExtensionSideBar />
      <LeftBox />
      <RightBox />
    </ChromeExtensionEl>
  );
};

export default ChromeExtension;
