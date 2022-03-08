import React from "react";
import styled from "styled-components";
import { ItemConatiner } from "./styled/ItemContainer";

const LeftBoxEl = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GridContainer = styled(ItemConatiner)`
  /* display: grid; */
  /* grid-template-columns: repeat(2, 1fr); */
  /* grid-template-rows: auto; */
`;
const LeftBox = () => {
  return (
    <LeftBoxEl>
      <GridContainer></GridContainer>
    </LeftBoxEl>
  );
};

export default LeftBox;
