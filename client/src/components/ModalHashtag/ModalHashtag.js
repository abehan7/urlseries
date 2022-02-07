import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { HashtagModalScrollUp } from "../../Hooks/ScrollUp";
import { PopupDisable } from "../../Hooks/stopScroll";
import ModalOverlay from "../styled/ModalOverlay.styled";
import ModalWindow from "./ModalWindow";

const ModalHashtagEl = styled(ModalOverlay)`
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
    if (e.target === outSideRef.current) {
      HashtagModalScrollUp();
      handleCloseModal();
      PopupDisable();
    }
  };

  // FIXME: 스타일
  // 스타일 오른쪽 화살표 남겨두기 hidden으로

  return (
    <ModalHashtagEl onMouseDown={onClickOutSide} ref={outSideRef}>
      <ModalWindow
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
