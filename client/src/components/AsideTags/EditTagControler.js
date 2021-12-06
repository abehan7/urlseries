import React, { useState } from "react";

const EditTagControler = ({ hashList }) => {
  const [BoxTags_First, setBoxTags_First] = useState(true);
  const [BoxTags, setBoxTags] = useState([]);
  // var currentList = [];

  const EditTagHandle = (e) => {
    var currentList = [];

    // ====================================== 처음에 한번 누르면 전체 투명도 낮아지는 거 START ======================================

    if (BoxTags_First) {
      document.querySelectorAll(".tag").forEach((one) => {
        one.style.opacity = "0.3";
      });
      setBoxTags_First(false);
    }
    // ====================================== 처음에 한번 누르면 전체 투명도 낮아지는 거 END ======================================

    // ====================================== 선택에 따라서 색깔변화 START ======================================
    if (e.target.style.opacity === "0.3") {
      e.target.style.opacity = "1";
      setBoxTags([...BoxTags, e.target.textContent]);
      currentList = [...BoxTags, e.target.textContent];
    } else {
      e.target.style.opacity = "0.3";
      setBoxTags(BoxTags.filter((oneTag) => oneTag !== e.target.textContent));
      currentList = BoxTags.filter((oneTag) => oneTag !== e.target.textContent);
    }

    // ====================================== 선택에 따라서 색깔변화 END ======================================

    // ====================================== 선택된거가 하나도 없으면 전체 색깔 찐하게 START ======================================
    if (currentList.length === 0) {
      document.querySelectorAll(".tag").forEach((one) => {
        one.style.opacity = "1";
      });
      setBoxTags_First(true);
    }
    console.log(currentList);

    // ====================================== 선택된거가 하나도 없으면 전체 색깔 찐하게 END ======================================
  };

  return (
    <div className="aside-tags EditTagControler">
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
