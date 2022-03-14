import React from "react";
import styled from "styled-components";
import { FcFolder } from "react-icons/fc";
const FolderItemEl = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemWrapper = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 90%;
  max-width: 95%;

  max-height: 90%;

  border-radius: 7px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  flex-direction: column;

  :hover {
    background-color: #e6c7b675;
    /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; */
  }
`;

const PaddingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const TopWrapper = styled.div`
  display: flex;
  width: 100%;
  > div {
    padding: 1rem;
    padding-bottom: 0.3rem;
  }

  justify-content: space-between;
`;
const FolderIcon = styled.div`
  font-size: 1.7rem;
`;
const LikedIcon = styled.div``;

const LikeTextWrapper = styled.div`
  color: #679155;
  background-color: #f0f9ea;
  padding: 0.3rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0.5px 0.5px 2.6px;
`;

const NotLikedWrapper = styled.div`
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: gray;
  border: 1px solid #ddd;
`;

const PadidngWrapper = styled.div`
  width: 100%;
`;

const DescPaddingWrapper = styled(PaddingWrapper)`
  flex: 1;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1rem;
`;

const Desc = styled.span`
  padding: 1rem;
  padding-top: 0.7rem;
  color: gray;
`;

const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* word-break: keep-all; */
  word-wrap: break-word;
`;

const text = `this is a pedrotech 123123 this is a pedrotecasdsadasdasdh 123123thi `;
const FolderItem = ({
  folderName,
  id,
  totalFolderNum,
  index,
  isLiked,
  onClick,
  onClickStar,
}) => {
  // const isLiked = index % 2 === 0;
  return (
    <FolderItemEl>
      <ItemWrapper>
        <TopWrapper>
          <FolderIcon>
            <FcFolder />
          </FolderIcon>
          <LikedIcon>{isLiked ? <Liked /> : <NotLiked />}</LikedIcon>
        </TopWrapper>
        <PadidngWrapper>
          <Title>{folderName}</Title>
        </PadidngWrapper>
        <DescPaddingWrapper>
          <Desc>
            <Text>{text}</Text>
          </Desc>
        </DescPaddingWrapper>
      </ItemWrapper>
    </FolderItemEl>
  );
};

export default FolderItem;

const Liked = () => {
  return <LikeTextWrapper>Liked</LikeTextWrapper>;
};

const NotLiked = () => {
  return <NotLikedWrapper>Like</NotLikedWrapper>;
};
