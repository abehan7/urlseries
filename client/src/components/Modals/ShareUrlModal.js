import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import "./hashtags/HashTagModal.css";
import "./ShareUrlModal.css";
import { PopupDisable } from "../../functions/stopScroll";

const ShareUrlModal = ({
  totalTags = [],
  setTotalTags = [],
  realTotalUrls = [],
}) => {
  const [tagSearch, setTagSearch] = useState("");
  const [shareFilterTag, setShareFilterTag] = useState([]);

  // console.log(shareFilterTag);
  let sharefilterd = [];
  sharefilterd = realTotalUrls.filter((oneURL) => {
    return shareFilterTag.some((shareOneTag) => {
      return oneURL.url_hashTags.includes(shareOneTag);
    });
  });
  // console.log(sharefilterd);

  let filterd = [];
  filterd = totalTags.filter((val) => {
    return val.name
      .toLowerCase()
      .replace(/(\s*)/g, "")
      .includes(tagSearch.toLowerCase().replace(/(\s*)/g, "")); // 큰거 작은거 검색하고싶은거를 뒤에 넣기
  });

  const toggleFunc = (e, val) => {
    e.target.classList.toggle("clicked");
    if (e.target.classList[2] === "clicked") {
      console.log("클릭됨");
      setShareFilterTag((one) => [...one, val.name]);
      val.shared = 1;
    } else {
      console.log("토글 풀림");
      setShareFilterTag(
        shareFilterTag.filter((one) => {
          return one !== val.name;
        })
      );
      val.shared = 0;
    }
  };

  const closeFunc = () => {
    document.querySelector(".shareUrl-container").style.display = "none";
    sharefilterd = [];
    setShareFilterTag([]);
    setTagSearch("");
    setTotalTags(
      totalTags.map((val) => {
        return val.shared === 0
          ? val
          : {
              name: val.name,
              assigned: val.assigned,
              assignedOrigin: val.assignedOrigin,
              shared: 0,
            };
      })
    );
  };

  return (
    <>
      <div id="modal" className="modal-overlay hash-overlay share-overlay">
        <div className="modal-window hashTag-modal-window">
          <div className="header-Container HashTag-header-Container">
            <div
              className="close-area"
              onClick={async () => {
                await closeFunc();
                PopupDisable();
              }}
            >
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>URL공유하기</h2>
            </div>
          </div>
          <div className="searchTags-Container">
            <input
              value={tagSearch}
              className="tag-searchBar"
              placeholder="공유하실 태그를 입력해주세요"
              onChange={(e) => {
                console.log(e.target.value);
                setTagSearch(e.target.value);
                console.log(filterd);
              }}
            />
          </div>
          <div className="content hashtag-content">
            <div className="flexWrapBox">
              {tagSearch.length === 0 ? (
                <>
                  {totalTags.map((val) => {
                    return (
                      <div
                        className={
                          val.shared === 0
                            ? "oneHash total-oneHash"
                            : "oneHash total-oneHash clicked"
                        }
                        onClick={(e) => {
                          toggleFunc(e, val);
                        }}
                      >
                        {val.name}
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {filterd.map((val) => {
                    return (
                      <div
                        className={
                          val.shared === 0
                            ? "oneHash total-oneHash"
                            : "oneHash total-oneHash clicked"
                        }
                        onClick={(e) => {
                          toggleFunc(e, val);
                        }}
                      >
                        {val.name}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="editHash-btn">
              <button
                onClick={async () => {
                  PopupDisable();
                  document.querySelector(".shareUrl-container").style.display =
                    "none";
                }}
              >
                공유하기
              </button>
            </div>
          </div>
        </div>
        <div className="modal-window share-modal-window">
          <div className="title chosen-title urlList-forShare">
            <h2>공유할 URL목록</h2>
          </div>
          <div className="flexWrapBox share-flexWrapBox">
            {shareFilterTag.length === 0 ? (
              <></>
            ) : (
              sharefilterd.map((value) => {
                return (
                  <div className="url shareOneUrl" key={value.url_id}>
                    <div className="valueId">{value.url_id}</div>
                    <div className="just-bar">|</div>
                    <div className="valueTitle">{value.url_title}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareUrlModal;
