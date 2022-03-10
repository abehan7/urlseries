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
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsClicked,
  RESET_TAGS,
  SET_CLICKED,
} from "../../store/reducers/Tags";
import { useFolder } from "../../contexts/FolderContext";

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

const SearchTitle = styled(Title)`
  width: 40px;
  cursor: pointer;
  margin-left: 1rem;
  border-radius: 10px;
  padding: 0.5rem;
  transition: all 0.3s ease-in-out;
  position: relative;
  background-color: #a597fe;
  color: #fff;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const TitleContainerEl = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  align-items: center;

  /* justify-content: center; */
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
  const { loading } = useUrl();
  const tagIsClicked = useSelector(getIsClicked);
  const combinedTagItems = useFolder().combinedTagItems.urls;
  const dispatch = useDispatch();
  // const [option]

  const _getFilterdUrls = useCallback(
    (keyword) => {
      const pKeyword = KeywordNormalize(keyword);
      const filterd = SearchNotByDB(pKeyword, totalUrls);
      setFilterdUrls(filterd);
      setIsSearchLoading(false);
    },
    [totalUrls]
  );

  const onChange = useCallback(
    async (e) => {
      debounceFn.cancel();
      setIsSearchLoading(true);
      const _keyword = e.target.value;
      setKeyword(_keyword);
      e.target.value.length > 0 &&
        (await debounceFn(_getFilterdUrls, _keyword));
    },
    [keyword, _getFilterdUrls]
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

  const onScroll = useCallback(
    (e) => throttled.current(e.target.scrollTop, scrollTop),
    [scrollTop]
  );

  const handleScrollUp = useCallback(() => {
    const option = { top: 0, left: 0, behavior: "smooth" };
    scrollRef.current.scrollTo(option);
  }, []);

  const isSearch = keyword.length > 0;

  const onClickSearchTitle = () => setKeyword("");

  // 검색시 setting

  // const handleSetClicked = (boolean) => {
  //   dispatch(SET_CLICKED(boolean));
  // };

  useEffect(() => {
    const fn = () => {
      //태그들 비우기
      tagIsClicked && dispatch(RESET_TAGS());
      setFilterdUrls([]);
    };
    fn();
  }, [keyword]);

  useEffect(
    () => console.log("isSearchLoading: ", isSearchLoading),
    [isSearchLoading]
  );

  useEffect(() => {
    isSearch && _getFilterdUrls(keyword);
  }, [totalUrls]);

  // 태그 하나라도 클릭되면 setting
  // 아 여기서 약간 이벤트가 이상해
  // TODO: 여기 수정하기
  // 검색어 있는 상태에서 태그 누르면 이상하게 풀려
  // 그리고 태그 안나온다
  useEffect(() => {
    const fn = () => {
      // TODO: 애니메이션 넣기
      setFilterdUrls([]);
      // setKeyword("");
      setTimeout(() => {
        setFilterdUrls(combinedTagItems);
      }, [300]);
    };
    keyword.length > 0 && setKeyword("");
    keyword.length === 0 && tagIsClicked && fn();
  }, [tagIsClicked, combinedTagItems]);

  return (
    <LeftBoxEl>
      <TitleWrapper>
        <TitleContainer
          tagIsClicked={tagIsClicked}
          isSearch={isSearch}
          onClickSearchTitle={onClickSearchTitle}
        />
        <SearchBar onChange={onChange} keyword={keyword} />
      </TitleWrapper>
      <Indicator />
      <FlexContainer onScroll={onScroll} ref={scrollRef}>
        {/* 전체url */}
        {!tagIsClicked && !isSearch && <ItemContainer urls={totalUrls} />}
        {/* 태그별 url */}
        {tagIsClicked && <ItemContainer urls={filterdUrls} />}
        {/* 검색 url */}
        {isSearch && <ItemContainer urls={filterdUrls} />}
        {/* url 검색중 */}
        {isSearch && isSearchLoading && <Loader />}
        {/* url없을때 component만들기*/}
        {/* {tagIsClicked && !isSearch && <NoUrl />} */}

        {/* 맨 처음 로딩 */}
        {loading.isTotalUrl && <Loader />}
        <Marker isScroll={isScroll} onClick={handleScrollUp} />
      </FlexContainer>
    </LeftBoxEl>
  );
};

export default LeftBox;

const TitleContainer = ({ tagIsClicked, isSearch, onClickSearchTitle }) => {
  return (
    <TitleContainerEl>
      {!tagIsClicked && !isSearch && <Title>전체 북마크</Title>}
      {tagIsClicked && <Title>태그</Title>}
      {isSearch && (
        <SearchTitle onClick={onClickSearchTitle}>#검색</SearchTitle>
      )}
    </TitleContainerEl>
  );
};
