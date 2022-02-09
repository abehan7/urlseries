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

const FolderContainerEl = styled(Container)`
  margin-left: 1rem;
`;

const FolderContainer = () => {
  const { realTotalUrls } = useContext(MainStates);

  const handleClickUrl = () => {};
  const handleUnClickUrl = () => {};

  return (
    <FolderContainerEl>
      <ContentsWrapper>
        <Title>bored apes</Title>
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
    </FolderContainerEl>
  );
};

export default FolderContainer;
