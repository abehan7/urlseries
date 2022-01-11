import React from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import styled from "styled-components";

const GridHeaderEl = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 10px 0;
  @media (max-width: 470px) {
    width: 100%;
  }
`;

const Title = styled.h3`
  flex: 1;
  @media (max-width: 470px) {
    padding-left: 1rem;
  }
`;

const IconsWrapper = styled.span`
  right: 0;
  padding-right: 10px;
  display: flex;

  justify-content: flex-end;
  position: absolute;
  /* flex: 1; */
  font-size: 23px;
  /* column-gap: 5px; */
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
