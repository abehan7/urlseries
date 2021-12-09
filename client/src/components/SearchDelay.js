import React, { useState } from "react";
// import "./Test.css";
import { debounce } from "lodash";
import Axios from "axios";

const debounceSomethingFunc = debounce(async (e) => {
  document.querySelector(".loadingImg").style.display = "none";

  var SearchedList = [];
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
  const typedKeyword = e.target.value.toLowerCase().replace(/(\s*)/g, "");

  // console.log(document.querySelector(".Search-balloon"));

  console.log(typedKeyword);

  await Axios.post("http://localhost:3001/search", {
    typedKeyword: typedKeyword,
  }).then((response) => {
    console.log("액시오스");
    console.log(response.data);
    SearchedList = response.data;
  });

  var hashFilterd = [];
  var titleFilterd = [];

  //헐 return 2개 하니까 되네

  hashFilterd = SearchedList.filter((val) => {
    return val.url_hashTags.some((tag) => {
      return tag
        .toLowerCase()
        .replace(/(\s*)/g, "")
        .includes(e.target.value.toLowerCase().replace(/(\s*)/g, ""));
    });
  });
  console.log("hashFilterd first");
  console.log(hashFilterd);

  titleFilterd = SearchedList.filter((val) => {
    return val.url_title
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
      `<div class="Searched-url-Id">${val.url_id}</div>` +
      `<div class="just-bar"> | </div>` +
      `<div class="Searched-url-Title">${val.url_title}</div>`;
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
      return val.url_id !== val2.url_id;
    });
  });

  // =========== 해쉬태그 검색어 start ===========
  hashFilterd2.forEach((val) => {
    const newDiv = document.createElement("div");
    newDiv.className = "searched-Stuff";
    newDiv.innerHTML =
      `<div class="Searched-url-Id">#${val.url_id}</div>` +
      `<div class="just-bar"> | </div>` +
      `<div class="Searched-url-Title">${val.url_title}</div>`;
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
    document.querySelector(".loadingImg").style.display = "flex";

    // document.querySelector(".Search-balloon-title").style.display = "none";
    const value = e.target.value;
    if (value.length === 0) {
      document.querySelector(".Search-balloon-title").style.display = "flex";
      document.querySelector(".loadingImg").style.display = "none";
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
