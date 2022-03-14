import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  border: 3px solid #bbbbbb;
  transition: all 0.3s ease-in-out;
  border-radius: 15px;
  margin: 10px 0;
  height: 35px;
  padding: 0.2rem 0;

  input {
    border: none;
    background-color: transparent;
    width: 100%;
    /* color: gray; */
    font-size: 16px;
    line-height: 24px;
  }

  :hover,
  :focus-within {
    border-color: #6d27e8;
  }

  input:focus,
  :hover input {
    /* color: gray; */
    outline: none;
    width: 250px;
  }

  label {
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
  }

  :hover label {
    color: #946be5;
  }

  :focus-within label,
  input:not(:placeholder-shown) ~ label {
    background-color: #fff;
    top: -4px;
    left: 6px;
    bottom: auto;
    color: #946be5;
  }
`;
