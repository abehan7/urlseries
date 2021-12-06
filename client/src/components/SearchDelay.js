import React, { useState } from "react";
// import "./Test.css";
import { debounce } from "lodash";
import urls from "../urls.json";

const debounceSomethingFunc = debounce(async (e) => {
  // const newDiv = document.createElement("div");
  // newDiv.className = "searched-Stuff";
  // newDiv.innerText = "테스트";
  // document.querySelector(".Searched-Stuffs-Container").appendChild(newDiv);
  // newDiv.addEventListener("click", (e) => {
  //   // console.log(e.target);
  // });

  // console.log("called debounceSomethingFunc");
  if (e.target.value.length === 0) {
    return;
  }
  console.log(e.target.value);
  // console.log(document.querySelector(".Search-balloon"));
  const urls2 = await urls.urls;

  var hashFilterd = [];
  var titleFilterd = [];

  //헐 return 2개 하니까 되네

  hashFilterd = urls2.filter((val) => {
    return val.hashTags.some((tag) => {
      return tag
        .toLowerCase()
        .replace(/(\s*)/g, "")
        .includes(e.target.value.toLowerCase().replace(/(\s*)/g, ""));
    });
  });
  console.log("hashFilterd first");
  console.log(hashFilterd);

  titleFilterd = urls2.filter((val) => {
    return val.title
      .toLowerCase()
      .replace(/(\s*)/g, "")
      .includes(e.target.value.toLowerCase().replace(/(\s*)/g, ""));
  });
  // console.log(titleFilterd);
  //=========== 타이틀 검색어 start ===========
  titleFilterd.forEach((val) => {
    const newDiv = document.createElement("div");
    newDiv.className = "searched-Stuff";
    newDiv.innerHTML =
      `<div class="Searched-url-Id">${val.id}</div>` +
      `<div class="just-bar"> | </div>` +
      `<div class="Searched-url-Title">${val.title}</div>`;
    document.querySelector(".Searched-Stuffs-Container").appendChild(newDiv);
    newDiv.addEventListener("click", (e) => {
      console.log(e.target);
      window.open(val.url);
    });
  });
  //=========== 타이틀 검색어 end ===========

  //해쉬태그 검색어 중복 삭제
  var hashFilterd2 = hashFilterd.filter((val) => {
    return titleFilterd.every((val2) => {
      return val.id !== val2.id;
    });
  });

  // =========== 해쉬태그 검색어 start ===========
  hashFilterd2.forEach((val) => {
    const newDiv = document.createElement("div");
    newDiv.className = "searched-Stuff";
    newDiv.innerHTML =
      `<div class="Searched-url-Id">#${val.id}</div>` +
      `<div class="just-bar"> | </div>` +
      `<div class="Searched-url-Title">${val.title}</div>`;
    document.querySelector(".Searched-Stuffs-Container").appendChild(newDiv);
    newDiv.addEventListener("click", (e) => {
      console.log(e.target);
      window.open(val.url);
    });
  });

  if (hashFilterd2.length + titleFilterd.length === 0) {
    console.log("검색어 없음");
    document.querySelector(".notSearched").style.display = "flex";
  }
}, 1000);
// =========== 해쉬태그 검색어 end ===========

const SearchDelay = ({ createModal2 }) => {
  const [text2, setText2] = useState("");
  const onDebounceChange = (e) => {
    if (document.querySelector(".searched-Stuff")) {
      document.querySelectorAll(".searched-Stuff").forEach((val) => {
        val.remove();
      });
    }
    document.querySelector(".notSearched").style.display = "none";
    // document.querySelector(".Search-balloon-title").style.display = "none";
    const value = e.target.value;
    if (value.length === 0) {
      document.querySelector(".Search-balloon-title").style.display = "flex";
    } else {
      document.querySelector(".Search-balloon-title").style.display = "none";
    }

    setText2(value);
    debounceSomethingFunc(e);
  };

  return (
    <>
      <input
        type="text"
        value={text2}
        onClick={createModal2}
        onChange={onDebounceChange}
      />
    </>
  );
};

export default SearchDelay;
