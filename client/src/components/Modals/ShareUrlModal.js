import React, { useState } from "react";
import "./AddUrlModal.css";
import "./EditUrlModal.css";
import "./ShareUrlModal.css";
import { IoArrowBack } from "react-icons/io5";
import { AiFillTwitterSquare, AiOutlineFacebook } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { SiKakaotalk } from "react-icons/si";
import { disable } from "./stopScroll";

const ShareUrlModal = () => {
  const close = () => {
    document.querySelector(".shareUrl-container").style.display = "none";
  };
  return (
    <>
      <div id="modal" className="modal-overlay">
        <div className="modal-window share-modal-window">
          <div className="header-Container">
            <div
              className="close-area"
              onClick={() => {
                document.querySelector(".shareUrl-container").style.display =
                  "none";
                disable();
              }}
            >
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>공유하기</h2>
            </div>
          </div>

          <div className="content share-content">
            <div className="message">url목록을 공유할 sns를 선택해주세요</div>

            <div className="addUrl-btn editUrl-btn shareUrl-btn">
              <BsInstagram />
              <AiOutlineFacebook />
              <AiFillTwitterSquare />
              <SiKakaotalk />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareUrlModal;
