import React, { useEffect, useState } from "react";
import "./HashTagModal.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Page1 from "./Page1";
import Page2 from "./Page2";
// import Page3 from "./Page3";
import { useDispatch, useSelector } from "react-redux";
import { Page3Actions } from "../../../store/reducers/editModalP3";

// const api = Axios.create({
//   baseURL: `http://localhost:3001/`,
// });

const HashTagModal = ({
  assignedTags,
  setAssignedTags,
  totalTags,
  setTotalTags,
}) => {
  const [nowPage, setNowPage] = useState(1);
  // ================================= 리덕스 START =================================

  const dispatch = useDispatch();
  // const { value } = useSelector(state => state.value)
  const setNowPageRedux = (page) => {
    dispatch(Page3Actions.SetNowPage(page));
  };
  const SetReduxNowFolder = (folder) => {
    dispatch(Page3Actions.SetNowFolder(folder));
  };

  useEffect(() => {
    setNowPageRedux(nowPage);
    console.log("현재 페이지 설정 완료");
  }, [nowPage]);

  const {
    page3Storage: { nowPage2, nowFolder2 },
  } = useSelector((state) => state);
  // ================================= 리덕스 END =================================

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
        <div style={{ color: "white" }}>{nowPage2}</div>

        <div className="left-arrow">
          <IoIosArrowBack
            onClick={() => {
              if (nowPage > 1) {
                setNowPage((val) => val - 1);
                SetReduxNowFolder({});
              }
            }}
            style={nowPage > 1 ? arrowStyleShowUp : arrowStyleHidden}
          />
        </div>

        {nowPage === 1 && (
          <Page1
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
          <IoIosArrowForward
            onClick={() => {
              if (nowPage < 3) {
                console.log(nowFolder2);
                setNowPage((val) => val + 1);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HashTagModal;

// (nowPage === 1 || nowFolder2?.folder_name !== undefined) &&
//           nowPage !== 3 &&

// (nowPage === 1 || nowFolder2?.folder_name !== undefined) &&
//           nowPage !== 3 &&
