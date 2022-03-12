import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  position: absolute;
  background-color: transparent;
  padding: 0 12px;
  line-height: 24px;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  color: #898989;
  cursor: text;
  pointer-events: none;
`;
