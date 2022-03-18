import React, { useEffect, useState, createContext } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../redux/ReducersT/tokenReducer";
import {
  DELETE_FOLDER,
  getFolders,
  SET_FOLDERS,
  SET_FOLDER_CONTENTS,
} from "../store/reducers/Folders";
// import { getComments } from "../Api";
import { useUrl } from "./UrlContext";
import {
  getFolderTagItems,
  getIsClicked,
  getMetaTagItems,
  RESET_TAGS,
} from "../store/reducers/Tags";
import { duplicateUrlChecker } from "../components/Utils/Urls/checkDuplicate";
import { constants, useMode } from "./ModeContext";
import { updateFolderContents } from "../components/Api";

const FolderContext = createContext();

export const useFolder = () => useContext(FolderContext);

export const FolderProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [combinedTagItems, setCombinedTagItems] = useState({
    urls: [],
    urlIds: [],
  });
  const [currentFolder, setCurrentFolder] = useState({});
  const [editFolder, setEditFolder] = useState({});
  const [likeFolder, setLikeFolder] = useState({});
  const [folderUrlIds, setFolderUrlIds] = useState([]);
  const [filterdFolders, setFilterdFolders] = useState([]);
  const [deleteFolders, setDeleteFolders] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const folders = useSelector(getFolders);
  const metaTagItems = useSelector(getMetaTagItems);
  const folderTagItems = useSelector(getFolderTagItems);
  const totalUrls = useUrl().url.totalUrls;
  const isClicked = useSelector(getIsClicked);
  const getResetCurrentUrl = useUrl().getResetCurrentUrl;

  const mode = useMode().mode;
  const modalMode = useMode().modalMode;

  // FIXME: 메타태그 + 폴더태그 아이템 함수들
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

    // console.log("filterd", filterd);

    return filterd;
  };

  const getCombinedItems = () => {
    const combined = [...getMetaTagUrls(), ...getFoldersTagUrls()];
    const filterd = duplicateUrlChecker(combined);
    // console.log("combined", filterd);
    const onlyIds = filterd.map((url) => {
      return url._id;
    });
    setCombinedTagItems({ urls: filterd, urlIds: onlyIds });
  };

  const handleSetCombinedItemLoading = (boolean) => setLoading(boolean);

  //맨 처음 화면 업로드 되면 폴더 redux에 저장
  useEffect(() => {
    const getFolder = async () => {
      dispatch(SET_FOLDERS);
    };
    getFolder();
    token && folders.length === 0 && getFolder();
  }, [token]);

  //FIXME: 폴더에서만 사용되는 함수
  const handleSetCurrentFolder = (folder) => setCurrentFolder(folder);

  // 현재 선택한 폴더에 url추가
  const handleAddFolderEditUrl = (url) => {
    //folderContainer에 넣어야돼
    if (folderUrlIds.includes(url._id)) return;
    const update = [url, ...currentFolder.folder_contents];
    setCurrentFolder({ ...currentFolder, folder_contents: update });
  };
  // 현재 선택한 폴더에 url삭제
  const handleRemoveFolderEditUrl = (url) => {
    if (!folderUrlIds.includes(url._id)) return;
    const update = currentFolder.folder_contents.filter(
      (item) => item._id !== url._id
    );
    setCurrentFolder({ ...currentFolder, folder_contents: update });
  };

  // 현재 선택한 폴더에 urlList추가
  const handleAddFolderEditUrlList = (newUrls) => {
    const duplicatedList = [...newUrls, ...currentFolder.folder_contents];
    const filterd = duplicateUrlChecker(duplicatedList);
    getResetCurrentUrl();
    setCurrentFolder({ ...currentFolder, folder_contents: filterd });
  };

  // 현재 선택한 폴더 url들 전체삭제
  const handleResetFolderEditUrl = () => {
    setCurrentFolder({ ...currentFolder, folder_contents: [] });
    getResetCurrentUrl();
  };

  // 현재 선택한 폴더 안에 url들 저장
  const handleOnClickSaveFolderEditUrl = async () => {
    const update = {
      folderId: currentFolder._id,
      urls: currentFolder.folder_contents,
    };
    await updateFolderContents(update.folderId, update.urls);
    dispatch(SET_FOLDER_CONTENTS(update));
  };

  //수정모드에서 사용할 folder //currentFolder랑 구분되야 todo 들어가고 빠지는 애니메이션에 이상 안생겨
  const handleSetEditFolder = (_folder) => setEditFolder(_folder);

  // 즐겨찾기 클릭한 폴더 정보 저장
  const handleSetLikeFolder = (_folder) => setLikeFolder(_folder);

  // 필터링된 폴더 저장
  const handleSetFilterdFolders = (folders) => setFilterdFolders(folders);

  // 폴더 삭제
  const handleAddDeleteFolderList = (newFolders) => {
    setLikeFolder({});
    const duplicatedList = [...newFolders, ...deleteFolders];

    const filterd = duplicateUrlChecker(duplicatedList);
    // getResetCurrentFolders();
    setDeleteFolders(filterd);
  };

  const handleOnClickDeleteBtn = () => {
    const deleteFolderList = deleteFolders.map((folder) => folder._id);
    dispatch(DELETE_FOLDER(deleteFolderList));
    setDeleteFolders([]);
  };

  // 삭제할 폴더 목록들 초기화
  const handleResetDeleteFolder = () => {
    setLikeFolder({});
    setDeleteFolders([]);
  };

  // 삭제 폴더 리스트에서 제거
  const handleRemoveDeleteFolder = (folderId) => {
    const newDeleteFolders = deleteFolders.filter(
      (_folder) => _folder._id !== folderId
    );
    setDeleteFolders(newDeleteFolders);
  };

  // 삭제 폴더 리스트에 추가
  const handleAddDeleteFolder = (_folder) => {
    const newDeleteFolders = [_folder, ...deleteFolders];
    setDeleteFolders(newDeleteFolders);
  };

  // FIXME: 메타태그 + 폴더태그 아이템 useEffect

  useEffect(() => {
    isClicked && getCombinedItems();
    // 태그 클릭 아무것도 안되면 전체 비우기
    !isClicked && setCombinedTagItems({ urls: [], urlIds: [] });
  }, [metaTagItems, folderTagItems, isClicked]);
  // 여기에 folder 디펜던시 있었는데 없애니까 돼

  useEffect(() => {
    // console.log("metaTagItems :", metaTagItems);
  }, [metaTagItems]);

  // FIXME: 폴더에서만 사용되는 useEffect
  // 폴더 아이템 클릭시 폴더 아이템 아이디를 배열에 추가
  // 여기는 어처피 자동으로 추가되니까 useEffect써서
  // 내가 신경쓸 부분은 currentFolder에서 가져오는 것
  useEffect(() => {
    const currentFolderUrlIds = currentFolder?.folder_contents?.map((url) => {
      return url._id;
    });
    setFolderUrlIds(currentFolderUrlIds);
  }, [currentFolder]);

  // 모드가 폴더면 해시태그 클릭된거 전체 초기화
  useEffect(() => mode === constants.FOLDER && dispatch(RESET_TAGS()), [mode]);

  // 모드 바뀌면 likeFolder비우기
  // 모드 바뀌면 deleteFolders비우기
  useEffect(() => {
    setLikeFolder({});
    setDeleteFolders([]);
  }, [mode]);
  // useEffect(() => {
  //   console.log("editFolder", editFolder);
  // }, [editFolder]);

  const value = {
    loading,
    combinedTagItems,
    currentFolder,
    folderUrlIds,
    editFolder,
    likeFolder,
    filterdFolders,
    deleteFolders,
    handleAddFolderEditUrl,
    handleAddFolderEditUrlList,
    handleAddDeleteFolder,
    handleAddDeleteFolderList,
    handleSetCurrentFolder,
    handleSetEditFolder,
    handleSetLikeFolder,
    handleSetFilterdFolders,
    handleSetCombinedItemLoading,
    handleRemoveFolderEditUrl,
    handleRemoveDeleteFolder,
    handleResetFolderEditUrl,
    handleResetDeleteFolder,
    handleOnClickDeleteBtn,
    handleOnClickSaveFolderEditUrl,
  };

  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
};
