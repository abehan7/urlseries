import React, { useState } from "react";
import "./HashTagModal.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

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

  return (
    <>
      <div id="modal" className="modal-overlay hash-overlay">
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
          />
        )}
        {nowPage === 2 && <Page2 />}
        {nowPage === 3 && <Page3 />}

        {nowPage < 3 && (
          <div className="right-arrow">
            <IoIosArrowForward
              onClick={() => {
                if (nowPage < 3) {
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
