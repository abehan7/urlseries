import React from "react";
import styled from "styled-components";
import FolderModalWindow from "../ModalFolderPage/FolderModalWindow";
import ModalHashtag from "../ModalHashtag/ModalHashtag";
import AddUrlModal from "./AddUrlModal";
import EditUrlModal from "./EditUrlModal";
import TopMore from "./TopMore";
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0%;
  left: 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 3;
`;
const ModalsEl = styled.div``;

const Modals = ({ type }) => {
  return (
    <Overlay>
      <ModalsEl>
        {type === "add" && <AddUrlModal />}
        {type === "edit" && <EditUrlModal />}
        {type === "top" && <TopMore />}
        {type === "hashtag" && <ModalHashtag />}
        {type === "folder" && <FolderModalWindow />}
      </ModalsEl>
    </Overlay>
  );
};

export default Modals;
