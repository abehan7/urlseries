import React from "react";
import { AiOutlineEdit, AiTwotoneEdit } from "react-icons/ai";
import { BiPaperPlane } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import { MdOutlineTag } from "react-icons/md";
import { enable } from "../../functions/stopScroll";
import EditModeRectsFunc from "../editModeFucs/EditModeRectsFunc";

const RightIcons = ({
  editMode,
  shareMode,
  BoxTags_First,
  setBoxTags_First,
  setBoxTags,
  setEditMode,
}) => {
  const AddIconOnClick = () => {
    if (!editMode || !shareMode) {
      return;
    }
    document.querySelector(".addUrl-container").style.display = "block";
    enable();
  };
  const EditIconOnClick = () => {
    if (!shareMode) {
      return;
    }
    if (!BoxTags_First) {
      setBoxTags_First(!BoxTags_First);
      setBoxTags([]);
      document.querySelectorAll(".tag").forEach((tag) => {
        tag.style.opacity = "1";
      });
      return;
    }

    setEditMode(!editMode);
    EditModeRectsFunc(editMode);
  };

  const HashIconOnClick = () => {
    document.querySelector(".hashtagModal-container").style.display = "block";
    enable();
  };
  const ShareIconOnClick = () => {
    console.log("공유기능");
    // document.querySelector(".shareUrl-container").style.display = "block";
    // enable();
  };
  return (
    <div className="right-icons">
      <div className="addUrl-icon" onClick={AddIconOnClick}>
        <FiPlusSquare />
      </div>

      <div className="editUrl-icon" onClick={EditIconOnClick}>
        {editMode ? <AiOutlineEdit /> : <AiTwotoneEdit />}
      </div>

      <div className="editHash-icon" onClick={HashIconOnClick}>
        <MdOutlineTag />
      </div>

      <div className="shareUrl-icon" onClick={ShareIconOnClick}>
        <BiPaperPlane />
      </div>
    </div>
  );
};

export default RightIcons;
