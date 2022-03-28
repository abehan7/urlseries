import React, { useContext, useEffect, useState, createContext } from "react";
import { useUrl } from "./UrlContext";

const ModeContext = createContext();

export const useMode = () => useContext(ModeContext);

// 일반 URL에서 사용할 constants
const NORMAL = "NORMAL";
const EDIT = "EDIT";
const EDIT_MODAL_UP = "EDIT_MODAL_UP";
const ADD = "ADD";
const DELETE = "DELETE";
const HASHTAG = "HASHTAG";
const SHARE = "SHARE";
// 폴더에서 사용할 constants
// const FOLDER_NORMAL = "FOLDER_NORMAL"; // 이건 사용 못해 FOLDER로 이미 내가 해놨거든
const FOLDER = "FOLDER";
const FOLDER_ADD = "FOLDER_ADD";
const FOLDER_EDIT = "FOLDER_EDIT";
const FOLDER_EDIT_MODAL_UP = "FOLDER_EDIT_MODAL_UP";
const FOLDER_DELETE = "FOLDER_DELETE";
// 폴더 클릭 후 폴더 아이템에서 사용할 constants
const FOLDER_EDIT_URL = "FOLDER_EDIT_URL";

export const constants = {
  NORMAL,
  EDIT,
  ADD,
  DELETE,
  HASHTAG,
  SHARE,
  FOLDER,
  EDIT_MODAL_UP,
  FOLDER_EDIT_URL,
  // FOLDER_NORMAL,
  FOLDER_ADD,
  FOLDER_EDIT,
  FOLDER_EDIT_MODAL_UP,
  FOLDER_DELETE,
};
export const normalModeList = [ADD, NORMAL, HASHTAG, EDIT, EDIT_MODAL_UP];
export const folderNormalModeList = [
  FOLDER_ADD,
  FOLDER,
  FOLDER_EDIT,
  FOLDER_EDIT_MODAL_UP,
];
export const sidebarNormalModeList = [ADD, NORMAL, HASHTAG];
export const sidebarEditModeList = [EDIT, EDIT_MODAL_UP];

export const ModeProvider = ({ children }) => {
  // isDarkMode isEditMode isDeleteMode isNormalMode
  const [mode, setMode] = useState(NORMAL);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [modalMode, setModalMode] = useState(null);
  const [sidebarAnimeCount, setSidebarAnimeCount] = useState(0);
  const [folderBoxAnimeCount, setFolderBoxAnimeCount] = useState(0);
  const handleSetCurrentUrl = useUrl().handleSetCurrentUrl;
  const handleResetDeleteUrl = useUrl().handleResetDeleteUrl;
  const [loading, setLoading] = useState(true);
  const sidebarAnimeWhiteList = [DELETE, EDIT, FOLDER];
  const count = { sidebarAnimeCount, folderBoxAnimeCount };

  useEffect(() => {
    // 현재 url 초기화
    handleSetCurrentUrl({});
    // deleteUrls 초기화
    handleResetDeleteUrl();
  }, [mode]);

  useEffect(() => {
    // 맨 처음 화면 뜰 때 슬라이드 방지하기
    mode === FOLDER && setFolderBoxAnimeCount(1);
    //삭제하기 // 수정하기 // 폴더설정 => 사이드바 애니메이션 넣기
    sidebarAnimeWhiteList.includes(mode) && setSidebarAnimeCount(1);
  }, [mode]);

  useEffect(() => {
    console.log("modalMode: ", modalMode);
  }, [modalMode]);

  const value = {
    mode,
    setMode,
    loading,
    count,
    modalMode,
    setModalMode,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
