import { throttle } from "lodash";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { media } from "../../assets/Themes";
import { useFolder } from "../../contexts/FolderContext";
import { constants, useMode } from "../../contexts/ModeContext";
import { useUrl } from "../../contexts/UrlContext";
import { getToken } from "../../redux/ReducersT/tokenReducer";
import { getFolders } from "../../store/reducers/Folders";
import FolderItemContainer from "../Folder/FolderItemContainer";
import NoFolder from "../Folder/NoFolder";
import Loader from "../Utils/Loader/Loader";
import LoadingCenter from "../Utils/Loader/LoaderCenter";
import GuestItemContainer from "./GuestItemContainer";
import ItemContainer from "./ItemContainer";
import Marker from "./Marker";
import NoUrl from "./NoUrl";
import { ItemConatiner } from "./styled/ItemContainer";
import { Title } from "./styled/Title.styled";
import { TitleWrapper } from "./styled/TitleWrapper.styled";

export const RightBoxEl = styled.div`
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

  ${media[768]} {
    display: none;
  }

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
export const FlexContainer = styled(ItemConatiner)`
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
      // TODO: ?????? ?????? ?????? ????????? ???????????? ??????
      // const scrollPercent = newValue / (totalUrls.length * 50);
      const diff = newValue - scrollTop; //????????? ?????? ????????? ?????????
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
  // ????????? ?????????
  const LikeTitle = () =>
    normalModeListLocal.includes(mode) && <Title>????????????</Title>;

  //????????? ????????? ?????????
  const DeleteTitle = () =>
    mode === constants.DELETE && (
      <Title style={{ color: "tomato" }}>????????? ????????? ??????</Title>
    );

  // ?????? ????????? ?????????
  const FolderTitle = () =>
    FolderItemWhiteList.includes(mode) && <Title>???????????? ??????</Title>;

  const FolderDeleteTitle = () =>
    constants.FOLDER_DELETE === mode && (
      <Title style={{ color: "tomato" }}>????????? ?????? ??????</Title>
    );

  //?????? ?????? ??? ?????????
  const FolderEditUrlTitle = () =>
    mode === constants.FOLDER_EDIT_URL && <Title>?????? ?????????</Title>;

  // ???????????? ????????? MAPPING
  const NormalMapping = () =>
    normalModeListLocal.includes(mode) && (
      <NormalMode
        isLikeUrls={isLikeUrls}
        loading={loading}
        isScroll={isScroll}
        handleScrollUp={handleScrollUp}
      />
    );

  //??????????????? ??? MAPPING
  const DeleteMapping = () =>
    mode === constants.DELETE && (
      <DeleteMode isScroll={isScroll} handleScrollUp={handleScrollUp} />
    );

  // ??????????????? ??? MAPPING

  const FolderMapping = () =>
    FolderItemWhiteList.includes(mode) && (
      <FolderMode isScroll={isScroll} handleScrollUp={handleScrollUp} />
    );

  const FolderDeleteMapping = () =>
    mode === constants.FOLDER_DELETE && (
      <FolderDeleteMode isScroll={isScroll} handleScrollUp={handleScrollUp} />
    );

  // ?????? ?????? ??? ????????? ?????? MAPPING

  const FolderEditUrlMapping = () =>
    mode === constants.FOLDER_EDIT_URL && (
      <FolderEditUrlMode isScroll={isScroll} handleScrollUp={handleScrollUp} />
    );

  return (
    <RightBoxEl>
      <TitleWrapper>
        {/* ????????? ????????? */}
        {LikeTitle()}
        {/* ?????? ????????? */}
        {DeleteTitle()}
        {/* ?????? ????????? */}
        {FolderTitle()}
        {/* ?????? ?????? ?????? */}
        {FolderDeleteTitle()}
        {/* ?????? ?????? ??? ????????? */}
        {FolderEditUrlTitle()}
      </TitleWrapper>
      <FlexContainer onScroll={onScroll} ref={scrollRef}>
        {/* ???????????? ?????? ??? ?????? */}
        {NormalMapping()}
        {/* ??????????????? ??? ?????? */}
        {DeleteMapping()}
        {/* ??????????????? ??? ?????? */}
        {FolderMapping()}
        {/* ?????? ??????????????? ??? ?????? */}
        {FolderDeleteMapping()}
        {/* ?????? ?????? ??? ?????? ?????? ?????? url ?????? */}
        {FolderEditUrlMapping()}
      </FlexContainer>
    </RightBoxEl>
  );
};

export default RightBox;

const NormalMode = ({ isLikeUrls, loading, isScroll, handleScrollUp }) => {
  const likedUrls = useUrl().url.likedUrls;
  // const searchedUrls = useUrl().url.searchedUrls;
  const token = useSelector(getToken);
  // ????????? ????????? ???
  const Guest = () =>
    !token && <GuestItemContainer>????????? ??? ??????????????????</GuestItemContainer>;

  // ?????? ?????? ?????? ????????? ?????? ???
  const NoUrlAfterFirstLoading = () =>
    token && !loading.isLikedUrl && likedUrls.length === 0 && <NoUrl />;
  return (
    <>
      {/* {!isLikeUrls && <ItemContainer urls={searchedUrls} />} */}
      {isLikeUrls && <ItemContainer urls={likedUrls} />}
      {token && loading.isLikedUrl && <LoadingCenter />}
      {/* ?????? ?????? ??? */}
      {Guest()}
      {/* ?????? ?????? ?????? ????????? ?????? ??? */}
      {NoUrlAfterFirstLoading()}
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
      {/* ????????? */}
      {loading && <LoadingCenter />}
      {/* ?????? */}
      {!loading && <ItemContainer urls={deleteUrls} />}
      {/* ????????? ?????? ??? */}
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
      {/* ????????? */}
      {loading && <LoadingCenter />}
      {/* ?????? ?????? ??? */}
      {!loading && likedFolders.length === 0 && <NoFolder />}
      {/* ?????? ?????? ??? */}
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
      {/* ????????? */}
      {loading && <LoadingCenter />}
      {/* ????????? ?????? ??? */}
      {!loading && folders.length === 0 && <NoFolder />}
      {/* ????????? ?????? ??? */}
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
      {/* ????????? */}
      {loading && <LoadingCenter />}
      {/* ?????? */}
      {!loading && <ItemContainer urls={folderContents} />}
      {/* ????????? ?????? ??? */}
      {!loading && folderContents.length === 0 && <NoUrl />}
      <Marker isScroll={isScroll} onClick={handleScrollUp} />
    </>
  );
};
