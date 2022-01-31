import React, { useCallback, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { PopupDisable } from "../../functions/stopScroll";
import { HashtagModalScrollUp } from "../../functions/ScrollUp";
import ItemLeft from "./ItemLeft";
import ItemRight from "./ItemRight";
import styled from "styled-components";

const Button = styled.button``;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.31rem;
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
  const handleEditModify = useCallback(() => {
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

  return (
    <div className="modal-window hashTag-modal-window">
      <div className="header-Container HashTag-header-Container">
        <div className="close-area" onClick={handleCloseBtn}>
          <IoArrowBack />
        </div>
        <div className="title">
          <h2>해쉬태그</h2>
        </div>
      </div>
      <div className="HashTagItems">
        <ItemLeft
          searchBarInput={searchBarInput}
          totalTags={totalTags}
          handleToggle={handleToggle}
          filterdTags={filterdTags}
          setSearchBarInput={setSearchBarInput}
        />

        <ItemRight
          assignedTags={assignedTags}
          ToggleUnClicked={ToggleUnClicked}
        />
      </div>

      <ButtonWrapper className="editHash-btn">
        <Button onClick={onClickEditBtn}>수정하기</Button>
      </ButtonWrapper>
    </div>
  );
};

export default ModalContent;
