import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
const Line = styled.div`
  width: 4px;
  height: 76%;
  border-radius: 10px;
  background-color: #ddd;
  align-self: center;
  margin-left: 0.7rem;
  transition: all 0.3s ease-in-out;
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  padding: 0.5rem 0.4rem;
  align-self: flex-start;
`;

const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.4rem;
`;

const Icon = styled.div`
  padding: 0.5rem 0.4rem;
  font-size: 1.4rem;
  align-self: flex-start;
  color: #ffc64b;
`;

const UrlEl = styled.div`
  width: 97%;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: all 0.3s ease-in-out;
  :hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    ${Line} {
      background-color: #c282ff;
    }
  }
`;

const Url = ({ url, title, key }) => {
  const src = `http://www.google.com/s2/favicons?domain=${url.url}`;
  const isClicked = false;
  return (
    <UrlEl key={key}>
      <Line />
      <Img src={src} />
      <TextWrapper>
        <Text>{title}</Text>
      </TextWrapper>
      <Icon>{isClicked ? <AiFillStar /> : <AiOutlineStar />}</Icon>
    </UrlEl>
  );
};

export default Url;
