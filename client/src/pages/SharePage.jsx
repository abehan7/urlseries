import { useState, useCallback } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { debounce, throttle } from "lodash";
import ItemContainer from "../components/UrlContainer/ItemContainer";
import urls from "../data/urls.json";
import SearchBar from "../components/SearchBar/SearchBar";
import { KeywordNormalize, SearchNotByDB } from "../components/Utils/Search";
import NoUrl from "../components/UrlContainer/NoUrl";
import LoadingCenter from "../components/Utils/Loader/LoaderCenter";
import { useEffect } from "react";
import { ItemConatiner } from "../components/UrlContainer/styled/ItemContainer";
import { useRef } from "react";
import Marker from "../components/UrlContainer/Marker";
const SharePageEl = styled.div`
  display: flex;
  width: 100%;
  /* align-items: center; */
  justify-content: center;
  height: calc(100vh - 100px);
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  width: 50%;
  @media (max-width: 800px) {
    width: 90%;
  }
`;
const debounceFn = debounce((fn, keyword) => fn(keyword), 400);

const FlexContainer = styled(ItemConatiner)`
  position: relative;
  animation: ${({ folderBoxAnimeCount }) =>
    folderBoxAnimeCount === 1 ? "fadeIn 0.5s ease-in" : ""};

  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* gap: 1.3rem; */
  gap: 1rem;
  height: calc(100%);
  max-height: calc(100%);
  width: 90%;
  background-color: #f7f8fa;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  overflow-y: scroll;
  overflow-x: hidden;

  scrollbar-width: 0;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  flex: 1;
  padding-left: 2rem;
  color: gray;
`;

const SharePage = () => {
  const { folder_id } = useParams();
  const [keyword, setKeyword] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [filterdUrls, setFilterdUrls] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const scrollRef = useRef(null);

  const folderUrls = urls;

  const isSearch = keyword.length > 0;
  //   const onChange = (e) => setKeyword(e.target.value);
  const _getFilterdUrls = useCallback(
    (keyword) => {
      const pKeyword = KeywordNormalize(keyword);
      const filterd = SearchNotByDB(pKeyword, folderUrls);
      setFilterdUrls(filterd);
      setIsSearchLoading(false);
    },
    [folderUrls, filterdUrls]
  );
  const onChange = async (e) => {
    debounceFn.cancel();
    setIsSearchLoading(true);
    const _keyword = e.target.value;
    setKeyword(_keyword);
    e.target.value.length > 0 && (await debounceFn(_getFilterdUrls, _keyword));
  };

  const handleScrollUp = useCallback(() => {
    const option = { top: 0, left: 0, behavior: "smooth" };
    scrollRef.current.scrollTo(option);
  }, []);

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

  //검색창에 북마크 없을 때
  const SearchNoUrl = () =>
    isSearch && !isSearchLoading && filterdUrls.length === 0 && <NoUrl />;

  //검색중일 때 로딩창
  const SearchLoader = () => isSearch && isSearchLoading && <LoadingCenter />;

  //전체 북마크
  const TotalUrlMap = () => !isSearch && <ItemContainer urls={folderUrls} />;

  //검색 북마크
  const SearchUrlMap = () => isSearch && <ItemContainer urls={filterdUrls} />;

  useEffect(() => setFilterdUrls([]), [keyword]);

  useEffect(() => {}, []);
  return (
    <SharePageEl>
      <Wrapper>
        <TitleWrapper>
          <Title>{folder_id}</Title>
          <SearchBar keyword={keyword} onChange={onChange} />
        </TitleWrapper>

        <FlexContainer onScroll={onScroll} ref={scrollRef}>
          {SearchNoUrl()}
          {TotalUrlMap()}
          {SearchLoader()}
          {SearchUrlMap()}
          <Marker isScroll={isScroll} onClick={handleScrollUp} />
        </FlexContainer>
      </Wrapper>
    </SharePageEl>
  );
};

export default SharePage;
