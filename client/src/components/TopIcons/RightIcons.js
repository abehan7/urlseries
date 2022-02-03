import React, { useContext } from "react";
import { AiOutlineEdit, AiOutlineFolder, AiTwotoneEdit } from "react-icons/ai";
import { BiPaperPlane } from "react-icons/bi";
import { FiFolder } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";
import { MdOutlineTag } from "react-icons/md";
import styled from "styled-components";
import { TopTwoRectsEditModeScrollUp } from "../../Hooks/ScrollUp";
import { PopupEnable } from "../../Hooks/stopScroll";
import { MainStates } from "../../routers/MainPage";
import { RefreshBtn } from "../AsideTags/BoxTagControler";

const ShareIcon = styled.div`
  font-size: 1.3rem;
`;
const RightIcons = ({
  editMode,
  shareMode,
  BoxTags_First,
  setBoxTags_First,
  setBoxTags,
  setEditMode,
  setDeleteMode,
  deleteMode,
}) => {
  // const context = useContext(MainStates);
  const onClickAddIcon = () => {
    if (!editMode || !shareMode) {
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

  const onClickhashIcon = () => {
    // #@#@#@#@#@#@#@#@#@#@여기가 전체 태그 풀어주는 곳 START #@#@#@#@#@#@#@#@#@#@
    // BoxTags_First 처음값 true
    if (!BoxTags_First) {
      RefreshBtn({ setBoxTags_First, setBoxTags });
      return;
    }
    // #@#@#@#@#@#@#@#@#@#@여기가 전체 태그 풀어주는 곳 END #@#@#@#@#@#@#@#@#@#@

    document.querySelector(".hashtagModal-container").style.display = "block";
    PopupEnable();
  };
  const onClickFolderIcon = () => {
    console.log("폴더 모달");
    document.querySelector(".folderModal-container").style.display = "block";
    PopupEnable();
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
        <MdOutlineTag style={!BoxTags_First ? HashIconStyle : emptyStyle} />
      </div>

      <ShareIcon className="folder-icon" onClick={onClickFolderIcon}>
        <AiOutlineFolder />
      </ShareIcon>
    </div>
  );
};

export default RightIcons;
