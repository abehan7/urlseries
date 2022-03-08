import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FolderContext } from "./FolderModalWindow";
import InputWrapper from "./styled/InputWrapper.styled";
import { VscFolderActive, VscNewFolder, VscClose } from "react-icons/vsc";

const wordsList = [
  "변경사항을 저장하시겠습니까?",
  "삭제하시겠습니까?",
  "폴더를 삭제하시겠습니까?",
];

const ConfirmModalEl = styled.div`
  width: 300px;
  height: 180px;
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
  border-radius: 10px;
  font-size: 16px;
  padding: 0;
  width: 100px;
  cursor: pointer;
  transition: 0.3s ease;
  background: rgba(120, 113, 130, 0.9);
  color: #fff;
  border: 2px solid transparent;
  margin: 0;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    position: relative;
    color: rgba(120, 113, 130, 0.9);
    background: #fff;
    border: 2px solid rgba(120, 113, 130, 0.9);
  }
  > .btn__text {
    padding: 6px 8px;
  }
  > .btn__icon {
    background: #787182;
    color: #fff;
    height: 25px;
    align-items: center;
    display: flex;
    padding: 6px 12px;
    transition: 0.3s ease;
  }
  :hover .btn__icon {
    background: #f9f9f9;
    color: rgba(120, 113, 130, 0.9);
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 10px;
  padding-bottom: 10px;
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
      if (wordsList.includes(message)) {
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
      if (wordsList.includes(message)) {
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

const InputWrapperEl = styled(InputWrapper)`
  border: 1px solid #e0e8e7;
  height: 35px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const Input = styled.input`
  font-weight: 100;
  border: 0;
  padding: 0rem 1rem;
  margin: 0;
  font-size: 17px;
  outline: none;
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
  const { handleAddModalCancel } = useContext(FolderContext);
  const onClickOverlay = (e) => {
    e.target === target && handleModalCancel();
    e.target === target && type === "addFolder" && handleAddModalCancel();
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

      {type === "addFolder" && (
        <AddModal
          message={message}
          handleClickConfirm={handleClickConfirm}
          handleModalCancel={handleModalCancel}
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
        <Button onClick={handleClickConfirm} style={{}}>
          <span className="btn__text">저장</span>
          <span className="btn__icon">
            <VscFolderActive />
          </span>
        </Button>
        <Button onClick={handleModalCancel}>
          <span className="btn__text">취소</span>
          <span className="btn__icon">
            <VscClose />
          </span>
        </Button>
      </ButtonContainer>
    </ClickModalEl>
  );
};

const NoCancelModal = ({ message, handleClickConfirm }) => {
  return (
    <ClickModalEl>
      <MsgContainer>{message}</MsgContainer>
      <ButtonContainer>
        <Button onClick={handleClickConfirm} style={{}}>
          <span className="btn__text">확인</span>
          <span className="btn__icon">
            <VscFolderActive />
          </span>
        </Button>
      </ButtonContainer>
    </ClickModalEl>
  );
};

const AddModal = ({ message, handleClickConfirm, handleModalCancel }) => {
  const { handleModalOnChange, modalFolderName, handleAddModalCancel } =
    useContext(FolderContext);
  const onChange = (e) => {
    handleModalOnChange(e.target.value);
  };
  const onClickConfirm = () => {
    // console.log(modalFolderName);
    handleClickConfirm(modalFolderName);
  };
  return (
    <ClickModalEl>
      <MsgContainer style={{ paddingTop: "1rem" }}>{message}</MsgContainer>
      <InputWrapperEl>
        <Input
          placeholder="새 폴더 이름"
          onChange={onChange}
          value={modalFolderName || ""}
        />
      </InputWrapperEl>
      <ButtonContainer>
        <Button onClick={onClickConfirm} style={{}}>
          <span className="btn__text">저장</span>
          <span className="btn__icon">
            <VscNewFolder />
          </span>
        </Button>
        <Button onClick={handleAddModalCancel}>
          <span className="btn__text">취소</span>
          <span className="btn__icon">
            <VscClose />
          </span>
        </Button>
      </ButtonContainer>
    </ClickModalEl>
  );
};

export default AlertModal;
