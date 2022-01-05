import React, { useEffect, useMemo, useCallback } from "react";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { RiDeleteBin5Fill, RiDeleteBin5Line } from "react-icons/ri";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import { MdOutlineChecklist, MdOutlineDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";

// import { actionCreators } from "../../store.js";
const LeftIcons = (props) => {
  const {
    editMode,
    deleteMode,
    setDeleteMode,
    getUrls,
    setGetUrls,
    realTotalUrls,
    setRealTotalUrls,
    BoxTags_First,
  } = props;

  const { edit } = useSelector((state) => state);

  // console.log("props테스트");
  // console.log(edit);
  useEffect(() => {
    console.log("props테스트");
    console.log(edit);
  }, [edit]);
  const ClickTotal = () => {
    if (!BoxTags_First) {
      realTotalUrls.forEach((val) => {
        edit.includes(val._id) && (val.clicked = true);
      });
      setRealTotalUrls([...realTotalUrls]);
    } else {
      getUrls.forEach((val) => {
        val.clicked = true;
      });
      setGetUrls([...getUrls]);
    }
  };

  const ClickOffUrls = () => {
    if (!BoxTags_First) {
      realTotalUrls.forEach((val) => {
        val.clicked = false;
      });
      setRealTotalUrls([...realTotalUrls]);
    } else {
      getUrls.forEach((val) => {
        val.clicked = false;
      });
      setGetUrls([...getUrls]);
    }
  };

  const AllReset = useCallback(() => {
    realTotalUrls.forEach((val) => {
      val.clicked = false;
    });
    setRealTotalUrls([...realTotalUrls]);
    getUrls.forEach((val) => {
      val.clicked = false;
    });
    setGetUrls([...getUrls]);
  }, [realTotalUrls, getUrls]);

  useEffect(() => {
    !deleteMode && AllReset();
  }, [deleteMode]);

  const ResetTags = useCallback(() => {
    realTotalUrls.forEach((val) => {
      val.clicked = false;
    });
  }, [realTotalUrls]);

  const ResetBigRect = useCallback(() => {
    getUrls.forEach((val) => {
      val.clicked = false;
    });
  }, [getUrls]);

  useEffect(() => {
    !editMode && deleteMode && BoxTags_First && ResetTags();
    !editMode && deleteMode && !BoxTags_First && ResetBigRect();
  }, [BoxTags_First]);

  const TrashCanSlideStyle = {
    display: "flex",
    visibility: "visible",
    // transform: "translate(0px)",
    // transform: scale(0)

    opacity: "1",

    borderRadius: "20px",
  };
  const style2 = {};

  return (
    <div className="left-icons">
      {!editMode && (
        <>
          <div className="delete-icon">
            {deleteMode ? (
              <RiDeleteBin5Fill
                className="delete-icon-svg"
                onClick={() => {
                  setDeleteMode(!deleteMode);
                }}
              />
            ) : (
              <RiDeleteBin5Line
                className="delete-icon-svg"
                onClick={() => {
                  setDeleteMode(!deleteMode);
                }}
              />
            )}

            <div
              className="delete-mode-click-container"
              style={deleteMode ? TrashCanSlideStyle : style2}
            >
              <div className="delete-mode-click-total" onClick={ClickTotal}>
                <div className="delete-click-icon">
                  <IoCheckmarkCircleSharp />
                </div>
                {/* <div className="delete-ment">전체선택</div> */}
              </div>
              <div onClick={ClickOffUrls}>
                <div className="delete-click-icon">
                  <IoCheckmarkCircleOutline />
                </div>
                {/* <div className="delete-ment"> 선택취소</div> */}
              </div>
              <div
                className="delete--mode--delete--total"
                onClick={() => {
                  getUrls.forEach((val) => {
                    val.clicked === true && console.log(val._id);
                  });
                }}
              >
                <div className="delete-click-icon">
                  <MdOutlineDeleteForever />
                </div>
                {/* <div className="delete-ment">삭제하기</div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftIcons;

// const mapStateToProps = (state, ownProps) => {
//   // console.log("ownProps");
//   // console.log(ownProps);
//   return { state };
// };
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     addToDo: (text) => dispatch(actionCreators.addToDo(text)),
//   };
// };
