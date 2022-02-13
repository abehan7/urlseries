import React, { useState } from "react";
import styled from "styled-components";
import { Bar, ImgContainer, ItemContainerEl, Title } from "./ItemUrlContainer";

const ItemFolderContainerEl = styled(ItemContainerEl)``;

const Image = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
`;

const ItemFolderContainer = ({
  value,
  key,
  handleClickUrl,
  handleUnClickUrl,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const onClick = (value) => {
    setIsChecked(!isChecked);
    isChecked ? handleUnClickUrl(value) : handleClickUrl(value);
  };

  // setIsChecked(true);

  return (
    <ItemFolderContainerEl
      className="searched-Stuff"
      key={key}
      onClick={() => onClick(value)}
    >
      <ImgContainer>
        <Image
          style={{ pointerEvents: "none" }}
          className="urlFavicon"
          src={`http://www.google.com/s2/favicons?domain=${value.url}`}
          alt=""
        />
      </ImgContainer>
      <Bar className="just-bar">|</Bar>
      <Title className="Searched-url-Title">{value?.url_title}</Title>
    </ItemFolderContainerEl>
  );
};

export default ItemFolderContainer;
