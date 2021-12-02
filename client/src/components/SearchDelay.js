import React, { useState } from "react";
// import "./Test.css";
import { debounce } from "lodash";

const debounceSomethingFunc = debounce((e) => {
  const newDiv = document.createElement("div");
  newDiv.className = "searched-Stuffs";
  newDiv.innerText = "테스트";
  document.querySelector(".Searched-Stuffs-Container").appendChild(newDiv);
  newDiv.addEventListener("click", (e) => {
    // console.log(e.target);
  });

  console.log("called debounceSomethingFunc");
  console.log(e.target.value);
  console.log(document.querySelector(".Search-balloon"));
}, 700);

const SearchDelay = ({ createModal2 }) => {
  const [text2, setText2] = useState("");

  const onDebounceChange = (e) => {
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
