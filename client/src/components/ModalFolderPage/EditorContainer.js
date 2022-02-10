import React, { useContext } from "react";
import styled from "styled-components";
import Icon from "./styled/Icon.styled";
import { IoIosAdd, IoIosArrowBack } from "react-icons/io";
import { AiOutlineCheck, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { TiDocumentDelete } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { FolderContext } from "./FolderModalWindow";

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
  height: 85%;
  border-radius: 10px;
`;
const EditorContainer = () => {
  const { isFolderPage, setIsFolderPage } = useContext(FolderContext);
  return (
    <EditorContainerEl>
      <IconWrapper>
        {isFolderPage ? <EditorFolder /> : <EditorUrls />}
      </IconWrapper>
    </EditorContainerEl>
  );
};

const EditorFolder = () => {
  return (
    <>
      <Icon>
        <IoSearchOutline />
        {/* <url> <폴더> 검색 */}
      </Icon>
      <Icon>
        <IoIosAdd />
        {/* <폴더> 추가 */}
      </Icon>

      <Icon>
        <AiOutlineHeart />
        {/* <폴더> 좋아요  */}
      </Icon>

      <Icon>
        <FiEdit2 />
        {/* 폴더 편집 */}
      </Icon>

      <Icon>
        <TiDocumentDelete />
        {/* <폴더> 삭제 */}
      </Icon>
    </>
  );
};

const EditorUrls = () => {
  const { isFolderPage, setIsFolderPage } = useContext(FolderContext);

  const onClickBack = () => {
    setIsFolderPage(true);
  };
  return (
    <>
      <Icon onClick={onClickBack}>
        <IoIosArrowBack />
        {/* 뒤로가기 */}
      </Icon>
      <Icon>
        <IoSearchOutline />
        {/* <url> <폴더> 검색 */}
      </Icon>

      <Icon>
        <FiEdit2 />
        {/* 폴더 편집 */}
      </Icon>

      <Icon>
        <AiOutlineCheck />
        {/* <url> 저장 확인하기 */}
      </Icon>
    </>
  );
};

export default EditorContainer;
