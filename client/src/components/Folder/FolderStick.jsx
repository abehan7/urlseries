import { useRef } from "react";
import { FcFolder } from "react-icons/fc";
import styled, { css } from "styled-components";
import Colors from "../../assets/Colors";
import { useFolder } from "../../contexts/FolderContext";
import { constants, useMode } from "../../contexts/ModeContext";
import { useUrl } from "../../contexts/UrlContext";
import { Icon, Index, Text, TextWrapper } from "../UrlContainer/Url";
import { Liked, NotLiked } from "./FolderSquare";
const Line = styled.div`
  width: 4px;
  height: 76%;
  border-radius: 10px;
  background-color: #ddd;
  align-self: center;
  margin-left: 0.7rem;
  transition: all 0.3s ease-in-out;
`;

const FolderStickEl = styled.div`
  @keyframes urlIn {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0%);
    }
  }
  @keyframes urlOut {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(50%);
    }
  }
  padding: 0.3rem;
  position: relative;
  width: 100%;
  height: 40px;
  max-height: 40px;
  min-height: 40px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  ${({ folderMode }) =>
    folderMode === constants.FOLDER_DELETE &&
    css`
      :hover {
        background-color: ${Colors.BgRed};
        ${Line} {
          background-color: ${Colors.BarRed};
        }
      }
    `}
  ${({ folderMode }) =>
    folderMode === constants.FOLDER &&
    css`
      :hover {
        background-color: ${Colors.BgPurple};
        ${Line} {
          background-color: ${Colors.BarPurple};
        }
      }
    `}

  ${({ isDeleteFolder }) =>
    isDeleteFolder &&
    css`
      background-color: ${Colors.BgRed};
      ${Line} {
        background-color: ${Colors.BarRed};
      }
    `}
`;

const LikedIcon = styled.div``;

const FolderIcon = styled.div`
  font-size: 1.4rem;
  padding: 0.4rem;
`;
const FolderStick = ({
  title,
  id,
  index,
  totalUrlNum,
  isLiked,
  onClick,
  handleClickStar,
  isDeleteFolder = false,
}) => {
  const ref = useRef(null);
  const likeFolder = useFolder().likeFolder;
  const mode = useMode().mode;

  const onClickFolder = async (e) => {
    // 별 누르면 클릭 안되게하기
    if (ref.current?.contains(e.target)) return;
    onClick();
    // 삭제모드일때
  };

  const onClickStar = () => handleClickStar();

  const LikedIconEl = () =>
    mode !== constants.FOLDER_DELETE && (
      <LikedIcon ref={ref} onClick={onClickStar}>
        {isLiked ? <Liked /> : <NotLiked />}
      </LikedIcon>
    );

  const classNameMethod = {
    isNewItem: () => {
      if (likeFolder._id !== id) return "";
      const nowItem = likeFolder.isNewItem ? "newItem" : "removeItem";
      return nowItem;
    },
  };

  const className = () => classNameMethod.isNewItem();

  return (
    <FolderStickEl
      key={id}
      onClick={onClickFolder}
      className={className()}
      isDeleteFolder={isDeleteFolder}
      folderMode={mode}
    >
      <Line />
      <FolderIcon>
        <FcFolder />
      </FolderIcon>
      <TextWrapper>
        <Text>{title}</Text>
      </TextWrapper>
      {LikedIconEl()}
      <Index>
        {totalUrlNum - index}/{totalUrlNum}
      </Index>
    </FolderStickEl>
  );
};

export default FolderStick;
