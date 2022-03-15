import React, { useContext, useEffect, useState, createContext } from "react";
import { useUrl } from "./UrlContext";

const ModeContext = createContext();

export const useMode = () => useContext(ModeContext);

const NORMAL = "NORMAL";
const EDIT = "EDIT";
const EDIT_MODAL_UP = "EDIT_MODAL_UP";
const ADD = "ADD";
const DELETE = "DELETE";
const HASHTAG = "HASHTAG";
const FOLDER = "FOLDER";
const FOLDER_EDIT_URL = "FOLDER_EDIT_URL";
const FOLDER_NORMAL = "FOLDER_NORMAL";
const FOLDER_ADD = "FOLDER_ADD";
const FOLDER_EDIT = "FOLDER_EDIT";
const FOLDER_EDIT_MODAL_UP = "FOLDER_EDIT_MODAL_UP";
const FOLDER_DELETE = "FOLDER_DELETE";

export const constants = {
  NORMAL,
  EDIT,
  ADD,
  DELETE,
  HASHTAG,
  FOLDER,
  EDIT_MODAL_UP,
  FOLDER_EDIT_URL,
  FOLDER_NORMAL,
  FOLDER_ADD,
  FOLDER_EDIT,
  FOLDER_EDIT_MODAL_UP,
  FOLDER_DELETE,
};
export const normalModeList = [ADD, NORMAL, HASHTAG, EDIT, EDIT_MODAL_UP];
export const sidebarNormalModeList = [ADD, NORMAL, HASHTAG];
export const sidebarEditModeList = [EDIT, EDIT_MODAL_UP];

export const ModeProvider = ({ children }) => {
  // isDarkMode isEditMode isDeleteMode isNormalMode
  const [mode, setMode] = useState(NORMAL);
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

  const value = { mode, setMode, loading, count };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
