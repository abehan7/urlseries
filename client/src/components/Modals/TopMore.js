import React from "react";
import { IoArrowBack } from "react-icons/io5";
import "./AddUrlModal.css";
import { PopupDisable } from "../../Hooks/stopScroll";
import "./TopMore.css";
import { TopMoreScrollUp } from "../../Hooks/ScrollUp";

const TopMore = ({
  mostClickedUrls,
  likedUrls,
  topMoreWhat,
  setTopMoreWhat,
}) => {
  // FIXME:
  // likedUrls === 왼쪽 === topMoreWhat = true
  // mostClickedUrls=== 오른쪽=== topMoreWhat = false

  const NormalMode = (value) => {
    window.open(value.url);
  };

  const handleCloseBtn = () => {
    TopMoreScrollUp();
    document.querySelector(".top-moreUrls-container").style.display = "none";
    PopupDisable();
    document
      .querySelector(".top-modal-window")
      .classList.toggle("top-modal-window-clicked");
  };

  const handleClickOutside = (e) => {
    document.querySelector(".topmore-overlay") === e.target && handleCloseBtn();
  };

  return (
    <>
      <div
        id="modal"
        className="modal-overlay topmore-overlay"
        onClick={handleClickOutside}
      >
        <div className="modal-window top-modal-window">
          <div className="header-Container">
            <div className="close-area" onClick={handleCloseBtn}>
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>{topMoreWhat ? "즐겨찾기" : "최근기록"}</h2>
            </div>
          </div>

          <div className="content more-content">
            <div className="more-urls-contents">
              {(topMoreWhat ? likedUrls : mostClickedUrls).map((value) => {
                return (
                  <div
                    className="url more-url"
                    onClick={() => {
                      NormalMode(value);
                    }}
                    key={value.url_id}
                  >
                    <img
                      className="urlFavicon"
                      src={`http://www.google.com/s2/favicons?domain=${value.url}`}
                      alt=""
                    />
                    {/* <div className="valueId">{value.url_id}</div> */}
                    <div className="just-bar">|</div>
                    <div className="valueTitle">{value.url_title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopMore;
