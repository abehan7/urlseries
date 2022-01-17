import React, { createContext, useCallback, useEffect, useState } from "react";
import "./HashTagModal.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Page1 from "./Page1";
import Page2 from "./Page2";
// import Page3 from "./Page3";
import { useDispatch, useSelector } from "react-redux";
import { Page3Actions } from "../../../store/reducers/editModalP3";
import modalCloseClickOutside from "../../../functions/ModalCloseClickOutside";
import { PopupDisable } from "../../../functions/stopScroll";

// TODO: 3페이지에서 모달 바깥부분 클릭하면 페이지 1로 안돌아가는 오류
const HashTagModal = ({
  assignedTags,
  setAssignedTags,
  totalTags,
  setTotalTags,
}) => {
  const [nowPage, setNowPage] = useState(1);

  // FIXME: handler
  // 1P에서 사용하는 back
  const handleP1CloseIcon = () => {
    document.querySelector(".hashtagModal-container").style.display = "none";
    nowPage === 3 && setNowPage(1);

    setAssignedTags(
      totalTags.filter((tag) => {
        return tag.origin === 1;
      })
    );

    setTotalTags(
      totalTags.map((tag) => {
        return { ...tag, assigned: tag.origin };
      })
    );
  };

  const handleP2CloseIcon = () => {
    document.querySelector(".hashtagModal-container").style.display = "none";
    setNowPage((val) => val - 1);
    SetReduxNowFolder({});
    PopupDisable();
  };

  const handleModalOutsideClick = (e) => {
    const isContained = modalCloseClickOutside(e);

    if (isContained) {
      switch (nowPage) {
        case 1:
          handleP1CloseIcon();
          break;
        case 2:
          handleP2CloseIcon();
          break;
        case 3:
          handleP1CloseIcon();
          break;
        default:
          break;
      }
    }
  };

  const handleLeftArrow = () => {
    if (nowPage > 1) {
      setNowPage((val) => val - 1);
      SetReduxNowFolder({});
    }
  };

  const handleForwardArrow = () => {
    if (nowPage < 3) {
      console.log(nowFolder2);
      setNowPage((val) => val + 1);
    }
  };

  // FIXME: 리덕스
  const dispatch = useDispatch();

  // 현재 페이지 변화
  const setNowPageRedux = (page) => {
    dispatch(Page3Actions.SetNowPage(page));
  };

  // 현재 폴더 변화
  const SetReduxNowFolder = (folder) => {
    dispatch(Page3Actions.SetNowFolder(folder));
  };

  // 페이지 바뀌면 action 보내기
  useEffect(() => {
    setNowPageRedux(nowPage);
    console.log("현재 페이지 설정 완료");
  }, [nowPage]);

  const {
    page3Storage: { nowPage2, nowFolder2 },
  } = useSelector((state) => state);
  // ================================= 리덕스 END =================================

  // FIXME: 스타일
  // 스타일 오른쪽 화살표 남겨두기 hidden으로
  const arrowStyleHidden = {
    visible: "hidden",
    opacity: "0",
    // transition: "300ms",
    pointerEvents: "none",
  };

  const arrowStyleShowUp = {
    visible: "visible",
    opacity: "1",
  };

  return (
    <>
      <div id="modal" className="modal-overlay hash-overlay">
        {/* <div style={{ color: "white" }}>{nowPage2}</div> */}

        <div className="left-arrow">
          <IoIosArrowBack
            onClick={handleLeftArrow}
            style={nowPage > 1 ? arrowStyleShowUp : arrowStyleHidden}
          />
        </div>

        {nowPage === 1 && (
          <Page1
            handleClickBackIcon={handleP1CloseIcon}
            setAssignedTags={setAssignedTags}
            assignedTags={assignedTags}
            totalTags={totalTags}
            setTotalTags={setTotalTags}
            nowPage={nowPage}
          />
        )}
        {nowPage === 2 && <Page2 setNowPage={setNowPage} />}
        {nowPage === 3 && (
          <Page1
            handleClickBackIcon={handleP1CloseIcon}
            setAssignedTags={setAssignedTags}
            assignedTags={assignedTags}
            totalTags={totalTags}
            setTotalTags={setTotalTags}
            nowPage={nowPage}
            setNowPage={setNowPage}
          />
        )}

        <div
          className="right-arrow"
          style={
            (nowPage === 1 || nowFolder2?.folder_name !== undefined) &&
            nowPage !== 3
              ? arrowStyleShowUp
              : arrowStyleHidden
          }
        >
          <IoIosArrowForward onClick={handleForwardArrow} />
        </div>
      </div>
    </>
  );
};

export default HashTagModal;
