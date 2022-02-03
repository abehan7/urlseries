import React from "react";
import { MdOutlineTag } from "react-icons/md";
import styled from "styled-components";
import BoxWrap from "../styled/BoxWrap.styled";

import ModalContent from "../styled/ModalContent.styled";

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
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  > h3 {
    margin: 0%;
    padding: 3.5px;
  }
`;

const ItemRight = ({ Title, ItemList, Item, handleToggle }) => {
  return (
    <ItemRightEl>
      <ItemRightTitle>
        <h3>{Title}</h3>
      </ItemRightTitle>
      <ModalContent>
        <ItemRightBgIcon>
          <MdOutlineTag />
        </ItemRightBgIcon>
        <BoxWrap>
          {ItemList?.map((val, i) => {
            return Item({
              name: val.name,
              i,
              oneItem: val,
              handleToggle,
            });
          })}
        </BoxWrap>
      </ModalContent>
    </ItemRightEl>
  );
};

export default ItemRight;
