import React, { useState } from "react";
import toast from "react-hot-toast";
import styled, { css } from "styled-components";
import { useModal } from "../../contexts/ModalContext";
import { constants, useMode } from "../../contexts/ModeContext";
import { useUrl } from "../../contexts/UrlContext";
import { addUrl } from "../Api";
import { KeywordNormalize } from "../Utils/Search";
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
  const setModalMode = useMode().setModalMode;
  const modalMode = useMode().modalMode;
  const editUrl = useUrl().editUrl;
  const handleSetEditUrl = useUrl().handleSetEditUrl;
  const handleAlertTrigger = useModal().handleAlertTrigger;
  const handleAddUrl = useUrl().handleAddUrl;
  const handleEditUrl = useUrl().handleEditUrl;

  const textInitialize = () => {
    if (modalMode === constants.ADD)
      return { url: "", title: "", hashtag: "", memo: "" };

    const oneLineTag = editUrl?.url_hashTags?.join(" ").toUpperCase();

    if (modalMode === constants.EDIT_MODAL_UP)
      return {
        url: editUrl.url,
        title: editUrl.url_title,
        hashtag: oneLineTag,
        memo: editUrl.url_memo,
        urlId: editUrl._id,
      };
  };

  const [text, setText] = useState(textInitialize);
  const onClickBack = () => setIsInput(true);

  const checkInput = () => {
    if (text.url.length === 0) {
      toast.error("URL을 입력해주세요");
      return false;
    }
    if (text.title.length === 0) {
      toast.error("제목을 입력해주세요");
      return false;
    }
    return true;
  };

  const onClickNext = () => {
    const _checkInput = checkInput();
    if (!_checkInput) return;
    setIsInput(false);
    setCount(count + 1);
  };
  const onClickCancel = () => {
    modalMode === constants.ADD && setModalMode(null);
    modalMode === constants.EDIT_MODAL_UP && setModalMode(null);
    modalMode === constants.EDIT_MODAL_UP && handleSetEditUrl({});
  };

  const getHashtagArr = (oneLineHashtag) => {
    const Phashtag = KeywordNormalize(oneLineHashtag).toUpperCase();
    const _hashtagArr = Phashtag.split("#");
    const hashtagArr = _hashtagArr.slice(1, _hashtagArr.length);
    const hashAttached = hashtagArr.map((hashtag) => `#${hashtag}`);
    return hashAttached;
  };

  const onClickSubmit = () => {
    const addFn = () => {
      // 토스트 모달
      const fetchData = async () => {
        // 키워드 정규화
        const hashtagArr = getHashtagArr(text.hashtag);
        const _url = { ...text, hashTags: hashtagArr };
        await handleAddUrl(_url);
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
    const editFn = () => {
      const fn = () => {
        // 토스트 모달
        const getData = async () => {
          // await new Promise((resolve) => setTimeout(resolve, 1000));
          //  수정 함수 넣기
          const newUrl = {
            ...editUrl,
            url: text.url,
            url_title: text.title,
            url_hashTags: getHashtagArr(text.hashtag),
            url_memo: text.memo,
          };
          // console.log(newUrl);
          handleEditUrl(editUrl._id, newUrl);
        };
        const myPromise = getData();
        toast.promise(myPromise, {
          loading: "수정중입니다",
          success: "수정이 완료되었습니다!",
          error: "수정이 정상적으로 이루어지지 않았습니다",
        });
        onClickCancel();
      };
      handleAlertTrigger(fn, "수정하시겠습니까?");
    };
    modalMode === constants.ADD && addFn();
    modalMode === constants.EDIT_MODAL_UP && editFn();
  };

  const onChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };
  return (
    <ModalContentEl>
      <ModalHeader>
        <ModalTitle>
          {modalMode === constants.ADD && "북마크 추가하기"}
        </ModalTitle>
        <ModalTitle>
          {modalMode === constants.EDIT_MODAL_UP && "북마크 수정하기"}
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
          placeholder=" "
          onChange={onChange}
          value={text.url}
          spellCheck="false"
        />
        <LabelEl htmlFor="text1">URL</LabelEl>
      </InputContainerEl>
      <InputContainerEl>
        <Input
          type="text"
          autoComplete="off"
          name="title"
          placeholder=" "
          onChange={onChange}
          value={text.title}
          spellCheck="false"
        />
        <LabelEl htmlFor="text1">TITLE</LabelEl>
      </InputContainerEl>
      <InputContainerEl>
        <Input
          type="text"
          autoComplete="off"
          name="hashtag"
          placeholder=" "
          onChange={onChange}
          value={text.hashtag}
          spellCheck="false"
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
          placeholder=" "
          onChange={onChange}
          value={text.memo}
          spellCheck="false"
        />
        <MemoLabel htmlFor="text1">MEMO</MemoLabel>
      </TextAreaContainer>
    </TextAreaContentEl>
  );
};
