import React from "react";
import { getMouseLocation, grabNowValue } from "./movingModalFuncs";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { whenIclickUrl } from "./FuncTotalUrlMap";

const TotalUrlMap = ({
  getUrls,
  setGetUrls,
  editMode,
  setMyFav,
  deleteMode,
}) => {
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

  return (
    <>
      {getUrls.map((value) => {
        // let imgThum;

        // if (value.url.includes("youtu")) {
        //   const ytUrl = value.url;
        //   imgThum = ytUrl.split("https://youtu.be/")[1];
        // }
        // if (value.url.includes("youtube")) {
        //   const ytUrl = value.url;
        //   imgThum = ytUrl.split("watch?v=")[1];
        // }

        return (
          <>
            <div
              className="T-url"
              key={value._id}
              onClick={() => {
                whenIclickUrl({
                  oneUrl: value,
                  deleteMode,
                  editMode,
                  setMyFav,
                  setGetUrls: setGetUrls,
                  getUrls: getUrls,
                });
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
              {/* <img
                width={value.url.includes("youtu") ? "100px" : "20px"}
                className="urlFavicon"
                src={
                  value.url.includes("youtu")
                    ? `https://i.ytimg.com/vi/${imgThum}/maxresdefault.jpg`
                    : `http://www.google.com/s2/favicons?domain=${value.url}`
                }
                alt=""
              /> */}
              <img
                className="urlFavicon"
                src={`http://www.google.com/s2/favicons?domain=${value.url}`}
                alt=""
              />

              {/* <iframe
                title="test"
                width="320"
                height="440"
                src="https://www.instagram.com/p/CYO9ux9uEMr/embed"
                frameborder="0"
              /> */}
              {/* <div className="valueId">{value.url_id}</div> */}
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

// ============================================================ url온클릭 이벤트 START ============================================================

// const DeleteMode = ({ oneUrl: value }) => {
//   value.clicked = !value.clicked;
//   value.clicked === undefined && (value.clicked = true);
//   setGetUrls(
//     getUrls.map((url) => {
//       return url._id === value._id ? value : url;
//     })
//   );
// };

// const FuncEditMode = ({ oneUrl: value }) => {
//   console.log("에디터모드입니다");
//   if (deleteMode) {
//     DeleteMode({ oneUrl: value });
//   } else {
//     EditMode_ModalFunc(value);
//     grabNowValue.cancel();
//     setMyFav(value.url_likedUrl === 1);
//   }
// };

// const NormalMode = ({ oneUrl: value }) => {
//   window.open(value.url);
//   Axios.put("http://localhost:3001/clickedURLInBox", { url: value });
// };

// const whenIclickUrl = ({ oneUrl: value }) => {
//   !editMode ? FuncEditMode({ oneUrl: value }) : NormalMode({ oneUrl: value });
// };
// ============================================================ url온클릭 이벤트 END ============================================================
