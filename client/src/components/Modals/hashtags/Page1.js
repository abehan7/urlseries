import React, { useState } from "react";
import { AiOutlineFolder } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { PopupDisable } from "../../../functions/stopScroll";
import { Page3Actions } from "../../../store/reducers/editModalP3";
import { closeFunc, modify } from "./HashModalFuncs";
import HashTagItems from "./HashTagItems";
import { FolderContentsChangedAPI } from "../../Api";
import { HashtagModalScrollUp } from "../../../functions/ScrollUp";

const Page1 = ({
  handleClickBackIcon,
  setAssignedTags,
  assignedTags,
  totalTags,
  setTotalTags,
  nowPage,
  setNowPage,
}) => {
  const [tagSearch, setTagSearch] = useState("");

  // =========== [0] 검색필터 START ===========

  let filterd = [];
  filterd = totalTags.filter((val) => {
    return val.name
      .toLowerCase()
      .replace(/(\s*)/g, "")
      .includes(tagSearch.toLowerCase().replace(/(\s*)/g, "")); // 큰거 작은거 검색하고싶은거를 뒤에 넣기
  });
  // =========== [0] 검색필터 END ===========

  // =========== [1] 토글 클릭 START ===========
  const ToggleClicked = ({ val }) => {
    // 1P일 때 클릭 토글 start
    if (nowPage2 === 1) {
      val.assigned = 1;
      setTotalTags(
        totalTags.map((tag) => {
          return val.name === tag.name ? val : tag;
        })
      );
      setAssignedTags((tag) => [...tag, val]);
      console.log(val);
      console.log("클릭됨");
      // 1P일 때 클릭 토글 end

      // 3P일 때 클릭 토글 start
    } else if (nowPage2 === 3) {
      console.log("정상적으로 작동중");
      val.folderAssigned = 1;
      nowFolder2.folder_contents = [val.name, ...nowFolder2.folder_contents];
      console.log(nowFolder2);

      setTotalTags(
        totalTags.map((tag) => {
          return val.name === tag.name ? val : tag;
        })
      );
      // 3P일 때 클릭 토글 end
    }
  };
  // =========== 토글 클릭 END ===========

  // =========== [2] 토글 클릭 해제 START ===========
  const ToggleUnClicked = ({ val }) => {
    nowPage2 === 1 ? (val.assigned = 0) : (val.folderAssigned = 0);

    //공통
    setTotalTags(
      totalTags.map((tag) => {
        return val.name === tag.name ? val : tag;
      })
    );

    if (nowPage2 === 1) {
      setAssignedTags(
        assignedTags.filter((tag2) => {
          return tag2.name !== val.name;
        })
      );
    } else if (nowPage2 === 3) {
      nowFolder2.folder_contents = nowFolder2.folder_contents.filter((one) => {
        return val.name !== one;
      });
    }
  };
  // =========== 토글 클릭 해제 END ===========

  // =========== [3] 토글 전체 기능 START ===========
  const toggleFunc = (e, val) => {
    e.target.classList.toggle("clicked");
    e.target.classList[2] === "clicked"
      ? ToggleClicked({ val })
      : ToggleUnClicked({ val });
  };
  // =========== 토글 전체 기능 END ===========

  // =========== [4] 오른쪽 토글 없애기 기능 START ===========
  const removeToggle = (val) => {
    if (nowPage2 === 1) {
      setTotalTags(
        totalTags.map((tag) => {
          return val.name === tag.name
            ? {
                ...tag,
                assigned: 0,
              }
            : tag;
        })
      );

      setAssignedTags(
        assignedTags.filter((tag2) => {
          return tag2 !== val;
        })
      );
    } else if (nowPage2 === 3) {
      console.log("3P");
      nowFolder2.folder_contents = nowFolder2.folder_contents.filter((one) => {
        return val !== one;
      });
      setTotalTags(
        totalTags.map((tag) => {
          return tag.name === val ? { ...tag, folderAssigned: 0 } : tag;
        })
      );
    }
  };
  // =========== 오른쪽 토글 없애기 기능 END ===========

  const handleCloseBtn = () => {
    HashtagModalScrollUp();
    handleClickBackIcon();
    nowPage === 3 && setNowPage(1);
    SetReduxNowFolder({});
    PopupDisable();
  };

  // =========== 리덕스 START ===========

  const {
    page3Storage: { nowPage2, nowFolder2, folderItems },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const SetReduxNowFolder = (folder2) => {
    dispatch(Page3Actions.SetNowFolder(folder2));
  };

  return (
    <div className="modal-window hashTag-modal-window">
      <div className="header-Container HashTag-header-Container">
        <div className="close-area" onClick={handleCloseBtn}>
          <IoArrowBack />
        </div>
        <div className="title">
          <h2>{nowPage === 3 ? nowFolder2.folder_name : "해쉬태그"}</h2>
        </div>
      </div>

      <HashTagItems
        tagSearch={tagSearch}
        totalTags={totalTags}
        toggleFunc={toggleFunc}
        filterd={filterd}
        setTagSearch={setTagSearch}
        assignedTags={assignedTags}
        removeToggle={removeToggle}
      />
      <div className="editHash-btn">
        <button
          onClick={async () => {
            if (nowPage2 === 1) {
              await modify(setTotalTags, totalTags, assignedTags, setTagSearch);
              PopupDisable();
            } else if (nowPage2 === 3) {
              console.log("page1 수정하기");
              // 창닫기
              document.querySelector(".hashtagModal-container").style.display =
                "none";

              // 폴더 내부 태그들 수정하기 start
              let editedTags = [];
              totalTags.forEach((val) => {
                if (val.folderAssigned === 1) {
                  editedTags.push(val.name);
                }
              });

              // console.log(editedTags);

              folderItems.forEach((item) => {
                if (item._id === nowFolder2._id) {
                  item.folder_contents = editedTags;
                }
              });
              // 이제 초기화해주기

              console.log(nowFolder2);
              setNowPage(1);
              SetReduxNowFolder({});

              setTagSearch("");
              PopupDisable();
              // 폴더 내부 태그들 수정하기 end
              await FolderContentsChangedAPI(nowFolder2);

              // 이제 테스트 완료 됬으니 이거를 folderItems.folder_contents에 싹 넣으면 될 듯 map 한거를
            }
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default Page1;
