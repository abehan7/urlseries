import React from "react";
import styled from "styled-components";
import {
  HiOutlineDocumentAdd,
  HiOutlineDocumentRemove,
  HiOutlineFolder,
  HiOutlineFolderAdd,
  HiOutlineFolderRemove,
} from "react-icons/hi";
import { FcFolder } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";

import { CgBackspace, CgEditBlackPoint, CgHashtag } from "react-icons/cg";
import Footer from "../Footer/Footer.jsx";
import {
  constants,
  sidebarEditModeList,
  sidebarNormalModeList,
  useMode,
} from "../../contexts/ModeContext.jsx";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { useUrl } from "../../contexts/UrlContext.jsx";
import { useModal } from "../../contexts/ModalContext.jsx";
import { useTag } from "../../contexts/TagContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../redux/ReducersT/tokenReducer.js";
import { useFolder } from "../../contexts/FolderContext.jsx";
import {
  getFolders,
  SET_FOLDER_CONTENTS,
} from "../../store/reducers/Folders.js";
import { useEffect } from "react";
import { RiShareBoxFill } from "react-icons/ri";

// import {} from "react-icons"

const SideBarEl = styled.div`
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(-50%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  z-index: 2;
  height: 100%;
  width: 200px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
  color: #c4c4c4;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;

  ::before {
    background-color: #fff;
    left: 0;
    content: "";
    height: 100%;
    width: 2px;
    position: absolute;
    transition: all 0.2s ease-in-out;
  }

  :hover {
    background-color: #a597fe1a;
    color: black;
    ::before {
      background-color: #a597fe;
    }
  }
`;

const IconWrapper = styled.div``;
const TextWrapper = styled.div``;
const Text = styled.span``;
const Icon = styled.div`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 0.5rem;
`;

const TagWrapper = styled.div`
  padding-left: 2rem;
  position: relative;
  > div {
    ::before {
      transition: all 0.2s ease-in-out;
      background-color: #ddd;
      left: 0;
      content: "";
      height: 100%;
      width: 2px;
      position: absolute;
    }
  }
`;
const Img = styled.img`
  width: 40px;
  filter: drop-shadow(15px 5px 5px rgba(0, 0, 0, 0.5));
  padding-bottom: 0.5rem;
`;

const FaviconWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const FaviconContainer = styled.div`
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  width: 80%;
  height: 100%;
  flex-direction: column;
`;
const Ment = styled.span`
  font-size: 1.1rem;
  color: gray;
  padding-top: 0.3rem;
  text-align: center;
`;

const TapsWrapper = styled.div`
  animation: fadeIn 0.5s ease-in-out;
`;
const DeleteWrapper = styled(TapsWrapper)`
  > div:nth-child(2) {
    :hover {
      background-color: #ffcccb7a;
      ::before {
        background-color: tomato;
      }
    }
  }
`;

const NormalWrapper = styled.div`
  animation: ${({ count }) => (count === 1 ? "fadeIn 0.5s ease-in-out;" : "")};
  pointer-events: ${({ token, isLoading }) =>
    token && !isLoading ? "auto" : "none"};
`;

const EditWrapper = styled(TapsWrapper)``;

const FolderWrapper = styled(TapsWrapper)`
  > div {
    :hover {
      background-color: #e6c7b675;
      ::before {
        background-color: #e6c7b6;
      }
    }
    ::before {
      transition: all 0.2s ease-in-out;
      left: 0;
      content: "";
      height: 100%;
      width: 2px;
      position: absolute;
    }
  }
`;

const FolderIcon = styled.div`
  font-size: 1.7rem;
`;

