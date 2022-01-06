import React from "react";
import { MdExpandMore } from "react-icons/md";
import styled from "styled-components";
import { enable } from "../../functions/stopScroll";

const MoreBtnEl = styled.div``;
const MoreBtn = ({ setTopMoreWhat, where }) => {
  return (
    <MoreBtnEl
      className="moreBtn"
      onClick={() => {
        where === "Right" ? setTopMoreWhat(false) : setTopMoreWhat(true);
        document.querySelector(".top-moreUrls-container").style.display =
          "flex";
        enable();
        document
          .querySelector(".top-modal-window")
          .classList.toggle("top-modal-window-clicked");
      }}
    >
      <MdExpandMore />
    </MoreBtnEl>
  );
};

export default MoreBtn;
