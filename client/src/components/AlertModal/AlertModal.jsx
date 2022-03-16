import React from "react";
import styled from "styled-components";
import { useModal } from "../../contexts/ModalContext";

const ModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalWindow = styled.div`
  width: 300px;
  height: 180px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  flex-direction: column;
  pointer-events: none;
`;

const AlertModal = () => {
  const options = useModal().options;
  const onClickOutside = () => {};

  return (
    <ModalOverlay show={options.inOpen} onClick={onClickOutside}>
      <ModalWindow>{options.message}</ModalWindow>;
    </ModalOverlay>
  );
};

export default AlertModal;
