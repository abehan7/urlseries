import React from "react";
import styled from "styled-components";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";

const UrlContainerEl = styled.div`
  background-color: tomato;
  height: 100%;
  flex: 1;
  display: flex;
`;
const UrlContainer = () => {
  return (
    <UrlContainerEl>
      <LeftBox />
      <RightBox />
    </UrlContainerEl>
  );
};

export default UrlContainer;
