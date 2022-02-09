import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    font-weight: 100;
    color: #bccac1;
  }
`;

export default InputWrapper;
