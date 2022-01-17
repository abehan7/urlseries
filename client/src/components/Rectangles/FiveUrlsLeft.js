import React, { useContext, useState } from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import Axios from "axios";
import MoreBtn from "./MoreBtn";
import HoverModal from "../styled/HoverModal.styled";
import styled from "styled-components";
import UrlRectWrapper from "../styled/UrlRectWrapper.styled";
import { modalHover } from "./TotalUrlMap";
import { MainStates } from "../../routers/MainPage";

const FiveUrlsLeftEl = styled(UrlRectWrapper)`
  border-radius: 10px;
`;
const FiveUrlsLeft = ({ values, editMode, setMyFav, setTopMoreWhat }) => {
  const [Height, setHeight] = useState(0);

  const fiveStuffs = values.slice(0, 5);
  const { setUrlDetail } = useContext(MainStates);

  const WhenEditMode = ({ url: value }) => {
    console.log("에디터모드입니다");
    EditMode_ModalFunc(value, setUrlDetail);
    setMyFav(value.url_likedUrl === 1);
  };

  const WhenNormal = ({ url: value }) => {
    window.open(value.url);
    Axios.put("http://localhost:3001/clickedURLInBox", {
      url: value,
    });
  };

  return (
    <>
      {(editMode ? fiveStuffs : values).map((value) => {
        return (
          <FiveUrlsLeftEl
            style={{ position: "relative" }}
            className="url"
            onClick={() => {
              !editMode
                ? WhenEditMode({ url: value })
                : WhenNormal({ url: value });
            }}
            onMouseOut={(e) => {
              modalHover.cancel();
              e.target.lastChild.classList.remove("hover-on");
            }}
            onMouseOver={(e) => {
              modalHover(e, setHeight, Height);
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
            {/* <div className="valueId">{value.url_id}</div> */}
            <div className="just-bar" style={{ pointerEvents: "none" }}>
              |
            </div>
            <div className="valueTitle" style={{ pointerEvents: "none" }}>
              {value.url_title}
            </div>
            {editMode && <HoverModal Height={Height} value={value} />}
          </FiveUrlsLeftEl>
        );
      })}
      {values.length > 5 && editMode && (
        <MoreBtn setTopMoreWhat={setTopMoreWhat} where="Left" />
      )}
    </>
  );
};

export default FiveUrlsLeft;
