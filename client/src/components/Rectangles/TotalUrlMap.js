import React, { useEffect, useState } from "react";
import { getMouseLocation, grabNowValue } from "./movingModalFuncs";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import whenIclickUrl from "./FuncTotalUrlMap";
import { useDispatch } from "react-redux";
import { UrlDetailActions } from "../../store/reducers/ClickedUrlDetails";
import HoverModal from "../styled/HoverModal.styled";

const TotalUrlMap = ({
  getUrls,
  setGetUrls,
  editMode,
  setMyFav,
  deleteMode,
}) => {
  const [hoverList, setHoverList] = useState([]);
  const dispatch = useDispatch();
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
        return (
          <>
            <div
              style={{ position: "relative" }}
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
                  dispatch,
                });
              }}
              onMouseOut={() => {
                setGetUrls(
                  getUrls.map((val) => {
                    return val._id === value._id
                      ? { ...value, url_hover: false }
                      : val;
                  })
                );
                // onMouseLeave()
              }}
              onMouseOver={(e) => {
                setGetUrls(
                  getUrls.map((val) => {
                    return val._id === value._id
                      ? { ...value, url_hover: true }
                      : val;
                  })
                );

                // grabNowValue(value);
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
              <HoverModal value={value} />
            </div>
          </>
        );
      })}
    </>
  );
};

export default TotalUrlMap;
