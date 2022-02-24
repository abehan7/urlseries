import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import { MainStates } from "../../routers/MainPage";

import ModalOverlay from "../styled/ModalOverlay.styled";
import EditorContainer from "./EditorContainer";
import FolderContainer from "./FolderContainer";

import { IoArrowBackOutline } from "react-icons/io5";
import FolderDisplay from "./FolderDisplay";
import { PopupDisable } from "../../Hooks/stopScroll";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_ITEMS,
  REMOVE_ITEMS,
  SET_ITEMS,
} from "../../store/reducers/FolderItems";
import {
  SET_FOLDER_CONTENTS,
  GET_CHANGE_FOLDER_NAME,
  SET_LIKE,
  REMOVE_FOLDER,
  ADD_FOLDER,
} from "../../store/reducers/Folders";
import AlertModal from "./AlertModal";
import { DELETE, LIKE } from "../../contants";
import { CLOSE_MODAL } from "../../store/reducers/Modal";
import {
  DeleteFolder,
  updateFolderLike,
  updateFolderName,
  updateFolderContents,
} from "../Api";
// import { AddFolder } from "../Api";

const FolderModalOverlayEl = styled(ModalOverlay)`
  cursor: pointer;
  justify-content: flex-end;
`;

const ModalWindow = styled.div`
  transform: ${(props) =>
    props.isModalWindowOpen ? "translateY(0)" : "translateY(100%)"};

  transition: transform 0.3s ease-in-out;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #e9ecef;
  height: 75%;
  width: 700px;
  position: relative;
  transition: 300ms;
  cursor: default;
  column-gap: 1rem;
`;

const Icon = styled.div`
  top: 10px;
  left: 10px;
  font-size: 2rem;
  position: absolute;
  cursor: pointer;
`;

export const FolderContext = createContext(null);

