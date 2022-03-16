import React from "react";
import styled, { css } from "styled-components";
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
import { RiCheckFill } from "react-icons/ri";
import { useState } from "react";
import { useRef } from "react";
import { useTag } from "../../contexts/TagContext";
import { KeywordNormalize, SearchNotByDB } from "../Utils/Search";
import toast from "react-hot-toast";
import { useModal } from "../../contexts/ModalContext";
import { constants, useMode } from "../../contexts/ModeContext";

//FIXME: TopBox
const Input = styled.input`
  flex: 1;
  padding: 0 1rem;
  color: black;
  background-color: #fff;
`;

const SearchedTagsContainer = styled.div`
  display: flex;
  transition: all 0.2s ease-in-out;

  ${({ isInputClicked }) =>
    isInputClicked
      ? css`
          transition-delay: 0.2s;
          height: calc(200px - 47px - 15px);
          visibility: visible;
        `
      : css`
          height: 0;
          visibility: hidden;
        `}

  z-index: 1;

  position: absolute;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  top: 45px;
  width: 100%;
  background-color: #fff;
  border: 3px solid #bbbbbb;

  border-radius: 15px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  align-items: center;
  justify-content: flex-start;

  flex-direction: column;
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  border-bottom: 1px solid #e9ecef;
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  margin: 0.2rem 0;
  :hover {
    background-color: #a597fe1a;
  }
  ${({ isClicked }) =>
    isClicked &&
    css`
      background-color: #a597fe1a;
    `}
`;

const InputContainerEl = styled(InputContainer)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 클릭하면 이렇게되기 */
  transition: all 0.2s ease-in-out;

  border-bottom-left-radius: ${(props) =>
    props.isInputClicked ? "0" : "15px"};
  border-bottom-right-radius: ${(props) =>
    props.isInputClicked ? "0" : "15px"};
  /* transition-delay: 0.2s; */

  ${({ isInputClicked }) =>
    isInputClicked
      ? css``
      : css`
          transition-delay: 0.2s;
        `}
`;

const Icon = styled.div`
  border-radius: 5px;
  width: 13px;
  height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: 2px solid #bccac1;
`;

const ClickedIcon = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6d27e8;
`;

const UnClickedIcon = styled(Icon)``;

const Text = styled.span`
  padding: 0 0.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 250px;
`;

//FIXME: BottomBox

const FlexWrapContainer = styled.div`
  /* 태그 한줄에 최대 2개로 잡자 */
  gap: 0.5rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const SelectedTag = styled.div`
  position: relative;
  background-color: #a597fe1a;
  max-width: 50%;
  width: fit-content;
  height: 22px;
  padding: 0.31rem;
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  color: #6d27e8;
  transition: all 0.2s ease-in-out;
`;

const Circle = styled.span`
  width: 23px;
  height: 23px;
  min-height: 23px;
  min-width: 23px;
  background-color: #6d27e8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
const TagName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content;
  padding: 0 0.3rem;
`;

const SelectedItems = styled.div`
  flex: 1;
  max-height: 130px;
  width: 100%;
  overflow-y: scroll;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  ::-webkit-scrollbar {
    display: none;
  }
