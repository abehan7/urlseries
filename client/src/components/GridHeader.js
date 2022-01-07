import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FiTwitter } from "react-icons/fi";
import styled from "styled-components";
import { CgList, CgChevronUpO } from "react-icons/cg";

const GridHeaderEl = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 17px;
  font-weight: lighter;
  grid-column: span 2;
  padding-left: 10px;
`;
const Title = styled.h3`
  padding-left: 5px;
  padding-right: 5px;
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
