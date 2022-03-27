import React from "react";
import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";
import ItemContainer from "../UrlContainer/ItemContainer";
import { LeftBoxEl, FlexContainer } from "../UrlContainer/LeftBox";
import { getSearchHistoryUrls } from "../../indexedDb";
import { KeywordNormalize, SearchUrlHistoryNotByDB } from "../Utils/Search";
import { debounce, throttle } from "lodash";
import { Title } from "../UrlContainer/styled/Title.styled";
import { TitleWrapper } from "../UrlContainer/styled/TitleWrapper.styled";
import { useCallback } from "react";
import LoadingCenter from "../Utils/Loader/LoaderCenter";
import { useEffect } from "react";
import NoUrl from "../UrlContainer/NoUrl";
import Marker from "../UrlContainer/Marker";
import { useRef } from "react";

const FlexContainerEl = styled(FlexContainer)`
  height: calc(100% - 130px);
  max-height: calc(100% - 130px);
`;
const debounceFn = debounce((fn, keyword) => fn(keyword), 400);
const LeftBox = () => {
  const [keyword, setKeyword] = useState("");
  const [filterdUrls, setFilterdUrls] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [historySearchedUrls, setHistorySearchedUrls] = useState([]);
  const [isScroll, setIsScroll] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef(null);

  // console.log("searchedUrls:", historySearchedUrls);
  const isSearch = keyword.length > 0;
  const _getFilterdUrls = useCallback(
    (keyword) => {
      const pKeyword = KeywordNormalize(keyword);
      const filterd = SearchUrlHistoryNotByDB(pKeyword, historySearchedUrls);
      setFilterdUrls(filterd);

      setIsSearchLoading(false);
    },
    [historySearchedUrls]
  );

  const onChange = async (e) => {
    debounceFn.cancel();
    setIsSearchLoading(true);
    const _keyword = e.target.value;
    setKeyword(_keyword);
    e.target.value.length > 0 && (await debounceFn(_getFilterdUrls, _keyword));
  };

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

  useEffect(() => setFilterdUrls([]), [keyword]);

  useEffect(() => getSearchHistoryUrls(setHistorySearchedUrls), []);

  //FIXME: DOM MAPPING
  //전체 북마크
  const TotalUrlMap = () =>
    !isSearch && <ItemContainer urls={historySearchedUrls} />;
  //검색 북마크
  const SearchUrlMap = () => isSearch && <ItemContainer urls={filterdUrls} />;
  //검색중일 때 로딩창
  const SearchLoader = () => isSearch && isSearchLoading && <LoadingCenter />;

  //검색창에 북마크 없을 때
  const SearchNoUrl = () =>
    isSearch && !isSearchLoading && filterdUrls.length === 0 && <NoUrl />;
  return (
    <LeftBoxEl>
      <TitleWrapper>
        <Title>최근 방문한 사이트</Title>
        <SearchBar onChange={onChange} keyword={keyword} />
      </TitleWrapper>
      <FlexContainerEl onScroll={onScroll} ref={scrollRef}>
        {TotalUrlMap()}
        {SearchUrlMap()}
        {SearchLoader()}
        {SearchNoUrl()}
        <Marker isScroll={isScroll} onClick={handleScrollUp} />
      </FlexContainerEl>
    </LeftBoxEl>
  );
};

export default LeftBox;
