import { debounce, throttle } from "lodash";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useFolder } from "../../contexts/FolderContext";
import { getFolders } from "../../store/reducers/Folders";
import SearchBar from "../SearchBar/SearchBar";
import { LeftBoxEl } from "../UrlContainer/LeftBox";
import Marker from "../UrlContainer/Marker";
import { ItemConatiner } from "../UrlContainer/styled/ItemContainer";
import { Title } from "../UrlContainer/styled/Title.styled";
import { TitleWrapper } from "../UrlContainer/styled/TitleWrapper.styled";
import LoadingCenter from "../Utils/Loader/LoaderCenter";
import { KeywordNormalize, SearchFolderNotByDB } from "../Utils/Search";
import FolderItemContainer from "./FolderItemContainer";
import NoFolder from "./NoFolder";

const TitleEl = styled(Title)`
  @keyframes jaehee {
    0% {
      transform: translate3d(-200px, 0, 0);
    }
    100% {
      transform: translate3d(0px, 0, 0);
    }
  }
  animation: jaehee 0.3s ease-in-out;
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

const TagTitle = styled(SearchTitle)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleContainerEl = styled.div`
  @keyframes jaehee {
    0% {
      transform: translate3d(-200px, 0, 0);
    }
    100% {
      transform: translate3d(0px, 0, 0);
    }
  }
  flex: 1;
  display: flex;
  height: 100%;
  align-items: center;

  > span {
    animation: jaehee 0.3s ease-in-out;
  }
`;
const GridBox = styled(ItemConatiner)`
  /* position: relative; */

  padding: 1rem;
  animation: fadeIn 0.5s ease-in;

  max-height: calc(100% - 130px);
  height: calc(100% - 130px);
  width: 90%;

  display: grid;
  justify-content: center;

  grid-template-columns: repeat(3, 1fr);

  grid-auto-rows: calc(100% / 3);
  overflow-y: scroll;
  overflow-x: hidden;

  scrollbar-width: 0;
  ::-webkit-scrollbar {
    display: none;
  }

  /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
`;
const FolderLeftBoxEl = styled(LeftBoxEl)``;
const debounceFn = debounce((fn, keyword) => fn(keyword), 400);
const FolderLeftBox = () => {
  // const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const folders = useSelector(getFolders);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const handleSetFilterdFolders = useFolder().handleSetFilterdFolders;
  const filterdFolders = useFolder().filterdFolders;
  // console.log(folders);

  const isSearch = keyword.length > 0;

  const _getFilterdFolders = (keyword) => {
    const pKeyword = KeywordNormalize(keyword);
    // TODO: 폴더에 맞게 로직 바꿔야돼
    const filterd = SearchFolderNotByDB(pKeyword, folders);
    handleSetFilterdFolders(filterd);
    setIsSearchLoading(false);
  };

  const scrollRef = useRef(null);
  const onClickSearchTitle = () => setKeyword("");

  const onChange = async (e) => {
    debounceFn.cancel();
    setIsSearchLoading(true);
    const _keyword = e.target.value;
    setKeyword(_keyword);
    e.target.value.length > 0 &&
      (await debounceFn(_getFilterdFolders, _keyword));
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

  // 검색시 setting

  useEffect(() => {
    handleSetFilterdFolders([]);
  }, [keyword]);

  useEffect(() => {
    isSearch && _getFilterdFolders(keyword);
  }, [folders]);

  // 전체 폴더
  const TotalFolderMap = () =>
    !isSearch && <FolderItemContainer folders={folders} type="SQUARE" />;

  // 검색된 폴더
  const SearchFolderMap = () =>
    isSearch && <FolderItemContainer folders={filterdFolders} type="SQUARE" />;

  //검색중일 때 로딩창
  const SearchLoader = () => isSearch && isSearchLoading && <LoadingCenter />;

  //검색창에 북마크 없을 때
  const SearchNoUrl = () =>
    isSearch && !isSearchLoading && filterdFolders.length === 0 && <NoFolder />;

  return (
    <FolderLeftBoxEl>
      <TitleWrapper>
        <TitleContainer
          isSearch={isSearch}
          onClickSearchTitle={onClickSearchTitle}
        />
        <SearchBar onChange={onChange} keyword={keyword} />
      </TitleWrapper>
      <GridBox onScroll={onScroll} ref={scrollRef}>
        {TotalFolderMap()}
        {SearchFolderMap()}
        {SearchLoader()}
        {SearchNoUrl()}
        <Marker isScroll={isScroll} onClick={handleScrollUp} />
      </GridBox>
    </FolderLeftBoxEl>
  );
};

export default FolderLeftBox;

const TitleContainer = ({ isSearch, onClickSearchTitle }) => {
  // 전체 북마크
  const TotalTitleFn = () => !isSearch && <Title>전체 북마크</Title>;

  // 검색 북마크
  const SearchTitleFn = () =>
    isSearch && <SearchTitle onClick={onClickSearchTitle}>#검색</SearchTitle>;
  return (
    <TitleContainerEl isSearch={isSearch}>
      {TotalTitleFn()}
      {SearchTitleFn()}
    </TitleContainerEl>
  );
};
