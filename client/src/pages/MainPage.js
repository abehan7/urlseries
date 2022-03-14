import React from "react";
import "./MainPage.css";

// API
import styled from "styled-components";
import SideBar from "../components/SideBar/SideBar";
import UrlContainer from "../components/UrlContainer/UrlContainer";
import Modals from "../components/Modal/Modals";
import { constants, useMode } from "../contexts/ModeContext";

const MainEl = styled.div`
  position: inherit;
  z-index: 1;
  height: calc(100vh - 100px);
  display: flex;
  /* max-width: 100%; */
`;

const modalWhiteList = [
  constants.ADD,
  constants.HASHTAG,
  constants.EDIT_MODAL_UP,
];

const MainPage = () => {
  const mode = useMode().mode;
  return (
    <MainEl>
      {/* 사이드바 */}
      <SideBar />
      {/* 그리드 컨테이너 */}
      <UrlContainer />
      {/* 모달 */}
      {modalWhiteList.includes(mode) && <Modals mode={mode} />}
    </MainEl>
  );
};

export default MainPage;
