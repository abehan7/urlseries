import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ItemConatiner } from "./styled/ItemContainer";
import { useUrl } from "../../contexts/UrlContext";
import Url from "./Url";
import { Title } from "./styled/Title.styled";
import { TitleWrapper } from "./styled/TitleWrapper.styled";
import Indicator from "./Indicator";
import Marker from "./Marker";
import { throttle } from "lodash";
import { IoSearchCircleOutline } from "react-icons/io5";
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

const SearchBox = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  margin-right: 2%;
  margin-top: 1%;
`;

const BtnSearch = styled.button`
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: #ffffff;
  background-color: transparent;
  pointer-events: painted;
  :focus ~ input {
    color: #535151;

    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(78, 76, 76, 0.5);
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  }
`;

const InputSearch = styled.input`
  height: 35px;
  width: 35px;
  border: none;
  /* border-radius: 50px; */
  /* padding: 5px; */
  font-size: 15px;
  /* letter-spacing: 2px; */
  outline: none;
  border-radius: 50%;
  transition: all 0.5s ease-in-out;
  background-color: transparent;
  padding-right: 20px;
  color: transparent;
  margin-right: 5px;
  margin-top: 3.5px;

  :focus {
    width: 300px;
    color: #535151;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(114, 114, 114, 0.5);
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
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

  return (
    <LeftBoxEl>
      <TitleWrapper>
        <Title>전체 북마크</Title>
        <SearchBox>
          <BtnSearch>
            <IoSearchCircleOutline size="35px" color="gray" />
          </BtnSearch>
          <InputSearch type="text"></InputSearch>
        </SearchBox>
      </TitleWrapper>
      <Indicator />
      <FlexContainer onScroll={onScroll} ref={scrollRef}>
        {totalUrls.slice(0, 100).map((url, index) => (
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
    </LeftBoxEl>
  );
};

export default LeftBox;
