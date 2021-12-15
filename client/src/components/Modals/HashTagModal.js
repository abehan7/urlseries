import React, { useCallback, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import "./HashTagModal.css";

const HashTagModal = ({
  assignedTags,
  setAssignedTags,
  totalTags,
  setTotalTags,
  OtotalTags,
}) => {
  const [tagSearch, setTagSearch] = useState("");
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
      val.assigned = 1;
      setAssignedTags((tag) => [...tag, val]);

      console.log("클릭됨");
    } else {
      val.assigned = 0;
      setAssignedTags(
        assignedTags.filter((tag2) => {
          return tag2 !== val;
        })
      );
    }
  };

  const removeToggle = (e, val) => {
    val.assigned = 0;
    setAssignedTags(
      assignedTags.filter((tag2) => {
        return tag2 !== val;
      })
    );
  };

  const closeFunc = () => {
    document.querySelector(".hashtagModal-container").style.display = "none";
    setAssignedTags([]);

    totalTags.forEach((val) => {
      if (val.assigned !== val.assignedOrigin) {
        val.assigned = val.assignedOrigin;
      }
      if (val.assignedOrigin === 1) {
        setAssignedTags((tag) => [...tag, val]);
      }
    });
  };

  return (
    <>
      <div id="modal" className="modal-overlay hash-overlay">
        <div className="modal-window hashTag-modal-window">
          <div className="header-Container HashTag-header-Container">
            <div
              className="close-area"
              onClick={() => {
                closeFunc();
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
                        className={
                          val.assigned === 1
                            ? "oneHash total-oneHash clicked"
                            : "oneHash total-oneHash"
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
                          val.assigned === 1
                            ? "oneHash total-oneHash clicked"
                            : "oneHash total-oneHash"
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
            {assignedTags.map((val) => {
              return (
                <div
                  className="oneHash"
                  onClick={(e) => {
                    removeToggle(e, val);
                  }}
                >
                  {val.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HashTagModal;
