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
  const AddIconOnClick = () => {
    if (!editMode || !shareMode) {
      return;
    }
    document.querySelector(".addUrl-container").style.display = "block";
    PopupEnable();
  };
  const EditIconOnClick = () => {
    TopTwoRectsEditModeScrollUp();
    deleteMode && setDeleteMode(false);

    setEditMode(!editMode);

    // EditModeRectsFunc(editMode);
  };

  const HashIconOnClick = () => {
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
  const ShareIconOnClick = () => {
    // console.log(context.isDarkMode);
    // context.setIsDarkMode(!context.isDarkMode);
    console.log("공유기능");
    // document.querySelector(".shareUrl-container").style.display = "block";
    // PopupEnable();
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
      <div className="addUrl-icon" onClick={AddIconOnClick}>
        <FiPlusSquare />
      </div>

      <div className="editUrl-icon" onClick={EditIconOnClick}>
        {editMode ? (
          <AiOutlineEdit style={stopClickStyle} />
        ) : (
          <AiTwotoneEdit style={stopClickStyle} />
        )}
      </div>

      <div className="editHash-icon" onClick={HashIconOnClick}>
        <MdOutlineTag style={!BoxTags_First ? HashIconStyle : emptyStyle} />
      </div>

      <ShareIcon className="shareUrl-icon" onClick={ShareIconOnClick}>
        <AiOutlineFolder />
      </ShareIcon>
    </div>
  );
};

export default RightIcons;
