import React, { useContext, useState } from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import MoreBtn from "./MoreBtn";
import HoverModal from "../styled/HoverModal.styled";
import styled from "styled-components";
import UrlRectWrapper from "../styled/UrlRectWrapper.styled";
import { modalHover } from "./TotalUrlMap";
import { MainStates } from "../../routers/MainPage";
import { API } from "../Api";
import { useUrl } from "../../contexts/UrlContext";

const FiveUrlsRightEl = styled(UrlRectWrapper)`
  position: relative;
  border-radius: 10px;
  img,
  div {
    pointer-events: none;
  }
`;
const FiveUrlsRight = () => {
  const recentClickedUrls = useUrl().url.recentClickedUrls;
  const [Height, setHeight] = useState(0);
  const fiveStuffs = recentClickedUrls.slice(0, 6);

  const { setUrlDetail } = useContext(MainStates);

  const WhenEditMode = ({ url: value }) => {
    EditMode_ModalFunc(value, setUrlDetail);
    // setMyFav(value.url_likedUrl === 1);
    console.log("에디터모드입니다");
  };

  const WhenNormal = ({ url: value }) => {
    window.open(value.url);
    API.put("/clickedURLInBox", {
      url: value,
    });
  };
  const RightOnClick = ({ url: value }) => {
    // !editMode ? WhenEditMode({ url: value }) : WhenNormal({ url: value });
  };

  const onMouseOut = (e) => {
    modalHover.cancel();
    e.target.lastChild.classList.remove("hover-on");
  };

  const onMouseOver = (e) => modalHover(e, setHeight, Height);
  return (
    <>
      {fiveStuffs.map((url) => {
        const src = `https://www.google.com/s2/favicons?domain=${url.url}`;
        return (
          <FiveUrlsRightEl
            className="url"
            onClick={() => RightOnClick(url)}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
            key={url.url_id}
          >
            <img className="urlFavicon" src={src} alt="" />
            <div className="just-bar">|</div>
            <div className="valueTitle">{url.url_title}</div>
            <HoverModal Height={Height} value={url} />
          </FiveUrlsRightEl>
        );
      })}
      {recentClickedUrls.length > 6 && <MoreBtn />}
    </>
  );
};

export default FiveUrlsRight;
