import React, { useEffect, useState } from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import Axios from "axios";
import MoreBtn from "./MoreBtn";
import HoverModal from "../styled/HoverModal.styled";

const FiveUrlsLeft = ({ values, editMode, setMyFav, setTopMoreWhat }) => {
  const [hoverList, setHoverList] = useState([]);
  const fiveStuffs = values.slice(0, 5);

  const WhenEditMode = ({ url: value }) => {
    console.log("에디터모드입니다");
    EditMode_ModalFunc(value);
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
      {fiveStuffs.map((value) => {
        return (
          <div
            style={{ position: "relative" }}
            className="url"
            onClick={() => {
              !editMode
                ? WhenEditMode({ url: value })
                : WhenNormal({ url: value });
            }}
            onMouseEnter={() => {
              value.url_hover = true;
            }}
            onMouseLeave={() => {
              value.url_hover = false;
            }}
            onContextMenu={(e) => {
              console.log("우클릭");
              e.preventDefault();
            }}
            key={value.url_id}
          >
<<<<<<< HEAD
            {/* <div className="valueId">{value.url_id}</div> */}
            <div className="valueId">
              <img
                id="urlFavicon"
                src={"http://www.google.com/s2/favicons?domain=" + value.url}
              ></img>
            </div>
=======
            <img
              className="urlFavicon"
              src={`http://www.google.com/s2/favicons?domain=${value.url}`}
              alt=""
            />
            {/* <div className="valueId">{value.url_id}</div> */}
>>>>>>> HAN
            <div className="just-bar">|</div>
            <div className="valueTitle">{value.url_title}</div>
            <HoverModal value={value} />
          </div>
        );
      })}
      {values.length > 5 && (
        <MoreBtn setTopMoreWhat={setTopMoreWhat} where="Left" />
      )}
    </>
  );
};

export default FiveUrlsLeft;
