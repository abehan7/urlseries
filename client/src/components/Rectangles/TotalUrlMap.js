import React, { useState } from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import { getMouseLocation, grabNowValue } from "./movingModalFuncs";
import Axios from "axios";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const TotalUrlMap = ({
  getUrls,
  setGetUrls,
  editMode,
  shareMode,
  setMyFav,
  deleteMode,
}) => {
  const [deleteList, setDeleteList] = useState([]);

  const TrafficLight = ({
    totalList: list,
    setTotalList: setList,
    clickedUrl: value,
  }) => {
    if (!list.includes(value._id)) {
      setList([...list, value._id]);
    } else {
      setList(
        list.filter((val) => {
          return val !== value._id;
        })
      );
    }
    console.log(list);
  };

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

  const DeleteMode = ({ oneUrl: value }) => {
    value.clicked = !value.clicked;
    value.clicked === undefined && (value.clicked = true);

    // TrafficLight({
    //   totalList: deleteList,
    //   setTotalList: setDeleteList,
    //   clickedUrl: value,
    // });

    setGetUrls(
      getUrls.map((url) => {
        return url._id === value._id ? value : url;
      })
    );
  };

  const FuncEditMode = ({ oneUrl: value }) => {
    console.log("에디터모드입니다");
    if (deleteMode) {
      DeleteMode({ oneUrl: value });
    } else {
      EditMode_ModalFunc(value);
      grabNowValue.cancel();
      setMyFav(value.url_likedUrl === 1);
    }
  };

  const NormalMode = ({ oneUrl: value }) => {
    window.open(value.url);
    Axios.put("http://localhost:3001/clickedURLInBox", { url: value });
  };

  const whenIclickUrl = ({ oneUrl: value }) => {
    !editMode ? FuncEditMode({ oneUrl: value }) : NormalMode({ oneUrl: value });
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
                whenIclickUrl({ oneUrl: value });
              }}
              onMouseLeave={onMouseLeave}
              onMouseEnter={() => {
                grabNowValue(value);
              }}
              onContextMenu={(e) => {
                console.log("우클릭");
                e.preventDefault();
              }}
              onMouseMove={(e) => getMouseLocation(e)}
            >
              {!editMode && deleteMode && (
                <>
                  <div className="select-box">
                    {value.clicked ? (
                      <MdCheckBox />
                    ) : (
                      <MdCheckBoxOutlineBlank />
                    )}
                  </div>
                </>
              )}
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

// 시간지연같은거 두고싶은데
// 3초 이상 누르고있으면 나오도록 하는거
// const newDiv = document.createElement("div");
// const newText = document.createTextNode("안녕하세요");
// newDiv.className = "hello";
// newDiv.appendChild(newText);
// document.querySelector(".text-three-container").appendChild(newDiv);
