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

  // ================== 스타일 관리하는 곳 START ==================

  const folderTagStyle = {};

  const folderIconStyle_v2 = {
    pointerEvents: "none",
    display: "flex",
    paddingRight: "3px",
  };
  // ================== 스타일 관리하는 곳 END ==================

  const ClickFolderTag = ({ e, folder }) => {
    e.target.classList.toggle("aside-folder-clicked");
    if (e.target.classList[2] === "aside-folder-clicked") {
      // 여기는 한번 클릭됬을때
      setBoxTags((val) => [...val, ...folder.folder_contents]);
      setBoxTags_First(false);
    } else {
      // 클릭 2번했을 때
      setBoxTags((val) => [...val, ...folder.folder_contents]);
      setBoxTags(
        BoxTags.filter(
          (tag) => !folder.folder_contents.some((ftag) => ftag === tag)
        )
      );

      let tmp = BoxTags.filter(
        (tag) => !folder.folder_contents.some((ftag) => ftag === tag)
      );
      // 이거 되면 전체 해쉬태그 풀려
      tmp.length === 0 && setBoxTags_First(true);
      // 하나도 업승면 전체 찐하게
      tmp.length === 0 &&
        document.querySelectorAll(".tag").forEach((one) => {
          one.style.opacity = "1";
        });
      // 그리고 다시 색깔 1로 바꾸기
      tmp.length === 0 && (e.target.style.opacity = "1");
      // tmp.length === 0 && e.target.classList.remove("aside-folder-clicked");
    }

    // setBoxTags
  };

  const FirstOpacity = () => {
    // 처음에 한번 누르면 전체 투명도 낮아지는 거
    if (BoxTags_First) {
      document.querySelectorAll(".tag").forEach((one) => {
        one.style.opacity = "0.3";
        one?.classList?.remove("aside-folder-clicked");
      });
      setBoxTags_First(false);
    }
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
              // BoxTags_First가 true면 아직 클릭 안했다는 의미
              FirstOpacity();
              // ====================================== 선택에 따라서 색깔변화 START ======================================
              if (e.target.style.opacity === "0.3") {
                e.target.style.opacity = "1";
              } else {
                e.target.style.opacity = "0.3";
              }
              // ====================================== 선택에 따라서 색깔변화 END ======================================
              ClickFolderTag({ e, folder });
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
