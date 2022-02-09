import React from "react";
import styled from "styled-components";
import Icon from "./styled/Icon.styled";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineCheck, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { TiDocumentDelete } from "react-icons/ti";

const IconWrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const EditorContainerEl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 50px;
  height: 90%;
  border-radius: 10px;
`;
const EditorContainer = () => {
  return (
    <EditorContainerEl>
      <IconWrapper>
        <Icon>
          <IoIosAdd />
        </Icon>
        <Icon>
          <FiEdit2 />
        </Icon>
        <Icon>
          <TiDocumentDelete />
        </Icon>
        <Icon>
          <AiOutlineHeart />
        </Icon>
        <Icon>
          <AiOutlineCheck />
        </Icon>
      </IconWrapper>
    </EditorContainerEl>
  );
};

export default EditorContainer;
