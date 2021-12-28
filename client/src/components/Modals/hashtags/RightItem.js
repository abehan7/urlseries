import React from "react";
import { useSelector } from "react-redux";

const RightItem = ({ assignedTags, removeToggle }) => {
  const {
    page3Storage: { nowPage2, nowFolder2 },
  } = useSelector((state) => state);

  return (
    <div className="RightItem">
      <div className="title chosen-title">
        <h3>Chosen Ones</h3>
      </div>
      <div className="content hashtag-content">
        <div className="flexWrapBox flexWrap-right">
          {(nowPage2 === 1 ? assignedTags : nowFolder2?.folder_contents)?.map(
            (val, i) => {
              return (
                <div
                  key={i}
                  className="oneHash"
                  onClick={() => {
                    nowPage2 === 1 && removeToggle(val);
                  }}
                >
                  {nowPage2 === 1 ? val.name : val}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default RightItem;
