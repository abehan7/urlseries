import React from "react";
import styled from "styled-components";
import { FaRegStar } from "react-icons/fa";

const TagMarkerEl = styled.div`
  margin-right: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffc64b;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: 2px solid #fff;
  z-index: 1;
  border-radius: 35%;
  cursor: pointer;
  transition: ease-in-out 300ms;

  :hover {
    background-color: #e9ecef;
    color: #fff;
    /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  }
`;

const TagMarker = () => {
  return (
    <TagMarkerEl>
      <FaRegStar />
    </TagMarkerEl>
  );
};

export default TagMarker;
