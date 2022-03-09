import React from "react";
import styled from "styled-components";
import { IoChevronUpSharp } from "react-icons/io5";

const MarkerEl = styled.div`
  visibility: ${(props) => (props.isScroll ? "visible" : "hidden")};
  opacity: ${(props) => (props.isScroll ? "1" : "0")};
  transform: ${(props) =>
    props.isScroll ? "translateY(0%);" : "translateY(-100%);"};

  position: fixed;
  width: 30px;
  min-height: 30px;
  min-width: 30px;
  height: 30px;
  background-color: #a597fe50;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #c4c4c4;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: #fff;

  :hover {
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background-color: #a597fe;
  }
`;

const Icon = styled.div`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Marker = ({ isScroll, onClick }) => {
  return (
    <MarkerEl isScroll={isScroll} onClick={onClick}>
      <Icon>
        <IoChevronUpSharp />
      </Icon>
    </MarkerEl>
  );
};

export default Marker;
