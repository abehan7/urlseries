import React, { useState } from "react";
import EditMode_ModalFunc from "./editModeFucs/EditMode_ModalFunc";

const TotalUrlMap = ({ values, editMode }) => {
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
  return (
    <>
      {values.map((value) => {
        return (
          <>
            <div
              className="T-url"
              key={value.id}
              onClick={() => {
                if (!editMode) {
                  EditMode_ModalFunc(value);
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
              <div className="valueId">{value.id}</div>
              <div className="just-bar">|</div>
              <div className="valueTitle">{value.title}</div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default TotalUrlMap;
