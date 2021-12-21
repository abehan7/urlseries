import React, { useState } from "react";
import "./AddUrlModal.css";
import { IoArrowBack } from "react-icons/io5";
import Axios from "axios";
import { disable } from "../../functions/stopScroll";
import { connect } from "react-redux";

const api = Axios.create({
  baseURL: `http://localhost:3001/`,
});

const AddUrlModal = ({ setGetUrls, getUrls, todos }) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [hashTag, setHashTag] = useState("");
  const [memo, setMemo] = useState("");
  // var totalHashes = [];
  // var filterdHashes = [];
  const addBtn = async () => {
    var totalHashes = [];
    var filterdHashes = [];
    totalHashes = hashTag.split("#");
    console.log(totalHashes);
    totalHashes.forEach((tag) => {
      if (tag.length !== 0) {
        filterdHashes.push("#" + tag.replace(/\s/g, ""));
        console.log("#" + tag);
      }
    });

    console.log(getUrls);

    await api
      .post("/addUrl", {
        url: url,
        title: title,
        hashTags: filterdHashes,
        memo: memo,
      })
      .then((response) => {
        console.log(response.data);
        document.querySelector(".addUrl-container").style.display = "none";
        setUrl("");
        setTitle("");
        setHashTag("");
        setMemo("");
        setGetUrls([response.data, ...getUrls]);
        // console.log(getUrls);
      });
  };

  return (
    <>
      <div id="modal" className="modal-overlay">
        <div className="modal-window">
          <div className="header-Container">
            <div
              className="close-area"
              onClick={() => {
                console.log(todos);
                document.querySelector(".addUrl-container").style.display =
                  "none";
                setUrl("");
                setTitle("");
                setHashTag("");
                setMemo("");
                disable();
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
                value={url}
                placeholder="URL을 추가해주세요"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </div>
            <div className="put-title">
              <input
                value={title}
                placeholder="제목을 추가해주세요"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="put-hashTag">
              <input
                value={hashTag}
                placeholder="해쉬태그를 추가해주세요 #집밥 #인스타그램 #유튜브"
                onChange={(e) => {
                  setHashTag(e.target.value);
                }}
              />
            </div>
            <div className="put-memo">
              <input
                value={memo}
                placeholder="메모할 내용을 입력해주세요"
                onChange={(e) => {
                  setMemo(e.target.value);
                }}
              />
            </div>
            <div className="addUrl-btn">
              <button
                onClick={async () => {
                  await addBtn();
                  disable();
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

function mapStateToProps(state) {
  return {
    todos: state,
  };
}
export default connect(mapStateToProps)(AddUrlModal);
