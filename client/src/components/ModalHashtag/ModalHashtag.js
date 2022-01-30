import React, { useCallback, useRef } from "react";
// import "./ModalHashtag.css";
import ModalContent from "./ModalContent";
import styled from "styled-components";

const ModalHashtagEl = styled.div`
  .hash-overlay {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 40px;
  }

  /* 폴더 뒷배경으로 하는 기능 */
  .hashTag-modal-window {
    /* position: relative; */
    width: 600px;
    height: auto;
  }
  .big-folder-Icon {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-size: 100px;
    pointer-events: none;
    opacity: 0.1;
  }

  .HashTagItems {
    display: flex;
    max-height: 300px;
  }

  .LeftItem,
  .RightItem {
    flex: 1;
  }

  .HashTag-header-Container {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .searchTags-Container {
    padding: 11px;
    padding-top: 5px;
    padding-bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .LeftItem {
    border-right: 1px solid rgba(0, 0, 0, 0.2);
  }
  .searchTags-Container > input {
    padding: 0%;
    border: none;
  }

  .flexWrapBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;
    overflow-y: auto;
    max-height: 200px;
    padding-top: 5px;
  }

  .hashtag-content {
    position: relative;
    height: auto;
    min-height: 205px;
    margin: 0;
  }

  .hashTag-modal-window > .editHash-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    height: 40px;
  }

  .oneHash {
    cursor: pointer;
  }

  .oneHash:hover {
    background-color: bisque;
    transition: 200ms;
    border-radius: 5px;
  }

  .clicked {
    background-color: bisque;
    transition: 200ms;
    border-radius: 5px;
  }

  .selected-tags {
    height: auto;
    width: 300px;
    padding: 10px;
  }

  .chosen-title {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .chosen-title > h3 {
    margin: 0%;
    padding: 3.5px;
  }

  .hash-next-modal {
  }
  .right-arrow,
  .left-arrow {
    font-size: 60px;
  }

  .right-arrow > svg,
  .left-arrow > svg {
    color: #ffffff;
    cursor: pointer;
  }
`;

const ModalHashtag = ({
  assignedTags,
  setAssignedTags,
  totalTags,
  setTotalTags,
}) => {
  // FIXME: handler
  // 1P에서 사용하는 back
  const handleCloseModal = useCallback(() => {
    document.querySelector(".hashtagModal-container").style.display = "none";

    const resetedAssignedTags = totalTags.filter((tag) => {
      return tag.origin === 1;
    });

    const resetedTotalTags = totalTags.map((tag) => {
      return { ...tag, assigned: tag.origin };
    });
    // console.log(resetedAssignedTags);

    setAssignedTags(resetedAssignedTags);
    setTotalTags(resetedTotalTags);
  }, [totalTags, assignedTags]);

  const outSideRef = useRef(null);

  const onClickOutSide = (e) => {
    e.target === outSideRef.current && handleCloseModal();
  };

  // FIXME: 스타일
  // 스타일 오른쪽 화살표 남겨두기 hidden으로

  return (
    <ModalHashtagEl
      id="modal"
      className="modal-overlay hash-overlay"
      onMouseDown={onClickOutSide}
      ref={outSideRef}
    >
      <ModalContent
        handleCloseModal={handleCloseModal}
        setAssignedTags={setAssignedTags}
        assignedTags={assignedTags}
        setTotalTags={setTotalTags}
        totalTags={totalTags}
      />
    </ModalHashtagEl>
  );
};

export default ModalHashtag;
