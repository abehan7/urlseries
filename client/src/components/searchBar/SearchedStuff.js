import React from "react";
import styled from "styled-components";

const SearchedStuffEl = styled.div``;
const Image = styled.img``;
const Item = styled.span``;
const SearchedStuff = ({ val, key }) => {
  return (
    <SearchedStuffEl key={key}>
      <Image
        class="urlFavicon"
        src={`http://www.google.com/s2/favicons?domain=${val.url}`}
        alt=""
      />
      <Item class="Searched-url-Id">#${val.url_id}</Item>
      <Item class="just-bar"> | </Item>
      <Item class="Searched-url-Title">${val.url_title}</Item>;
    </SearchedStuffEl>
  );
};

export default SearchedStuff;
