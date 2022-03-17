import { debounce, throttle } from "lodash";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getFolders } from "../../store/reducers/Folders";
import SearchBar from "../SearchBar/SearchBar";
import { LeftBoxEl } from "../UrlContainer/LeftBox";
import Marker from "../UrlContainer/Marker";
import { ItemConatiner } from "../UrlContainer/styled/ItemContainer";
import { Title } from "../UrlContainer/styled/Title.styled";
import { TitleWrapper } from "../UrlContainer/styled/TitleWrapper.styled";
import { KeywordNormalize } from "../Utils/Search";
import FolderItemContainer from "./FolderItemContainer";

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
  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const folders = useSelector(getFolders);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // console.log(folders);
  const _getFilterdFolders = (keyword) => {
    const pKeyword = KeywordNormalize(keyword);
    // TODO: 폴더에 맞게 로직 바꿔야돼
    // const filterd = SearchNotByDB(pKeyword, totalUrls);
    // handleSetFilterdUrls(filterd);
    setIsSearchLoading(false);
  };
  // [totalUrls, handleSetFilterdUrls]

  const scrollRef = useRef(null);
  const onClickSearchTitle = () => {};
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

  return (
    <FolderLeftBoxEl>
      <TitleWrapper>
        <TitleEl>전체 폴더</TitleEl>
        <SearchBar onChange={onChange} keyword={keyword} />
      </TitleWrapper>
      <GridBox onScroll={onScroll} ref={scrollRef}>
        <FolderItemContainer folders={folders} type="SQUARE" />
        <Marker
          isScroll={isScroll}
          onClick={handleScrollUp}
          notHoverColor="#e6c7b675"
          hoverColor="#e6c7b6"
        />
      </GridBox>
    </FolderLeftBoxEl>
  );
};

export default FolderLeftBox;

const TitleContainer = () => {
  return <></>;
};
