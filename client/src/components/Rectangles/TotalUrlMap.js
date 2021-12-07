import React, { useEffect, useState } from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
// import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";

import Axios from "axios";
const TotalUrlMap = ({ values, editMode, shareMode }) => {
  const [getUrls, setGetUrls] = useState([]);
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
  useEffect(() => {
    console.log("유스이펙트");
    Axios.get("http://localhost:3001/totalUrl").then((response) => {
      console.log(response.data);
      setGetUrls(response.data);
    });
  }, []);

  const onMouseLeave = () => {
    if (document.querySelector(".hello")) {
      document.querySelectorAll(".hello").forEach((one) => {
        one.remove();
      });
    }
  };
  return (
    <>
      {getUrls.map((value) => {
        return (
          <>
            <div
              className="T-url"
              key={value._id}
              onClick={() => {
                if (!editMode) {
                  EditMode_ModalFunc(value);
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
