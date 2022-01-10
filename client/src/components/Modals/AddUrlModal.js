import React, { useState } from "react";
import "./AddUrlModal.css";
import { IoArrowBack } from "react-icons/io5";
import Axios from "axios";
import { disable } from "../../functions/stopScroll";
import { connect } from "react-redux";
import TextArea from "../styled/TextArea.styled";
import { AddUrl } from "../Api";

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

    await AddUrl(url, title, filterdHashes, memo).then((response) => {
      console.log(response.data);
      document.querySelector(".addUrl-container").style.display = "none";
      setUrl("");
      setTitle("");
      setHashTag("");
      setMemo("");
      setGetUrls([response.data, ...getUrls]);
    });
  };

  const height = 37;
  const defaultHeight = {
    height: `${height}px`,
    transition: "1s",
  };

  return (
    <>
      <div id="modal" className="modal-overlay">
        <div
          className="modal-window"
          style={
            memo.length < 25
              ? { transition: "1s" }
              : { height: "400px", transition: "1s" }
          }
        >
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
                style={defaultHeight}
                value={url}
                placeholder="URL을 추가해주세요"
                onChange={(e) => {
                  setUrl(e.target.value);

                  if (e.target.value.length > 5) {
                    setTitle("잠시만 기다려주세요...");
                    setHashTag("잠시만 기다려주세요...");
                    Axios.post("http://localhost:3001/crawling", {
                      url: e.target.value,
                    }).then((response) => {
                      const { data } = response;
                      console.log(data);
                      setTitle(data.title);
                      setHashTag(data.hashtags.join(""));
                    });
                  } else {
                    setTitle("");
                    setHashTag("");
                  }
                }}
              />
            </div>
            <div className="put-title">
              <input
                value={title}
                style={defaultHeight}
                placeholder="제목을 추가해주세요"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="put-hashTag">
              <input
                value={hashTag}
                style={defaultHeight}
                placeholder="해쉬태그를 추가해주세요 #집밥 #인스타그램 #유튜브"
                onChange={(e) => {
                  setHashTag(e.target.value);
                }}
              />
            </div>
            <div className="put-memo">
              <TextArea memo={memo} setMemo={setMemo} />
            </div>
            <div className="addUrl-btn">
              <button
                style={{ height: "43px" }}
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
