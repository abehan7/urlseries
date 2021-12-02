import React, { useState } from "react";
// import "./Test.css";
import { debounce, includes } from "lodash";
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
      return tag.includes(e.target.value);
    });
  });
  console.log("hashFilterd first");
  console.log(hashFilterd);

  titleFilterd = urls2.filter((val) => {
    return val.title.includes(e.target.value);
  });
  // console.log(titleFilterd);
  //타이틀 검색어
  titleFilterd.forEach((val) => {
    const newDiv = document.createElement("div");
    newDiv.className = "searched-Stuff";
    newDiv.innerHTML =
      `<div class="Searched-url-Id">${val.id}</div>` +
      `<div class="just-bar"> | </div>` +
      `<div class="Searched-url-Title">${val.title}</div>`;
    document.querySelector(".Searched-Stuffs-Container").appendChild(newDiv);
  });

  //해쉬태그 검색어 중복 삭제
  var hashFilterd2 = hashFilterd.filter((val) => {
    return titleFilterd.every((val2) => {
      console.log("내부");
      console.log(val.id);
      console.log(val2.id);
      if (val.id === val2.id) {
        console.log(val, val2);
      }
      return val.id !== val2.id;
    });
  });
  console.log("hashFilterd second");

  console.log(hashFilterd2);
  console.log(titleFilterd);

  // 해쉬태그 검색어
  hashFilterd2.forEach((val) => {
    const newDiv = document.createElement("div");
    newDiv.className = "searched-Stuff";
    newDiv.innerHTML =
      `<div class="Searched-url-Id">#${val.id}</div>` +
      `<div class="just-bar"> | </div>` +
      `<div class="Searched-url-Title">${val.title}</div>`;
    document.querySelector(".Searched-Stuffs-Container").appendChild(newDiv);
  });
}, 1000);

const SearchDelay = ({ createModal2 }) => {
  const [text2, setText2] = useState("");
  const onDebounceChange = (e) => {
    if (document.querySelector(".searched-Stuff")) {
      document.querySelectorAll(".searched-Stuff").forEach((val) => {
        val.remove();
      });
    }
    const value = e.target.value;

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
