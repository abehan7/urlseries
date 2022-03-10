import React, { useEffect, useState, createContext } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../redux/ReducersT/tokenReducer";
import { getFolders, SET_FOLDERS } from "../store/reducers/Folders";
// import { getComments } from "../Api";
import { useUrl } from "./UrlContext";
import {
  getFolderTagItems,
  getIsClicked,
  getMetaTagItems,
} from "../store/reducers/Tags";
import { duplicateUrlChecker } from "../components/Utils/Urls/checkDuplicate";

const FolderContext = createContext();

export const useFolder = () => useContext(FolderContext);

export const FolderProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [combinedTagItems, setCombinedTagItems] = useState({
    urls: [],
    urlIds: [],
  });
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const folders = useSelector(getFolders);
  const metaTagItems = useSelector(getMetaTagItems);
  const folderTagItems = useSelector(getFolderTagItems);
  const totalUrls = useUrl().url.totalUrls;
  const isClicked = useSelector(getIsClicked);

  // console.log("totalUrls from getMetaTagUrls: ", totalUrls);

  // 태그 아이템들

  const getMetaTagUrls = () => {
    const filterd = totalUrls?.filter((url) => {
      return metaTagItems.some((tag) => {
        return url.url_hashTags.includes(tag);
      });
    });

    return filterd;
  };

  const getFoldersTagUrls = () => {
    const getFolders = folders.filter((folder) =>
      folderTagItems.includes(folder._id)
    );

    const getFolderContents = getFolders.map((folder) => {
      return folder.folder_contents;
    });

    const flatten = getFolderContents.flat();

    const filterd = duplicateUrlChecker(flatten);

    console.log("filterd", filterd);

    return filterd;
  };

  const getCombinedItems = () => {
    const combined = [...getMetaTagUrls(), ...getFoldersTagUrls()];
    const filterd = duplicateUrlChecker(combined);
    console.log("combined", filterd);
    const onlyIds = filterd.map((url) => {
      return url._id;
    });
    setCombinedTagItems({ urls: filterd, urlIds: onlyIds });
  };

  useEffect(() => {
    const getFolder = async () => {
      dispatch(SET_FOLDERS);
    };
    getFolder();
    token && folders.length === 0 && getFolder();
  }, [token]);

  useEffect(() => {
    isClicked && getCombinedItems();
  }, [metaTagItems, folderTagItems, folders, isClicked]);

  useEffect(() => {
    console.log("metaTagItems :", metaTagItems);
  }, [metaTagItems]);

  const value = { loading, combinedTagItems };

  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
};
