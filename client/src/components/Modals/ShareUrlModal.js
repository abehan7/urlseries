import React, { useState } from "react";
import "./AddUrlModal.css";
import "./EditUrlModal.css";
import "./ShareUrlModal.css";
import { IoArrowBack } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ShareUrlModal = () => {
  const [myFav, setMyFav] = useState(false);
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
              <img src="img/kakaoRect.png" alt="카카오" onClick={close} />
              <img src="img/instagram.png" alt="인스타" onClick={close} />
              <img src="img/twitter.png" alt="트위터" onClick={close} />
              <img src="img/facebook.png" alt="페이스북" onClick={close} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareUrlModal;
