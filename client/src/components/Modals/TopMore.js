import React, { useContext, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import "./AddUrlModal.css";
import { disable } from "../../functions/stopScroll";
import "./TopMore.css";
import { ModalInfos } from "../../routers/MainPage";

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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setModalInfo({
  //     ...modalInfo,
  //     [name]: value,
  //   });
  // };
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
                document
                  .querySelector(".top-modal-window")
                  .classList.toggle("top-modal-window-clicked");
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
                      NormalMode(value);
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