`;

// const debounceFn = debounce((fn, keyword) => fn(keyword), 400);

const HashtagModal = () => {
  const [isInputClicked, setIsInputClicked] = useState(false);
  const TopBoxRef = useRef(null);
  const handleAlertTrigger = useModal().handleAlertTrigger;
  const setMode = useMode().setMode;

  const onClickInput = () => setIsInputClicked(true);
  const handleFoldUp = () => setIsInputClicked(false);
  const onClickWindow = (e) => {
    if (TopBoxRef.current.contains(e.target)) return;
    handleFoldUp();
  };

  const onClickCancel = () => setMode(constants.NORMAL);

  const onClickSave = () => {
    const fn = () => {
      // 토스트 모달
      const getData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      };
      const myPromise = getData();
      toast.promise(myPromise, {
        loading: "저장중입니다",
        success: "저장이 완료되었습니다!",
        error: "저장이 정상적으로 이루어지지 않았습니다",
      });
      //  수정 함수 넣기
      // onClickCancel();
      onClickCancel();
    };
    handleAlertTrigger(fn, "저장하시겠습니까?");
  };
  return (
    <ModalContent onClick={onClickWindow}>
      <ModalHeader>
        <ModalTitle>해시태그설정</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <BodyContent>
          <TopBox
            isInputClicked={isInputClicked}
            onClickInput={onClickInput}
            TopBoxRef={TopBoxRef}
          />
          <BottomBox />
        </BodyContent>
      </ModalBody>
      <Footer>
        <FooterBtn style={{ border: "none" }} onClick={onClickCancel}>
          Cancel
        </FooterBtn>
        <ColoredFooterBtn onClick={onClickSave}>Save</ColoredFooterBtn>
      </Footer>
    </ModalContent>
  );
};

export default HashtagModal;

const TopBox = ({ isInputClicked, onClickInput, TopBoxRef }) => {
  const [keyword, setKeyword] = useState("");

  //context TagContext 에서 함수 가져와서 사용 useTag().~ 로 가져온다

  const totalHashtags = useTag().getTotalTags();
  const addAssignedTag = useTag().addAssignedTag;
  const removeAssignedTag = useTag().removeAssignedTag;

  const assignedHashtags = useTag().hashtag.assignedHashtags;
  const assignedTagsNames = assignedHashtags.map((tag) => tag.name);

  //태그 클릭시 추가,제거 로직

  const onClickTag = (tag) => {
    const unClick = () => removeAssignedTag(tag);

    const click = () => addAssignedTag(tag);

    !assignedTagsNames.includes(tag.name) && click();
    assignedTagsNames.includes(tag.name) && unClick();
  };

  //검색 로직

  const onChange = async (e) => {
    const searchWord = e.target.value;
    const hashFilter = totalHashtags.filter((tag) => {
      return tag.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setKeyword("");
    } else {
      setKeyword(hashFilter);
    }
  };

  return (
    <InputContainerEl isInputClicked={isInputClicked} ref={TopBoxRef}>
      <Input
        type="text"
        autoComplete="off"
        name="url"
        placeholder=" "
        onClick={onClickInput}
        onChange={onChange}
        spellCheck="false"
        keyword={keyword}
      />
      <Label htmlFor="text1">HASHTAG</Label>

      {keyword.length !== 0 && (
        <SearchedTagsContainer isInputClicked={isInputClicked}>
          {keyword.map((tag, index) => {
            const isClicked = assignedTagsNames.includes(tag.name);

            return (
              <TagWrapper
                tag={tag.name}
                key={index}
                onClick={() => onClickTag(tag)}
              >
                <Tag isClicked={isClicked}>
                  <ClickedIcon>{isClicked && <RiCheckFill />}</ClickedIcon>
                  <Text>{tag.name.slice(1, tag.length).toUpperCase()}</Text>
                </Tag>
              </TagWrapper>
            );
          })}
        </SearchedTagsContainer>
      )}
    </InputContainerEl>
  );
};

const BottomBox = () => {
  const selectedTagsData = useTag().hashtag.assignedHashtags;
  const removeAssignedTag = useTag().removeAssignedTag;
  const onClickHash = (tag) => {
    removeAssignedTag(tag);
  };

  return (
    <SelectedItems>
      <FlexWrapContainer>
        {selectedTagsData.map((tag, index) => (
          <SelectedTag
            onClick={() => onClickHash(tag)}
            tag={tag.name}
            key={index}
          >
            <Circle>{tag.name.slice(1, 2).toUpperCase()}</Circle>
            <TagName>{tag.name.slice(1, tag.length).toUpperCase()}</TagName>
          </SelectedTag>
        ))}
      </FlexWrapContainer>
    </SelectedItems>
  );
};
