import React from "react";
import styled from "styled-components";
const SearchBarEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 240px;
  border-radius: 20px;
`;

const Input = styled.input`
  border: 0;
  outline: 0;
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.4rem;
  font-size: 1rem;
  background-color: transparent;
  transition: all 0.3s ease-in-out;
`;

const InputWrapper = styled.div`
  background-color: #fff;
`;
const SearchBar = () => {
  return (
    <SearchBarEl>
      <InputWrapper>
        <Input />
      </InputWrapper>
    </SearchBarEl>
  );
};

export default SearchBar;
