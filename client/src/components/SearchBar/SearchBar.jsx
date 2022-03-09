import React from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import styled from "styled-components";

const InputSearch = styled.input`
  height: 35px;
  width: 35px;
  border: none;
  font-size: 15px;
  outline: none;
  border-radius: 50%;
  transition: all 0.5s ease-in-out;
  background-color: transparent;
  padding-right: 20px;
  color: transparent;
  margin-right: 5px;
  margin-top: 3.5px;
  padding-left: 1rem;

  :focus {
    width: 300px;
    color: #535151;
    border-radius: 10px;
    background-color: #a597fe1a;
    border-bottom: 1px solid #c4c4c4;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  }
`;

const BtnSearch = styled.button`
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: #ffffff;
  background-color: transparent;
  pointer-events: painted;
  :focus ~ input {
    color: #535151;
    width: 300px;
    background-color: #a597fe1a;
    border-radius: 10px;
    border-bottom: 1px solid #c4c4c4;
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  svg {
    color: gray;
    transition: all 0.3s ease-in-out;
  }
`;

const SearchBarEl = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  margin-right: 2%;
  margin-top: 1%;
`;

const SearchBar = ({ onChange = () => {}, keyword = "" }) => {
  return (
    <SearchBarEl>
      <BtnSearch>
        <IoSearchCircleOutline size="35px" />
      </BtnSearch>
      <InputSearch type="text" onChange={onChange} value={keyword} />
    </SearchBarEl>
  );
};

export default SearchBar;
