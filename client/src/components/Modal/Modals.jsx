import React from "react";
import styled from "styled-components";
import { constants, useMode } from "../../contexts/ModeContext";
import AddModal from "./AddModal";
const ModalEl = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modals = () => {
  const mode = useMode().mode;
  console.log(mode);
  return (
    mode === constants.ADD && (
      <ModalEl>
        <AddModal />
      </ModalEl>
    )
  );
};

export default Modals;
