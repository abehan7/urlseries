import React, { useEffect, useCallback, useContext } from "react";
import { RiDeleteBin5Fill, RiDeleteBin5Line } from "react-icons/ri";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { MainStates } from "../../routers/MainPage";

const LeftIcons = ({
  editMode,
  deleteMode,
  setDeleteMode,
  getUrls,
  setGetUrls,
  realTotalUrls,
  setRealTotalUrls,
  BoxTags_First,
}) => {
  const { edit } = useSelector((state) => state);
  const { likedUrls, setLikedUrls, mostClickedUrls, setMostClickedUrls } =
    useContext(MainStates);

  // FIXME: 클릭된 URL들 콘솔
  useEffect(() => {
    console.log("props테스트");
    console.log(edit);
    AllReset();
  }, [edit]);

  // FIXME: 전체 클릭 버튼
  const handleClickTotal = () => {
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

  // FIXME: 전체 클릭 풀기 버튼
  const handleClickOff = () => {
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

  // FIXME: 삭제하기

  // 삭제할 리스트들 뽑기
  const FilterdId = () => {
    let DeleteList = [];

    const methodDelete = (urlList) => {
      urlList.forEach((val) => {
        val.clicked === true && DeleteList.push(val._id);
      });
    };

    // 태그 클릭 안된경우
    BoxTags_First && methodDelete(getUrls);
    // 태그 클릭 된경우
    !BoxTags_First && methodDelete(realTotalUrls);

    return DeleteList;
  };

  // 삭제하기
  const MakeDelete = (deleteList) => {
    for (const element of [
      [setRealTotalUrls, realTotalUrls],
      [setGetUrls, getUrls],
      [setLikedUrls, likedUrls],
      [setMostClickedUrls, mostClickedUrls],
    ]) {
      element[0](
        element[1].filter((val) => {
          return !deleteList.includes(val._id);
        })
      );
    }

    // setRealTotalUrls(
    //   realTotalUrls.filter((val) => {
    //     return !deleteList.includes(val._id);
    //   })
    // );
  };

  const handleDelete = () => {
    let DeleteList = FilterdId();
    DeleteList.length > 0 && MakeDelete(DeleteList);
    // console.log(DeleteList);

    // realTotalUrls
  };

  // FIXME: 클릭한거 리셋

  // 전체 리스트 리셋
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

  // delete모드 풀리면 클릭 리셋
  useEffect(() => {
    !deleteMode && AllReset();
  }, [deleteMode]);

  // 태그 클릭한 리스트들만 리셋
  const ResetTags = useCallback(() => {
    realTotalUrls.forEach((val) => {
      val.clicked = false;
    });
  }, [realTotalUrls]);

  // 태그 클릭 안한 상태 리셋
  const ResetBigRect = useCallback(() => {
    getUrls.forEach((val) => {
      val.clicked = false;
    });
  }, [getUrls]);

  useEffect(() => {
    !editMode && deleteMode && BoxTags_First && ResetTags();
    !editMode && deleteMode && !BoxTags_First && ResetBigRect();
  }, [BoxTags_First]);

  // FIXME: 리셋
  // 스타일
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
              <div
                className="delete-mode-click-total"
                onClick={handleClickTotal}
              >
                <div className="delete-click-icon">
                  <IoCheckmarkCircleSharp />
                </div>
                {/* <div className="delete-ment">전체선택</div> */}
              </div>
              <div onClick={handleClickOff}>
                <div className="delete-click-icon">
                  <IoCheckmarkCircleOutline />
                </div>
                {/* <div className="delete-ment"> 선택취소</div> */}
              </div>
              <div
                className="delete--mode--delete--total"
                onClick={handleDelete}
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

export default React.memo(LeftIcons);

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
