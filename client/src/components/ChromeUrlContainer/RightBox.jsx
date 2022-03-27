import React from "react";
import ItemContainer from "../UrlContainer/ItemContainer";
import { FlexContainer, RightBoxEl } from "../UrlContainer/RightBox";
import { Title } from "../UrlContainer/styled/Title.styled";
import { TitleWrapper } from "../UrlContainer/styled/TitleWrapper.styled";

const RightBox = () => {
  const TotalUrlMap = () => <ItemContainer urls={[]} />;

  return (
    <RightBoxEl>
      <TitleWrapper>
        <Title>크롬북마크</Title>
      </TitleWrapper>
      <FlexContainer>{TotalUrlMap()}</FlexContainer>
    </RightBoxEl>
  );
};

export default RightBox;
