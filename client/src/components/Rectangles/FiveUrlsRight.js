import React from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import { FiSmile } from "react-icons/fi";
import { AiOutlineSmile } from "react-icons/ai";
import Axios from "axios";

const FiveUrlsRight = ({ values, editMode, shareMode, setMyFav }) => {
  const fiveStuffs = values.slice(0, 5);

  return (
    <>
      {fiveStuffs.map((value) => {
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
                Axios.put("http://localhost:3001/clickedURLInBox", {
                  url: value,
                });
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
            <img
              id="urlFavicon"
              src={"http://www.google.com/s2/favicons?domain=" + value.url}
            ></img>
            <div className="just-bar">|</div>
            <div className="valueTitle">{value.url_title}</div>
          </div>
        );
      })}
      {values.length >= 5 && (
        <div className="moreBtn">
          <FiSmile onClick={(e) => {}} />
          <AiOutlineSmile />
          <FiSmile />
          <AiOutlineSmile />
          {/* 여기 자바스크립트로 한번 누를때랑 2번 누를때 얼굴 색깔 다르게 만들기 */}
        </div>
      )}
    </>
  );
};

export default FiveUrlsRight;
