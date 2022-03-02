import React, { useContext, useCallback } from "react";
import { RiDeleteBin5Fill, RiDeleteBin5Line } from "react-icons/ri";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import {
  ADD_TAG_FILTERD_ITEMS,
  getTagTotalItems,
  getTagFilterdItems,
  GET_CLEAR_TAG_FILTERD_ITEMS,
} from "../../store/reducers/urls";

import { getIsClicked } from "../../store/reducers/Tags";

import { MainStates } from "../../routers/MainPage";

const DeleteIcon = styled.div`
  ::before {
    ${({ itemNum }) => itemNum && `content: "${itemNum}";`}
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    font-size: 0.8rem;
    background-color: #fff;
    width: 15px;
    height: 15px;
    border-radius: 18px;
    border: 2px solid #e9ecef;
    transform: translate(30%, -20%);
    color: #787b85;
    font-weight: 100;
  }
`;

const DeleteIconWrap = styled.div`
  position: relative;
`;

const LeftIcons = ({ editMode, deleteMode, setDeleteMode }) => {
  const tagTotalItems = useSelector(getTagTotalItems);
  const tagFilterdItems = useSelector(getTagFilterdItems);
  const tagIsClicked = useSelector(getIsClicked);

  const handleGetEmptyUrls = useContext(MainStates).handleGetEmptyUrls;
  const totalUrls = useContext(MainStates).realTotalUrls;

  // setGetUrls
  // getUrls
  const dispatch = useDispatch();
  // FIXME: 클릭된 URL들 콘솔

  // FIXME: 전체 클릭 버튼
  const getTotalUrlsIds = () => {
    return totalUrls.map((url) => url._id);
  };

  const handleClickTotal = () => {
    tagIsClicked && dispatch(ADD_TAG_FILTERD_ITEMS(tagTotalItems));
    !tagIsClicked && dispatch(ADD_TAG_FILTERD_ITEMS(getTotalUrlsIds()));
  };

  // FIXME: 전체 클릭 풀기 버튼
  const handleClickOff = () => {
    dispatch(GET_CLEAR_TAG_FILTERD_ITEMS());
  };

  // FIXME: 삭제하기

  const handleDelete = () => {
    console.log("삭제하기");

    handleGetEmptyUrls();
    //  비우기
    handleClickOff();
    // setDeleteMode(!deleteMode);
  };

  const handleClickDeleteIcon = () => {
    setDeleteMode(!deleteMode);
  };

  // console.log();

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
            <DeleteIcons
              deleteMode={deleteMode}
              handleClickDeleteIcon={handleClickDeleteIcon}
            />

            {/* 컨테이너 */}
            <div
              className="delete-mode-click-container"
              style={deleteMode ? TrashCanSlideStyle : style2}
            >
              <DeleteIconWrap
                className="delete--mode--delete--total"
                onClick={handleDelete}
              >
                <DeleteIcon
                  className="delete-click-icon"
                  itemNum={tagFilterdItems?.length}
                >
                  <MdOutlineDeleteForever />
                </DeleteIcon>
                {/* <div className="delete-ment">삭제하기</div> */}
              </DeleteIconWrap>
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const DeleteIcons = ({ deleteMode, handleClickDeleteIcon }) => {
  return (
    <>
      {deleteMode ? (
        <RiDeleteBin5Fill
          className="delete-icon-svg"
          onClick={handleClickDeleteIcon}
        />
      ) : (
        <RiDeleteBin5Line
          className="delete-icon-svg"
          onClick={handleClickDeleteIcon}
        />
      )}
    </>
  );
};

export default React.memo(LeftIcons);
