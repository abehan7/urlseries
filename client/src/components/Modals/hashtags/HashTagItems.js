import React from "react";
import LeftItem from "./LeftItem";
import RightItem from "./RightItem";

const HashTagItems = ({
  tagSearch,
  totalTags,
  toggleFunc,
  filterd,
  setTagSearch,
  assignedTags,
  removeToggle,
}) => {
  return (
    <div className="HashTagItems">
      <LeftItem
        tagSearch={tagSearch}
        totalTags={totalTags}
        toggleFunc={toggleFunc}
        filterd={filterd}
        setTagSearch={setTagSearch}
      />
      <RightItem assignedTags={assignedTags} removeToggle={removeToggle} />
    </div>
  );
};

export default HashTagItems;
