import React from "react";
import BoxTagControler from "./BoxTagControler";

const AsideTag = ({
  editMode,
  BoxTags_First,
  setBoxTags_First,
  BoxTags,
  setBoxTags,
  assignedTags,
}) => {
  return (
    <>
      {assignedTags.map((tag) => {
        return (
          <span
            className="tag"
            onClick={(e) => {
              if (editMode) {
                BoxTagControler({
                  e,
                  BoxTags_First,
                  setBoxTags_First,
                  BoxTags,
                  setBoxTags,
                });
              }
            }}
          >
            {tag.name}
          </span>
        );
      })}
    </>
  );
};

export default AsideTag;
