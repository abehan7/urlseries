import React from "react";
import { useState } from "react";
import { InfiniteScroll } from "../Utils/InfiniteScroll/InfiniteScroll";
import Loader from "../Utils/Loader/Loader";
import FolderSquare from "./FolderSquare";
import FolderStick from "./FolderStick";

const STICK = "STICK";
const SQUARE = "SQUARE";

const FolderItemContainer = ({ folders, type }) => {
  const [contentsNum, setContentsNum] = useState(50);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const filterdItems = folders?.slice(0, contentsNum);

  // 무한스크롤
  const getNextItems = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setContentsNum((num) => num + 100);
    setIsLoaded(false);
  };

  const stopCondition = folders.length === contentsNum;
  InfiniteScroll({ isLoaded, getNextItems, target, stopCondition });

  const onClick = () => {};
  const _onClickStar = () => {};

  const SquareMap = (folder, index) =>
    type === SQUARE && (
      <FolderSquare
        key={folder._id}
        folderName={folder.folder_name}
        id={folder._id}
        index={index}
        totalFolderNum={folders.length}
        isLiked={folder.like}
        onClick={onClick}
        onClickStar={_onClickStar}
      />
    );

  const StickMap = (folder, index) =>
    type === STICK && (
      <FolderStick
        title={folder.folder_name}
        id={folder._id}
        index={index}
        totalUrlNum={folders.length}
        isLiked={folder.like}
        onClick={onClick}
        onClickStar={_onClickStar}
      />
    );

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
