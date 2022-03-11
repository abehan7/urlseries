import React from "react";
import styled from "styled-components";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";

const UrlContainerEl = styled.div`
  width: 80%;
  height: 100%;
  min-height: 653px;

  flex: 1;
  display: flex;
  @media screen and (max-width: 1018px) {
    height: 100%;
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    height: 100%;
    padding: 6px;
  }
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
