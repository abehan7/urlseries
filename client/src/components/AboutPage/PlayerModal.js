import React from "react";
import "./PlayerModal.css";

function PlayerModal({ closeModal }) {
  return (
    <div className="modalBackGround">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className="colseBtn" onClick={() => closeModal(false)}>
            {" "}
            X{" "}
          </button>
        </div>
        <div className="title">
          <p>[다음 영상을 참고하여 이용하세요]</p>
        </div>
        <div className="body">
          <div className="videopocket">
            <img className="video" src="img/aboutsearch.gif" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlayerModal;
