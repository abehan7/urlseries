import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { useUrl } from "../../contexts/UrlContext";
import { HashtagModalScrollUp } from "../../Hooks/ScrollUp";
import { PopupDisable } from "../../Hooks/stopScroll";
import ModalOverlay from "../styled/ModalOverlay.styled";
import ModalWindow from "./ModalWindow";

const ModalHashtagEl = styled(ModalOverlay)`
  .oneHash {
    cursor: pointer;
    display: block;
    font-size: 12px;
    padding: 3px;
    margin: 1px;
    text-transform: uppercase;
    border: 3px solid #bbbbbb;
    border-radius: 1em;
    transition: transform 0.2s;
    transition-timing-function: cubic-bezier(0.45, -0.85, 0.55, -0.45);
  }

  .oneHash:hover {
    /* background-color: bisque; */
    transition: 200ms;
    border-radius: 1em;
    transform: scale(1.2);
    background: linear-gradient(to right, #ff8a00, #da1b60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .clicked {
    background-color: #ff4b2b;
    color: white;
    transition: 200ms;
    border-radius: 5px;
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
  const { handleCloseEditModal } = useUrl();

  const outSideRef = useRef(null);
  // outSideRef.style.cursor = "pointer";

  const onClickOutSide = (e) => {
    if (e.target === outSideRef.current) {
      HashtagModalScrollUp();
      handleCloseEditModal();
      PopupDisable();
    }
  };

  // FIXME: 스타일
  // 스타일 오른쪽 화살표 남겨두기 hidden으로

  return (
    <ModalHashtagEl onMouseDown={onClickOutSide} ref={outSideRef}>
      <ModalWindow
        handleCloseEditModal={handleCloseEditModal}
        setAssignedTags={setAssignedTags}
        assignedTags={assignedTags}
        setTotalTags={setTotalTags}
        totalTags={totalTags}
      />
    </ModalHashtagEl>
  );
};

export default ModalHashtag;
