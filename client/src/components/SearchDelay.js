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
  console.log(e.target.value);
  // console.log(document.querySelector(".Search-balloon"));
  const urls2 = await urls.urls;
  urls2.forEach((val) => {
    const newDiv = document.createElement("div");
    newDiv.className = "searched-Stuff";
    newDiv.innerHTML =
      `<div class="Searched-url-Id">${val.id}</div>` +
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
