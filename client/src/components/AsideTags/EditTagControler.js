import React, { useState } from "react";

const EditTagControler = ({ hashList }) => {
  const [BoxTags_First, setBoxTags_First] = useState(true);
  const [BoxTags, setBoxTags] = useState([]);
  var currentList = [];

  const EditTagHandle = (e) => {
    console.log("안녕");

    if (BoxTags_First) {
      document.querySelectorAll(".tag").forEach((one) => {
        one.style.opacity = "0.3";
      });
      setBoxTags_First(false);
    }
  };

  return (
    <div className="EditTagControler aside-tags">
      {hashList.map((tag) => {
        return (
          <span className="tag" onClick={EditTagHandle}>
            {tag}
          </span>
        );
      })}
    </div>
  );
};

export default EditTagControler;
