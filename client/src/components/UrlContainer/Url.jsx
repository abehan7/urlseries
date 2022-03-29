import { useRef } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled, { css } from "styled-components";
import { media } from "../../assets/Themes";
import { useMode } from "../../contexts/ModeContext";
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

export const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  /* width: 600px; */

  /* word-break: break-all; */
  word-break: ${({ isHttp }) => (isHttp ? "break-all" : "keep-all")};
  white-space: normal;
`;

export const TextWrapper = styled.div`
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
    background-color: #a597fe1a;
    ${Line} {
      background-color: #c282ff;
    }
  }
`;

export const Index = styled.div`
  position: absolute;
  top: 101%;
  right: 0.4rem;
  font-size: 0.8rem;
  color: #c4c4c4;
  font-weight: 100;
`;

const Date = styled.span`
  padding-right: 0.5rem;
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
  urlType = "normal",
  date,
}) => {
  const src = `http://www.google.com/s2/favicons?domain=${url}`;
  const starWrapRef = useRef(null);
  const currentUrl = useUrl().currentUrl;
  const mode = useMode().mode;

  const onClickUrl = async (e) => {
    // 별 누르면 클릭 안되게하기
    if (starWrapRef?.current?.contains(e.target)) return;
    // whiteList.includes(mode) && nomalModeFn();
    onClick();
  };

  const classNameMethod = {
    isNewItem: () => {
      if (currentUrl._id !== id) return "";
      const nowItem = currentUrl.url_likedUrl === 0 ? "newItem" : "removeItem";
      return nowItem;
    },
  };

  const isHttp = url.includes("http");

  const starMap = () =>
    urlType !== "chrome-extension" && (
      <Icon onClick={onClickStar} ref={starWrapRef}>
        {isLiked ? <AiFillStar /> : <AiOutlineStar />}
      </Icon>
    );

  return (
    <UrlEl
      key={id}
      onClick={onClickUrl}
      className={classNameMethod.isNewItem()}
      mode={mode}
    >
      <Line />
      <Img src={src} />
      <TextWrapper>
        <Text isHttp={isHttp}>{title}</Text>
      </TextWrapper>
      {starMap()}
      <Index>
        {urlType === "chrome-extension" && <Date>{date}</Date>}
        {totalUrlNum - index}/{totalUrlNum}
      </Index>
    </UrlEl>
  );
};

export default Url;
