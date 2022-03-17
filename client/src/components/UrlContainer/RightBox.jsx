import { throttle } from "lodash";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { useFolder } from "../../contexts/FolderContext";
import { constants, useMode } from "../../contexts/ModeContext";
import { useUrl } from "../../contexts/UrlContext";
import { getFolders } from "../../store/reducers/Folders";
import FolderItemContainer from "../Folder/FolderItemContainer";
import NoFolder from "../Folder/NoFolder";
import Loader from "../Utils/Loader/Loader";
import LoadingCenter from "../Utils/Loader/LoaderCenter";
import ItemContainer from "./ItemContainer";
import Marker from "./Marker";
import NoUrl from "./NoUrl";
import { ItemConatiner } from "./styled/ItemContainer";
import { Title } from "./styled/Title.styled";
import { TitleWrapper } from "./styled/TitleWrapper.styled";

const RightBoxEl = styled.div`
  @keyframes urlIn {
    from {
      transform: translateX(-50%);
      opacity: 0.3;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }

  @keyframes urlOut {
    from {
      transform: translate(0%, 0%);
      opacity: 1;
    }
    to {
      transform: translate(-100%, 0px);
      opacity: 0.1;
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 450px;

  flex-direction: column;
  padding-right: 1rem;
  .newItem {
    animation: urlIn 0.3s ease-in-out;
    animation-fill-mode: forwards;
  }
  .removeItem {
    animation: urlOut 0.2s ease-in-out;
    animation-fill-mode: forwards;
  }
`;
const FlexContainer = styled(ItemConatiner)`
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  height: calc(100% - 130px);
  max-height: calc(100% - 130px);
  width: 80%;
  background-color: #f7f8fa;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  overflow-y: scroll;
  overflow-x: hidden;

  scrollbar-width: 0;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const normalModeListLocal = [
  constants.ADD,
  constants.NORMAL,
  constants.HASHTAG,
  constants.EDIT,
  constants.EDIT_MODAL_UP,
];

const FolderItemWhiteList = [
  constants.FOLDER,
  constants.FOLDER_ADD,
  constants.FOLDER_EDIT,
  constants.FOLDER_EDIT_MODAL_UP,
];

const RightBox = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const loading = useUrl().loading;
  const mode = useMode().mode;
  const scrollRef = useRef(null);
  const throttled = useRef(
    throttle((newValue, scrollTop) => {
      setScrollTop(newValue);
      // TODO: 이거 저장 현재 퍼센트 매우매우 중요
      // const scrollPercent = newValue / (totalUrls.length * 50);
      const diff = newValue - scrollTop; //음수면 위로 양수면 아래로
      diff > 0 ? setIsScroll(true) : setIsScroll(false);
    }, 500)
  );

  const onScroll = (e) => {
    throttled.current(e.target.scrollTop, scrollTop);
  };

  const handleScrollUp = () => {
    const option = { top: 0, left: 0, behavior: "smooth" };
    scrollRef.current.scrollTo(option);
  };
  const isLikeUrls = true;

  //FIXME: DOM
  // 좋아요 타이틀
  const LikeTitle = () =>
    normalModeListLocal.includes(mode) && <Title>즐겨찾기</Title>;

  //삭제할 북마크 타이틀
  const DeleteTitle = () =>
    mode === constants.DELETE && (
      <Title style={{ color: "tomato" }}>삭제할 북마크 목록</Title>
    );

  // 폴더 엔트리 타이틀
  const FolderTitle = () =>
    FolderItemWhiteList.includes(mode) && <Title>즐겨찾기 폴더</Title>;

  const FolderDeleteTitle = () =>
    constants.FOLDER_DELETE === mode && (
      <Title style={{ color: "tomato" }}>삭제할 폴더 목록</Title>
    );

  //폴더 클릭 후 타이틀
  const FolderEditUrlTitle = () =>
    mode === constants.FOLDER_EDIT_URL && <Title>폴더 북마크</Title>;

  // 삭제모드 아닐때 MAPPING
  const NormalMapping = () =>
    normalModeListLocal.includes(mode) && (
      <NormalMode
        isLikeUrls={isLikeUrls}
        loading={loading}
        isScroll={isScroll}
        handleScrollUp={handleScrollUp}
      />
    );

  //삭제모드일 때 MAPPING
  const DeleteMapping = () =>
    mode === constants.DELETE && (
      <DeleteMode isScroll={isScroll} handleScrollUp={handleScrollUp} />
    );

  // 폴더모드일 때 MAPPING

  const FolderMapping = () =>
    FolderItemWhiteList.includes(mode) && (
      <FolderMode isScroll={isScroll} handleScrollUp={handleScrollUp} />
    );

  const FolderDeleteMapping = () =>
    mode === constants.FOLDER_DELETE && (
      <FolderDeleteMode isScroll={isScroll} handleScrollUp={handleScrollUp} />
    );

  // 폴더 클릭 후 북마크 일때 MAPPING

  const FolderEditUrlMapping = () =>
    mode === constants.FOLDER_EDIT_URL && (
      <FolderEditUrlMode isScroll={isScroll} handleScrollUp={handleScrollUp} />
    );

  return (
    <RightBoxEl>
      <TitleWrapper>
        {/* 좋아요 타이틀 */}
        {LikeTitle()}
        {/* 삭제 타이틀 */}
        {DeleteTitle()}
        {/* 폴더 타이틀 */}
        {FolderTitle()}
        {/* 폴더 삭제 목록 */}
        {FolderDeleteTitle()}
        {/* 폴더 클릭 후 타이틀 */}
        {FolderEditUrlTitle()}
      </TitleWrapper>
      <FlexContainer onScroll={onScroll} ref={scrollRef}>
        {/* 삭제모드 아닐 때 매핑 */}
        {NormalMapping()}
        {/* 삭제모드일 때 매핑 */}
        {DeleteMapping()}
        {/* 폴더모드일 때 매핑 */}
        {FolderMapping()}
        {/* 폴더 삭제모드일 때 매핑 */}
        {FolderDeleteMapping()}
        {/* 폴더 클릭 후 폴더 안에 있는 url 매핑 */}
        {FolderEditUrlMapping()}
      </FlexContainer>
    </RightBoxEl>
  );
};

export default RightBox;

const NormalMode = ({ isLikeUrls, loading, isScroll, handleScrollUp }) => {
  const likedUrls = useUrl().url.likedUrls;
  const searchedUrls = useUrl().url.searchedUrls;
  return (
    <>
      {/* {!isLikeUrls && <ItemContainer urls={searchedUrls} />} */}
      {isLikeUrls && <ItemContainer urls={likedUrls} />}
      {loading.isLikedUrl && <LoadingCenter />}
      <Marker isScroll={isScroll} onClick={handleScrollUp} />
    </>
  );
};

const DeleteMode = ({ isScroll, handleScrollUp }) => {
  const [loading, setLoading] = useState(true);
  const deleteUrls = useUrl().url.deleteUrls;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {/* 로딩창 */}
      {loading && <LoadingCenter />}
      {/* 매핑 */}
      {!loading && <ItemContainer urls={deleteUrls} />}
      {/* 북마크 없을 때 */}
      {!loading && deleteUrls.length === 0 && <NoUrl />}
      <Marker isScroll={isScroll} onClick={handleScrollUp} />
    </>
  );
};

const FolderMode = ({ isScroll, handleScrollUp }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  });

  const folders = useSelector(getFolders);
  const likedFolders = folders.filter((folder) => folder.like);

  return (
    <>
      {/* 로딩창 */}
      {loading && <LoadingCenter />}
      {/* 폴더 없을 때 */}
      {!loading && likedFolders.length === 0 && <NoFolder />}
      {/* 폴더 있을 때 */}
      {!loading && likedFolders.length !== 0 && (
        <FolderItemContainer folders={likedFolders} type="STICK" />
      )}
      <Marker isScroll={isScroll} onClick={handleScrollUp} />
    </>
  );
};

const FolderDeleteMode = ({ isScroll, handleScrollUp }) => {
  const [loading, setLoading] = useState(true);
  const folders = useFolder().deleteFolders;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  });
  return (
    <>
      {/* 로딩창 */}
      {loading && <LoadingCenter />}
      {/* 북마크 없을 때 */}
      {!loading && folders.length === 0 && <NoFolder />}
      {/* 북마크 있을 때 */}
      {!loading && folders.length !== 0 && (
        <FolderItemContainer folders={folders} type="STICK" />
      )}
      <Marker isScroll={isScroll} onClick={handleScrollUp} />
    </>
  );
};

const FolderEditUrlMode = ({ isScroll, handleScrollUp }) => {
  const currentFolder = useFolder().currentFolder;
  // const totalUrls = useUrl().url.totalUrls;

  const folderContents = currentFolder.folder_contents;

  // folder_contents
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  });
  return (
    <>
      {/* 로딩창 */}
      {loading && <LoadingCenter />}
      {/* 매핑 */}
      {!loading && <ItemContainer urls={folderContents} />}
      {/* 북마크 없을 때 */}
      {!loading && folderContents.length === 0 && <NoUrl />}
      <Marker isScroll={isScroll} onClick={handleScrollUp} />
    </>
  );
};