const FolderModalWindow = () => {
  const [isFolderPage, setIsFolderPage] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [clickedSearch, setClickedSearch] = useState(false);
  const [filterdItems, setFilterdItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  // 폴더 안에 있는url만 보여주는 기능
  const [isOnlyFolderContents, setIsOnlyFolderContents] = useState(false);
  // 현재 모달이 열려있는지 여부
  // const [modalWindowOpen, setModalWindowOpen] = useState(false);

  // 모달창에서 사용할 useState
  const [modalInfo, setModalInfo] = useState({
    message: "",
    description: "",
    type: "",
    handleClickConfirm: () => {},
    isOpen: false,
  });

  // url 선택하기 클릭한 경우 전체선택이랑 확인하기 버튼 나오게하기
  const [isUrlEditing, setIsUrlEditing] = useState(false);

  // 폴더 이름 추가하기
  // const [modalAddFolderName, setModalAddFolderName] = useState("");

  // 폴더 이름 수정하기
  const [modalFolderName, setModalFolderName] = useState("");

  const [selectMode, setSelectMode] = useState({
    status: false,
    mode: "",
    items: [],
  });

  const { realTotalUrls } = useContext(MainStates);

  const items = useSelector((state) => state.folderItems.items);
  const folders = useSelector((state) => state.folders.folders);
  const isModalWindowOpen = useSelector((state) => state.modal.isModalOpen);

  const dispatch = useDispatch();

  const ShowNoticeAlert = (message) => {
    setModalInfo({
      message,
      type: "confirm",
      handleClickConfirm: () => {},
      isOpen: true,
    });

    setTimeout(() => {
      setModalInfo({
        message: "",
        type: "",
        handleClickConfirm: () => {},
        isOpen: false,
      });
    }, 1000);
  };

  const handleFillFolderItemsInit = (folderItems) => {
    dispatch(SET_ITEMS(folderItems));
  };

  const handleGetId = (urls) => {
    const processed = urls.map((url) => {
      return url._id;
    });
    handleFillFolderItemsInit(processed);
  };

  const handleAddItems = (items) => {
    dispatch(ADD_ITEMS(items));
  };

  const handleRemoveItems = (items) => {
    dispatch(REMOVE_ITEMS(items));
  };

  const getUrlFullAttr = (urlIdList) => {
    const processed = realTotalUrls.filter((url) => {
      return urlIdList.includes(url._id);
    });
    console.log(processed);
    return processed;
  };

  const handleSetFolderItems = () => {
    const urlIdList = items;
    const urls = getUrlFullAttr(urlIdList);
    const folderId = selectedFolder._id;

    setSelectedFolder({ ...selectedFolder, folder_contents: urls });

    console.log("urls from", urls);

    updateFolderContents(folderId, urls);

    dispatch(SET_FOLDER_CONTENTS({ folderId, urls }));
  };

  const handleModalCancel = () => {
    setModalInfo({ isOpen: false });
  };

  const handleClickAllExcept = () => {
    // 검색어를 입력후 이용해주세요
    setModalInfo({
      message: "검색어를 입력후 이용해주세요",
      type: "noCancel",
      isOpen: true,
    });
  };

  // 사용자가 폴더 url변경 했는지 안했는지 알려주는 기능
  const CheckChanges = () => {
    const folderContentsOriginal = selectedFolder?.folder_contents?.map(
      (url) => {
        return url?._id;
      }
    );
    const sortedItems = [...items];
    // 같은 규칙으로 정렬해서 비교해야함

    sortedItems.sort();
    folderContentsOriginal.sort();

    const isSame =
      sortedItems.length === folderContentsOriginal.length &&
      sortedItems.every((element, index) => {
        return element === folderContentsOriginal[index];
      });

    console.log("isSame from FolderModalWindow: ", isSame);

    return isSame;
  };

  const handleClickAddFolder = () => {
    const fn = async (folder_name) => {
      if (folder_name === "") {
        setModalInfo({
          message: "폴더 이름을 입력해주세요",
          type: "noCancel",
          isOpen: true,
        });
        return;
      }

      // const { data } = await AddFolder(folderName);

      // const folder = data;

      // console.log("folder from api", folder);

      // const folder = {
      //   _id: data._id,
      //   user_id: data.user_id,
      //   folderName: data.folder_name,
      //   folderContents: [],
      // };

      // dispatch(ADD_FOLDER(folderName));
      dispatch(ADD_FOLDER(folder_name));
      setModalFolderName("");
      // setModalInfo({
      //   isOpen: false,
      // });

      const message = "폴더가 추가되었습니다";
      ShowNoticeAlert(message);
    };

    setSelectedFolder({});
    setModalFolderName("");

    setModalInfo({
      message: "추가하실 폴더 이름을 입력해주세요",
      type: "addFolder",
      isOpen: true,
      handleClickConfirm: fn,
      description: "",
    });
  };

  const handleAddModalCancel = () => {
    handleModalCancel();
    setModalFolderName("");
    setSelectedFolder({});
  };

  const handleClickEditFolder = () => {
    const fn = async (folder_name) => {
      if (folder_name === "") {
        setSelectedFolder({});
        setModalInfo({
          message: "폴더 이름을 입력해주세요",
          type: "noCancel",
          isOpen: true,
        });
        return;
      }
      dispatch(
        GET_CHANGE_FOLDER_NAME({ folderId: selectedFolder._id, folder_name })
      );
      updateFolderName(folder_name, selectedFolder._id);

      setModalFolderName("");
      setSelectedFolder({});

      const message = "변경되었습니다 :)";
      ShowNoticeAlert(message);
    };
    // 이거를 selectedfolder클릭될 때마다 설정해야해
    console.log("modalFolderName: ", modalFolderName);
    (modalFolderName === "" || modalFolderName === undefined) &&
      setModalInfo({
        message: "변경하실 폴더를 선택해주세요!",
        type: "noCancel",
        isOpen: true,
      });

    modalFolderName !== "" &&
      modalFolderName !== undefined &&
      setModalInfo({
        message: "수정하실 폴더 이름을 입력해주세요",
        type: "addFolder",
        isOpen: true,
        handleClickConfirm: fn,
        description: "",
      });
  };

  const handleClickDisplaySearchIcon = () => {
    setSelectedFolder({});
    setClickedSearch(!clickedSearch);
  };

  const handleModalOnChange = (keyword) => {
    // console.log(keyword);
    setModalFolderName(keyword);
    // console.log(modalFolderName);
  };

  const handleClickDeleteFolder = () => {
    // 현재 클릭된 folder초기화
    setSelectedFolder({});
    selectMode.status &&
      selectMode.mode === LIKE &&
      setSelectMode({
        items: [],
        status: true,
        mode: DELETE,
      });

    selectMode.status &&
      selectMode.mode === DELETE &&
      setSelectMode({
        items: [],
        status: false,
        mode: "",
      });

    selectMode.mode === "" &&
      setSelectMode({
        items: [],
        status: true,
        mode: DELETE,
      });

    // console.log("selectMode: ", selectMode);
  };

  // FIXME: selectMode에서 사용할 Hook
  const getLikeModeInit = () => {
    const newItems = folders.filter((folder) => {
      return folder.like;
    });
    const newItemsId = newItems.map((folder) => {
      return folder._id;
    });
    // console.log(newItemsId);
    return newItemsId;
  };
  // FIXME: 이쪽에서 폴더에 한꺼번에 넣는 기능 만들어야됌
  const handleClickLikeFolder = () => {
    // 현재 클릭된 folder초기화

    setSelectedFolder({});

    // 현재 like item들 init
    const InitItemList = getLikeModeInit();
    selectMode.status &&
      selectMode.mode === DELETE &&
      setSelectMode({
        items: InitItemList,
        status: true,
        mode: LIKE,
      });

    selectMode.status &&
      selectMode.mode === LIKE &&
      setSelectMode({
        items: [],
        status: false,
        mode: "",
      });

    selectMode.mode === "" &&
      setSelectMode({
        items: InitItemList,
        status: true,
        mode: LIKE,
      });
  };

  const handleClickMultiFoldersConfirm = () => {
    const likeModeFn = () => {
      const likedFolderIdList = selectMode.items;
      dispatch(SET_LIKE({ likedFolderIdList }));
      updateFolderLike(likedFolderIdList);
      setSelectMode({
        items: [],
        status: false,
        mode: "",
      });
      const message = "변경이 완료되었습니다 :)";
      ShowNoticeAlert(message);
      // console.log(folders);
    };
    const deleteModeFn = () => {
      dispatch(REMOVE_FOLDER(selectMode.items));
      DeleteFolder(selectMode.items);
      setSelectMode({
        items: [],
        status: false,
        mode: "",
      });
      const message = "변경이 완료되었습니다 :)";
      ShowNoticeAlert(message);
    };

    // 좋아요 mode일때
    selectMode.mode === LIKE &&
      setModalInfo({
        message: "변경사항을 저장하시겠습니까?",
        description: "변경하신 후에는 복구할 수 없습니다.",
        type: "click",
        handleClickConfirm: likeModeFn,
        isOpen: true,
      });
    // 삭제하기 mode일때
    selectMode.mode === DELETE &&
      setModalInfo({
        message: "폴더를 삭제하시겠습니까?",
        description: "삭제하신 후에는 복구할 수 없습니다.",
        type: "click",
        handleClickConfirm: deleteModeFn,
        isOpen: true,
      });
  };

  const onClickShutModal = () => {
    const fn = () => {
      document.querySelector(".folderModal-container").style.display = "none";
      PopupDisable();
      setModalInfo({ isOpen: false });
      dispatch(CLOSE_MODAL());
      setIsFolderPage(true);
      setSelectedFolder({});
      setSelectMode({
        items: [],
        status: false,
        mode: "",
      });
      // setModalWindowOpen(false);
    };
    setModalInfo({
      message: "폴더변경을 취소하시겠습니까?",
      type: "click",
      handleClickConfirm: fn,
      isOpen: true,
    });
  };

  // 검색버튼 클릭하면 폴더버튼 닫히고 검색창으로 넘어가게 하기
  useEffect(() => {
    setKeyword("");
    clickedSearch && setIsOnlyFolderContents(false);
  }, [clickedSearch]);

  // 폴더 버튼 누르면 검색창 닫히고 폴더url들로 넘어가게 하기
  useEffect(() => {
    setKeyword("");
    isOnlyFolderContents && setClickedSearch(false);
  }, [isOnlyFolderContents]);

  //
  useEffect(() => {
    selectedFolder?._id !== undefined &&
      clickedSearch &&
      setClickedSearch(false);
  }, [selectedFolder]);

  useEffect(() => {
    selectedFolder !== undefined &&
      setModalFolderName(selectedFolder?.folder_name);
    selectedFolder === undefined && setModalFolderName("");
  }, [selectedFolder]);

  const initialState = {
    isFolderPage,
    setIsFolderPage,
    selectedFolder,
    setSelectedFolder,
    clickedSearch,
    setClickedSearch,
    filterdItems,
    setFilterdItems,
    keyword,
    setKeyword,
    handleAddItems,
    handleSetFolderItems,
    isConfirmed,
    setIsConfirmed,
    modalInfo,
    setModalInfo,
    isUrlEditing,
    setIsUrlEditing,
    handleClickAllExcept,
    CheckChanges,
    handleRemoveItems,
    isSearching,
    setIsSearching,
    isOnlyFolderContents,
    setIsOnlyFolderContents,
    handleClickAddFolder,
    handleClickDisplaySearchIcon,
    handleModalOnChange,
    modalFolderName,
    handleClickEditFolder,
    handleAddModalCancel,
    handleClickDeleteFolder,
    handleClickLikeFolder,
    selectMode,
    setSelectMode,
    handleClickMultiFoldersConfirm,
  };

  const target = useRef();

  const onClickOutside = (e) => {
    e.target === target.current && onClickShutModal();
  };

  useEffect(() => {
    console.log(selectedFolder);
  }, [selectedFolder]);

  return (
    <FolderContext.Provider value={initialState}>
      <FolderModalOverlayEl ref={target} onClick={onClickOutside}>
        <ModalWindow isModalWindowOpen={isModalWindowOpen}>
          <Icon onClick={onClickShutModal}>
            <IoArrowBackOutline />
          </Icon>
          <EditorContainer />
          {isFolderPage ? (
            <FolderDisplay handleGetId={handleGetId} />
          ) : (
            <FolderContainer handleGetId={handleGetId} />
          )}
          <AlertModal
            message={modalInfo.message}
            description={modalInfo.description}
            isOpen={modalInfo.isOpen}
            type={modalInfo.type}
            handleClickConfirm={modalInfo.handleClickConfirm}
            handleModalCancel={handleModalCancel}
          />
        </ModalWindow>
      </FolderModalOverlayEl>
    </FolderContext.Provider>
  );
};

export default FolderModalWindow;
