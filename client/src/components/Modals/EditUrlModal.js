import React, { useEffect, useState } from "react";
import "./AddUrlModal.css";
import "./EditUrlModal.css";
import { IoArrowBack } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Axios from "axios";

const EditUrlModal = ({
  myFav,
  setMyFav,
  getUrls,
  setGetUrls,
  likedUrls,
  setLikedUrls,
}) => {
  console.log("111");

  const editBtn = async () => {
    var totalHashes = [];
    var filterdHashes = [];
    var newLikedUrl = 0;

    if (myFav) {
      newLikedUrl = 1;
    }
    var hashTag = document.querySelector(
      ".editUrl-container .put-hashTag > input"
    ).value;
    totalHashes = hashTag.split("#");
    console.log(totalHashes);
    totalHashes.forEach((tag) => {
      if (tag.length !== 0) {
        filterdHashes.push("#" + tag.replace(/\s/g, ""));
        console.log("#" + tag);
      }
    });

    await Axios.put("http://localhost:3001/editUrl", {
      _id: document.querySelector(".url_id").innerText,
      newUrl: document.querySelector(".editUrl-container .put-url > input")
        .value,
      newTitle: document.querySelector(".editUrl-container .put-title > input")
        .value,
      newHashTags: filterdHashes,
      newMemo: document.querySelector(".editUrl-container .put-memo > input")
        .value,
      newLikedUrl: newLikedUrl,
    }).then((response) => {
      console.log(response.data);
      document.querySelector(".editUrl-container").style.display = "none";
      // setGetUrls([response.data, ...getUrls]);
      setGetUrls(
        getUrls.map((val) => {
          return val._id === document.querySelector(".url_id").innerText
            ? response.data
            : val;
        })
      );

      if (response.data.url_likedUrl === 1) {
        console.log("setLikedUrls DONE");
        setLikedUrls([...likedUrls, response.data]);
      }

      likedUrls.forEach((val) => {
        if (val._id === response.data._id && response.data.url_likedUrl === 0) {
          setLikedUrls(
            likedUrls.filter((val2) => {
              return val2 !== val;
            })
          );
        }
      });

      console.log(getUrls);
      console.log("업데이트 완료");
    });
  };

  const deleteBtn = async (_id) => {
    await Axios.delete(`http://localhost:3001/deleteUrl/${_id}`);
    document.querySelector(".editUrl-container").style.display = "none";
    setGetUrls(
      getUrls.filter((val) => {
        return val._id !== _id;
      })
    );
  };

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
              <button
                onClick={() => {
                  const _id = document.querySelector(".url_id").innerText;
                  console.log(_id);
                  deleteBtn(_id);
                }}
              >
                삭제하기
              </button>
              <button
                onClick={() => {
                  editBtn();
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
