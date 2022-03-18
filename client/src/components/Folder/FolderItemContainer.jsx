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
import { useEffect } from "react";
import { updateFolderLike } from "../Api";

const STICK = "STICK";
const SQUARE = "SQUARE";

const FolderItemContainer = ({ folders, type }) => {
  const [contentsNum, setContentsNum] = useState(50);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteFolderIds, setDeleteFolderIds] = useState([]);
  const filterdItems = folders?.slice(0, contentsNum);
  const setMode = useMode().setMode;
  const handleSetCurrentFolder = useFolder().handleSetCurrentFolder;
  const handleSetEditFolder = useFolder().handleSetEditFolder;
  const handleSetLikeFolder = useFolder().handleSetLikeFolder;
  const handleAddDeleteFolder = useFolder().handleAddDeleteFolder;
  const handleRemoveDeleteFolder = useFolder().handleRemoveDeleteFolder;
  const dispatch = useDispatch();
  const mode = useMode().mode;
  const setModalMode = useMode().setModalMode;
  const deleteFolders = useFolder().deleteFolders;

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

  const handleClickStar = async (folder) => {
    updateFolderLike(folder._id);
    folder.like && setTimeout(() => dispatch(REMOVE_LIKE(folder._id)), 300);
    folder.like && handleSetLikeFolder({ ...folder, isNewItem: false });
    !folder.like && dispatch(ADD_LIKE(folder._id));
    !folder.like && handleSetLikeFolder({ ...folder, isNewItem: true });
  };

  // 폴더 클릭 할 때 mode에 따라서 클릭 이벤트 다른거 주기
  // FOLDER일때 onClick
  const normalClick = (folder) => {
    handleSetLikeFolder({});
    setMode(constants.FOLDER_EDIT_URL);
    handleSetCurrentFolder(folder);
  };

  const deleteClick = (folder) => {
    if (deleteFolderIds.includes(folder._id)) {
      handleSetLikeFolder({ ...folder, isNewItem: false });
      setTimeout(() => handleRemoveDeleteFolder(folder._id), 200);
    }

    if (!deleteFolderIds.includes(folder._id)) {
      handleSetLikeFolder({ ...folder, isNewItem: true });
      handleAddDeleteFolder(folder);
    }
  };

  const editClick = (folder) => {
    handleSetEditFolder(folder);
    setModalMode(constants.FOLDER_EDIT_MODAL_UP);
  };

  const onClickFolder = (folder) => {
    mode === constants.FOLDER && normalClick(folder);
    mode === constants.FOLDER_DELETE && deleteClick(folder);
    mode === constants.FOLDER_EDIT && editClick(folder);
  };

  // useEffect
  //
  useEffect(() => {
    const fn = () => {
      const _deleteFolderIds = deleteFolders.map((folder) => folder._id);
      setDeleteFolderIds(_deleteFolderIds);
    };
    mode === constants.FOLDER_DELETE && fn();
    mode === constants.FOLDER && setDeleteFolderIds([]);
    mode === constants.NORMAL && setDeleteFolderIds([]);
  }, [deleteFolders, mode]);
  // FIXME: MAPPING
  const SquareMap = (folder, index) => {
    const _onClickFolder = () => onClickFolder(folder);
    const _handleClickStar = () => handleClickStar(folder);
    const isDeleteFolder = deleteFolderIds.includes(folder._id);
    const memo = folder.folder_memo || "메모";
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
          isDeleteFolder={isDeleteFolder}
          memo={memo}
        />
      )
    );
  };

  const StickMap = (folder, index) => {
    const _onClickFolder = () => onClickFolder(folder);
    const _handleClickStar = () => handleClickStar(folder);
    const isDeleteFolder = deleteFolderIds.includes(folder._id);

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
          isDeleteFolder={isDeleteFolder}
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
