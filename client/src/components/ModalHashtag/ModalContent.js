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
  assignedTags,
  totalTags,
  setTotalTags,
}) => {
  const [searchedTag, setSearchedTag] = useState("");
  const [filterdTags, setFilterdTags] = useState([]);

  // #FIXME: #1 검색필터
  const SearchFilter = useCallback(() => {
    const filterd = totalTags.filter((val) => {
      return val.name
        .toLowerCase()
        .replace(/(\s*)/g, "")
        .includes(searchedTag.toLowerCase().replace(/(\s*)/g, "")); // 큰거 작은거 검색하고싶은거를 뒤에 넣기
    });
    return filterd;
  }, [totalTags]);

  useEffect(() => {
    const filterd = SearchFilter();
    setFilterdTags(filterd);
  }, [totalTags]);

  // FIXME: #2 좌측 토글 클릭
  const ToggleClicked = (val) => {};

  // FIXME: #3 좌측 토글 해제
  const ToggleUnClicked = (val) => {
    //공통
    setTotalTags(
      totalTags.map((tag) => {
        return val.name === tag.name ? val : tag;
      })
    );
  };

  // FIXME: #4 어떤 기능인지 잘 모르겠어
  const toggleFunc = (e, val) => {
    e.target.classList.toggle("clicked");
    e.target.classList[2] === "clicked"
      ? ToggleClicked({ val })
      : ToggleUnClicked({ val });
  };

  // FIXME:  #5 우측 토글 해제
  const removeToggle = (val) => {};

  // FIXME: #6 모달 닫기
  const handleCloseBtn = () => {
    // 모달 스크롤 올리기
    HashtagModalScrollUp();
    // 모달 display: none
    handleCloseModal();
    // 전체 스크롤 가능하게 하기
    PopupDisable();
  };

  // #FIXME: #7 수정하기 버튼
  const onClickBtn = async () => {};

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
          searchedTag={searchedTag}
          totalTags={totalTags}
          toggleFunc={toggleFunc}
          filterd={filterdTags}
          setSearchedTag={setSearchedTag}
        />

        <ItemRight assignedTags={assignedTags} removeToggle={removeToggle} />
      </div>

      <ButtonWrapper className="editHash-btn">
        <Button onClick={onClickBtn}>수정하기</Button>
      </ButtonWrapper>
    </div>
  );
};

export default ModalContent;
