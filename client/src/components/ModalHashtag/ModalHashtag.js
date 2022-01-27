import React, { useCallback } from "react";
import "./ModalHashtag.css";
import ModalContent from "./ModalContent";

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

    setAssignedTags(resetedAssignedTags);
    setTotalTags(resetedTotalTags);
  }, [totalTags, assignedTags]);

  // FIXME: 스타일
  // 스타일 오른쪽 화살표 남겨두기 hidden으로

  return (
    <div id="modal" className="modal-overlay hash-overlay">
      <ModalContent
        handleCloseModal={handleCloseModal}
        setAssignedTags={setAssignedTags}
        assignedTags={assignedTags}
        totalTags={totalTags}
        setTotalTags={setTotalTags}
      />
    </div>
  );
};

export default ModalHashtag;
