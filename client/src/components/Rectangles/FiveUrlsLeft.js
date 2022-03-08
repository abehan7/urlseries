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

const FiveUrlsLeftEl = styled(UrlRectWrapper)`
  .just-bar,
  .valueTitle,
  img {
    pointer-events: none;
  }
  border-radius: 10px;
`;
const FiveUrlsLeft = () => {
  const likedUrls = useUrl().url.likedUrls;

  const [Height, setHeight] = useState(0);

  const fiveStuffs = likedUrls.slice(0, 6);
  const { setUrlDetail } = useContext(MainStates);

  const WhenEditMode = ({ url: value }) => {
    console.log("에디터모드입니다");
    EditMode_ModalFunc(value, setUrlDetail);
    // setMyFav(value.url_likedUrl === 1);
  };

  const WhenNormal = ({ url: value }) => {
    window.open(value.url);
    API.put("/clickedURLInBox", { url: value });
  };
  const onClick = (url) => {
    //TODO: 해결 후 다시 주석 풀기
    // !editMode ? WhenEditMode(url) : WhenNormal(url);
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
          <FiveUrlsLeftEl
            style={{ position: "relative" }}
            className="url"
            onClick={() => onClick(url)}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
            key={url.url_id}
          >
            <img className="urlFavicon" src={src} alt="" />
            {/* <div className="valueId">{value.url_id}</div> */}
            <div className="just-bar">|</div>
            <div className="valueTitle">{url.url_title}</div>
            <HoverModal Height={Height} value={url} />
          </FiveUrlsLeftEl>
        );
      })}
      {likedUrls.length > 6 && <MoreBtn where="Left" />}
    </>
  );
};

export default FiveUrlsLeft;
