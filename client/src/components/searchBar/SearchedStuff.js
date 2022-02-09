import React from "react";
import styled from "styled-components";

const SearchedStuffEl = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  width: 100%;
  padding: 0.3rem 0;
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
  pointer-events: none;
  height: 16px;
  padding: 0.4rem;
`;
const Item = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  pointer-events: none;
`;

const Title = styled(Item)`
  /* width: 200px; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const Bar = styled(Item)`
  padding-right: 10px;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100%;
  /* margin-left: 10px; */
  pointer-events: none;
`;
const SearchedStuff = ({ val, key, onClick }) => {
  return (
    <SearchedStuffEl
      className="searched-Stuff"
      key={key}
      onClick={() => onClick(val)}
    >
      <ImgContainer>
        <Image
          className="urlFavicon"
          src={`http://www.google.com/s2/favicons?domain=${val.url}`}
          alt=""
        />
      </ImgContainer>
      <Bar className="just-bar">|</Bar>
      <Title className="Searched-url-Title">{val.url_title}</Title>
    </SearchedStuffEl>
  );
};

export default SearchedStuff;
