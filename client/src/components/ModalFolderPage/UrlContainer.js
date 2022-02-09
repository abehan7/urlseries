import React, { useContext } from "react";
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

const UrlContainer = () => {
  const { realTotalUrls } = useContext(MainStates);

  const handleClickUrl = () => {};
  const handleUnClickUrl = () => {};
  return (
    <UrlContainerEl>
      <ContentsWrapper>
        <Title>전체 url</Title>
        <InputWrapper>
          <Input />
          <FaSearch />
        </InputWrapper>
        <Content>
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
        </Content>
      </ContentsWrapper>
    </UrlContainerEl>
  );
};

export default UrlContainer;
