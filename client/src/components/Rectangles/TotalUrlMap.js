import React from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import { getMouseLocation, grabNowValue } from "./movingModalFuncs";
import Axios from "axios";

const TotalUrlMap = ({ values, editMode, shareMode, setMyFav }) => {
  window.onscroll = () => {
    const circle = document.querySelector(".detail-container");
    grabNowValue.cancel();
    circle.style.display = "none";
  };

  const onMouseLeave = () => {
    const circle = document.querySelector(".detail-container");
    circle.style.display = "none";
    grabNowValue.cancel();
  };

  const whenIclickUrl = (value) => {
    if (!editMode) {
      console.log("에디터모드입니다");

      EditMode_ModalFunc(value);
      grabNowValue.cancel();
      setMyFav(value.url_likedUrl === 1);
    } else if (!shareMode) {
      console.log("공유모드입니다.");
    } else {
      // 그냥 일반
      window.open(value.url);
      Axios.put("http://localhost:3001/clickedURLInBox", { url: value });
    }
  };

  return (
    <>
      {values.map((value) => {
        return (
          <>
            <div
              className="T-url"
              key={value._id}
              onClick={() => {
                whenIclickUrl(value);
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
              <img
                id="urlFavicon"
                src={"http://www.google.com/s2/favicons?domain=" + value.url}
              ></img>
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

// 시간지연같은거 두고싶은데
// 3초 이상 누르고있으면 나오도록 하는거
// const newDiv = document.createElement("div");
// const newText = document.createTextNode("안녕하세요");
// newDiv.className = "hello";
// newDiv.appendChild(newText);
// document.querySelector(".text-three-container").appendChild(newDiv);
