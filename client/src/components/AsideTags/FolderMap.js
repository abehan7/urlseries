import React from "react";
import { AiOutlineFolder } from "react-icons/ai";

const FolderMap = ({ handleClickFolderTag, folder }) => {
  const folderIconStyle_v2 = {
    pointerEvents: "none",
    display: "flex",
    paddingRight: "3px",
  };
  const folderTagStyle = {};

  const onClick = (e) => {
    // BoxTags_First가 true면 아직 클릭 안했다는 의미
    // FirstOpacity();
    // 선택에 따라서 색깔변화
    e.target.style.opacity === "0.3" && (e.target.style.opacity = "1");
    e.target.style.opacity !== "0.3" && (e.target.style.opacity = "0.3");
    handleClickFolderTag({ e, folder });
  };
  return (
    <>
      {folder.like && (
        <span
          className="tag folder-tag"
          style={folderTagStyle}
          onClick={onClick}
        >
          <div className="folder-tag-icon" style={folderIconStyle_v2}>
            <AiOutlineFolder />
          </div>
          {folder.folder_name}
        </span>
      )}
    </>
  );
};

export default FolderMap;
