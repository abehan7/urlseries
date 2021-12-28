import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { disable } from "../../../functions/stopScroll";
import { Page3Actions } from "../../../store/reducers/editModalP3";
import { closeFunc, modify } from "./HashModalFuncs";
import HashTagItems from "./HashTagItems";

const Page1 = ({
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
    if (nowPage2 === 1) {
      val.assigned = 0;
      setTotalTags(
        totalTags.map((tag) => {
          return val.name === tag.name ? val : tag;
        })
      );
      setAssignedTags(
        assignedTags.filter((tag2) => {
          return tag2.name !== val.name;
        })
      );
      console.log(val);
    } else if (nowPage2 === 3) {
      console.log("3에서 토글 해제");
      val.folderAssigned = 0;
      nowFolder2.folder_contents = nowFolder2.folder_contents.filter((one) => {
        return val.name !== one;
      });
      setTotalTags(
        totalTags.map((tag) => {
          return val.name === tag.name ? val : tag;
        })
      );
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
    setTotalTags(
      totalTags.map((tag) => {
        return val.name === tag.name
          ? {
              name: tag.name,
              assigned: 0,
              origin: tag.origin,
            }
          : tag;
      })
    );

    setAssignedTags(
      assignedTags.filter((tag2) => {
        return tag2 !== val;
      })
    );
  };
  // =========== 오른쪽 토글 없애기 기능 END ===========

  // =========== 리덕스 START ===========

  const {
    page3Storage: { nowPage2, nowFolder2 },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const SetReduxNowFolder = (folder2) => {
    dispatch(Page3Actions.SetNowFolder(folder2));
  };

  console.log("3페이지 테스트");
  console.log(nowFolder2);
  // =========== 리덕스 END ===========

  return (
    <div className="modal-window hashTag-modal-window">
      <div className="header-Container HashTag-header-Container">
        <div
          className="close-area"
          onClick={async () => {
            await closeFunc({
              setAssignedTags,
              totalTags,
              setTotalTags,
              setTagSearch,
            });
            setNowPage(1);
            SetReduxNowFolder({});
            disable();
          }}
        >
          <IoArrowBack />
        </div>
        <div className="title">
          <h2>{nowPage === 3 ? nowFolder2.folder_name : "HashTags"}</h2>
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
              disable();
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
