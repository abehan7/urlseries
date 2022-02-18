import React, { useState } from "react";
import styled from "styled-components";
import InputWrapper from "./styled/InputWrapper.styled";

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
const Description = styled(MsgContainer)`
  color: #868e96;
  font-size: 1rem;
  display: block;
`;

const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 200ms;
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

  ${MsgContainer} {
    ${({ message }) => {
      if (message === "변경사항을 저장하시겠습니까?") {
        return `
        flex : 1;
        align-items: flex-end;
        padding-top: 0.5rem;
        padding-bottom:0.4rem;
      `;
      }
    }}
  }

  ${Description} {
    ${({ message }) => {
      if (message === "변경사항을 저장하시겠습니까?") {
        return `
        padding:0;

        display : block;
        flex : 1;
      `;
      } else {
        return `
        display : none`;
      }
    }}
  }
`;

const InputWrapperEl = styled(InputWrapper)``;
const Input = styled.input`
  border: 0;
  padding: 0;
  margin: 0;
`;

const AlertModal = ({
  message,
  description,
  isOpen,
  type,
  handleClickConfirm,
  handleModalCancel,
}) => {
  const [target, setTarget] = useState(null);
  const onClickOverlay = (e) => {
    e.target === target && handleModalCancel();
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      ref={setTarget}
      onMouseDown={onClickOverlay}
      message={message}
    >
      {type === "confirm" && <ConfirmModal message={message} />}
      {type === "click" && (
        <ClickModal
          message={message}
          handleClickConfirm={handleClickConfirm}
          handleModalCancel={handleModalCancel}
          description={description}
        />
      )}
      {type === "noCancel" && (
        <NoCancelModal
          message={message}
          handleClickConfirm={handleModalCancel}
        />
      )}

      {/* {type === "addFolder" && (
        <AddModal
          message={message}
          handleClickConfirm={handleClickConfirm}
          handleModalCancel={handleModalCancel}
        />
      )} */}
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

const ClickModal = ({
  message,
  description,
  handleClickConfirm,
  handleModalCancel,
}) => {
  return (
    <ClickModalEl>
      <MsgContainer>{message}</MsgContainer>
      <Description>{description}</Description>
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

const AddModal = ({
  message,
  description,
  handleClickConfirm,
  handleModalCancel,
}) => {
  return (
    <ClickModalEl>
      <MsgContainer>{message}</MsgContainer>
      <Description>{description}</Description>
      <ButtonContainer>
        <Button onClick={handleClickConfirm} style={{ color: "red" }}>
          확인
        </Button>
        <Button onClick={handleModalCancel}>취소</Button>
      </ButtonContainer>
    </ClickModalEl>
  );
};

export default AlertModal;
