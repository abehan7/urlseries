import React from "react";
import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";
import ItemContainer from "../UrlContainer/ItemContainer";
import { LeftBoxEl, FlexContainer } from "../UrlContainer/LeftBox";
import { searchedUrls } from "../../indexedDb";

import { Title } from "../UrlContainer/styled/Title.styled";
import { TitleWrapper } from "../UrlContainer/styled/TitleWrapper.styled";

const FlexContainerEl = styled(FlexContainer)`
  height: calc(100% - 130px);
  max-height: calc(100% - 130px);
`;

const LeftBox = () => {
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const onChange = (e) => {};
  console.log("searchedUrls:", searchedUrls);

  //FIXME: DOM MAPPING
  //전체 북마크
  const TotalUrlMap = () => !isSearch && <ItemContainer urls={searchedUrls} />;
  //검색 북마크
  const SearchUrlMap = () => isSearch && <ItemContainer urls={[]} />;
  return (
    <LeftBoxEl>
      <TitleWrapper>
        <Title>최근 방문한 사이트</Title>
        <SearchBar onChange={onChange} keyword={keyword} />
      </TitleWrapper>
      <FlexContainerEl>
        {TotalUrlMap()}
        {SearchUrlMap()}
      </FlexContainerEl>
    </LeftBoxEl>
  );
};

export default LeftBox;
