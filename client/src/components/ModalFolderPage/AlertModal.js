import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 100ms;
  ${({ isOpen }) => {
    if (isOpen) {
      return `
        visibility: visible;
        opacity: 1;
      `;
    } else {
      return `
        visibility: hidden;
        opacity: 0;
        `;
    }
  }}
`;

const ConfirmModalEl = styled.div`
  width: 170px;
  height: 110px;
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  overflow: hidden;
`;

const ClickModalEl = styled(ConfirmModalEl)`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 180px;
`;

const Button = styled.button`
  border-top: 1px solid #e0e8e7;
  font-weight: 400;
  padding: 0.3rem;
  :active {
    background-color: #e9ecef;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MsgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 200;
`;

const AlertModal = ({
  message,
  isOpen,
  type,
  handleClickConfirm,
  handleModalCancel,
}) => {
  return (
    <ModalOverlay isOpen={isOpen}>
      {type === "confirm" && <ConfirmModal message={message} />}
      {type === "click" && (
        <ClickModal
          message={message}
          handleClickConfirm={handleClickConfirm}
          handleModalCancel={handleModalCancel}
        />
      )}
      {type === "noCancel" && (
        <NoCancelModal
          message={message}
          handleClickConfirm={handleModalCancel}
        />
      )}
    </ModalOverlay>
  );
};

const ConfirmModal = ({ message }) => {
  return (
    <ConfirmModalEl>
      <MsgContainer>{message}</MsgContainer>
    </ConfirmModalEl>
  );
};

const ClickModal = ({ message, handleClickConfirm, handleModalCancel }) => {
  return (
    <ClickModalEl>
      <MsgContainer>{message}</MsgContainer>
      <ButtonContainer>
        <Button onClick={handleClickConfirm} style={{ color: "red" }}>
          확인
        </Button>
        <Button onClick={handleModalCancel}>취소</Button>
      </ButtonContainer>
    </ClickModalEl>
  );
};

const NoCancelModal = ({ message, handleClickConfirm }) => {
  return (
    <ClickModalEl>
      <MsgContainer>{message}</MsgContainer>
      <ButtonContainer>
        <Button onClick={handleClickConfirm} style={{ color: "red" }}>
          확인
        </Button>
      </ButtonContainer>
    </ClickModalEl>
  );
};

export default AlertModal;
