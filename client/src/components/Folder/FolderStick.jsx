import { useRef } from "react";
import { FcFolder } from "react-icons/fc";
import styled from "styled-components";
import Colors from "../../assets/Colors";
import { useMode } from "../../contexts/ModeContext";
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
  :hover {
    background-color: ${Colors.BgPurple};
    ${Line} {
      background-color: ${Colors.BarPurple};
    }
  }
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
}) => {
  const ref = useRef(null);
  const currentUrl = useUrl().currentUrl;
  const mode = useMode().mode;

  const onClickFolder = async (e) => {
    // 별 누르면 클릭 안되게하기
    if (ref.current.contains(e.target)) return;
    onClick();
    // 삭제모드일때
  };

  const onClickStar = () => handleClickStar(id);

  const classNameMethod = {
    isNewItem: () => {
      if (currentUrl._id !== id) return "";
      const nowItem = currentUrl.url_likedUrl === 0 ? "newItem" : "removeItem";
      return nowItem;
    },
  };

  return (
    <FolderStickEl
      key={id}
      onClick={onClickFolder}
      className={classNameMethod.isNewItem()}
      mode={mode}
    >
      <Line />
      <FolderIcon>
        <FcFolder />
      </FolderIcon>
      <TextWrapper>
        <Text>{title}</Text>
      </TextWrapper>

      <LikedIcon onClick={onClickStar} ref={ref}>
        {isLiked ? <Liked /> : <NotLiked />}
      </LikedIcon>

      <Index>
        {totalUrlNum - index}/{totalUrlNum}
      </Index>
    </FolderStickEl>
  );
};

export default FolderStick;
