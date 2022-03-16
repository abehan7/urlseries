import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { constants, useMode } from "../../contexts/ModeContext";
import { useUrl } from "../../contexts/UrlContext";
import AddFolderModal from "./AddFolderModal";
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

const AddModalWhiteList = [constants.ADD, constants.EDIT_MODAL_UP];
const FolderModalWhiteList = [
  constants.FOLDER_ADD,
  constants.FOLDER_EDIT_MODAL_UP,
];
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

  return (
    <ModalEl onClick={onClickOutside} ref={ref}>
      {/* 북마크 추가 수정 모달 */}
      {AddModalWhiteList.includes(mode) && <AddModal />}
      {/* 해시태그 모달 */}
      {mode === constants.HASHTAG && <HashtagModal />}
      {/* 폴더 추가 수정 모달 */}
      {FolderModalWhiteList.includes(mode) && <AddFolderModal />}
    </ModalEl>
  );
};

export default Modals;
