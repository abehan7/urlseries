import React, { createRef, useEffect, useRef, useState } from "react";
import { getMouseLocation, grabNowValue } from "./movingModalFuncs";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import whenIclickUrl from "./FuncTotalUrlMap";
import { useDispatch } from "react-redux";
import { UrlDetailActions } from "../../store/reducers/ClickedUrlDetails";
import HoverModal from "../styled/HoverModal.styled";
import styled from "styled-components";

const TotalUrlMapEl = styled.div`
  .hover-on {
    display: flex;
  }
`;
const TotalUrlMap = ({
  getUrls,
  setGetUrls,
  editMode,
  setMyFav,
  deleteMode,
}) => {
  const [Height, setHeight] = useState(0);
  const dispatch = useDispatch();
  // window.onscroll = () => {
  //   const circle = document.querySelector(".detail-container");
  //   grabNowValue.cancel();
  //   circle.style.display = "none";
  // };

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
            <TotalUrlMapEl
              style={{ position: "relative" }}
              className="T-url"
              key={value._id}
              onClick={(e) => {
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
              onMouseOut={(e) => {
                e.target.lastChild.classList.remove("hover-on");
              }}
              onMouseOver={(e) => {
                e.target.lastChild.classList.add("hover-on");
                setHeight(e.target.offsetHeight);
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
                style={{ pointerEvents: "none" }}
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
              <div className="just-bar" style={{ pointerEvents: "none" }}>
                |
              </div>
              <div className="valueTitle" style={{ pointerEvents: "none" }}>
                {value.url_title}
              </div>
              <HoverModal
                Height={Height}
                value={value}
                className="modalmodal"
              />
            </TotalUrlMapEl>
          </>
        );
      })}
    </>
  );
};

export default TotalUrlMap;
