import React, { useCallback, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { PopupDisable } from "../../Hooks/stopScroll";
import { HashtagModalScrollUp } from "../../Hooks/ScrollUp";
import ItemLeft from "./ItemLeft";
import ItemRight from "./ItemRight";
import styled from "styled-components";
import { updateHashtag } from "../Api";
import ModalWindowEl from "../styled/ModalWindowEl.styled";

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

const ModalWindowHashEl = styled(ModalWindowEl)`
  width: 600px;
  height: auto;
  @media (max-width: 640px) {
    width: 90%;
  }
`;

const HeaderContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ModalWindow = ({
  handleCloseModal,
  setAssignedTags,
  assignedTags,
  setTotalTags,
  totalTags,
}) => {
  const [keyword, setKeyword] = useState("");
  const [filterdTags, setFilterdTags] = useState([]);

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
    const filterd = SearchFilter();
    setFilterdTags(filterd);
  }, [SearchFilter]);

  // FIXME: #2 ItemLeft토글 클릭
  const ToggleClicked = useCallback(
    (clickedTag) => {
      console.log(clickedTag);

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
    await updateHashtag(processed);
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

  // FIXME:   className === clicked면 색깔 노랑
  const totalMapColor = useCallback((val) => {
    return val.assigned === 1
      ? "oneHash total-oneHash clicked"
      : "oneHash total-oneHash";
  }, []);

  const oneItemLeft = ({ item, index }) => (
    <div
      key={index}
      className={totalMapColor(item)}
      onClick={(e) => handleToggle(e, item)}
    >
      {item.name}
    </div>
  );

  const oneItemRight = ({ item, index }) => (
    <div key={index} className="oneHash" onClick={() => ToggleUnClicked(item)}>
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
          handleToggle={ToggleUnClicked}
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
