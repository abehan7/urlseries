import React from "react";
import styled from "styled-components";

const NoResultEl = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
`;

const NoResult = ({ children }) => {
  return <NoResultEl>{children}</NoResultEl>;
};

export default NoResult;
