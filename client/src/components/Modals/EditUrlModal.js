import React, { useEffect, useState } from "react";
import "./AddUrlModal.css";
import "./EditUrlModal.css";
import { IoArrowBack } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const EditUrlModal = ({ myFav, setMyFav }) => {
  console.log("111");

  return (
    <>
      <div id="modal" className="modal-overlay">
        <div className="modal-window">
          <div className="header-Container">
            <div
              className="close-area"
              onClick={() => {
                document.querySelector(".editUrl-container").style.display =
                  "none";
              }}
            >
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>에디터모드</h2>
            </div>

            <div
              className="Myfav"
              onClick={() => {
                console.log("별");
                setMyFav(!myFav);
              }}
            >
              {myFav ? <AiFillStar /> : <AiOutlineStar />}
            </div>
          </div>

          <div className="content">
            <div className="put-url">
              <input placeholder="URL을 추가해주세요" />
            </div>
            <div className="put-title">
              <input placeholder="제목을 추가해주세요" />
            </div>
            <div className="put-hashTag">
              <input placeholder="해쉬태그를 추가해주세요 #집밥 #인스타그램 #유튜브" />
            </div>
            <div className="put-memo">
              <input placeholder="메모할 내용을 입력해주세요" />
            </div>
            <div className="addUrl-btn editUrl-btn">
              <button>삭제하기</button>
              <button
                onClick={() => {
                  document.querySelector(".editUrl-container").style.display =
                    "none";
                }}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="urlInfoes">
        <div className="url_id"></div>
        <div className="url_likedUrl">0</div>
      </div>
    </>
  );
};

export default EditUrlModal;
