import React, { useState } from "react";
import styled, { css } from "styled-components";
import { constants, useMode } from "../../contexts/ModeContext";
import { useUrl } from "../../contexts/UrlContext";
import { BodyContent } from "./styled/BodyContent.styled";
import { ColoredFooterBtn } from "./styled/ColoredFooterBtn.styled";
import { Footer } from "./styled/Footer.styled";
import { FooterBtn } from "./styled/FooterBtn.styled";
import { InputContainer } from "./styled/InputContainer.styled";
import { Label } from "./styled/Label.styled";
import { ModalBody } from "./styled/ModalBody.styled";
import { ModalContent } from "./styled/ModalContent.styled";
import { ModalHeader } from "./styled/ModalHeader.styled";
import { ModalTitle } from "./styled/ModalTitle.styled";

const FooterEl = styled(Footer)``;

const CancelBtn = styled(FooterBtn)`
  border: none;
`;
const SaveBtn = styled(ColoredFooterBtn)``;

const BackBtn = styled(FooterBtn)`
  margin-left: 10px;
  border: none;
`;
const BtnContainer = styled.div`
  flex: 1;
`;

const BodyContentEl = styled(BodyContent)``;

const InputContentEl = styled(BodyContentEl)`
  /* transition: 0.3s ease-in-out all; */
  ${({ count, isInput }) =>
    count > 0
      ? isInput
        ? css`
            display: flex;
            animation: fadeInInput 0.3s ease-in-out;
          `
        : css`
            display: none;
          `
      : ""}
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

const ModalBodyEl = styled(ModalBody)``;

const ModalContentEl = styled(ModalContent)``;

const Input = styled.input`
  flex: 1;
  padding: 0 1rem;
  color: black;
`;

const InputContainerEl = styled(InputContainer)``;
const LabelEl = styled(Label)``;

const TextArea = styled.textarea`
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  font-size: 16px;
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

  :focus-within label,
  textarea:not(:placeholder-shown) ~ label {
    //형제 태그 사용할 때 ~이거 사용하는거 같아
    background-color: #fff;
    top: -4px;
    left: 6px;
    bottom: auto;
    color: #946be5;
  }
`;

const MemoLabel = styled(Label)`
  left: 10px;
  top: 20px;
  background-color: #fff;
  width: fit-content;
  height: 20px;
`;

const AddModal = () => {
  const [isInput, setIsInput] = useState(true);
  const [count, setCount] = useState(0);
  const setMode = useMode().setMode;
  const mode = useMode().mode;
  const editUrl = useUrl().editUrl;
  const handleSetEditUrl = useUrl().handleSetEditUrl;

  const textInitialize = () => {
    if (mode === constants.ADD)
      return {
        url: "",
        title: "",
        hashtag: "",
        memo: "",
      };

    const oneLineTag = editUrl?.url_hashTags?.join(" ");

    if (mode === constants.EDIT_MODAL_UP)
      return {
        url: editUrl.url,
        title: editUrl.url_title,
        hashtag: oneLineTag,
        memo: editUrl.url_memo,
        urlId: editUrl.url_id,
      };
  };

  const [text, setText] = useState(textInitialize);
  const onClickBack = () => setIsInput(true);
  const onClickNext = () => {
    setIsInput(false);
    setCount(count + 1);
  };
  const onClickSubmit = () => {
    const addFn = () => {};
    const editFn = () => {};
    mode === constants.ADD && addFn();
    mode === constants.EDIT && editFn();
  };
  const onClickCancel = () => {
    mode === constants.ADD && setMode(constants.NORMAL);
    mode === constants.EDIT_MODAL_UP && setMode(constants.EDIT);
    mode === constants.EDIT_MODAL_UP && handleSetEditUrl({});

    // mode === constants.EDIT_MODAL_UP && setCount(0);
  };
  const onChange = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <ModalContentEl>
      <ModalHeader>
        <ModalTitle>{mode === constants.ADD && "북마크 추가하기"}</ModalTitle>
        <ModalTitle>
          {mode === constants.EDIT_MODAL_UP && "북마크 수정하기"}
        </ModalTitle>
      </ModalHeader>
      <ModalBodyEl>
        <InputContent
          isInput={isInput}
          count={count}
          onChange={onChange}
          text={text}
        />
        <TextAreaContent isInput={isInput} onChange={onChange} text={text} />
      </ModalBodyEl>
      <FooterEl>
        {!isInput && (
          <BtnContainer>
            <BackBtn onClick={onClickBack}>Back</BackBtn>
          </BtnContainer>
        )}
        <CancelBtn onClick={onClickCancel}>Cancel</CancelBtn>
        {isInput && <SaveBtn onClick={onClickNext}>NEXT</SaveBtn>}
        {!isInput && <SaveBtn onClick={onClickSubmit}>Submit</SaveBtn>}
      </FooterEl>
    </ModalContentEl>
  );
};

export default AddModal;

const InputContent = ({ isInput, count, onChange, text }) => {
  return (
    <InputContentEl isInput={isInput} count={count}>
      <InputContainerEl>
        <Input
          type="text"
          autoComplete="off"
          name="url"
          placeholder=""
          onChange={onChange}
          value={text.url}
        />
        <LabelEl htmlFor="text1">URL</LabelEl>
      </InputContainerEl>
      <InputContainerEl>
        <Input
          type="text"
          autoComplete="off"
          name="title"
          placeholder=""
          onChange={onChange}
          value={text.title}
        />
        <LabelEl htmlFor="text1">TITLE</LabelEl>
      </InputContainerEl>
      <InputContainerEl>
        <Input
          type="text"
          autoComplete="off"
          name="hashtag"
          placeholder=""
          onChange={onChange}
          value={text.hashtag}
        />
        <LabelEl htmlFor="text1">HASHTAG</LabelEl>
      </InputContainerEl>
    </InputContentEl>
  );
};

const TextAreaContent = ({ isInput, onChange, text }) => {
  return (
    <TextAreaContentEl isInput={isInput}>
      <TextAreaContainer>
        <TextArea
          type="text"
          autoComplete="off"
          name="memo"
          placeholder=""
          onChange={onChange}
          value={text.memo}
        />
        <MemoLabel htmlFor="text1">MEMO</MemoLabel>
      </TextAreaContainer>
    </TextAreaContentEl>
  );
};
