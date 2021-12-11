import React, { useEffect, useState } from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
// import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import { debounce } from "lodash";

const TotalUrlMap = ({ values, editMode, shareMode, setMyFav }) => {
  const DebounceContainer = (value) => {
    // const circle = document.querySelector(".detail-container");
    // circle.style.display = "none";
    grabNowValue(value);
    grabNowValue.cancel();
  };

  // BigRect.addEventListener("mouseleave", () => {
  //   grabNowValue.cancel();
  // });

  const grabNowValue = debounce((value) => {
    const circle = document.querySelector(".detail-container");
    circle.style.display = "flex";
    let BalloonOneLineTags = "";
    value.url_hashTags.forEach((val) => {
      BalloonOneLineTags += val;
      BalloonOneLineTags += " ";
    });

    console.log(value.url_title);
    if (value.url_memo.length === 0) {
      document.querySelector(".memoContent").style.display = "none";
    } else {
      document.querySelector(".memoContent").style.display = "-webkit-box";
    }
    document.querySelector(".memoContent").innerText = value.url_memo;
    document.querySelector(".tagContent").innerText = BalloonOneLineTags;
  }, 600);

  // 시간지연같은거 두고싶은데
  // 3초 이상 누르고있으면 나오도록 하는거
  // const newDiv = document.createElement("div");
  // const newText = document.createTextNode("안녕하세요");
  // newDiv.className = "hello";
  // newDiv.appendChild(newText);
  // document.querySelector(".text-three-container").appendChild(newDiv);

  const getMouseLocation = (e) => {
    const circle = document.querySelector(".detail-container");
    // circle.style.display = "flex";

    const mouseX = e.clientX;
    const mouseY = e.pageY;
    // circle.style.left = 520 + "px";
    circle.style.left = mouseX + "px";
    // circle.style.top = 1142 + "px";
    circle.style.top = mouseY - 80 + "px";

    console.log(mouseY);
  };

  const onMouseLeave = () => {
    const circle = document.querySelector(".detail-container");
    circle.style.display = "none";
    grabNowValue.cancel();
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
              onMouseLeave={onMouseLeave}
              onMouseEnter={() => {
                grabNowValue(value);
                // DebounceContainer(value);
              }}
              onMouseOut={() => {}}
              onContextMenu={(e) => {
                console.log("우클릭");
                e.preventDefault();
              }}
              onMouseMove={(e) => getMouseLocation(e)}
            >
              <div className="valueId">{value.url_id}</div>
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
