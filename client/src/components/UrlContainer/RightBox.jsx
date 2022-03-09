import React from "react";

import styled from "styled-components";
import { useUrl } from "../../contexts/UrlContext";
import { ItemConatiner } from "./styled/ItemContainer";
import { Title } from "./styled/Title.styled";
import { TitleWrapper } from "./styled/TitleWrapper.styled";
import Url from "./Url";
const RightBoxEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  padding-right: 1rem;
`;
const FlexContainer = styled(ItemConatiner)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  height: calc(100% - 130px);
  max-height: calc(100% - 130px);
  width: 80%;
  background-color: #f7f8fa;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  overflow-y: scroll;

  scrollbar-width: 0;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const RightBox = () => {
  const totalUrls = useUrl().url.totalUrls;
  // console.log(totalUrls.length);
  return (
    <RightBoxEl>
      <TitleWrapper>
        <Title>즐겨찾기</Title>
      </TitleWrapper>
      <FlexContainer>
        {totalUrls.slice(0, 14).map((url, index) => (
          <Url
            url={url.url}
            title={url.url_title}
            key={url._id}
            id={url._id}
            index={index}
            totalUrlNum={totalUrls.length}
          />
        ))}
      </FlexContainer>
    </RightBoxEl>
  );
};

export default RightBox;
