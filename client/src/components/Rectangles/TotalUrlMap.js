import React, { useEffect, useState } from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
// import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";

const TotalUrlMap = ({ values, editMode, shareMode, setMyFav }) => {
  const onMouseEnter = (e) => {
    console.log(e.target);
    // 시간지연같은거 두고싶은데
    // 3초 이상 누르고있으면 나오도록 하는거
    // const newDiv = document.createElement("div");
    // const newText = document.createTextNode("안녕하세요");
    // newDiv.className = "hello";
    // newDiv.appendChild(newText);
    // document.querySelector(".text-three-container").appendChild(newDiv);
  };

  const onMouseLeave = () => {
    if (document.querySelector(".hello")) {
      document.querySelectorAll(".hello").forEach((one) => {
        one.remove();
      });
    }
  };
  var num = 0;
  return (
    <>
      {values.map((value) => {
        num += 1;
        return (
          <>
            <div
              className="T-url"
              key={value._id}
              onClick={() => {
                if (!editMode) {
                  EditMode_ModalFunc(value);
                  setMyFav(value.url_likedUrl === 1);
                  console.log("에디터모드입니다");
                } else if (!shareMode) {
                  console.log("공유모드입니다.");
                } else {
                  window.open(value.url);
                }
              }}
              onMouseEnter={() => {
                // console.log(value);
              }}
              onMouseLeave={onMouseLeave}
              onContextMenu={(e) => {
                console.log("우클릭");
                e.preventDefault();
              }}
            >
              <div className="valueId">{num}</div>
              <div className="just-bar">|</div>
              <div className="valueTitle">{value.url_title}</div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default TotalUrlMap;