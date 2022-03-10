import React, { useContext, useEffect, useState, createContext } from "react";

const ModeContext = createContext();

export const useMode = () => useContext(ModeContext);

const NORMAL = "NORMAL";
const EDIT = "EDIT";
const ADD = "ADD";
const DELETE = "DELETE";

export const constants = { NORMAL, EDIT, ADD, DELETE };

export const ModeProvider = ({ children }) => {
  // isDarkMode isEditMode isDeleteMode isNormalMode
  const [mode, setMode] = useState(NORMAL);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {};
    fn();
  }, []);

  const value = { mode, loading };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
