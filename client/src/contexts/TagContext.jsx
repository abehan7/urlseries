import React, { useEffect, useState, createContext } from "react";
import { useContext } from "react";
// import { getComments } from "../Api";

const TagContext = createContext();

export const useTag = () => useContext(TagContext);

export const TagProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState({
    metaTagItems: [],
    folderTagItems: [],
    isClicked: false,
    isMetaTag: null,
  });

  useEffect(() => {
    const fn = async () => {};
    fn();
  }, []);

  const value = { loading };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
