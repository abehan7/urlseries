import React from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import { MdExpandMore } from "react-icons/md";

const FiveUrlsRight = ({ values, editMode, shareMode, setMyFav }) => {
  return (
    <>
      {values.map((value) => {
        return (
          <div
            className="url"
            onClick={() => {
              if (!editMode) {
                EditMode_ModalFunc(value);
                setMyFav(value.url_likedUrl === 1);
                console.log("에디터모드입니다");
              } else {
                window.open(value.url);
              }
            }}
            onMouseEnter={() => {
              // console.log(123);
            }}
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
      {values.length >= 5 && (
        <div className="moreBtn">
          <MdExpandMore />
        </div>
      )}
    </>
  );
};

export default FiveUrlsRight;
