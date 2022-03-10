import React, { useEffect, useState, createContext } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../redux/ReducersT/tokenReducer";
import { getFolders, SET_FOLDERS } from "../store/reducers/Folders";
// import { getComments } from "../Api";

const FolderContext = createContext();

export const useFolder = () => useContext(FolderContext);

export const FolderProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const folders = useSelector(getFolders);

  useEffect(() => {
    const getFolder = async () => {
      dispatch(SET_FOLDERS);
    };
    getFolder();
    token && folders.length === 0 && getFolder();
  }, [token]);

  const value = { loading };

  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
};