const SideBar = () => {
  const mode = useMode().mode;

  // const currentFolder = useFolder().currentFolder;
  const folderTitle = useFolder().currentFolder?.folder_name;
  const folderIconList = [
    constants.FOLDER,
    constants.FOLDER_EDIT_URL,
    constants.FOLDER_ADD,
    constants.FOLDER_DELETE,
    constants.FOLDER_EDIT,
    constants.FOLDER_EDIT_MODAL_UP,
  ];

  const folderNameList = [
    constants.FOLDER,
    constants.FOLDER_ADD,
    constants.FOLDER_DELETE,
    constants.FOLDER_EDIT,
    constants.FOLDER_EDIT_MODAL_UP,
  ];
  // console.log(currentFolder);

  // 북마크 탭

  const NormalModeTaps = () =>
    sidebarNormalModeList.includes(mode) && <NormalModeItems />;

  const DeleteModeTaps = () => constants.DELETE === mode && <DeleteModeItems />;

  const EditModeTaps = () =>
    sidebarEditModeList.includes(mode) && <EditModeItems />;

  // 폴더 탭
  const FolderTaps = () => constants.FOLDER === mode && <FolderModeItems />;

  const FolderEditTaps = () =>
    constants.FOLDER_EDIT === mode && <FolderEditModeItems />;

  const FolderDeleteTaps = () =>
    constants.FOLDER_DELETE === mode && <FolderDeleteModeItems />;

  // 폴더 클릭 후 북마크 탭
  const FolderEditUrlTaps = () =>
    constants.FOLDER_EDIT_URL === mode && <FolderEditUrlModeItems />;

  const FolderIconImg = () =>
    folderIconList.includes(mode) && (
      <FolderIcon>
        <FcFolder />
      </FolderIcon>
    );

  const FaviconImg = () =>
    !folderIconList.includes(mode) && (
      <Img src="img/logotest2.png" alt="logoImage" />
    );
  return (
    <SideBarEl>
      <FaviconWrapper>
        <FaviconContainer>
          <ImgWrapper>
            {FolderIconImg()}
            {FaviconImg()}
            <Ment>
              {folderNameList.includes(mode) && "Folder"}
              {constants.FOLDER_EDIT_URL === mode && folderTitle}
              {!folderIconList.includes(mode) && "Welcome!"}
            </Ment>
          </ImgWrapper>
        </FaviconContainer>
      </FaviconWrapper>
      {/* 탭 맵핑 */}
      {/* 북마크 */}
      {NormalModeTaps()}
      {DeleteModeTaps()}
      {EditModeTaps()}
      {/* 폴더 */}
      {FolderTaps()}
      {FolderEditTaps()}
      {FolderDeleteTaps()}
      {/* 폴더 클릭 후 북마크 */}
      {FolderEditUrlTaps()}
      <Footer />
    </SideBarEl>
  );
};

export default SideBar;

//  Q space => git branch -a 탈출하는 방법

const Item = ({ children, name, onClick }) => {
  return (
    <Button onClick={onClick}>
      <IconWrapper>
        <Icon>{children}</Icon>
      </IconWrapper>
      <TextWrapper>
        <Text>{name}</Text>
      </TextWrapper>
    </Button>
  );
};

const NormalModeItems = () => {
  const setMode = useMode().setMode;
  const setModalMode = useMode().setModalMode;
  const handleGetTotalTags = useTag().handleGetTotalTags;
  const totlaUrlLoading = useUrl().loading.isTotalUrl;
  const onClickAdd = () => setModalMode(constants.ADD);
  const onClickDelete = () => setMode(constants.DELETE);
  const onClickHashtag = () => {
    handleGetTotalTags();
    setModalMode(constants.HASHTAG);
  };
  const onClickEdit = () => setMode(constants.EDIT);
  const onClickFolder = () => setMode(constants.FOLDER);
  const sidebarAnimeCount = useMode().count.sidebarAnimeCount;
  const token = useSelector(getToken);

  return (
    <NormalWrapper
      token={token}
      count={sidebarAnimeCount}
      isLoading={totlaUrlLoading}
    >
      <Item name="추가하기" onClick={onClickAdd}>
        <HiOutlineDocumentAdd />
      </Item>
      <Item name="삭제하기" onClick={onClickDelete}>
        <HiOutlineDocumentRemove />
      </Item>
      <Item name="수정하기" onClick={onClickEdit}>
        <CgEditBlackPoint />
      </Item>
      <TagWrapper onClick={onClickFolder}>
        <Item name="폴더설정">
          <HiOutlineFolder />
        </Item>
      </TagWrapper>

      <TagWrapper onClick={onClickHashtag}>
        <Item name="해시태그설정">
          <CgHashtag />
        </Item>
      </TagWrapper>
    </NormalWrapper>
  );
};

