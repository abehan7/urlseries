import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ItemConatiner } from "./styled/ItemContainer";
import { useUrl } from "../../contexts/UrlContext";
import { Title } from "./styled/Title.styled";
import { TitleWrapper } from "./styled/TitleWrapper.styled";
import Indicator from "./Indicator";
import Marker from "./Marker";
import { throttle } from "lodash";
import Loader from "../Utils/Loader/Loader";
import ItemContainer from "./ItemContainer";
import SearchBar from "../SearchBar/SearchBar";
import { IoSearchCircleOutline } from "react-icons/io5";

const TitleWrapperEl = styled(TitleWrapper)`
  justify-content: flex-start;
`;

const TitleEl = styled(Title)`
  /* flex: 0; */

  width: 100px;
`;
const LeftBoxEl = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FlexContainer = styled(ItemConatiner)`
  position: relative;

  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* gap: 1.3rem; */
  gap: 1rem;
  height: calc(100% - 130px - 1rem - 30px);
  max-height: calc(100% - 130px - 1rem - 30px);
  width: 90%;
  background-color: #f7f8fa;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  overflow-y: scroll;

  scrollbar-width: 0;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const LeftBox = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef(null);
  const totalUrls = useUrl().url.totalUrls;

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

  const isTagClicked = false;
  return (
    <LeftBoxEl>
      <TitleWrapper>
        <Title>전체 북마크</Title>
        <SearchBar />
      </TitleWrapper>
      <Indicator />
      <FlexContainer onScroll={onScroll} ref={scrollRef}>
        {!isTagClicked && <ItemContainer urls={totalUrls} />}
        {isTagClicked && <ItemContainer urls={totalUrls} />}
        {totalUrls.length === 0 && <Loader />}
        <Marker isScroll={isScroll} onClick={handleScrollUp} />
      </FlexContainer>
    </LeftBoxEl>
  );
};

export default LeftBox;
