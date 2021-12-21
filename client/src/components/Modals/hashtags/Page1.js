import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { disable } from "../../../functions/stopScroll";
import { closeFunc, modify } from "./HashModalFuncs";
import HashTagItems from "./HashTagItems";

const Page1 = ({ setAssignedTags, assignedTags, totalTags, setTotalTags }) => {
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
      setTotalTags(
        totalTags.map((tag) => {
          return val.name === tag.name
            ? {
                name: tag.name,
                assigned: 1,
                origin: tag.origin,
              }
            : tag;
        })
      );

      setAssignedTags((tag) => [...tag, val]);
      console.log(val);

      console.log("클릭됨");
    } else {
      setTotalTags(
        totalTags.map((tag) => {
          return val.name === tag.name
            ? {
                name: tag.name,
                assigned: 0,
                origin: tag.origin,
              }
            : tag;
        })
      );

      setAssignedTags(
        assignedTags.filter((tag2) => {
          return tag2.name !== val.name;
        })
      );
      console.log(val);
    }
  };

  const removeToggle = (val) => {
    setTotalTags(
      totalTags.map((tag) => {
        return val.name === tag.name
          ? {
              name: tag.name,
              assigned: 0,
              origin: tag.origin,
            }
          : tag;
      })
    );

    setAssignedTags(
      assignedTags.filter((tag2) => {
        return tag2 !== val;
      })
    );
  };
  return (
    <div className="modal-window hashTag-modal-window">
      <div className="header-Container HashTag-header-Container">
        <div
          className="close-area"
          onClick={async () => {
            await closeFunc(
              setAssignedTags,
              totalTags,
              setTotalTags,
              setTagSearch
            );
            disable();
          }}
        >
          <IoArrowBack />
        </div>
        <div className="title">
          <h2>HashTags</h2>
        </div>
      </div>

      <HashTagItems
        tagSearch={tagSearch}
        totalTags={totalTags}
        toggleFunc={toggleFunc}
        filterd={filterd}
        setTagSearch={setTagSearch}
        assignedTags={assignedTags}
        removeToggle={removeToggle}
      />
      <div className="editHash-btn">
        <button
          onClick={async () => {
            await modify(setTotalTags, totalTags, assignedTags, setTagSearch);
            disable();
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default Page1;
