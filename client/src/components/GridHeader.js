import React from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import styled from "styled-components";
import { CgList, CgChevronUpO } from "react-icons/cg";

const GridHeaderEl = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 470px) {
    width: 100%;
  }
`;

const Title = styled.h3`
  @media (max-width: 470px) {
    padding-left: 1rem;
  }
`;

const IconsWrapper = styled.span`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  font-size: 23px;
  /* column-gap: 5px; */
  padding-right: 10px;
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 30%;
  :hover {
    background-color: rgba(0, 0, 0, 0.07);
    transition: 200ms;
  }
`;
const GridHeader = () => {
  return (
    <GridHeaderEl>
      <CgList size="21" />
      <Title>전체 URL</Title>
      <CgChevronUpO size="21" />
      <IconsWrapper>
        <Icon>
          <AiOutlineInstagram size="23" />
        </Icon>
        <Icon>
          <AiOutlineYoutube size="23" />
        </Icon>
      </IconsWrapper>
    </GridHeaderEl>
  );
};

export default GridHeader;
