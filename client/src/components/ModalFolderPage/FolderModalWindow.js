import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { MainStates } from "../../routers/MainPage";

import ModalOverlay from "../styled/ModalOverlay.styled";
import EditorContainer from "./EditorContainer";
import FolderContainer from "./FolderContainer";

import { IoArrowBackOutline } from "react-icons/io5";
import FolderDisplay from "./FolderDisplay";
import { PopupEnable } from "../../Hooks/stopScroll";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_ITEMS,
  REMOVE_ITEMS,
  SET_ITEMS,
} from "../../store/reducers/FolderItems";
import { SetFolderContents } from "../../store/reducers/Folders";
import AlertModal from "./AlertModal";

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

export const FolderContext = createContext(null);

const FolderModalWindow = () => {
  const [isFolderPage, setIsFolderPage] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [clickedSearch, setClickedSearch] = useState(false);
  const [filterdItems, setFilterdItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  // 모달창에서 사용할 useState
  const [modalInfo, setModalInfo] = useState({
    message: "",
    type: "",
    handleClickConfirm: () => {},
    isOpen: false,
  });

  // url 선택하기 클릭한 경우 전체선택이랑 확인하기 버튼 나오게하기
  const [isUrlEditing, setIsUrlEditing] = useState(false);
  const [isConfirmPopup, setIsConfirmPopup] = useState(false);

  const { realTotalUrls } = useContext(MainStates);

  const items = useSelector((state) => state.folderItems.items);

  const dispatch = useDispatch();

  const handleFillFolderItemsInit = (folderItems) => {
    dispatch(SET_ITEMS(folderItems));
  };

  const handleGetId = (urls) => {
    const processed = urls.map((url) => {
      return url._id;
    });
    handleFillFolderItemsInit(processed);
  };

  const handleAddItems = (items) => {
    dispatch(ADD_ITEMS(items));
  };

  const handleRemoveItems = (items) => {
    dispatch(REMOVE_ITEMS(items));
  };

  const getUrlFullAttr = (urlIdList) => {
    const processed = realTotalUrls.filter((url) => {
      return urlIdList.includes(url._id);
    });
    console.log(processed);
    return processed;
  };

  const handleSetFolderItems = () => {
    const urlIdList = items;
    const urls = getUrlFullAttr(urlIdList);
    const folderId = selectedFolder._id;

    setSelectedFolder({ ...selectedFolder, folderContents: urls });

    dispatch(SetFolderContents({ folderId, urls }));
  };

  const handleModalCancel = () => {
    setModalInfo({ isOpen: false });
  };

  const handleClickAllExcept = () => {
    // 검색어를 입력후 이용해주세요
    setModalInfo({
      message: "검색어를 입력후 이용해주세요",
      type: "noCancel",
      isOpen: true,
    });
  };

  // 사용자가 폴더 url변경 했는지 안했는지 알려주는 기능
  const CheckChanges = () => {
    const folderContentsOriginal = selectedFolder.folderContents.map((url) => {
      return url._id;
    });
    const sortedItems = [...items];
    // 같은 규칙으로 정렬해서 비교해야함

    sortedItems.sort();
    folderContentsOriginal.sort();

    const isSame =
      sortedItems.length === folderContentsOriginal.length &&
      sortedItems.every((element, index) => {
        return element === folderContentsOriginal[index];
      });

    console.log("isSame from FolderModalWindow: ", isSame);

    return isSame;
  };

  useEffect(() => {
    PopupEnable();
  }, []);

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
    handleAddItems,
    handleSetFolderItems,
    isConfirmed,
    setIsConfirmed,
    modalInfo,
    setModalInfo,
    isUrlEditing,
    setIsUrlEditing,
    handleClickAllExcept,
    isConfirmPopup,
    setIsConfirmPopup,
    CheckChanges,
    handleRemoveItems,
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
          <AlertModal
            message={modalInfo.message}
            isOpen={modalInfo.isOpen}
            type={modalInfo.type}
            handleClickConfirm={modalInfo.handleClickConfirm}
            handleModalCancel={handleModalCancel}
          />
        </ModalWindow>
      </FolderModalOverlayEl>
    </FolderContext.Provider>
  );
};

export default FolderModalWindow;
