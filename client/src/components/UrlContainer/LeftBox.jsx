import React from "react";
import styled from "styled-components";
import { ItemConatiner } from "./styled/ItemContainer";
import { useUrl } from "../../contexts/UrlContext";
import Url from "./Url";
import { Title } from "./styled/Title.styled";
import { TitleWrapper } from "./styled/TitleWrapper.styled";
import Indicator from "./Indicator";

const LeftBoxEl = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* padding: 1rem; */
`;

const FlexContainer = styled(ItemConatiner)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* gap: 1.3rem; */
  gap: 1rem;
  height: calc(100% - 130px - 1rem - 30px);
  max-height: calc(100% - 130px - 1rem - 30px);
  width: 90%;
  background-color: #f7f8fa;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

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
      <TitleWrapper>
        <Title>전체 북마크</Title>
      </TitleWrapper>
      <Indicator />
      <FlexContainer>
        {totalUrls.slice(0, 100).map((url, index) => (
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
    </LeftBoxEl>
  );
};

export default LeftBox;
