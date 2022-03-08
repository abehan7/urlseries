import React from "react";
import styled from "styled-components";
import { ItemConatiner } from "./styled/ItemContainer";
import { useUrl } from "../../contexts/UrlContext";
import Url from "./Url";
import { Title } from "./styled/Title.styled";

const LeftBoxEl = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 90%;
  background-color: #f7f8fa;

  overflow-y: scroll;

  scrollbar-width: 0;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const LeftBox = () => {
  const totalUrls = useUrl().url.totalUrls;

  return (
    <LeftBoxEl>
      <Title>전체 북마크</Title>
      <FlexContainer>
        {totalUrls.slice(0, 14).map((url, key) => (
          <Url url={url.url} title={url.url_title} key={key} />
        ))}
      </FlexContainer>
    </LeftBoxEl>
  );
};

export default LeftBox;
