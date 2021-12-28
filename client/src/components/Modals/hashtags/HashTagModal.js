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

  useEffect(() => {
    setNowPageRedux(nowPage);
    console.log("현재 페이지 설정 완료");
  }, [nowPage]);

  const {
    page3Storage: { nowPage2, nowFolder2 },
  } = useSelector((state) => state);
  // ================================= 리덕스 END =================================

  return (
    <>
      <div id="modal" className="modal-overlay hash-overlay">
        <div style={{ color: "white" }}>{nowPage2}</div>

        {nowPage > 1 && (
          <div className="left-arrow">
            <IoIosArrowBack
              onClick={() => {
                setNowPage((val) => val - 1);
              }}
            />
          </div>
        )}
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

        {(nowPage === 1 || nowFolder2?.folder_name !== undefined) &&
          nowPage !== 3 && (
            <div className="right-arrow">
              <IoIosArrowForward
                onClick={() => {
                  if (nowPage < 3) {
                    console.log(nowFolder2);
                    setNowPage((val) => val + 1);
                  }
                }}
              />
            </div>
          )}
      </div>
    </>
  );
};

export default HashTagModal;
