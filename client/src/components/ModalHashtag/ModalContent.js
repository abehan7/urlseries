import React, { useCallback, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { PopupDisable } from "../../Hooks/stopScroll";
import { HashtagModalScrollUp } from "../../Hooks/ScrollUp";
import ItemLeft from "./ItemLeft";
import ItemRight from "./ItemRight";
import styled from "styled-components";
import { ChangedAssignedTagAPI } from "../Api";

const Button = styled.button``;

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

const ModalWindow = styled.div`
  width: 600px;
  height: auto;
`;

const HeaderContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ModalContent = ({
  handleCloseModal,
  setAssignedTags,
  assignedTags,
  setTotalTags,
  totalTags,
}) => {
  const [searchBarInput, setSearchBarInput] = useState("");
  const [filterdTags, setFilterdTags] = useState([]);

  // #FIXME: #1 검색필터
  const SearchFilter = useCallback(() => {
    const filterd = totalTags.filter((val) => {
      return val.name
        .toLowerCase()
        .replace(/(\s*)/g, "")
        .includes(searchBarInput.toLowerCase().replace(/(\s*)/g, "")); // 큰거 작은거 검색하고싶은거를 뒤에 넣기
    });
    return filterd;
  }, [totalTags, searchBarInput]);

  useEffect(() => {
    const filterd = SearchFilter();
    setFilterdTags(filterd);
  }, [SearchFilter]);

  // FIXME: #2 ItemLeft토글 클릭
  const ToggleClicked = useCallback(
    (clickedTag) => {
      console.log("토글 클릭");

      // assignedTags
      setAssignedTags((tag) => [...tag, { ...clickedTag, assigned: 1 }]);

      // totalTags
      const filterd = totalTags.map((tag) => {
        return tag.name === clickedTag.name ? { ...tag, assigned: 1 } : tag;
      });
      setTotalTags(filterd);
    },
    [totalTags, assignedTags]
  );

  // FIXME: #3 ItemLeft토글 해제
  const ToggleUnClicked = useCallback(
    (clickedTag) => {
      console.log("토글 해제");
      // assigned 태그
      const filterdAssignedTags = assignedTags.filter((tag) => {
        return tag.name !== clickedTag.name;
      });
      setAssignedTags(filterdAssignedTags);

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
    (e, val) => {
      e.target.classList.toggle("clicked");
      e.target.classList[2] === "clicked"
        ? ToggleClicked(val)
        : ToggleUnClicked(val);
    },
    [assignedTags, totalTags]
  );

  // FIXME: #6 모달 닫기
  const handleCloseBtn = useCallback(() => {
    // 모달 스크롤 올리기
    HashtagModalScrollUp();
    // 모달 display: none
    handleCloseModal();
    // 전체 스크롤 가능하게 하기
    PopupDisable();
  }, [handleCloseModal]);

  // #FIXME: #7 수정하기 버튼
  const handleEditModify = useCallback(async () => {
    for (const element of [
      [assignedTags, setAssignedTags],
      [totalTags, setTotalTags],
    ]) {
      const filterd = element[0].map((tag) => {
        // origin을 assigned로 바꾸기
        return { ...tag, origin: tag.assigned };
      });
      element[1](filterd);
    }
    // console.log(assignedTags);
    const processed = assignedTags.map((tag) => {
      return tag.name;
    });
    await ChangedAssignedTagAPI(processed);
  }, [assignedTags, totalTags]);

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

  const oneItemRight = ({ name, i, oneItem, handleToggle }) => (
    <div key={i} className="oneHash" onClick={() => handleToggle(oneItem)}>
      {name}
    </div>
  );

  const oneItemLeft = ({ i, handleClassName, handleToggle, oneItem, name }) => (
    <div
      key={i}
      className={() => handleClassName(oneItem)}
      onClick={(e) => handleToggle(e, oneItem)}
    >
      {name}
    </div>
  );

  return (
    <ModalWindow className="modal-window">
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
          searchBarInput={searchBarInput}
          itemList={totalTags}
          handleToggle={handleToggle}
          filterdList={filterdTags}
          setSearchBarInput={setSearchBarInput}
          Item={oneItemLeft}
        />

        <ItemRight
          ItemList={assignedTags}
          handleToggle={ToggleUnClicked}
          Item={oneItemRight}
          Title="선택된 태그"
        />
      </ItemContainer>

      <ButtonWrapper className="editHash-btn">
        <Button onClick={onClickEditBtn}>수정하기</Button>
      </ButtonWrapper>
    </ModalWindow>
  );
};

export default ModalContent;
