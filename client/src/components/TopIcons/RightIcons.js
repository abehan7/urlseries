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
  return (
    <div className="right-icons">
      <div
        className="addUrl-icon"
        onClick={() => {
          if (!editMode || !shareMode) {
            return;
          }
          document.querySelector(".addUrl-container").style.display = "block";
          enable();
        }}
      >
        <FiPlusSquare />
      </div>

      <div
        className="editUrl-icon"
        onClick={(e) => {
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
        }}
      >
        {editMode ? <AiOutlineEdit /> : <AiTwotoneEdit />}
      </div>
      <div
        className="editHash-icon"
        onClick={() => {
          document.querySelector(".hashtagModal-container").style.display =
            "block";

          enable();
        }}
      >
        <MdOutlineTag />
      </div>
      <div
        className="shareUrl-icon"
        onClick={() => {
          console.log("공유기능");
          // document.querySelector(".shareUrl-container").style.display = "block";
          // enable();
        }}
      >
        <BiPaperPlane />
      </div>
    </div>
  );
};

export default RightIcons;
