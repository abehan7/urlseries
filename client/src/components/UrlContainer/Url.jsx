import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
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
  align-self: flex-start;
  border-radius: 10px;
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
`;

const UrlEl = styled.div`
  padding: 0.3rem;
  position: relative;
  width: 100%;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  transition: all 0.3s ease-in-out;

  :hover {
    background-color: #a597fe1a;
    ${Line} {
      background-color: #c282ff;
    }
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

const Url = ({ url, title, id, index, totalUrlNum }) => {
  const src = `http://www.google.com/s2/favicons?domain=${url}`;
  const isClicked = false;

  return (
    <UrlEl key={id}>
      <Line />
      <Img src={src} />
      <TextWrapper>
        <Text>{title}</Text>
      </TextWrapper>
      <Icon>{isClicked ? <AiFillStar /> : <AiOutlineStar />}</Icon>
      <Index>
        {totalUrlNum - index}/{totalUrlNum}
      </Index>
    </UrlEl>
  );
};

export default Url;
