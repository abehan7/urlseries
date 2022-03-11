import { throttle } from "lodash";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import styled from "styled-components";
import { constants, normalModeList, useMode } from "../../contexts/ModeContext";
import { useUrl } from "../../contexts/UrlContext";
import Loader from "../Utils/Loader/Loader";
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

  return (
    <RightBoxEl>
      <TitleWrapper>
        {normalModeList.includes(mode) && <Title>즐겨찾기</Title>}
        {mode === constants.DELETE && <Title>삭제할 북마크 목록</Title>}
      </TitleWrapper>
      <FlexContainer onScroll={onScroll} ref={scrollRef}>
        {normalModeList.includes(mode) && (
          <NormalMode
            isLikeUrls={isLikeUrls}
            loading={loading}
            isScroll={isScroll}
            handleScrollUp={handleScrollUp}
          />
        )}
        {mode === constants.DELETE && (
          <DeleteMode isScroll={isScroll} handleScrollUp={handleScrollUp} />
        )}
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
      {!isLikeUrls && <ItemContainer urls={searchedUrls} />}
      {isLikeUrls && <ItemContainer urls={likedUrls} />}
      {loading.isLikedUrl && <Loader />}
      <Marker isScroll={isScroll} onClick={handleScrollUp} />
    </>
  );
};

const DeleteMode = ({ isScroll, handleScrollUp }) => {
  const [loading, setLoading] = useState(true);
  const deleteUrls = useUrl().url.deleteUrls;
  const timer = setTimeout(() => {
    setLoading(false);
  }, 300);
  useEffect(() => {
    return () => clearTimeout(timer);
  });

  return (
    <>
      {loading && <LoadingWindow />}
      {!loading && <ItemContainer urls={deleteUrls} />}
      {!loading && deleteUrls.length === 0 && <NoUrl />}
      <Marker isScroll={isScroll} onClick={handleScrollUp} />
    </>
  );
};

const LoadingWindow = () => {
  return (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  );
};
