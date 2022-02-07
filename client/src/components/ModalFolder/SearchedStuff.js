import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styled from "styled-components";

const SearchedStuffEl = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  min-height: 43px;
  width: 100%;
  cursor: pointer;
  :hover {
    background: #e9ecef57;
  }
`;
const Image = styled.img`
  /* padding-left: 10px; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  pointer-events: none;
  height: 16px;
`;
const Item = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  pointer-events: none;
`;

const Title = styled(Item)`
  /* width: 200px; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const Bar = styled(Item)`
  padding-right: 10px;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100%;
  pointer-events: none;
`;

const SelectBox = styled.div`
  display: flex;
`;

const SearchedStuff = ({ value, key, onClick }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SearchedStuffEl
      className="searched-Stuff"
      key={key}
      onClick={() => {
        setIsChecked(!isChecked);
        onClick();
      }}
    >
      <ImgContainer>
        <SelectBox>
          {isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </SelectBox>
      </ImgContainer>
      <Bar className="just-bar">|</Bar>
      <Title className="Searched-url-Title">{value?.url_title}</Title>
    </SearchedStuffEl>
  );
};

export default SearchedStuff;
