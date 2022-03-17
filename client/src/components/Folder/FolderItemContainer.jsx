import React from "react";
import { useState } from "react";
import { useFolder } from "../../contexts/FolderContext";
import { constants, useMode } from "../../contexts/ModeContext";
import { InfiniteScroll } from "../Utils/InfiniteScroll/InfiniteScroll";
import Loader from "../Utils/Loader/Loader";
import FolderSquare from "./FolderSquare";
import FolderStick from "./FolderStick";
import { useDispatch } from "react-redux";
import { ADD_LIKE, REMOVE_LIKE, SET_LIKE } from "../../store/reducers/Folders";

const STICK = "STICK";
const SQUARE = "SQUARE";

const FolderItemContainer = ({ folders, type }) => {
  const [contentsNum, setContentsNum] = useState(50);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const filterdItems = folders?.slice(0, contentsNum);
  const setMode = useMode().setMode;
  const handleSetCurrentFolder = useFolder().handleSetCurrentFolder;
  const handleSetEditFolder = useFolder().handleSetEditFolder;
  const handleSetLikeFolder = useFolder().handleSetLikeFolder;
  const dispatch = useDispatch();
  const mode = useMode().mode;
  const setModalMode = useMode().setModalMode;

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

  const handleClickStar = (folder) => {
    handleSetLikeFolder(folder);
    folder.like && setTimeout(() => dispatch(REMOVE_LIKE(folder._id)), 300);
    !folder.like && dispatch(ADD_LIKE(folder._id));
  };

  // 폴더 클릭 할 때 mode에 따라서 클릭 이벤트 다른거 주기
  // FOLDER일때 onClick
  const normalClick = (folder) => {
    handleSetLikeFolder({});
    setMode(constants.FOLDER_EDIT_URL);
    handleSetCurrentFolder(folder);
  };

  const deleteClick = () => {};
  const editClick = (folder) => {
    handleSetEditFolder(folder);
    setModalMode(constants.FOLDER_EDIT_MODAL_UP);
  };

  const onClickFolder = (folder) => {
    mode === constants.FOLDER && normalClick(folder);
    mode === constants.FOLDER_DELETE && deleteClick(folder);
    mode === constants.FOLDER_EDIT && editClick(folder);
  };
  const SquareMap = (folder, index) => {
    const _onClickFolder = () => onClickFolder(folder);
    const _handleClickStar = () => handleClickStar(folder);

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
          handleClickStar={_handleClickStar}
        />
      )
    );
  };

  const StickMap = (folder, index) => {
    const _onClickFolder = () => onClickFolder(folder);
    const _handleClickStar = () => handleClickStar(folder);
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
          handleClickStar={_handleClickStar}
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
