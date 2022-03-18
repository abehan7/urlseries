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
import toast from "react-hot-toast";
import { useModal } from "../../contexts/ModalContext";
import { useMode } from "../../contexts/ModeContext";
import { InfiniteScroll } from "../Utils/InfiniteScroll/InfiniteScroll";
import Loader from "../Utils/Loader/Loader";
import { useEffect } from "react";
import { debounce } from "lodash";
import { KeywordNormalize } from "../Utils/Search";
import NoResult from "../Utils/NotFound/NoResult";

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
  position: relative;
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
  max-width: 200px;
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
  transition: all 0.2s ease-in-out;
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
  overflow: hidden;
  :hover {
    background-color: #ffcccb7a;
    ${Circle} {
      background-color: tomato;
    }
  }
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

const Index = styled.span`
  color: #c4c4c4;
  font-size: 0.8rem;
  font-weight: 100;
  position: absolute;
  right: 10px;
  bottom: 0;
`;

const LoaderWrap = styled.div`
  width: 100%;
  padding: 0.6rem;
  z-index: 1;
`;
const debounceFn = debounce((fn, keyword) => fn(keyword), 400);

const HashtagModal = () => {
  const [isInputClicked, setIsInputClicked] = useState(false);
  const TopBoxRef = useRef(null);
  const [tmpAssignedHashtags, setTmpAssignedHashtags] = useState([]);
  const assignedHashtags = useTag().hashtag.assignedHashtags;
  const handleSetAssignedHashtags = useTag().handleSetAssignedHashtags;

  const handleAlertTrigger = useModal().handleAlertTrigger;
  const setModalMode = useMode().setModalMode;
  const onClickInput = () => setIsInputClicked(true);
  const handleFoldUp = () => setIsInputClicked(false);
  const onClickWindow = (e) => {
    if (TopBoxRef.current.contains(e.target)) return;
    handleFoldUp();
  };

  const addTag = (tag) => setTmpAssignedHashtags([tag, ...tmpAssignedHashtags]);
  const removeTag = (tag) =>
    setTmpAssignedHashtags(tmpAssignedHashtags.filter((t) => t !== tag));

  const handleClickTopUrl = (tag) => {
    tmpAssignedHashtags.includes(tag) ? removeTag(tag) : addTag(tag);
  };

  const onClickCancel = () => setModalMode(null);

  const onClickSave = () => {
    const fn = () => {
      // 토스트 모달
      const getData = async () => {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // console.log(tmpAssignedHashtags);
        await handleSetAssignedHashtags(tmpAssignedHashtags);
      };
      const myPromise = getData();
      toast.promise(myPromise, {
        loading: "저장중입니다",
        success: "저장이 완료되었습니다!",
        error: "저장이 정상적으로 이루어지지 않았습니다",
      });
      //  수정 함수 넣기
      onClickCancel();
    };
    handleAlertTrigger(fn, "저장하시겠습니까?");
  };
  // initialize tmp assigned hashtag
  useEffect(() => setTmpAssignedHashtags(assignedHashtags), [assignedHashtags]);
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
            tmpAssignedHashtags={tmpAssignedHashtags}
            handleClickTopUrl={handleClickTopUrl}
          />
          <BottomBox
            tmpAssignedHashtags={tmpAssignedHashtags}
            removeTag={removeTag}
          />
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

const TopBox = ({
  isInputClicked,
  onClickInput,
  TopBoxRef,
  tmpAssignedHashtags,
  handleClickTopUrl,
}) => {
  const [contentsNum, setContentsNum] = useState(30);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchedTags, setSearchedTags] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const totalHashtags = useTag().hashtag.totalHashtags;

  const tagBoxRef = useRef(null);
  const isSearch = keyword.length > 0;

  const getSearchedTags = (keyword) => {
    const pKeyword = KeywordNormalize(keyword);
    // TODO: 폴더에 맞게 로직 바꿔야돼
    const filterd = totalHashtags.filter((_tag) => {
      const tag = KeywordNormalize(_tag);
      return tag.includes(pKeyword);
    });
    console.log(filterd);
    setSearchedTags(filterd);
    setIsSearching(false);
  };

  const onChange = async (e) => {
    setKeyword(e.target.value);
    debounceFn.cancel();
    setIsSearching(true);
    const _keyword = e.target.value;
    setKeyword(_keyword);
    e.target.value.length > 0 && (await debounceFn(getSearchedTags, _keyword));
  };

  // 무한스크롤
  const getNextItems = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 10));
    setContentsNum((num) => num + 100);
    setIsLoaded(false);
  };

  const stopCondition = totalHashtags.length === contentsNum;

  InfiniteScroll({ isLoaded, getNextItems, target, stopCondition });

  const option = { top: 0, left: 0, behavior: "smooth" };
  useEffect(() => {
    tagBoxRef.current.scrollTop !== 0 && tagBoxRef.current.scrollTo(option);
    contentsNum !== 30 && setContentsNum(30);
  }, [keyword, isInputClicked]);

  useEffect(() => setSearchedTags([]), [keyword]);

  const onClick = (tag) => handleClickTopUrl(tag);

  const tagListMap = (tagList) => {
    const filterdItems = tagList?.slice(0, contentsNum);
    return filterdItems.map((tag, index) => {
      const isClicked = tmpAssignedHashtags.includes(tag);
      // 키 넣으니까 된다
      // 키 꼭 넣자
      // 로더에는 무조껀 키 넣기 매우 중요

      if (index === contentsNum - 1) {
        return (
          <LoaderWrap key={"thisIsLoader"} ref={setTarget}>
            <Loader radius="32px" />
          </LoaderWrap>
        );
      }
      return (
        <TagWrapper key={index} onClick={() => onClick(tag)}>
          <Tag isClicked={isClicked}>
            <ClickedIcon>{isClicked && <RiCheckFill />}</ClickedIcon>
            <Text>{tag.slice(1, tag.length).toUpperCase()}</Text>
            <Index>
              {tagList.length - index}/{tagList.length}
            </Index>
          </Tag>
        </TagWrapper>
      );
    });
  };

  return (
    <InputContainerEl isInputClicked={isInputClicked} ref={TopBoxRef}>
      <Input
        type="text"
        autoComplete="off"
        name="url"
        placeholder=" "
        onClick={onClickInput}
        spellCheck="false"
        onChange={onChange}
      />
      <Label htmlFor="text1">HASHTAG</Label>
      <SearchedTagsContainer isInputClicked={isInputClicked} ref={tagBoxRef}>
        {!isSearch && tagListMap(totalHashtags)}
        {isSearch && tagListMap(searchedTags)}
        {isSearch && isSearching && <Loader radius="40px" />}
        {isSearch && !isSearching && searchedTags.length === 0 && (
          <NoResult>검색결과가 없습니다.</NoResult>
        )}
      </SearchedTagsContainer>
    </InputContainerEl>
  );
};

const BottomBox = ({ tmpAssignedHashtags, removeTag }) => {
  const onClick = (tag) => removeTag(tag);
  return (
    <SelectedItems>
      <FlexWrapContainer>
        {tmpAssignedHashtags.map((tag, index) => (
          <SelectedTag key={index} onClick={() => onClick(tag)}>
            <Circle>{tag.slice(1, 2).toUpperCase()}</Circle>
            <TagName>{tag.slice(1, tag.length).toUpperCase()}</TagName>
          </SelectedTag>
        ))}
      </FlexWrapContainer>
    </SelectedItems>
  );
};
