import React from "react";
import styled from "styled-components";

const ConfirmModalEl = styled.div`
  width: 150px;
  height: 90px;
  background-color: #fff;

  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 300ms;

  ${({ isOpen }) => {
    if (isOpen) {
      return `
        visibility: visible;
        opacity: 1;
      `;
    } else {
      return `
        visibility: hidden;
        opacity: 0;
        `;
    }
  }}
`;

const MsgContainer = styled.div``;
const ConfirmModal = ({ message, isOpen }) => {
  return (
    <ConfirmModalEl isOpen={isOpen}>
      <MsgContainer>{message}</MsgContainer>
    </ConfirmModalEl>
  );
};

export default ConfirmModal;
