import React from "react";
import styled from "styled-components";
import ItemLeft from "../ModalHashtag/ItemLeft";
import ButtonWrapper from "../styled/ButtonWrapper.styled";
import ItemContainer from "../styled/ItemContainer.styled";
import ModalWindowEl from "../styled/ModalWindowEl.styled";
import HeaderContainer from "./HeaderContainer.styled";

const ModalWindowHashtagEl = styled(ModalWindowEl)`
  color: black;
`;

const ItemContainerHashtag = styled(ItemContainer)`
  min-height: 0;
  display: flex;
  flex: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ModalWindowHashtag = () => {
  return (
    <ModalWindowHashtagEl>
      <HeaderContainer className="header-Container">
        <h2>해쉬태그</h2>
      </HeaderContainer>
      <ItemContainerHashtag>아이템</ItemContainerHashtag>
      <ButtonWrapper className="editHash-btn">
        <button>버튼</button>
      </ButtonWrapper>
    </ModalWindowHashtagEl>
  );
};

export default ModalWindowHashtag;
