import { useRef } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled, { css } from "styled-components";
import { constants, normalModeList, useMode } from "../../contexts/ModeContext";
import { useUrl } from "../../contexts/UrlContext";
const Line = styled.div`
  width: 4px;
  /* min-width: 4px; */
  height: 76%;
  border-radius: 10px;
  background-color: #ddd;
  align-self: center;
  margin-left: 0.7rem;
  transition: all 0.3s ease-in-out;
`;

const Img = styled.img`
  width: 17px;
  padding: 0.5rem 0.4rem;
  padding-top: 0.3rem;
  align-self: center;
  /* align-self: flex-start; */
  border-radius: 10px;
  vertical-align: middle;
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

const TextWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.4rem;
  flex: 1;
  max-width: calc(100% - 30px - 30px - 30px);
`;

const Icon = styled.div`
  height: 100%;
  /* padding: 0.5rem 0.4rem; */

  padding: 0.5rem 0.4rem;
  padding-right: 0.2rem;

  font-size: 1.4rem;
  color: #ffc64b;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  z-index: 2;
  /* background-color: #fff; */
  /* align-self: flex-start; */
  /* color: #ffc64b; */
  /* vertical-align: middle; */
`;

const UrlEl = styled.div`
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

  /* transition: all 0.3s ease-in-out; */
  /* translate: translateX(50px); */

  /* animation: urlIn 0.3s ease-in-out; */
  /* animation-fill-mode: forwards; */
  padding: 0.3rem;
  position: relative;
  width: 98%;
  /* height: 50px; */
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
    ${(props) =>
      props.mode === constants.DELETE &&
      css`
        background-color: #ffcccb7a;
        ${Line} {
          background-color: tomato;
        }
      `}

    ${(props) =>
      props.mode !== constants.DELETE &&
      css`
        background-color: #a597fe1a;
        ${Line} {
          background-color: #c282ff;
        }
      `}
  }
`;

const Index = styled.div`
  position: absolute;
  top: 101%;
  right: 0.4rem;
  font-size: 0.8rem;
  color: #c4c4c4;
  font-weight: 100;
`;

const Url = ({
  url,
  title,
  id,
  index,
  totalUrlNum,
  isLiked,
  onClick,
  onClickStar,
}) => {
  const src = `http://www.google.com/s2/favicons?domain=${url}`;
  const starWrapRef = useRef(null);
  const currentUrl = useUrl().currentUrl;
  const mode = useMode().mode;
  const whiteList = [constants.ADD, constants.NORMAL];

  const onClickUrl = async (e) => {
    // 별 누르면 클릭 안되게하기
    const svg = starWrapRef?.current?.querySelector("svg");
    const path = svg?.querySelector("path");
    const blackList = [path, svg, starWrapRef.current];
    if (blackList?.includes(e.target)) return false;

    // whiteList.includes(mode) && nomalModeFn();
    // 노멀모드일때

    onClick();
    // 삭제모드일때
  };

  // TODO: deleteItemIds만들기
  // 우선은 url을 담은 다음에 그 후에 Ids그걸로 map해서 넣기
  const deleteItemIds = [];
  const classNameMethod = {
    isNewItem: () => {
      if (currentUrl._id !== id) return "";
      const nowItem = currentUrl.url_likedUrl === 0 ? "newItem" : "removeItem";
      return nowItem;
    },
    isDeleteItem: () => {
      if (currentUrl._id !== id) return "";
      const nowItem = !deleteItemIds.includes(currentUrl._id)
        ? "newItem"
        : "removeItem";
      return nowItem;
    },
  };
  const classNameFn = () => {
    if (normalModeList.includes(mode)) return classNameMethod.isNewItem();
    if (mode === constants.DELETE) return classNameMethod.isDeleteItem();
  };

  return (
    <UrlEl key={id} onClick={onClickUrl} className={classNameFn()} mode={mode}>
      <Line />
      <Img src={src} />
      <TextWrapper>
        <Text>{title}</Text>
      </TextWrapper>

      {whiteList.includes(mode) && (
        <StarIcon
          onClickStar={onClickStar}
          starWrapRef={starWrapRef}
          isLiked={isLiked}
        />
      )}

      <Index>
        {totalUrlNum - index}/{totalUrlNum}
      </Index>
    </UrlEl>
  );
};

export default Url;

const StarIcon = ({ onClickStar, starWrapRef, isLiked }) => {
  return (
    <Icon onClick={onClickStar} ref={starWrapRef}>
      {isLiked ? <AiFillStar /> : <AiOutlineStar />}
    </Icon>
  );
};
