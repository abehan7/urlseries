import React from "react";
import styled from "styled-components";

const LeftBoxEl = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GridContainer = styled.div`
  /* display: grid; */
  /* grid-template-columns: repeat(2, 1fr); */
  /* grid-template-rows: auto; */
  height: 90%;
  width: 90%;
  background-color: #fff;
  border-radius: 10px;
`;
const LeftBox = () => {
  return (
    <LeftBoxEl>
      <GridContainer></GridContainer>
    </LeftBoxEl>
  );
};

export default LeftBox;
