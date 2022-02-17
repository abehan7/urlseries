import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { MainStates } from "../../routers/MainPage";

import ModalOverlay from "../styled/ModalOverlay.styled";
import EditorContainer from "./sideBar/EditorContainer";
import FolderContainer from "./folderDetail/FolderContainer";

import { IoArrowBackOutline } from "react-icons/io5";
import FolderDisplay from "./folderList/FolderDisplay";
import { PopupEnable } from "../../Hooks/stopScroll";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../store/reducers/FolderItems";
import {
  SET_FOLDER_CONTENTS,
  ADD_FOLDER,
  REMOVE_FOLDER,
} from "../../store/reducers/Folders";

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
  const [filterdItems, setFilterdItems] = useState([]);
  const [keyword, setKeyword] = useState("");

  const { realTotalUrls } = useContext(MainStates);

  const dispatch = useDispatch();

  const handleFillFolderItemsInit = (folderItems) => {
    dispatch(setItems(folderItems));
  };

  const handleGetId = (urls) => {
    const processed = urls.map((url) => {
      return url._id;
    });
    handleFillFolderItemsInit(processed);
  };

  const handleSetItems = (items) => {
    dispatch(setItems(items));
  };

  const getUrlFullAttr = (urlIdList) => {
    const processed = realTotalUrls.filter((url) => {
      return urlIdList.includes(url._id);
    });
    console.log(processed);
    return processed;
  };

  const handleSetFolderItems = (folderId, urlIdList) => {
    const urls = getUrlFullAttr(urlIdList);
    dispatch(SET_FOLDER_CONTENTS({ folderId, urls }));
  };

  const handleAddFolder = () => {
    const folder = {
      _id: "123123####gjgjg",
      folderName: "folderName1231231",
      folderContents: [],
    };
    dispatch(ADD_FOLDER(folder));
  };

  const handleDeleteFolder = () => {
    const folder = selectedFolder._id;
    dispatch(REMOVE_FOLDER(folder));
  };

  useEffect(() => {
    PopupEnable();
  }, []);

  useEffect(() => {
    console.log(selectedFolder);
  }, [selectedFolder]);

  const initialState = {
    isFolderPage,
    setIsFolderPage,
    selectedFolder,
    setSelectedFolder,
    clickedSearch,
    setClickedSearch,
    filterdItems,
    setFilterdItems,
    keyword,
    setKeyword,
    handleSetItems,
    handleSetFolderItems,
    handleAddFolder,
    handleDeleteFolder,
  };

  return (
    <FolderContext.Provider value={initialState}>
      <FolderModalOverlayEl>
        <ModalWindow>
          <Icon>
            <IoArrowBackOutline />
          </Icon>
          <EditorContainer />
          {isFolderPage ? (
            <FolderDisplay handleGetId={handleGetId} />
          ) : (
            <FolderContainer handleGetId={handleGetId} />
          )}
        </ModalWindow>
      </FolderModalOverlayEl>
    </FolderContext.Provider>
  );
};

export default FolderModalWindow;
