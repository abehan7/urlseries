import { throttle } from "lodash";
import React from "react";
import { useState } from "react";
import { useRef } from "react";

import styled from "styled-components";
import { useUrl } from "../../contexts/UrlContext";
import Marker from "./Marker";
import { ItemConatiner } from "./styled/ItemContainer";
import { Title } from "./styled/Title.styled";
import { TitleWrapper } from "./styled/TitleWrapper.styled";
import Url from "./Url";
const RightBoxEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  padding-right: 1rem;
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
const RightBox = () => {
  const totalUrls = useUrl().url.totalUrls;
  const [isScroll, setIsScroll] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef(null);
  const throttled = useRef(
    throttle((newValue, scrollTop) => {
      setScrollTop(newValue);
      // TODO: 이거 저장 현재 퍼센트 매우매우 중요
      // const scrollPercent = newValue / (totalUrls.length * 50);
      const diff = newValue - scrollTop; //음수면 위로 양수면 아래로
      console.log("diff: ", diff);
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
  return (
    <RightBoxEl>
      <TitleWrapper>
        <Title>즐겨찾기</Title>
      </TitleWrapper>
      <FlexContainer onScroll={onScroll} ref={scrollRef}>
        {totalUrls.slice(0, 14).map((url, index) => (
          <Url
            url={url.url}
            title={url.url_title}
            key={url._id}
            id={url._id}
            index={index}
            totalUrlNum={totalUrls.length}
          />
        ))}
        <Marker isScroll={isScroll} onClick={handleScrollUp} />
      </FlexContainer>
    </RightBoxEl>
  );
};

export default RightBox;
