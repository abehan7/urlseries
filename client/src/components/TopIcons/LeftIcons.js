import React, { useEffect, useCallback, useContext } from "react";
import { RiDeleteBin5Fill, RiDeleteBin5Line } from "react-icons/ri";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MainStates } from "../../routers/MainPage";

import styled from "styled-components";
import {
  ADD_TAG_FILTERD_ITEMS,
  getTagTotalItems,
  GET_CLEAR_TAG_FILTERD_ITEMS,
} from "../../store/reducers/urls";

const LeftIcons = ({ editMode, deleteMode, setDeleteMode, realTotalUrls }) => {
  const tagTotalItems = useSelector(getTagTotalItems);
  const dispatch = useDispatch();
  // FIXME: 클릭된 URL들 콘솔

  // FIXME: 전체 클릭 버튼
  const handleClickTotal = () => {
    dispatch(ADD_TAG_FILTERD_ITEMS(tagTotalItems));
  };

  // FIXME: 전체 클릭 풀기 버튼
  const handleClickOff = () => {
    dispatch(GET_CLEAR_TAG_FILTERD_ITEMS());
  };

  // FIXME: 삭제하기

  const handleDelete = () => {};

  console.log();

  // FIXME: 리셋
  // 스타일
  const TrashCanSlideStyle = {
    display: "flex",
    visibility: "visible",
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
