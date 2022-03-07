import React, { useEffect, useState, createContext } from "react";
import { useContext } from "react";
// import { getComments } from "../Api";

const FolderContext = createContext();

export const useFolder = () => useContext(FolderContext);

export const FolderProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {};
    fn();
  }, []);

  const value = { loading };

  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
};
