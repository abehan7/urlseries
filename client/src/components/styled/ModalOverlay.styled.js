import styled from "styled-components";

const ModalOverlay = styled.div`
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

export default ModalOverlay;
