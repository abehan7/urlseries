import React from "react";
import { useState } from "react";
import { InfiniteScroll } from "../Utils/InfiniteScroll/InfiniteScroll";
import Loader from "../Utils/Loader/Loader";
import FolderItem from "./FolderItem";

const ItemContainer = ({ folders }) => {
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

  return folders.map((folder, index) => {
    if (index === contentsNum - 1)
      return <Loader key={"thisIsLoader"} target={setTarget} />;
    return (
      <FolderItem
        key={folder._id}
        folderName={folder.folderName}
        id={folder._id}
        index={index}
        totalFolderNum={folders.length}
        isLiked={folder.folder_likedFolder === 1}
        onClick={onClick}
        onClickStar={_onClickStar}
      />
    );
  });
};

export default ItemContainer;
