import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import whenIclickUrl from "./FuncTotalUrlMap";
import { useDispatch } from "react-redux";
import HoverModal from "../styled/HoverModal.styled";
import styled from "styled-components";
import UrlRectWrapper from "../styled/UrlRectWrapper.styled";
import { debounce } from "lodash";

export const modalHover = debounce((e, setHeight, Height) => {
  e.target.lastChild.classList.add("hover-on");
  Height !== e.target.offsetHeight && setHeight(e.target.offsetHeight);
}, 500);

const TotalUrlMapEl = styled(UrlRectWrapper)``;
const TotalUrlMap = ({
  getUrls,
  setGetUrls,
  editMode,
  setMyFav,
  deleteMode,
}) => {
  const [Height, setHeight] = useState(0);
  const dispatch = useDispatch();

  const onMouseOut = (e) => {
    modalHover.cancel();
    e.target.lastChild.classList.remove("hover-on");
  };

  const onMouseOver = (e) => {
    modalHover(e, setHeight, Height);
  };

  const onContextMenu = (e) => {
    console.log("우클릭");
    e.preventDefault();
  };

  const onClick = (value) => {
    whenIclickUrl({
      oneUrl: value,
      deleteMode,
      editMode,
      setMyFav,
      setGetUrls: setGetUrls,
      getUrls: getUrls,
      dispatch,
    });
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
              onClick={() => {
                onClick(value);
              }}
              onMouseOut={onMouseOut}
              onMouseOver={onMouseOver}
              onContextMenu={onContextMenu}
            >
              {!editMode && deleteMode && (
                <>
                  <div className="select-box">
                    {value.clicked ? (
                      <MdCheckBox style={{ paddingLeft: "10px" }} />
                    ) : (
                      <MdCheckBoxOutlineBlank style={{ paddingLeft: "10px" }} />
                    )}
                  </div>
                </>
              )}

              <img
                style={{ pointerEvents: "none" }}
                className="urlFavicon"
                src={`http://www.google.com/s2/favicons?domain=${value.url}`}
                alt=""
              />

              <div className="just-bar" style={{ pointerEvents: "none" }}>
                |
              </div>
              <div className="valueTitle" style={{ pointerEvents: "none" }}>
                {value.url_title}
              </div>
              <HoverModal Height={Height} value={value} />
            </TotalUrlMapEl>
          </>
        );
      })}
    </>
  );
};

export default TotalUrlMap;

{
  /* <iframe
                title="test"
                width="320"
                height="440"
                src="https://www.instagram.com/p/CYO9ux9uEMr/embed"
                frameborder="0"
              /> */
}
{
  /* <div className="valueId">{value.url_id}</div> */
}
{
  /* <img
                width={value.url.includes("youtu") ? "100px" : "20px"}
                className="urlFavicon"
                src={
                  value.url.includes("youtu")
                    ? `https://i.ytimg.com/vi/${imgThum}/maxresdefault.jpg`
                    : `http://www.google.com/s2/favicons?domain=${value.url}`
                }
                alt=""
              /> */
}

// window.onscroll = () => {
//   const circle = document.querySelector(".detail-container");
//   grabNowValue.cancel();
//   circle.style.display = "none";
// };

// const onMouseLeave = () => {
//   const circleㅜ   = document.querySelector(".detail-container");
//   circle.style.display = "none";
//   grabNowValue.cancel();
// };
