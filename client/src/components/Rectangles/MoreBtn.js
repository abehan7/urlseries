import React from "react";
import { MdExpandMore } from "react-icons/md";
import { enable } from "../../functions/stopScroll";

const MoreBtn = ({ setTopMoreWhat, where }) => {
  return (
    <div
      className="moreBtn"
      onClick={() => {
        where === "Right" ? setTopMoreWhat(false) : setTopMoreWhat(true);
        document.querySelector(".top-moreUrls-container").style.display =
          "flex";
        enable();
      }}
    >
      <MdExpandMore />
    </div>
  );
};

export default MoreBtn;
