import React, { useCallback, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { PopupDisable } from "../../Hooks/stopScroll";
import { HashtagModalScrollUp } from "../../Hooks/ScrollUp";
import ItemLeft from "./ItemLeft";
import ItemRight from "./ItemRight";
import styled, { css } from "styled-components";
// import { updateHashtag } from "../Api";
import ModalWindowEl from "../styled/ModalWindowEl.styled";
import { useUrl } from "../../contexts/UrlContext";
import { debounce } from "lodash";

const Button = styled.button`
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #3c4043;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-size: 14px;
  font-weight: 500;
  height: 43px;
  justify-content: center;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform, opacity;
  z-index: 0;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-top: 30px;
  :hover {
    background: #f6f9fe;
    color: #1bbeff;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.31rem;

  border-top: 1px solid rgba(0, 0, 0, 0.2);
  height: 40px;
`;

const ItemContainer = styled.div`
  display: flex;
  max-height: 300px;
`;

const Title = styled.div``;

const ModalWindowHashEl = styled(ModalWindowEl)`
  width: 600px;
  height: 380px;
  @media (max-width: 640px) {
    width: 90%;
  }
`;

const HeaderContainer = styled.div`
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.2); */
`;

const Tag = styled.div`
  ${({ isClicked }) =>
    isClicked &&
    css`
      background-color: bisque;
      transition: 200ms;
      border-radius: 5px;
    `}
`;

const debounceFn = debounce((fn) => fn(), 300);

const ModalWindow = ({ handleCloseEditModal, setTotalTags }) => {
  const [keyword, setKeyword] = useState("");
  const [filterdTags, setFilterdTags] = useState([]);

  const totalTags = useUrl()?.hashtag?.totalHashtags;
  const assignedTags = useUrl()?.hashtag?.assignedHashtags;
  const addAssignedTag = useUrl()?.addAssignedTag;
  const removeAssignedTag = useUrl()?.removeAssignedTag;
  const { handleEditModify } = useUrl();

  const assignedTagNames = assignedTags.map((tag) => tag.name);
  // const assignedTags = useUrl().hashtag.assignedHashtags;

  // #FIXME: #1 검색필터
  const SearchFilter = useCallback(() => {
    const filterd = totalTags.filter((val) => {
      return val.name
        .toLowerCase()
        .replace(/(\s*)/g, "")
        .includes(keyword.toLowerCase().replace(/(\s*)/g, "")); // 큰거 작은거 검색하고싶은거를 뒤에 넣기
    });
    return filterd;
  }, [totalTags, keyword]);

  useEffect(() => {
    debounceFn.cancel();
    const fn = () => {
      const filterd = SearchFilter();
      setFilterdTags(filterd);
    };
    debounceFn(fn);
  }, [SearchFilter]);

  // FIXME: #2 ItemLeft토글 클릭
  const toggleClicked = useCallback(
    (clickedTag) => addAssignedTag(clickedTag),
    [totalTags, assignedTags]
  );

  // FIXME: #3 ItemLeft토글 해제
  const toggleUnClicked = useCallback(
    (clickedTag) => {
      // assigned 태그
      const filterdAssignedTags = assignedTags.filter((tag) => {
        return tag.name !== clickedTag.name;
      });
      removeAssignedTag(filterdAssignedTags);

      // total 태그
      const processedTotalTags = totalTags.map((tag) => {
        return clickedTag.name === tag.name
          ? { ...clickedTag, assigned: 0 }
          : tag;
      });
      setTotalTags(processedTotalTags);
    },
    [totalTags, assignedTags]
  );

  // FIXME: #4 ItemLeft토글기능
  const handleToggle = useCallback(
    (tag) => {
      !assignedTagNames.includes(tag.name)
        ? toggleClicked(tag)
        : toggleUnClicked(tag);
    },
    [assignedTags, totalTags]
  );

  // FIXME: #6 모달 닫기
  const handleCloseBtn = useCallback(() => {
    // 모달 스크롤 올리기
    HashtagModalScrollUp();
    // 모달 display: none
    handleCloseEditModal();
    // 전체 스크롤 가능하게 하기
    PopupDisable();
  }, [handleCloseEditModal]);

  const onClickEditBtn = useCallback(async () => {
    // 전체 스크롤 가능하게 하기
    PopupDisable();
    // 모달 닫기
    document.querySelector(".hashtagModal-container").style.display = "none";
    // 모달 스크롤 올리기
    HashtagModalScrollUp();
    // assigned태그 APICALL
    handleEditModify();
  }, [handleEditModify]);

  const oneItemLeft = ({ item, index }) => {
    const isClicked = assignedTagNames.includes(item.name);
    return (
      <Tag
        key={index}
        className="oneHash total-oneHash"
        onClick={() => handleToggle(item)}
        isClicked={isClicked}
      >
        {item.name}
      </Tag>
    );
  };

  const oneItemRight = ({ item, index }) => (
    <div key={index} className="oneHash" onClick={() => toggleUnClicked(item)}>
      {item.name}
    </div>
  );

  return (
    <ModalWindowHashEl>
      <HeaderContainer className="header-Container">
        <div className="close-area" onClick={handleCloseBtn}>
          <IoArrowBack />
        </div>
        <Title className="title">
          <h2>해쉬태그</h2>
        </Title>
      </HeaderContainer>
      <ItemContainer>
        <ItemLeft
          keyword={keyword}
          itemList={totalTags}
          handleToggle={handleToggle}
          filterdList={filterdTags}
          setKeyword={setKeyword}
          Item={oneItemLeft}
          placeholder="선택할 태그를 입력해주세요"
        />

        <ItemRight
          ItemList={assignedTags}
          Item={oneItemRight}
          Title="선택된 태그"
        />
      </ItemContainer>

      <ButtonWrapper className="editHash-btn">
        <Button onClick={onClickEditBtn}>수정하기</Button>
      </ButtonWrapper>
    </ModalWindowHashEl>
  );
};

export default ModalWindow;
