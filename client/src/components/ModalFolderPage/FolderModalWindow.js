import React from "react";
import styled from "styled-components";
import ModalOverlay from "../styled/ModalOverlay.styled";
import EditorContainer from "./EditorContainer";
import FolderContainer from "./FolderContainer";
import ChooseContainer from "./ChooseContainer";

import UrlContainer from "./UrlContainer";

import { IoArrowBackOutline } from "react-icons/io5";
import FolderDisplay from "./FolderDisplay";

const FolderModalOverlayEl = styled(ModalOverlay)`
  cursor: pointer;
  justify-content: flex-end;
`;

const ModalWindow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #e9ecef;
  height: 85%;
  width: 100%;
  position: relative;
  transition: 300ms;
  cursor: default;
  column-gap: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  width: 1000px;
  height: 95%;
  background: #e0e8e7;
  column-gap: 1rem;
`;

const Icon = styled.div`
  top: 10px;
  left: 10px;
  font-size: 2rem;
  position: absolute;
  cursor: pointer;
`;

const ChooseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  row-gap: 1rem;
  height: 90%;
  > div {
    padding: 0;
    margin: 0;
  }
`;

const FolderModalWindow = () => {
  return (
    <FolderModalOverlayEl>
      <ModalWindow>
        <Icon>
          <IoArrowBackOutline />
        </Icon>
        <EditorContainer />
        <FolderDisplay />
        {/* <FolderContainer /> */}
        {/* <UrlContainer /> */}
      </ModalWindow>
    </FolderModalOverlayEl>
  );
};

export default FolderModalWindow;
