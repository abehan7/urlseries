import React from "react";
import { BodyContent } from "./styled/BodyContent.styled";
import { BodyTitle } from "./styled/BodyTitle.styled";
import { Footer } from "./styled/Footer.styled";
import { FooterBtn } from "./styled/FooterBtn.styled";
import { ModalBody } from "./styled/ModalBody.styled";
import { ModalContent } from "./styled/ModalContent.styled";
import { ModalHeader } from "./styled/ModalHeader.styled";
import { ModalTitle } from "./styled/ModalTitle.styled";

const AddModal = () => {
  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle className="modal-title">수정하기</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <BodyTitle>수정할 해쉬태그</BodyTitle>
        <BodyContent>수정할 해쉬태그를 선택해주세요.</BodyContent>
      </ModalBody>
      <Footer>
        <FooterBtn>취소</FooterBtn>
        <FooterBtn>수정</FooterBtn>
      </Footer>
    </ModalContent>
  );
};

export default AddModal;
