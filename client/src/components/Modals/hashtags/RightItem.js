import React from "react";
import { AiOutlineFolder } from "react-icons/ai";
import { MdOutlineTag } from "react-icons/md";
import { useSelector } from "react-redux";

const RightItem = ({ assignedTags, removeToggle }) => {
  const {
    page3Storage: { nowPage2, nowFolder2 },
  } = useSelector((state) => state);

  return (
    <div className="RightItem">
      <div className="title chosen-title">
        <h3>선택된 태그들</h3>
      </div>
      <div className="content hashtag-content">
        <div className="big-folder-Icon">
          {nowPage2 === 3 && <AiOutlineFolder />}
          {nowPage2 === 1 && <MdOutlineTag />}
        </div>
        <div className="flexWrapBox flexWrap-right">
          {(nowPage2 === 1
            ? assignedTags
            : nowPage2 === 3
            ? nowFolder2?.folder_contents
            : []
          )?.map((val, i) => {
            return (
              <div
                key={i}
                className="oneHash"
                onClick={() => {
                  // nowPage2 === 1 && removeToggle(val);
                  removeToggle(val);
                }}
              >
                {nowPage2 === 1 ? val.name : val}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightItem;