const DeleteModeItems = () => {
  const setMode = useMode().setMode;
  const filterdUrls = useUrl().url.filterdUrls;
  const handleAddDeleteUrlList = useUrl().handleAddDeleteUrlList;
  const handleResetDeleteUrl = useUrl().handleResetDeleteUrl;
  const totalUrls = useUrl().url.totalUrls;
  const handleAlertTrigger = useModal().handleAlertTrigger;
  const handleOnClickDeleteUrl = useUrl().handleOnClickDeleteUrl;
  const deleteUrls = useUrl().url.deleteUrls;

  const checkError = () => {
    if (deleteUrls.length === 0) {
      toast.error("삭제할 북마크를 선택해주세요");
      return true;
    }
    return false;
  };

  const onClickBack = () => setMode(constants.NORMAL);
  const onClickAll = () => {
    console.log(filterdUrls);
    // 검색 하나라도 했을 때만 실행
    filterdUrls.length !== 0 && handleAddDeleteUrlList(filterdUrls);
    // 검색도 안하고 태그도 클릭 안했을 때
    filterdUrls.length === 0 && handleAddDeleteUrlList(totalUrls);
  };
  const onUnClickAll = () => handleResetDeleteUrl();

  const onClickDelete = () => {
    const _checkError = checkError();
    if (_checkError) return;
    console.log(" ✔there's no error");

    const fn = () => {
      // 토스트 모달
      const getData = async () => await handleOnClickDeleteUrl();

      const myPromise = getData();
      toast.promise(myPromise, {
        loading: "삭제중입니다",
        success: "삭제가 완료되었습니다!",
        error: "삭제가 정상적으로 이루어지지 않았습니다",
      });
    };
    handleAlertTrigger(fn, "삭제하시겠습니까?");
  };

  return (
    <DeleteWrapper>
      <Item name="뒤로가기" onClick={onClickBack}>
        <CgBackspace />
      </Item>
      <Item name="삭제하기" onClick={onClickDelete}>
        <HiOutlineDocumentRemove />
      </Item>
      <TagWrapper>
        <Item name="전체선택" onClick={onClickAll}>
          <MdRadioButtonChecked />
        </Item>
      </TagWrapper>

      <TagWrapper>
        <Item name="전체해제" onClick={onUnClickAll}>
          <MdRadioButtonUnchecked />
        </Item>
      </TagWrapper>
    </DeleteWrapper>
  );
};

const EditModeItems = () => {
  const setMode = useMode().setMode;

  const onClickBack = () => setMode(constants.NORMAL);

  return (
    <EditWrapper>
      <Item name="뒤로가기" onClick={onClickBack}>
        <CgBackspace />
      </Item>
    </EditWrapper>
  );
};

// 폴더 맨 처음 탭
const FolderModeItems = () => {
  const setMode = useMode().setMode;
  const setModalMode = useMode().setModalMode;

  const onClickBack = () => setMode(constants.NORMAL);
  const onClickAddFolder = () => setModalMode(constants.FOLDER_ADD);
  const onClickDeleteFolder = () => setMode(constants.FOLDER_DELETE);
  const onClickEdit = () => setMode(constants.FOLDER_EDIT);

  return (
    <TapsWrapper>
      <Item name="뒤로가기" onClick={onClickBack}>
        <CgBackspace />
      </Item>
      <Item name="추가하기" onClick={onClickAddFolder}>
        <HiOutlineFolderAdd />
      </Item>
      <Item name="삭제하기" onClick={onClickDeleteFolder}>
        <HiOutlineFolderRemove />
      </Item>
      <Item name="수정하기" onClick={onClickEdit}>
        <CgEditBlackPoint />
      </Item>
    </TapsWrapper>
  );
};

// 폴더 수정 탭
const FolderEditModeItems = () => {
  const setMode = useMode().setMode;

  const onClickBack = () => setMode(constants.FOLDER);

  return (
    <EditWrapper>
      <Item name="뒤로가기" onClick={onClickBack}>
        <CgBackspace />
      </Item>
    </EditWrapper>
  );
};

//폴더 삭제 탭

