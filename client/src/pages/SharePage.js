import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SharePage.css";

const SharePage = () => {
  const [clickedSearchInput, setClickedSearchInput] = useState(false);

  const createModal2 = () => {
    if (!clickedSearchInput) {
      document.querySelector(".Search-balloon").style.display = "flex";
      document.querySelector(".Search-balloon").style.opacity = "1";
      document.querySelector(".Search-balloon").style.transform =
        "translateY(0)";
      document.querySelector(".search-box > svg").style.display = "none";

      setClickedSearchInput(!clickedSearchInput); // 이제 true
      console.log(clickedSearchInput);
    }
  };
  return (
    <div className="SharePage">
      <div className="grid-container"></div>
    </div>
  );
};

export default SharePage;
