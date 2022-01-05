import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FiTwitter } from "react-icons/fi";
import styled from "styled-components";

const GridHeaderEl = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.h3``;
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
      <Title>전체 URL</Title>
      <IconsWrapper>
        <Icon>
          <AiOutlineInstagram />
        </Icon>
        <Icon>
          <AiOutlineYoutube />
        </Icon>
      </IconsWrapper>
    </GridHeaderEl>
  );
};

export default GridHeader;
