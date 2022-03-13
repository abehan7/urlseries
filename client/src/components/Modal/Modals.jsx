import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { constants, useMode } from "../../contexts/ModeContext";
import { useUrl } from "../../contexts/UrlContext";
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
  const setMode = useMode().setMode;
  const handleSetEditUrl = useUrl().handleSetEditUrl;

  const onClickOutside = (e) => {
    mode === constants.EDIT_MODAL_UP &&
      e.target === ref.current &&
      setMode(constants.EDIT);

    mode === constants.EDIT_MODAL_UP &&
      e.target === ref.current &&
      handleSetEditUrl({});

    mode !== constants.EDIT_MODAL_UP &&
      e.target === ref.current &&
      setMode(constants.NORMAL);
  };
  // console.log(mode);
  const AddModalWhiteList = [constants.ADD, constants.EDIT_MODAL_UP];
  return (
    <ModalEl onClick={onClickOutside} ref={ref}>
      {AddModalWhiteList.includes(mode) && <AddModal />}
      {mode === constants.HASHTAG && <HashtagModal />}
    </ModalEl>
  );
};

export default Modals;
