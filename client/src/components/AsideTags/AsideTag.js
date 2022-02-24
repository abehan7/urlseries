import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolders } from "../../store/reducers/Folders";
import {
  getFolderTagItems,
  REMOVE_FOLDER_TAGS,
  SET_FOLDER_TAGS,
} from "../../store/reducers/Tags";
import BoxTagControler from "./BoxTagControler";
import FolderMap from "./FolderMap";

const AsideTag = ({
  BoxTags_First,
  setBoxTags_First,
  BoxTags,
  setBoxTags,
  assignedTags,
}) => {
  // FIXME: set redux

  const folders = useSelector(getFolders);
  const folderTagItems = useSelector(getFolderTagItems);

  const dispatch = useDispatch();
  // console.log("folders from asideTags", folders);

  // FIXME: functions

  const setFirstOpacity = () => {
    // 처음에 한번 누르면 전체 투명도 낮아지는 거
    if (BoxTags_First) {
      document.querySelectorAll(".tag").forEach((one) => {
        one.style.opacity = "0.3";
        one?.classList?.remove("aside-folder-clicked");
      });
      setBoxTags_First(false);
    }
  };

  const handleClickFolderTag = (folder) => {
    const clickedOnceFn = () => {
      dispatch(SET_FOLDER_TAGS(folder._id));
    };
    const clickedSecondFn = () => {
      dispatch(REMOVE_FOLDER_TAGS(folder._id));
    };
    console.log(folder);
    !folderTagItems.includes(folder?._id) && clickedOnceFn();
    folderTagItems.includes(folder?._id) && clickedSecondFn();
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
      {folders?.map((folder) => {
        const clicked = folderTagItems.includes(folder._id);
        return (
          <FolderMap
            handleClickFolderTag={handleClickFolderTag}
            folder={folder}
            clicked={clicked}
          />
        );
      })}
    </>
  );
};

export default AsideTag;
