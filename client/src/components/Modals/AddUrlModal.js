import React, { useState } from "react";
import "./AddUrlModal.css";
import { IoArrowBack } from "react-icons/io5";
import Axios from "axios";

const AddUrlModal = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [hashTag, setHashTag] = useState([]);
  const [memo, setMemo] = useState("");
  // var totalHashes = [];
  // var filterdHashes = [];

  return (
    <>
      <div id="modal" className="modal-overlay">
        <div className="modal-window">
          <div className="header-Container">
            <div
              className="close-area"
              onClick={() => {
                document.querySelector(".addUrl-container").style.display =
                  "none";
              }}
            >
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>URL추가</h2>
            </div>
          </div>

          <div className="content">
            <div className="put-url">
              <input
                placeholder="URL을 추가해주세요"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </div>
            <div className="put-title">
              <input
                placeholder="제목을 추가해주세요"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="put-hashTag">
              <input
                placeholder="해쉬태그를 추가해주세요 #집밥 #인스타그램 #유튜브"
                onChange={(e) => {
                  var totalHashes = [];
                  var filterdHashes = [];
                  totalHashes = e.target.value.split("#");
                  console.log(totalHashes);
                  totalHashes.forEach((tag) => {
                    if (tag.length !== 0) {
                      filterdHashes.push("#" + tag.replace(/\s/g, ""));
                      console.log("#" + tag);
                    }
                  });
                  setHashTag(filterdHashes);
                }}
              />
            </div>
            <div className="put-memo">
              <input
                placeholder="메모할 내용을 입력해주세요"
                onChange={(e) => {
                  setMemo(e.target.value);
                }}
              />
            </div>
            <div className="addUrl-btn">
              <button
                onClick={() => {
                  Axios.post("http://localhost:3001/addUrl", {
                    url: url,
                    title: title,
                    hashTags: hashTag,
                    memo: memo,
                  });

                  document.querySelector(".addUrl-container").style.display =
                    "none";
                }}
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUrlModal;
