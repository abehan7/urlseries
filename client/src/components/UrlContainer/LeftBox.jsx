import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ItemConatiner } from "./styled/ItemContainer";
import { useUrl } from "../../contexts/UrlContext";
import { Title } from "./styled/Title.styled";
import { TitleWrapper } from "./styled/TitleWrapper.styled";
import Indicator from "./Indicator";
import Marker from "./Marker";
import { debounce, throttle } from "lodash";
import Loader from "../Utils/Loader/Loader";
import ItemContainer from "./ItemContainer";
import SearchBar from "../SearchBar/SearchBar";
import { KeywordNormalize, SearchNotByDB } from "../Utils/Search";
import { useEffect } from "react";

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

const debounceFn = debounce((fn, keyword) => fn(keyword), 400);

const LeftBox = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef(null);
  const totalUrls = useUrl().url.totalUrls;
  const [keyword, setKeyword] = useState("");
  const [filterdUrls, setFilterdUrls] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  // const [option]

  const _getFilterdUrls = (keyword) => {
    const pKeyword = KeywordNormalize(keyword);
    const filterd = SearchNotByDB(pKeyword, totalUrls);
    setFilterdUrls(filterd);
    setIsSearchLoading(false);
  };

  const onChange = async (e) => {
    debounceFn.cancel();
    setIsSearchLoading(true);
    const _keyword = e.target.value;
    setKeyword(_keyword);
    e.target.value.length > 0 && (await debounceFn(_getFilterdUrls, _keyword));
  };

  useEffect(() => setFilterdUrls([]), [keyword]);
  useEffect(
    () => console.log("isSearchLoading: ", isSearchLoading),
    [isSearchLoading]
  );

  const throttled = useRef(
    throttle((newValue, scrollTop) => {
      setScrollTop(newValue);
      // TODO: 이거 저장 현재 퍼센트 매우매우 중요
      // const scrollPercent = newValue / (totalUrls.length * 50);
      const diff = newValue - scrollTop; //음수면 위로 양수면 아래로
      diff > 0 ? setIsScroll(true) : setIsScroll(false);
    }, 500)
  );

  const onScroll = (e) => throttled.current(e.target.scrollTop, scrollTop);

  const handleScrollUp = () => {
    const option = { top: 0, left: 0, behavior: "smooth" };
    scrollRef.current.scrollTo(option);
  };

  const isTagClicked = false;
  const isSearch = keyword.length > 0;
  return (
    <LeftBoxEl>
      <TitleWrapper>
        {!isTagClicked && !isSearch && <Title>전체 북마크</Title>}
        {isTagClicked && <Title>태그</Title>}
        {isSearch && <Title>검색</Title>}
        <SearchBar onChange={onChange} keyword={keyword} />
      </TitleWrapper>
      <Indicator />
      <FlexContainer onScroll={onScroll} ref={scrollRef}>
        {/* 전체url */}
        {!isTagClicked && !isSearch && <ItemContainer urls={totalUrls} />}
        {/* 태그별 url */}
        {isTagClicked && <ItemContainer urls={filterdUrls} />}
        {/* 검색 url */}
        {isSearch && <ItemContainer urls={filterdUrls} />}
        {/* url 검색중 */}
        {isSearchLoading && <Loader />}
        {/* url없을때 component만들기*/}

        {/* 맨 처음 로딩 */}
        {totalUrls.length === 0 && <Loader />}
        <Marker isScroll={isScroll} onClick={handleScrollUp} />
      </FlexContainer>
    </LeftBoxEl>
  );
};

export default LeftBox;
