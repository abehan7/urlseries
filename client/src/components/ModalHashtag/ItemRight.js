import React from "react";
import { MdOutlineTag } from "react-icons/md";
import styled from "styled-components";
import BoxWrap from "../styled/BoxWrap.styled";

import ItemContainer from "../styled/ItemContainer.styled";

const ItemRightEl = styled.div`
  flex: 1;
`;
const ItemRightBgIcon = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 100px;
  pointer-events: none;
  opacity: 0.1;
`;
const ItemRightTitle = styled.div`
  display: flex;
  height: 46.6px;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #9b9b9b;
  > h3 {
    border: 3px solid #bbbbbb;
    border-radius: 10px;
    padding: 5px;
    margin: 0%;
    /* padding: 2px; */
    /* font-weight: lighter; */
    color: black;
    font-size: 15px;
  }
`;
const ItemRight = ({ Title, ItemList, Item }) => {
  return (
    <ItemRightEl>
      <ItemRightTitle>
        <h3>{Title}</h3>
      </ItemRightTitle>
      <ItemContainer>
        <ItemRightBgIcon>
          <MdOutlineTag />
        </ItemRightBgIcon>
        <BoxWrap>
          {ItemList?.map((item) => {
            const key = Math.floor(Math.random() * 1000000);
            return Item({ item, index: key });
          })}
        </BoxWrap>
      </ItemContainer>
    </ItemRightEl>
  );
};

export default ItemRight;
