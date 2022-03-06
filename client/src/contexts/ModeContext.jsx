import React, { useContext, useEffect, useState, createContext } from "react";

const ModeContext = createContext();

export const useMode = () => useContext(ModeContext);

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState({
    isDarkMode: false,
    isEditMode: false,
    isDeleteMode: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {};
    fn();
  }, []);

  const value = { mode, loading };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
