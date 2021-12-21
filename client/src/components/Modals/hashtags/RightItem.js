import React from "react";

const RightItem = ({ assignedTags, removeToggle }) => {
  return (
    <div className="RightItem">
      <div className="title chosen-title">
        <h3>Chosen Ones</h3>
      </div>
      <div className="flexWrapBox">
        {assignedTags.map((val, i) => {
          return (
            <div
              key={i}
              className="oneHash"
              onClick={() => {
                removeToggle(val);
              }}
            >
              {val.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightItem;