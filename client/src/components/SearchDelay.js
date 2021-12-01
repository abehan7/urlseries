import React, { useState } from "react";
// import "./Test.css";
import { debounce } from "lodash";

const debounceSomethingFunc = debounce((e) => {
  console.log("called debounceSomethingFunc");
  console.log(e.target.value);
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
        onDragStart={() => {
          console.log("드래그");
        }}
      />
    </>
  );
};

export default SearchDelay;
