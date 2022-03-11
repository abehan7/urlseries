import React, { useState } from "react";
import styled, { css } from "styled-components";
import { BodyContent } from "./styled/BodyContent.styled";
import { Footer } from "./styled/Footer.styled";
import { FooterBtn } from "./styled/FooterBtn.styled";
import { ModalBody } from "./styled/ModalBody.styled";
import { ModalContent } from "./styled/ModalContent.styled";
import { ModalHeader } from "./styled/ModalHeader.styled";
import { ModalTitle } from "./styled/ModalTitle.styled";

const FooterEl = styled(Footer)`
  padding: 0.4rem 0;
`;

const CancelBtn = styled(FooterBtn)`
  border: none;
`;
const SaveBtn = styled(FooterBtn)`
  background-color: #6d27e8;
  color: #fff;
  transition: 0.2s ease-in-out all;
  :active {
    background-color: #511ab2;
  }
`;

const BackBtn = styled(SaveBtn)`
  margin-left: 10px;
`;
const BtnContainer = styled.div`
  flex: 1;
`;

const BodyContentEl = styled(BodyContent)`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 85%;
  align-items: center;
  justify-content: center;
`;

const InputContentEl = styled(BodyContentEl)`
  @keyframes fadeInInput {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }
  @keyframes fadeOutInput {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }

  transition: 0.3s ease-in-out all;
  ${({ isInput }) =>
    isInput
      ? css`
          display: flex;
          animation: fadeInInput 0.3s ease-in-out;
        `
      : css`
          display: none;
        `}
`;
const TextAreaContentEl = styled(BodyContentEl)`
  ${({ isInput }) =>
    !isInput
      ? css`
          display: flex;
          animation: fadeOutInput 0.3s ease-in-out;
        `
      : css`
          display: none;
        `}
`;

const ModalBodyEl = styled(ModalBody)`
  flex: 1;
  padding: 0.5rem 0;
  overflow: hidden;
`;

const ModalContentEl = styled(ModalContent)`
  height: 330px;
  width: 400px;
`;

const Input = styled.input`
  flex: 1;
  padding: 0 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  border: 3px solid #bbbbbb;
  transition: all 0.3s ease-in-out;
  border-radius: 15px;
  margin: 10px 0;
  height: 35px;
  padding: 0.2rem 0;

  input {
    border: none;
    background-color: transparent;
    width: 100%;
    color: gray;
    font-size: 16px;
    line-height: 24px;
  }

  :hover,
  :focus-within {
    border-color: #6d27e8;
  }

  input:focus,
  :hover input {
    color: gray;
    outline: none;
    width: 250px;
  }

  label {
    position: absolute;
    background-color: transparent;
    padding: 0 12px;
    line-height: 24px;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    color: #898989;
    cursor: text;
    pointer-events: none;
  }

  :hover label {
    color: #946be5;
  }

  :focus-within label,
  input:not(:placeholder-shown) ~ label {
    background-color: #fff;
    top: -4px;
    left: 6px;
    bottom: auto;
    color: #946be5;
  }
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;

  position: absolute;
  background-color: transparent;
  padding: 0 12px;
  line-height: 24px;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  color: #898989;
  cursor: text;
  pointer-events: none;
`;

const TextArea = styled.textarea`
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  font-size: 16px;
  color: gray;

  /* margin: 1rem; */
  /* padding: 1rem; */
`;

const TextAreaContainer = styled.div`
  font-size: 16px;
  padding: 1rem 0;
  border: 3px solid #bbbbbb;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  transition: all 0.3s ease-in-out;
  border-radius: 20px;

  height: 60%;

  color: gray;

  :hover,
  :focus-within {
    border-color: #6d27e8;
    label {
      color: #6d27e8;
    }
  }
`;

const MemoLabel = styled(Label)`
  left: 10px;
  top: 0;
  background-color: #fff;
  width: fit-content;
  height: 20px;
`;

const AddModal = () => {
  const [isInput, setIsInput] = useState(true);
  const onClickBack = () => setIsInput(true);
  const onClickNext = () => setIsInput(false);
  const onClickSubmit = () => {};
  return (
    <ModalContentEl>
      <ModalHeader>
        <ModalTitle>북마크 추가하기</ModalTitle>
      </ModalHeader>
      <ModalBodyEl>
        <InputContent isInput={isInput} />
        <TextAreaContent isInput={isInput} />
      </ModalBodyEl>
      <FooterEl>
        {!isInput && (
          <BtnContainer>
            <BackBtn onClick={onClickBack}>Back</BackBtn>
          </BtnContainer>
        )}
        <CancelBtn>Cancel</CancelBtn>
        {isInput && <SaveBtn onClick={onClickNext}>NEXT</SaveBtn>}
        {!isInput && <SaveBtn onClick={onClickSubmit}>Submit</SaveBtn>}
      </FooterEl>
    </ModalContentEl>
  );
};

export default AddModal;

const InputContent = ({ isInput }) => {
  return (
    <InputContentEl isInput={isInput}>
      <InputContainer>
        <Input type="text" autoComplete="off" name="url" placeholder=" " />
        <Label htmlFor="text1">URL</Label>
      </InputContainer>
      <InputContainer>
        <Input type="text" autoComplete="off" name="title" placeholder=" " />
        <Label htmlFor="text1">TITLE</Label>
      </InputContainer>
      <InputContainer>
        <Input type="text" autoComplete="off" name="hashtag" placeholder=" " />
        <Label htmlFor="text1">HASHTAG</Label>
      </InputContainer>
    </InputContentEl>
  );
};

const TextAreaContent = ({ isInput }) => {
  return (
    <TextAreaContentEl isInput={isInput}>
      <TextAreaContainer>
        <TextArea type="text" autoComplete="off" name="memo" placeholder=" " />
        <MemoLabel htmlFor="text1">MEMO</MemoLabel>
      </TextAreaContainer>
    </TextAreaContentEl>
  );
};
