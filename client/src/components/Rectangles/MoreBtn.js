import React from "react";
import { MdExpandMore } from "react-icons/md";
import styled from "styled-components";
import { PopupEnable } from "../../functions/stopScroll";

const MoreBtnEl = styled.div`
  @media (max-width: 470px) {
    height: 2.5rem;
  }
`;
const MoreBtn = ({ setTopMoreWhat, where }) => {
  return (
    <MoreBtnEl
      className="moreBtn"
      onClick={() => {
        where === "Right" ? setTopMoreWhat(false) : setTopMoreWhat(true);
        document.querySelector(".top-moreUrls-container").style.display =
          "flex";
        PopupEnable();
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
