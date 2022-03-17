import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { FcFolder } from "react-icons/fc";
import { Index } from "../UrlContainer/Url";
import Colors from "../../assets/Colors";
import { constants, useMode } from "../../contexts/ModeContext";

const IndexEl = styled(Index)``;

const FolderSquareEl = styled.div`
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
    background-color: ${({ folderMode }) =>
      folderMode === constants.FOLDER_DELETE ? Colors.BgRed : Colors.BgPurple};
  }

  ${({ isDeleteFolder }) =>
    isDeleteFolder &&
    css`
      background-color: ${Colors.BgRed};
    `}
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
  position: relative;
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

const FolderSquare = ({
  folderName,
  id,
  totalFolderNum,
  index,
  isLiked,
  onClick,
  handleClickStar,
  isDeleteFolder = false,
  memo = "메모",
}) => {
  const ref = useRef(null);
  const mode = useMode().mode;
  const onClickFolder = (e) => {
    if (ref.current?.contains(e.target)) return;
    onClick();
  };
  const onClickStar = () => handleClickStar();

  const LikedIconEl = () =>
    mode !== constants.FOLDER_DELETE && (
      <LikedIcon ref={ref} onClick={onClickStar}>
        {isLiked ? <Liked /> : <NotLiked />}
      </LikedIcon>
    );

  return (
    <FolderSquareEl onClick={onClickFolder}>
      <ItemWrapper folderMode={mode} isDeleteFolder={isDeleteFolder}>
        <TopWrapper>
          <FolderIcon>
            <FcFolder />
          </FolderIcon>
          {LikedIconEl()}
        </TopWrapper>
        <PadidngWrapper>
          <Title>{folderName}</Title>
        </PadidngWrapper>
        <DescPaddingWrapper>
          <Desc>
            <Text>{memo}</Text>
          </Desc>
          <IndexEl>
            {totalFolderNum - index}/{totalFolderNum}
          </IndexEl>
        </DescPaddingWrapper>
      </ItemWrapper>
    </FolderSquareEl>
  );
};

export default FolderSquare;

export const Liked = () => {
  return <LikeTextWrapper>Liked</LikeTextWrapper>;
};

export const NotLiked = () => {
  return <NotLikedWrapper>Like</NotLikedWrapper>;
};
