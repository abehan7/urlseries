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

export const constants = {
  NORMAL,
  EDIT,
  ADD,
  DELETE,
  HASHTAG,
  FOLDER,
  EDIT_MODAL_UP,
};
export const normalModeList = [ADD, NORMAL, HASHTAG, EDIT, EDIT_MODAL_UP];
export const sidebarNormalModeList = [ADD, NORMAL, HASHTAG];
export const sidebarEditModeList = [EDIT, EDIT_MODAL_UP];

export const ModeProvider = ({ children }) => {
  // isDarkMode isEditMode isDeleteMode isNormalMode
  const [mode, setMode] = useState(NORMAL);
  const handleSetCurrentUrl = useUrl().handleSetCurrentUrl;
  const handleResetDeleteUrl = useUrl().handleResetDeleteUrl;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 현재 url 초기화
    handleSetCurrentUrl({});
    // deleteUrls 초기화
    handleResetDeleteUrl();
  }, [mode]);

  const value = { mode, setMode, loading };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
