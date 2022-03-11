import { throttle } from "lodash";
import React from "react";
import { useState } from "react";
import { useRef } from "react";

import styled from "styled-components";
import { useUrl } from "../../contexts/UrlContext";
import Loader from "../Utils/Loader/Loader";
import ItemContainer from "./ItemContainer";
import Marker from "./Marker";
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
      transform: translate(-60%, 0px);
      opacity: 0.3;
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 450px;
  height: 100%;
  min-height: 100%;

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
  @media screen and (max-width: 1018px) {
    max-width: 100vw;
    padding-right: 0;
    width: 100%;
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

  @media screen and (max-width: 1018px) {
    width: 90%;
    height: max-content;
    max-height: max-content;
  }
`;
const RightBox = () => {
  // const totalUrls = useUrl().url.totalUrls;
  const likedUrls = useUrl().url.likedUrls;
  const searchedUrls = useUrl().url.searchedUrls;
  const [isScroll, setIsScroll] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const loading = useUrl().loading;
  const scrollRef = useRef(null);
  const throttled = useRef(
    throttle((newValue, scrollTop) => {
      setScrollTop(newValue);
      // TODO: 이거 저장 현재 퍼센트 매우매우 중요
      // const scrollPercent = newValue / (totalUrls.length * 50);
      const diff = newValue - scrollTop; //음수면 위로 양수면 아래로
      // console.log("diff: ", diff);
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
  // console.log(totalUrls.length);
  const isLikeUrls = true;
  return (
    <RightBoxEl>
      <TitleWrapper>
        <Title>즐겨찾기</Title>
      </TitleWrapper>
      <FlexContainer onScroll={onScroll} ref={scrollRef}>
        {!isLikeUrls && <ItemContainer urls={searchedUrls} />}
        {isLikeUrls && <ItemContainer urls={likedUrls} />}
        {loading.isLikedUrl && <Loader />}
        <Marker isScroll={isScroll} onClick={handleScrollUp} />
      </FlexContainer>
    </RightBoxEl>
  );
};

export default RightBox;
