import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";
import Indicator from "../UrlContainer/Indicator";
import { LeftBoxEl } from "../UrlContainer/LeftBox";
import Marker from "../UrlContainer/Marker";
import { TitleWrapper } from "../UrlContainer/styled/TitleWrapper.styled";

const GridBox = styled.div``;

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
    <LeftBoxEl>
      <TitleWrapper>
        <TitleContainer
          isSearch={isSearch}
          onClickSearchTitle={onClickSearchTitle}
        />
        <SearchBar onChange={onChange} keyword={keyword} />
      </TitleWrapper>
      <GridBox onScroll={onScroll} ref={scrollRef}>
        <Marker isScroll={isScroll} onClick={handleScrollUp} />
      </GridBox>
    </LeftBoxEl>
  );
};

export default FolderLeftBox;

const TitleContainer = () => {
  return;
};
