import React from "react";

import styled from "styled-components";
import { useUrl } from "../../contexts/UrlContext";
import { ItemConatiner } from "./styled/ItemContainer";
import { Title } from "./styled/Title.styled";
import Url from "./Url";
const RightBoxEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
`;
const FlexContainer = styled(ItemConatiner)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1px;
  height: calc(100% - 130px);
  max-height: calc(100% - 130px);
  width: 80%;
  background-color: #f7f8fa;

  overflow-y: scroll;

  scrollbar-width: 0;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const RightBox = () => {
  const totalUrls = useUrl().url.totalUrls;
  return (
    <RightBoxEl>
      <Title>좋아요 북마크</Title>

      <FlexContainer>
        {totalUrls.slice(0, 14).map((url, key) => (
          <Url url={url.url} title={url.url_title} key={key} />
        ))}
      </FlexContainer>
    </RightBoxEl>
  );
};

export default RightBox;
