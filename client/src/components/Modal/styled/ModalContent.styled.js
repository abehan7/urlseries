import styled from "styled-components";

export const ModalContent = styled.div`
  height: 330px;
  width: 400px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: default;
  @keyframes popup {
    0% {
      transform: translateY(50%);
    }
    100% {
      transform: translateY(0%);
    }
  }
  animation: popup 0.3s ease-in-out;
`;
