import React from "react";
import "./MainPage.css";

// API
import styled from "styled-components";
import SideBar from "../components/SideBar/SideBar";
import UrlContainer from "../components/UrlContainer/UrlContainer";
import Modals from "../components/Modal/Modals";

const MainEl = styled.div`
  position: inherit;
  z-index: 1;
  height: calc(100vh - 100px);
  display: flex;
`;

const MainPage = () => {
  return (
    <MainEl>
      {/* 사이드바 */}
      <SideBar />
      {/* 그리드 컨테이너 */}
      <UrlContainer />
      {/* 모달 */}
      <Modals />
    </MainEl>
  );
};

export default MainPage;
