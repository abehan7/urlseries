import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import styled from "styled-components";
import { disable } from "../../../functions/stopScroll";
import HashTagItems from "./HashTagItems";

const Page3 = ({ setAssignedTags, assignedTags, totalTags, setTotalTags }) => {
  const [tagSearch, setTagSearch] = useState("");

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

  const Page3Wrap = styled.div`
    div {
      // color: #fff;
    }
  `;
  return (
    <Page3Wrap>
      <div className="modal-window hashTag-modal-window">
        <div className="header-Container HashTag-header-Container">
          <div
            className="close-area"
            onClick={async () => {
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
          toggleFunc={() => {}}
          filterd={[]}
          setTagSearch={() => {}}
          assignedTags={assignedTags}
          removeToggle={() => {}}
        />
        <div className="editHash-btn">
          <button
            onClick={async () => {
              disable();
            }}
          >
            수정하기
          </button>
        </div>
      </div>
    </Page3Wrap>
  );
};

export default Page3;