const FolderDeleteModeItems = () => {
  const setMode = useMode().setMode;
  const filterdFolders = useFolder().filterdFolders;
  const handleAddDeleteFolderList = useFolder().handleAddDeleteFolderList;
  const handleResetDeleteFolder = useFolder().handleResetDeleteFolder;
  const handleOnClickDeleteBtn = useFolder().handleOnClickDeleteBtn;
  const deleteFolders = useFolder().deleteFolders;

  const folders = useSelector(getFolders);
  const handleAlertTrigger = useModal().handleAlertTrigger;

  const onClickBack = () => setMode(constants.FOLDER);
  const onClickAll = () => {
    // 이쪽은 폴더 검색 기능 만든다음에 해야할 듯
    // 검색 하나라도 했을 때만 실행
    filterdFolders.length !== 0 && handleAddDeleteFolderList(filterdFolders);
    // 검색도 안하고 태그도 클릭 안했을 때
    filterdFolders.length === 0 && handleAddDeleteFolderList(folders);
  };
  const onUnClickAll = () => handleResetDeleteFolder();

  const onClickDelete = () => {
    const fn = () => {
      // 토스트 모달
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const deleteData = async () => await handleOnClickDeleteBtn();

      const myPromise = deleteData();
      toast.promise(myPromise, {
        loading: "삭제중입니다",
        success: "삭제가 완료되었습니다!",
        error: "삭제가 정상적으로 이루어지지 않았습니다",
      });
      //  삭제 함수 넣기
    };
    deleteFolders.length === 0 && toast.error("삭제할 폴더를 선택해주세요");
    if (deleteFolders.length === 0) return;
    handleAlertTrigger(fn, "삭제하시겠습니까?");
  };

  return (
    <DeleteWrapper>
      <Item name="뒤로가기" onClick={onClickBack}>
        <CgBackspace />
      </Item>
      <Item name="삭제하기" onClick={onClickDelete}>
        <HiOutlineDocumentRemove />
      </Item>
      <TagWrapper>
        <Item name="전체선택" onClick={onClickAll}>
          <MdRadioButtonChecked />
        </Item>
      </TagWrapper>

      <TagWrapper>
        <Item name="전체해제" onClick={onUnClickAll}>
          <MdRadioButtonUnchecked />
        </Item>
      </TagWrapper>
    </DeleteWrapper>
  );
};

// 폴더 클릭 후 북마크 탭

const FolderEditUrlModeItems = () => {
  const dispatch = useDispatch();
  const setMode = useMode().setMode;
  const setModalMode = useMode().setModalMode;

  const handleAddFolderEditUrlList = useFolder().handleAddFolderEditUrlList;
  const handleResetFolderEditUrl = useFolder().handleResetFolderEditUrl;
  const filterdUrls = useUrl().url.filterdUrls;
  const totalUrls = useUrl().url.totalUrls;
  const currentFolder = useFolder().currentFolder;
  const handleAlertTrigger = useModal().handleAlertTrigger;
  const handleOnClickSaveFolderEditUrl =
    useFolder().handleOnClickSaveFolderEditUrl;

  // console.log(currentFolder);

  const onClickBack = () => setMode(constants.FOLDER);
  const onClickEdit = async () => {
    const fn = () => {
      const fetchData = async () => {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        await handleOnClickSaveFolderEditUrl();
      };

      const myPromise = fetchData();
      toast.promise(myPromise, {
        loading: "수정중입니다",
        success: "수정이 완료되었습니다!",
        error: "수정이 정상적으로 이루어지지 않았습니다",
      });
    };
    handleAlertTrigger(fn, "수정하시겠습니까?");
  };
  const onClickAll = () => {
    // console.log(filterdUrls);
    // 검색 하나라도 했을 때만 실행
    filterdUrls.length !== 0 && handleAddFolderEditUrlList(filterdUrls);
    // 검색도 안하고 태그도 클릭 안했을 때
    filterdUrls.length === 0 && handleAddFolderEditUrlList(totalUrls);
  };
  const onUnClickAll = () => handleResetFolderEditUrl();

  const onClickShare = () => setModalMode(constants.SHARE);
  return (
    <TapsWrapper>
      <Item name="뒤로가기" onClick={onClickBack}>
        <CgBackspace />
      </Item>
      <Item name="수정하기" onClick={onClickEdit}>
        <CgEditBlackPoint />
      </Item>
      <TagWrapper>
        <Item name="전체선택" onClick={onClickAll}>
          <MdRadioButtonChecked />
        </Item>
      </TagWrapper>
      <TagWrapper>
        <Item name="전체해제" onClick={onUnClickAll}>
          <MdRadioButtonUnchecked />
        </Item>
      </TagWrapper>
      <TagWrapper>
        <Item name="공유하기" onClick={onClickShare}>
          <RiShareBoxFill />
        </Item>
      </TagWrapper>
    </TapsWrapper>
  );
};
