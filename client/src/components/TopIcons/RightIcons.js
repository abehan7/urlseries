import React from "react";
import { AiOutlineEdit, AiOutlineFolder, AiTwotoneEdit } from "react-icons/ai";

import { FiPlusSquare } from "react-icons/fi";
import { MdOutlineTag } from "react-icons/md";
import styled from "styled-components";
import { TopTwoRectsEditModeScrollUp } from "../../Hooks/ScrollUp";
import { PopupEnable } from "../../Hooks/stopScroll";

// import { RefreshBtn } from "../AsideTags/BoxTagControler";
import { useDispatch } from "react-redux";

import { OPEN_MODAL } from "../../store/reducers/Modal";
import { useUrl } from "../../contexts/UrlContext";
const ShareIcon = styled.div`
  font-size: 1.3rem;
`;

const RightIcons = ({ editMode, setEditMode, setDeleteMode, deleteMode }) => {
  const dispatch = useDispatch();

  const { handleGetTotalTags } = useUrl();

  const onClickAddIcon = () => {
    if (!editMode) {
      return;
    }
    document.querySelector(".addUrl-container").style.display = "block";
    PopupEnable();
  };
  const onClickEditIcon = () => {
    TopTwoRectsEditModeScrollUp();
    deleteMode && setDeleteMode(false);

    setEditMode(!editMode);

    // EditModeRectsFunc(editMode);
  };

  const onClickhashIcon = async () => {
    await handleGetTotalTags();
    document.querySelector(".hashtagModal-container").style.display = "block";
    PopupEnable();
  };
  const onClickFolderIcon = () => {
    document.querySelector(".folderModal-container").style.display = "block";
    PopupEnable();
    dispatch(OPEN_MODAL());
  };

  // ========================================== 스타일 START ==========================================
  const turn = 0.3;
  const transitionTime = 1;
  const emptyStyle = {
    transition: `${transitionTime}s ease-in-out`,
  };
  const HashIconStyle = {
    transform: ` rotate(${turn}turn) `,
    transition: `${transitionTime}s ease-in-out`,
    color: "#fff",
  };

  const stopClickStyle = {};

  // ========================================== 스타일 END ==========================================

  return (
    <div className="right-icons">
      <div className="addUrl-icon" onClick={onClickAddIcon}>
        <FiPlusSquare />
      </div>

      <div className="editUrl-icon" onClick={onClickEditIcon}>
        {editMode ? (
          <AiOutlineEdit style={stopClickStyle} />
        ) : (
          <AiTwotoneEdit style={stopClickStyle} />
        )}
      </div>

      <div className="editHash-icon" onClick={onClickhashIcon}>
        <MdOutlineTag style={emptyStyle} />
      </div>

      <ShareIcon className="folder-icon" onClick={onClickFolderIcon}>
        <AiOutlineFolder />
      </ShareIcon>
    </div>
  );
};

export default RightIcons;
