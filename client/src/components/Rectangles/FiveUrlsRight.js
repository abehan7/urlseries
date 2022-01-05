import React, { useEffect, useState } from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import Axios from "axios";
import MoreBtn from "./MoreBtn";
import HoverModal from "../styled/HoverModal.styled";
import styled from "styled-components";
import UrlRectWrapper from "../styled/UrlRectWrapper.styled";

const FiveUrlsRightEl = styled(UrlRectWrapper)``;
const FiveUrlsRight = ({ values, editMode, setMyFav, setTopMoreWhat }) => {
  const [Height, setHeight] = useState(0);
  const fiveStuffs = values.slice(0, 5);

  const WhenEditMode = ({ url: value }) => {
    EditMode_ModalFunc(value);
    setMyFav(value.url_likedUrl === 1);
    console.log("에디터모드입니다");
  };

  const WhenNormal = ({ url: value }) => {
    window.open(value.url);
    Axios.put("http://localhost:3001/clickedURLInBox", {
      url: value,
    });
  };
  const RightOnClick = ({ url: value }) => {
    !editMode ? WhenEditMode({ url: value }) : WhenNormal({ url: value });
  };

  return (
    <>
      {fiveStuffs.map((value) => {
        return (
          <FiveUrlsRightEl
            style={{ position: "relative" }}
            className="url"
            onClick={() => RightOnClick({ url: value })}
            onMouseOut={(e) => {
              e.target.lastChild.classList.remove("hover-on");
            }}
            onMouseOver={(e) => {
              e.target.lastChild.classList.add("hover-on");

              Height !== e.target.offsetHeight &&
                setHeight(e.target.offsetHeight);
            }}
            onContextMenu={(e) => {
              console.log("우클릭");
              e.preventDefault();
            }}
            key={value.url_id}
          >
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
          </FiveUrlsRightEl>
        );
      })}
      {values.length > 5 && (
        <MoreBtn setTopMoreWhat={setTopMoreWhat} where="Right" />
      )}
    </>
  );
};

export default FiveUrlsRight;
