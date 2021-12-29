import React, { useEffect } from "react";
import { AiOutlineFolder } from "react-icons/ai";
import { useSelector } from "react-redux";
import BoxTagControler from "./BoxTagControler";

const AsideTag = ({
  editMode,
  BoxTags_First,
  setBoxTags_First,
  BoxTags,
  setBoxTags,
  assignedTags,
}) => {
  // ====== 리덕스 folderItems 가지고오는 곳 START ======
  const {
    page3Storage: { folderItems },
  } = useSelector((state) => state);

  // ====== 리덕스 folderItems 가지고오는 곳 END ======

  const folderTagStyle = {};

  const folderIconStyle_v2 = {
    pointerEvents: "none",
    display: "flex",
    paddingRight: "3px",
  };

  return (
    <>
      {/* 태그 공간 */}
      {assignedTags.map((tag) => {
        return (
          <span
            className="tag"
            onClick={(e) => {
              BoxTagControler({
                e,
                BoxTags_First,
                setBoxTags_First,
                BoxTags,
                setBoxTags,
              });
            }}
          >
            {tag.name}
          </span>
        );
      })}

      {/* 폴더 공간 */}
      {/* FIXME:12/30(목) 마지막 작업 제대로 하기 */}
      {folderItems.map((folder) => {
        return (
          <span
            className="tag folder-tag"
            style={folderTagStyle}
            onClick={(e) => {
              e.target.classList.toggle("folder-clicked");
              if (e.target.classList[2] === "folder-clicked") {
                setBoxTags((val) => [...val, ...folder.folder_contents]);
                setBoxTags_First(false);
              } else {
                setBoxTags((val) => [...val, ...folder.folder_contents]);
                setBoxTags(
                  BoxTags.filter(
                    (tag) =>
                      !folder.folder_contents.some((ftag) => ftag === tag)
                  )
                );

                let tmp = BoxTags.filter(
                  (tag) => !folder.folder_contents.some((ftag) => ftag === tag)
                );
                // 이거 되면 전체 해쉬태그 풀려
                tmp.length === 0 && setBoxTags_First(true);
              }

              // setBoxTags
            }}
          >
            <div className="folder-tag-icon" style={folderIconStyle_v2}>
              <AiOutlineFolder />
            </div>
            {folder.folder_name}
          </span>
        );
      })}
    </>
  );
};

export default AsideTag;
