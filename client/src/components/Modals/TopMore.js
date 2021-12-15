import React from "react";
import { IoArrowBack } from "react-icons/io5";
import "./AddUrlModal.css";
import { disable } from "./stopScroll";
import "./TopMore.css";
const TopMore = ({ likedUrls, mostClickedUrls }) => {
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
              <h2>내가 지정한 URL</h2>
            </div>
          </div>

          <div className="content more-content">
            <div className="more-urls-contents">
              {likedUrls.map((value) => {
                return (
                  <div
                    className="url more-url"
                    onClick={() => {
                      window.open(value.url);
                    }}
                  >
                    <div className="valueId">{value.url_id}</div>
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
