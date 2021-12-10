import React from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import styled from "styled-components";
import { MdExpandMore } from "react-icons/md";

const FiveUrlsLeft = ({ values, editMode, shareMode, setMyFav }) => {
  const fiveStuffs = values.slice(0, 5);
  console.log("다섯개");
  console.log(fiveStuffs);

  return (
    <>
      {fiveStuffs.map((value) => {
        return (
          <div
            className="url"
            onClick={() => {
              if (!editMode) {
                console.log("에디터모드입니다");
                EditMode_ModalFunc(value);
                setMyFav(value.url_likedUrl === 1);
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
      {values.length > 5 && (
        <div className="moreBtn">
          <MdExpandMore />
        </div>
      )}
    </>
  );
};

export default FiveUrlsLeft;
