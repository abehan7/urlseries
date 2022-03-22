import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineFileCopy } from "react-icons/md";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { useFolder } from "../../contexts/FolderContext";
import { useMode } from "../../contexts/ModeContext";
import { SET_SHARE } from "../../store/reducers/Folders";
import { updateFolderShare } from "../Api";
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
  cursor: pointer;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  transition: 0.2s ease-in-out;

  ${({ isShare }) =>
    isShare
      ? css`
          background-color: #6d27e8;
        `
      : css`
          background-color: #fff;
          color: gray;
          border: 1px solid #ddd;
        `};

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
    color: tomato;
  }
`;
const ShareModal = () => {
  const [isShare, setIsShare] = useState(false);
  const currentFolder = useFolder().currentFolder;
  const setModalMode = useMode().setModalMode;
  const dispatch = useDispatch();

  const handleSetCurrentFolder = useFolder().handleSetCurrentFolder;
  const shareUrl = `${window.location.origin}/share/${currentFolder._id}`;
  // const isShare = currentFolder.share;
  const saveContent = () => navigator.clipboard.writeText(shareUrl);
  //url마다 커맨트 달을 수 있게 만들기

  // console.log(currentFolder);

  const onClickClipboard = () => {
    saveContent();
    toast.success("클립보드에 복사되었습니다.");
  };

  const onClickShare = () => {
    setIsShare(!isShare);
  };

  const onClickCancel = () => setModalMode(null);

  const onClickSave = () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // 토스트 모달
    const fetchData = async () => {
      const newFolder = { ...currentFolder, share: isShare };
      handleSetCurrentFolder(newFolder);
      dispatch(SET_SHARE(newFolder._id));
      await updateFolderShare(newFolder._id);
      // 리덕스도 초기화
    };
    const myPromise = fetchData();
    toast.promise(myPromise, {
      loading: "추가중입니다",
      success: "완료되었습니다!",
      error: "정상적으로 이루어지지 않았습니다",
    });
    //  추가 함수 넣기
    onClickCancel();
  };
  useEffect(() => setIsShare(currentFolder.share), []);
  return (
    <ModalContentEl>
      <ModalHeader>
        <ModalTitle>공유하기</ModalTitle>
      </ModalHeader>
      <ModalBodyEl>
        <CircleContainer>
          <Circle onClick={onClickShare} isShare={isShare}>
            <CircleText>{isShare ? "공유중" : "공유하기"}</CircleText>
          </Circle>
        </CircleContainer>
        <UrlContainer>
          <UrlText>{shareUrl}</UrlText>
          <Icon onClick={onClickClipboard}>
            <MdOutlineFileCopy />
          </Icon>
        </UrlContainer>
      </ModalBodyEl>
      <Footer>
        <CancelBtn>Cancel</CancelBtn>
        <ColoredFooterBtn onClick={onClickSave}>Save</ColoredFooterBtn>
      </Footer>
    </ModalContentEl>
  );
};

export default ShareModal;
