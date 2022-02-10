import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { MainStates } from "../../routers/MainPage";
import SearchedStuff from "../ModalFolder/SearchedStuff";
import Container from "./styled/Container.styled";
import Content from "./styled/Content.styled";
import ContentsWrapper from "./styled/ContentsWrapper.styled";
import Input from "./styled/Input.styled";
import InputWrapper from "./styled/InputWrapper.styled";
import Title from "./styled/Title.styled";

const UrlContainerEl = styled(Container)``;
const InputWrapperEl = styled(InputWrapper)`
  visibility: ${(props) => (props.clickedSearch ? "visible" : "hidden")};
  > input {
    height: ${(props) => (props.clickedSearch ? "30px" : "0")};
    padding: ${(props) => (props.clickedSearch ? "0.2rem 1rem" : "0")};
  }
`;
const TitleEl = styled(Title)`
  display: flex;
  column-gap: 0.41rem;
`;

const ContentEl = styled(Content)`
  transition: 200ms;
  height: ${(props) =>
    props.clickedSearch ? "calc(90% - 50px - 30px)" : "calc(90% - 50px)"};
`;

const UrlContainer = () => {
  const { realTotalUrls } = useContext(MainStates);
  const [clickedSearch, setClickedSearch] = useState(false);

  const onClickSearch = () => {
    setClickedSearch(!clickedSearch);
  };
  const handleClickUrl = () => {};
  const handleUnClickUrl = () => {};
  return (
    <UrlContainerEl>
      <ContentsWrapper>
        <TitleEl>
          전체 url
          <FaSearch style={{ cursor: "pointer" }} onClick={onClickSearch} />
        </TitleEl>
        <InputWrapperEl clickedSearch={clickedSearch}>
          <Input />
        </InputWrapperEl>
        <ContentEl clickedSearch={clickedSearch}>
          {realTotalUrls.slice(0, 20).map((url, index) => {
            return (
              <SearchedStuff
                value={url}
                key={url._id}
                handleClickUrl={handleClickUrl}
                handleUnClickUrl={handleUnClickUrl}
              />
            );
          })}
        </ContentEl>
      </ContentsWrapper>
    </UrlContainerEl>
  );
};

export default UrlContainer;
