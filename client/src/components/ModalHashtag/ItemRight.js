import React from "react";
import { MdOutlineTag } from "react-icons/md";

const ItemRight = ({ assignedTags, ToggleUnClicked }) => {
  return (
    <div className="RightItem">
      <div className="title chosen-title">
        <h3>선택된 태그들</h3>
      </div>
      <div className="content hashtag-content">
        <div className="big-folder-Icon">
          <MdOutlineTag />
        </div>
        <div className="flexWrapBox flexWrap-right">
          {assignedTags?.map((val, i) => {
            return (
              <div
                key={i}
                className="oneHash"
                onClick={() => {
                  ToggleUnClicked(val);
                }}
              >
                {val.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemRight;
