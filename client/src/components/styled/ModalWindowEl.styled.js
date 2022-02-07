import styled from "styled-components";

const ModalWindowEl = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 20px;
  width: 400px;
  height: 280px;
  position: relative;
  @media (max-width: 400px) {
    width: 95%;
  }
`;

export default ModalWindowEl;
