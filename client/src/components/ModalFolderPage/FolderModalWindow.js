import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { MainStates } from "../../routers/MainPage";

import ModalOverlay from "../styled/ModalOverlay.styled";
import EditorContainer from "./sideBar/EditorContainer";
import FolderContainer from "./folderDetail/FolderContainer";
import Input from "./styled/Input.styled";

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

import { DeleteFolderAPI } from "../Api/index";

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
  width: 700px;
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

const RemoveSelectAlert = styled.div`
  display: ${({ removeSelectAlert }) => (removeSelectAlert ? "flex" : "none")};
  flex-direction: column;
  background-color: whitesmoke;
  position: absolute;
  width: 300px;
  height: max-content;
  padding: 10px;
  align-items: center;
  border-radius: 10px;
`;

const RemoveAlertModal = styled.div`
  display: ${({ removeAlert }) => (removeAlert ? "flex" : "none")};
  flex-direction: column;
  background-color: whitesmoke;
  position: absolute;
  width: 300px;
  height: max-content;
  padding: 10px;
  align-items: center;
  border-radius: 10px;
`;

const AlertModal = styled.div`
  display: ${({ isAlertOpen }) => (isAlertOpen ? "flex" : "none")};
  flex-direction: column;
  background-color: whitesmoke;
  position: absolute;
  width: 300px;
  height: max-content;
  padding: 10px;
  align-items: center;
  border-radius: 10px;
`;

const AlertAddMessage = styled.div`
  color: black;
  font-size: 20px;
  font-weight: lighter;
  text-align: center;
`;

const AlertInputAddMessage = styled(Input)`
  width: max-content;
  margin-top: 10px;
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px;
  background-color: gray;
  color: white;
  margin-top: 10px;
  width: 100px;
  font-weight: lighter;
`;

const ButtonCancel = styled(Button)`
  background-color: white;
  color: red;
`;

export const FolderContext = createContext(null);

const FolderModalWindow = () => {
  const [isFolderPage, setIsFolderPage] = useState(true);

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [clickedSearch, setClickedSearch] = useState(false);
  const [filterdItems, setFilterdItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [folderTitle, setFolderTitle] = useState("");

  const { realTotalUrls } = useContext(MainStates);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [removeAlert, setRemoveAlert] = useState(false);
  const [removeSelectAlert, setRemoveSelectAlert] = useState(false);

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

  //폴더 추가 로직

  //일단 사이드바에서 클릭하면 Alert창이 뜸
  const handleTestAddFolder = () => {
    setIsAlertOpen((prev) => !prev);
  };

  //확인버튼을 클릭하면 폴더추가 함수가 실행되게 함
  const onClickAlertConfirm = () => {
    handleAddFolder();
    setIsAlertOpen((prev) => !prev);
  };

  const handleAddFolder = () => {
    const folder = {
      _id: "dd",
      folderName: folderTitle,
      folderContents: [],
    };

    // dispatch(ADD_FOLDER(folder)); 수정 전
    dispatch(ADD_FOLDER(folder)); // 수정 후
  };

  const onChangeFolderTitle = (e) => {
    // console.log("123123123123");
    setFolderTitle(e.target.value);
    // console.log("value : " + e.target.value);
  };

  //폴더 삭제 로직

  const handleTestRemoveFolder = () => {
    // console.log(setSelectedFolder);
    console.log(selectedFolder?._id); //변경
    // if (selectedFolder._id === null) { =>변경    // if (selectedFolder?._id === null) { =>

    // null => undefine으로 변경
    if (selectedFolder?._id === undefined) {
      setRemoveSelectAlert((prev) => !prev);
      // if (selectedFolder?._id !== undefined) {
      //   setRemoveSelectAlert((prev) => !prev);
      // }
    } else {
      setRemoveAlert((prev) => !prev);
    }

    // setRemoveAlert((prev) => !prev);
  };

  const onClickRemoveConfirm = () => {
    handleDeleteFolder();
    setRemoveAlert((prev) => !prev);
  };

  const handleDeleteFolder = async () => {
    const folder = selectedFolder._id;
    await DeleteFolderAPI(folder);
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
    handleTestAddFolder,
    handleTestRemoveFolder,
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

          <AlertModal isAlertOpen={isAlertOpen}>
            <AlertAddMessage>폴더 이름을 입력해주세요</AlertAddMessage>
            <AlertInputAddMessage
              value={folderTitle}
              onChange={onChangeFolderTitle}
            />
            <Button onClick={onClickAlertConfirm}>생성</Button>
          </AlertModal>

          <RemoveAlertModal removeAlert={removeAlert}>
            <AlertAddMessage>정말 삭제하시겠습니까?</AlertAddMessage>
            <Button onClick={onClickRemoveConfirm}>삭제</Button>
          </RemoveAlertModal>

          <RemoveSelectAlert removeSelectAlert={removeSelectAlert}>
            <AlertAddMessage>
              삭제하고자 하는 폴더를 선택해주세요
            </AlertAddMessage>
          </RemoveSelectAlert>
        </ModalWindow>
      </FolderModalOverlayEl>
    </FolderContext.Provider>
  );
};

export default FolderModalWindow;
