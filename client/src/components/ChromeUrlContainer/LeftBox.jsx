import React from "react";
import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";
import ItemContainer from "../UrlContainer/ItemContainer";
import { LeftBoxEl, FlexContainer } from "../UrlContainer/LeftBox";
import { getgetChromeBookmark, getSearchHistoryUrls } from "../../IndexedDb";
import { KeywordNormalize, SearchUrlHistoryNotByDB } from "../Utils/Search";
import { debounce } from "lodash";
import { Title } from "../UrlContainer/styled/Title.styled";
import { TitleWrapper } from "../UrlContainer/styled/TitleWrapper.styled";
import { useCallback } from "react";
import LoadingCenter from "../Utils/Loader/LoaderCenter";
import { useEffect } from "react";
import NoUrl from "../UrlContainer/NoUrl";
import Marker from "../UrlContainer/Marker";
import { useRef } from "react";
import { GetScrollUpMarker } from "../Utils/Scroll/GetThrottled";
import ChromeInstall from "./ChromeInstall";
import { useLocalStorage } from "../../LocalStorage/index";
const FlexContainerEl = styled(FlexContainer)`
  height: calc(100% - 130px);
  max-height: calc(100% - 130px);
`;
const debounceFn = debounce((fn, keyword) => fn(keyword), 400);
const LeftBox = () => {
  const [keyword, setKeyword] = useState("");
  const [filterdUrls, setFilterdUrls] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  // const [getSearchHistory, setgetSearchHistory] = useState([]);
  // const [getChromeBookmark, setgetChromeBookmark] = useState([]);
  const [isScroll, setIsScroll] = useState(false);
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { onScroll, handleScrollUp } = GetScrollUpMarker({
    setIsScroll,
    scrollRef,
  });

  const { getChromeBookmark, getSearchHistory, getBookmark } =
    useLocalStorage();

  // console.log("searchedUrls:", getSearchHistory);
  const isSearch = keyword.length > 0;
  const _getFilterdUrls = useCallback(
    (keyword) => {
      const pKeyword = KeywordNormalize(keyword);
      const filterd = SearchUrlHistoryNotByDB(pKeyword, [
        ...getSearchHistory,
        ...getChromeBookmark,
      ]);
      setFilterdUrls(filterd);
      setIsSearchLoading(false);
    },
    [getSearchHistory, getChromeBookmark]
  );

  const onChange = async (e) => {
    debounceFn.cancel();
    setIsSearchLoading(true);
    const _keyword = e.target.value;
    setKeyword(_keyword);
    e.target.value.length > 0 && (await debounceFn(_getFilterdUrls, _keyword));
  };

  useEffect(() => setFilterdUrls([]), [keyword]);

  useEffect(() => {
    // getSearchHistoryUrls(setgetSearchHistory);
    // getgetChromeBookmark(setgetChromeBookmark);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  });

  //FIXME: DOM MAPPING
  //전체 북마크
  const TotalUrlMap = () =>
    !loading &&
    !isSearch && (
      <ItemContainer urls={getSearchHistory} urlType="chrome-extension" />
    );
  //검색 북마크
  const SearchUrlMap = () =>
    !loading &&
    isSearch && <ItemContainer urls={filterdUrls} urlType="chrome-extension" />;
  //검색중일 때 로딩창
  const SearchLoader = () => isSearch && isSearchLoading && <LoadingCenter />;

  //검색창에 북마크 없을 때
  const SearchNoUrl = () =>
    isSearch && !isSearchLoading && filterdUrls.length === 0 && <NoUrl />;

  //검색창에 북마크 없을 때
  const TotalNoUrl = () =>
    !loading &&
    !isSearch &&
    !isSearchLoading &&
    getSearchHistory.length === 0 && <ChromeInstall />;
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
        {TotalNoUrl()}
        {/* 로딩창 */}
        {loading && <LoadingCenter />}
        <Marker isScroll={isScroll} onClick={handleScrollUp} />
      </FlexContainerEl>
    </LeftBoxEl>
  );
};

export default LeftBox;
