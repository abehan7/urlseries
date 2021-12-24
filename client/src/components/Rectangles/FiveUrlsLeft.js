import React from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import Axios from "axios";
import MoreBtn from "./MoreBtn";

const FiveUrlsLeft = ({ values, editMode, setMyFav, setTopMoreWhat }) => {
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
            className="url"
            onClick={() => {
              !editMode
                ? WhenEditMode({ url: value })
                : WhenNormal({ url: value });
            }}
            onMouseEnter={() => {}}
            onContextMenu={(e) => {
              console.log("우클릭");
              e.preventDefault();
            }}
            key={value.url_id}
          >
            <div className="valueId">{value.url_id}</div>
            <div className="just-bar">|</div>
            <div className="valueTitle">{value.url_title}</div>
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
