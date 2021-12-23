import React from "react";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

const LeftIcons = ({
  editMode,
  deleteMode,
  setDeleteMode,
  getUrls,
  setGetUrls,
}) => {
  const ClickTotal = ({
    urls_you_wanna_select: getUrls,
    set_urls_you_wanna_select: setGetUrls,
  }) => {
    getUrls.forEach((val) => {
      val.clicked = true;
    });
    setGetUrls([...getUrls]);
  };

  const ClickOffUrls = ({
    urls_you_wanna_select_off: getUrls,
    set_urls_you_wanna_select_off: setGetUrls,
  }) => {
    getUrls.forEach((val) => {
      val.clicked = false;
    });
    setGetUrls([...getUrls]);
  };

  const TrashCanSlideStyle = {
    display: "flex",
    visibility: "visible",
    transform: "translate(0px)",
    opacity: "1",
  };
  const style2 = {};
  return (
    <div className="left-icons">
      {!editMode && (
        <>
          <div className="delete-icon">
            {deleteMode ? (
              <AiFillDelete
                className="delete-icon-svg"
                onClick={() => {
                  setDeleteMode(!deleteMode);
                }}
              />
            ) : (
              <AiOutlineDelete
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
                onClick={() => {
                  ClickTotal({
                    urls_you_wanna_select: getUrls,
                    set_urls_you_wanna_select: setGetUrls,
                  });
                }}
              >
                전체선택
              </div>
              <div
                onClick={() => {
                  ClickOffUrls({
                    urls_you_wanna_select_off: getUrls,
                    set_urls_you_wanna_select_off: setGetUrls,
                  });
                }}
              >
                선택취소
              </div>
              <div
                className="delete--mode--delete--total"
                onClick={() => {
                  getUrls.forEach((val) => {
                    val.clicked === true && console.log(val._id);
                  });
                }}
              >
                삭제하기
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftIcons;
