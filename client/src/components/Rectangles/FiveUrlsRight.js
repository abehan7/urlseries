import React from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import Axios from "axios";
import MoreBtn from "./MoreBtn";

const FiveUrlsRight = ({ values, editMode, setMyFav, setTopMoreWhat }) => {
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
          <div
            className="url"
            onClick={() => RightOnClick({ url: value })}
            onMouseEnter={() => {
              // console.log(123);
            }}
            onContextMenu={(e) => {
              console.log("우클릭");
              e.preventDefault();
            }}
            key={value.url_id}
          >
            <img
              className="urlFavicon"
              src={`http://www.google.com/s2/favicons?domain=${value.url}`}
              alt=""
            />
            <div className="valueId">{value.url_id}</div>
            <div className="just-bar">|</div>
            <div className="valueTitle">{value.url_title}</div>
          </div>
        );
      })}
      {values.length > 5 && (
        <MoreBtn setTopMoreWhat={setTopMoreWhat} where="Right" />
      )}
    </>
  );
};

export default FiveUrlsRight;
