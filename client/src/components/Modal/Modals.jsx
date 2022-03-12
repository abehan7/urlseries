import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { constants, useMode } from "../../contexts/ModeContext";
import AddModal from "./AddModal";
import HashtagModal from "./HashtagModal";
const ModalEl = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Modals = ({ mode }) => {
  const ref = useRef(null);
  // const mode = useMode().mode;
  const setMode = useMode().setMode;
  const onClickOutside = (e) => {
    e.target === ref.current && setMode(constants.NORMAL);
  };
  // console.log(mode);
  return (
    <ModalEl onClick={onClickOutside} ref={ref}>
      {mode === constants.ADD && <AddModal />}
      {mode === constants.HASHTAG && <HashtagModal />}
    </ModalEl>
  );
};

export default Modals;
