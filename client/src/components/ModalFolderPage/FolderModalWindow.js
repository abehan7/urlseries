import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import ModalOverlay from "../styled/ModalOverlay.styled";
import EditorContainer from "./EditorContainer";
import FolderContainer from "./FolderContainer";

import { IoArrowBackOutline } from "react-icons/io5";
import FolderDisplay from "./FolderDisplay";
import { PopupEnable } from "../../Hooks/stopScroll";

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
  height: 75%;
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

export const FolderContext = createContext(null);

const FolderModalWindow = () => {
  const [isFolderPage, setIsFolderPage] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [clickedSearch, setClickedSearch] = useState(false);

  const initialState = {
    isFolderPage,
    setIsFolderPage,
    selectedFolder,
    setSelectedFolder,
    clickedSearch,
    setClickedSearch,
  };

  useEffect(() => {
    PopupEnable();
  }, []);

  return (
    <FolderContext.Provider value={initialState}>
      <FolderModalOverlayEl>
        <ModalWindow>
          <Icon>
            <IoArrowBackOutline />
          </Icon>
          <EditorContainer />
          {isFolderPage ? <FolderDisplay /> : <SelectUrlContainer />}
        </ModalWindow>
      </FolderModalOverlayEl>
    </FolderContext.Provider>
  );
};

const SelectUrlContainer = () => {
  return (
    <>
      <FolderContainer />
      {/* <UrlContainer /> */}
    </>
  );
};

export default FolderModalWindow;
