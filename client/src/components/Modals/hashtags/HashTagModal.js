import Axios from "axios";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import HashTagItems from "./HashTagItems";
import "./HashTagModal.css";
import { disable } from "../../../functions/stopScroll";

const api = Axios.create({
  baseURL: `http://localhost:3001/`,
});

const HashTagModal = ({
  assignedTags,
  setAssignedTags,
  totalTags,
  setTotalTags,
}) => {
  const [tagSearch, setTagSearch] = useState("");

  // console.log("태그이름들");
  // console.log(tagNames);

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

  const closeFunc = () => {
    document.querySelector(".hashtagModal-container").style.display = "none";

    setAssignedTags(
      totalTags.filter((tag) => {
        return tag.origin === 1;
      })
    );

    setTotalTags(
      totalTags.map((tag) => {
        return {
          name: tag.name,
          assigned: tag.origin,
          origin: tag.origin,
        };
      })
    );

    // totalTags.forEach((val) => {
    //   if (val.assigned !== val.origin) {
    //     val.assigned = val.origin;
    //   }
    // });
    setTagSearch("");
  };

  const modify = () => {
    document.querySelector(".hashtagModal-container").style.display = "none";
    setTotalTags(
      totalTags.map((tag) => {
        return {
          name: tag.name,
          assigned: tag.assigned,
          origin: tag.assigned,
        };
      })
    );
    console.log(assignedTags);

    let oneLineTags = [];
    assignedTags.forEach((val) => {
      oneLineTags.push(val.name);
    });

    api.put("/ChangedAssignedTag", {
      oneLineTags: oneLineTags,
    });

    setTagSearch("");
  };

  return (
    <>
      <div id="modal" className="modal-overlay hash-overlay">
        <div className="modal-window hashTag-modal-window">
          <div className="header-Container HashTag-header-Container">
            <div
              className="close-area"
              onClick={async () => {
                await closeFunc();
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
                await modify();
                disable();
              }}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HashTagModal;
