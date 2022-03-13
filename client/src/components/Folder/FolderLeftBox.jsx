import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";
import { LeftBoxEl } from "../UrlContainer/LeftBox";
import Marker from "../UrlContainer/Marker";
import { ItemConatiner } from "../UrlContainer/styled/ItemContainer";
import { Title } from "../UrlContainer/styled/Title.styled";
import { TitleWrapper } from "../UrlContainer/styled/TitleWrapper.styled";

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
  padding: 1rem;
  width: 90%;

  height: calc(100% - 130px);
  max-height: calc(100% - 130px);
  display: grid;
  animation: fadeIn 0.5s ease-in;
`;
const FolderLeftBoxEl = styled(LeftBoxEl)``;

const FolderLeftBox = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const scrollRef = useRef(null);
  const onScroll = () => {};
  const onClickSearchTitle = () => {};
  const onChange = () => {};
  const handleScrollUp = () => {};

  return (
    <FolderLeftBoxEl>
      <TitleWrapper>
        <TitleEl>전체 폴더</TitleEl>
        <SearchBar onChange={onChange} keyword={keyword} />
      </TitleWrapper>
      <GridBox onScroll={onScroll} ref={scrollRef}>
        <Marker isScroll={isScroll} onClick={handleScrollUp} />
      </GridBox>
    </FolderLeftBoxEl>
  );
};

export default FolderLeftBox;

const TitleContainer = () => {
  return <></>;
};
