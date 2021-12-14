import React, { useCallback, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import "./HashTagModal.css";

const HashTagModal = ({ asignedTags, setAsignedTags, originAT, totalTags }) => {
  const [tagSearch, setTagSearch] = useState("");
  let filterd = [];
  filterd = totalTags.filter((val) => {
    return val.name
      .toLowerCase()
      .replace(/(\s*)/g, "")
      .includes(tagSearch.toLowerCase().replace(/(\s*)/g, "")); // 큰거 작은거 검색하고싶은거를 뒤에 넣기
  });

  const makeColorBack = () => {
    // document.querySelectorAll(".total-oneHash").forEach((val) => {
    //   val.style.backgroundColor = "white";
    // });
    setTimeout(() => {
      document.querySelectorAll(".total-oneHash").forEach((val) => {
        asignedTags.forEach((tag) => {
          if (val.innerText === tag) {
            val.style.backgroundColor = "bisque";
            val.style.transitionDuration = "0.5s";
          }
        });
      });
    }, 100);
  };

  if (tagSearch.length === 0) {
    makeColorBack();
  }

  return (
    <>
      <div id="modal" className="modal-overlay hash-overlay">
        <div className="modal-window hashTag-modal-window">
          <div className="header-Container HashTag-header-Container">
            <div
              className="close-area"
              onClick={() => {
                document.querySelector(
                  ".hashtagModal-container"
                ).style.display = "none";
                setAsignedTags(originAT);
              }}
            >
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>HashTags</h2>
            </div>
          </div>
          <div className="searchTags-Container">
            <input
              value={tagSearch}
              className="tag-searchBar"
              placeholder="선택할 태그를 입력해주세요"
              onChange={(e) => {
                console.log(e.target.value);
                setTagSearch(e.target.value);
                console.log(filterd);
              }}
              onKeyUp={() => {
                // makeColorBack();
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
                        className="oneHash total-oneHash"
                        onClick={(e) => {
                          console.log(e.target.innerText);
                          if (!asignedTags.includes(e.target.innerText)) {
                            setAsignedTags((val) => [
                              ...val.name,
                              e.target.innerText,
                            ]);
                            e.target.style.backgroundColor = "bisque";
                          } else {
                            setAsignedTags(
                              asignedTags.filter((val) => {
                                return val.name !== e.target.innerText;
                              })
                            );
                            e.target.style.backgroundColor = "white";
                          }
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
                      <div className="oneHash total-oneHash">{val.name}</div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="editHash-btn">
              <button
                onClick={() => {
                  document.querySelector(
                    ".hashtagModal-container"
                  ).style.display = "none";
                }}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
        <div className="modal-window selected-tags">
          <div className="title chosen-title">
            <h2>Chosen Ones</h2>
          </div>
          <div className="flexWrapBox">
            {asignedTags.map((val) => {
              return <div className="oneHash">{val.name}</div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HashTagModal;
