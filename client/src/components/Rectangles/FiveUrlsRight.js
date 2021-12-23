import React from "react";
import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import Axios from "axios";
import { MdExpandMore } from "react-icons/md";
import { enable } from "../../functions/stopScroll";

const FiveUrlsRight = ({ values, editMode, setMyFav, setTopMoreWhat }) => {
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
            <div className="valueId">{value.url_id}</div>
            <div className="just-bar">|</div>
            <div className="valueTitle">{value.url_title}</div>
          </div>
        );
      })}
      {values.length > 5 && (
        <div
          className="moreBtn"
          onClick={() => {
            setTopMoreWhat(false);
            document.querySelector(".top-moreUrls-container").style.display =
              "flex";
            enable();
          }}
        >
          <MdExpandMore />
        </div>
      )}
    </>
  );
};

export default FiveUrlsRight;
