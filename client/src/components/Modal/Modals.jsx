import React from "react";
import styled from "styled-components";
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
  return (
    <ModalEl>
      <AddModal />
    </ModalEl>
  );
};

export default Modals;
