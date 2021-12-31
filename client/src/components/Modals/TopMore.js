import React from "react";
import { IoArrowBack } from "react-icons/io5";
import "./AddUrlModal.css";
import { disable } from "../../functions/stopScroll";
import "./TopMore.css";
const TopMore = ({
  mostClickedUrls,
  likedUrls,
  topMoreWhat,
  setTopMoreWhat,
}) => {
  // likedUrls === 왼쪽 === topMoreWhat = 2
  // mostClickedUrls=== 오른쪽=== topMoreWhat = 1
  return (
    <>
      <div id="modal" className="modal-overlay">
        <div className="modal-window top-modal-window">
          <div className="header-Container">
            <div
              className="close-area"
              onClick={() => {
                document.querySelector(
                  ".top-moreUrls-container"
                ).style.display = "none";
                disable();
              }}
            >
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
                      window.open(value.url);
                    }}
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
