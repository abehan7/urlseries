import React, { useContext, useEffect, useState, createContext } from "react";
import { useUrl } from "./UrlContext";

const ModeContext = createContext();

export const useMode = () => useContext(ModeContext);

const NORMAL = "NORMAL";
const EDIT = "EDIT";
const ADD = "ADD";
const DELETE = "DELETE";
const HASHTAG = "HASHTAG";
const FOLDER = "FOLDER";

export const constants = { NORMAL, EDIT, ADD, DELETE, HASHTAG, FOLDER };
export const normalModeList = [ADD, NORMAL, HASHTAG];

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
    // handleResetDeleteUrl();
  }, [mode]);

  const value = { mode, setMode, loading };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
