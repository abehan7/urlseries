import React from "react";
import styled from "styled-components";

const SearchedStuffEl = styled.div`
  display: flex;
  height: auto;
  min-height: 40px;
  width: 100%;
  cursor: pointer;
  :hover {
    background: #e9ecef57;
  }
`;
const Image = styled.img`
  /* padding-left: 10px; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  pointer-events: none;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  pointer-events: none;
  justify-content: center;
`;

const Title = styled(Item)``;
const Bar = styled(Item)`
  padding-right: 10px;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100%;
  margin-left: 10px;
`;
const SearchedStuff = ({ val, key }) => {
  return (
    <SearchedStuffEl key={key}>
      <ImgContainer>
        <Image
          class="urlFavicon"
          src={`http://www.google.com/s2/favicons?domain=${val.url}`}
          alt=""
        />
      </ImgContainer>
      <Bar class="just-bar">|</Bar>
      <Title class="Searched-url-Title">{val.url_title}</Title>
    </SearchedStuffEl>
  );
};

export default SearchedStuff;

export { SearchedStuffEl, ImgContainer, Image, Bar, Title };
