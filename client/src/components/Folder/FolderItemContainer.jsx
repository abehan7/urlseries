import React from "react";
import { useState } from "react";
import { useFolder } from "../../contexts/FolderContext";
import { constants, useMode } from "../../contexts/ModeContext";
import { InfiniteScroll } from "../Utils/InfiniteScroll/InfiniteScroll";
import Loader from "../Utils/Loader/Loader";
import FolderSquare from "./FolderSquare";
import FolderStick from "./FolderStick";
import { useDispatch } from "react-redux";
import { SET_LIKE } from "../../store/reducers/Folders";

const STICK = "STICK";
const SQUARE = "SQUARE";

const FolderItemContainer = ({ folders, type }) => {
  const [contentsNum, setContentsNum] = useState(50);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const filterdItems = folders?.slice(0, contentsNum);
  const setMode = useMode().setMode;
  const handleSetCurrentFolder = useFolder().handleSetCurrentFolder;
  const dispatch = useDispatch();

  // SET_LIKE

  // 무한스크롤
  const getNextItems = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setContentsNum((num) => num + 100);
    setIsLoaded(false);
  };

  const stopCondition = folders.length === contentsNum;
  InfiniteScroll({ isLoaded, getNextItems, target, stopCondition });

  const handleClickStar = (folderId) => dispatch(SET_LIKE(folderId));
  const onClickFolder = (folder) => {
    // console.log(folder);
    setMode(constants.FOLDER_EDIT_URL);
    handleSetCurrentFolder(folder);
  };
  const SquareMap = (folder, index) => {
    const _onClickFolder = () => onClickFolder(folder);

    return (
      type === SQUARE && (
        <FolderSquare
          key={folder._id}
          folderName={folder.folder_name}
          id={folder._id}
          index={index}
          totalFolderNum={folders.length}
          isLiked={folder.like}
          onClick={_onClickFolder}
          handleClickStar={handleClickStar}
        />
      )
    );
  };

  const StickMap = (folder, index) => {
    const _onClickFolder = () => onClickFolder(folder);
    return (
      type === STICK && (
        <FolderStick
          key={folder._id}
          title={folder.folder_name}
          id={folder._id}
          index={index}
          totalUrlNum={folders.length}
          isLiked={folder.like}
          onClick={_onClickFolder}
          handleClickStar={handleClickStar}
        />
      )
    );
  };

  return filterdItems.map((folder, index) => {
    if (index === contentsNum - 1)
      return <Loader key={"thisIsLoader"} target={setTarget} />;
    return (
      <>
        {SquareMap(folder, index)}
        {StickMap(folder, index)}
      </>
    );
  });
};

export default FolderItemContainer;
