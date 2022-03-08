import React from "react";

import styled from "styled-components";
import { ItemConatiner } from "./styled/ItemContainer";
const RightBoxEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const ItemContainerEl = styled(ItemConatiner)``;
const RightBox = () => {
  return (
    <RightBoxEl>
      <ItemContainerEl></ItemContainerEl>
    </RightBoxEl>
  );
};

export default RightBox;
