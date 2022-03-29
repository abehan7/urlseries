import React from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import styled from "styled-components";
import { media } from "../../assets/Themes";

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
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(78, 76, 76, 0.5);
    transition: all 300ms ease-in-out;
    ${media.mobile} {
      width: 150px;
    }
  }
`;

const BtnSearch = styled.button`
  width: fit-content;
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
    ${media.mobile} {
      width: 150px;
    }
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(78, 76, 76, 0.5);
    transition: all 300ms ease-in-out;
    /* transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2); */
  }
  :focus svg {
    color: #fff;
  }
`;

const SearchBarEl = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  margin-right: 2%;
  margin-top: 1%;
`;

const SearchBar = ({ onChange, keyword }) => {
  return (
    <SearchBarEl>
      <BtnSearch>
        <IoSearchCircleOutline size="35px" color="gray" />
      </BtnSearch>
      <InputSearch
        type="text"
        onChange={onChange}
        value={keyword}
        spellCheck="false"
      />
    </SearchBarEl>
  );
};

export default SearchBar;
