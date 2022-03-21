import React from "react";
import toast from "react-hot-toast";
import { MdOutlineFileCopy } from "react-icons/md";
import styled from "styled-components";
import { useFolder } from "../../contexts/FolderContext";
import { ColoredFooterBtn } from "./styled/ColoredFooterBtn.styled";
import { Footer } from "./styled/Footer.styled";
import { FooterBtn } from "./styled/FooterBtn.styled";
import { ModalBody } from "./styled/ModalBody.styled";
import { ModalContent } from "./styled/ModalContent.styled";
import { ModalHeader } from "./styled/ModalHeader.styled";
import { ModalTitle } from "./styled/ModalTitle.styled";

const ModalContentEl = styled(ModalContent)`
  height: 250px;
`;

const ModalBodyEl = styled(ModalBody)`
  gap: 1rem;
`;

const Circle = styled.div`
  width: 70px;
  height: 30px;
  border-radius: 10px;
  background-color: #6d27e8;
  cursor: pointer;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  /* opacity: 0.04; */
`;

const CircleText = styled.span``;

const CancelBtn = styled(FooterBtn)`
  border: none;
`;

const CircleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
`;

const UrlText = styled.div`
  background-color: #f7f8fa;
  padding: 0.5rem;
  color: #3d5a80;

  width: 330px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임 적용 */
`;
const UrlContainer = styled.div`
  width: calc(100% - 2rem);
  height: 40px;
  background-color: #f7f8fa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
`;

const Icon = styled.span`
  position: absolute;
  right: 10px;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    color: #6d27e8;
  }
`;
const ShareModal = () => {
  const currentFolder = useFolder().currentFolder;
  const saveContent = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${currentFolder._id}`
    );
  };
  const onClickClipboard = (e) => {
    saveContent();
    toast.success("클립보드에 복사되었습니다.");
  };
  return (
    <ModalContentEl>
      <ModalHeader>
        <ModalTitle>공유하기</ModalTitle>
      </ModalHeader>
      <ModalBodyEl>
        <CircleContainer>
          <Circle>
            <CircleText>공유중</CircleText>
          </Circle>
        </CircleContainer>
        <UrlContainer>
          <UrlText>http://localhost:3000/{currentFolder._id}</UrlText>
          <Icon onClick={onClickClipboard}>
            <MdOutlineFileCopy />
          </Icon>
        </UrlContainer>
      </ModalBodyEl>
      <Footer>
        <CancelBtn>Cancel</CancelBtn>
        <ColoredFooterBtn>Save</ColoredFooterBtn>
      </Footer>
    </ModalContentEl>
  );
};

export default ShareModal;
