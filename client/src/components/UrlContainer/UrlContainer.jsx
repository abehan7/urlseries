import React from "react";
import styled from "styled-components";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";

const UrlContainerEl = styled.div`
  width: 100vw;
  height: 100%;
  flex: 1;
  display: flex;
  @media screen and (max-width: 1018px) {
    flex-direction: column;
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
