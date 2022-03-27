import styled from "styled-components";
import writings from "../data/writings.json";

const AdsensePageEl = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-direction: column;
  padding: 1rem;
`;

const GridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const Title = styled.h3`
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Writing = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin-bottom: 1rem;
`;
const AdsensePage = () => {
  return (
    <AdsensePageEl>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3881602489337676"
        crossOrigin="anonymous"
      />
      <GridWrap>
        {writings.map((writing, index) => (
          <Post writing={writing} index={index} />
        ))}
      </GridWrap>
    </AdsensePageEl>
  );
};

const Post = ({ writing, index }) => {
  return (
    <Writing key={index}>
      <Title>
        #{index + 1} {writing.title}
      </Title>
      <p>{writing.description}</p>
      <div
        className="ad-container"
        dangerouslySetInnerHTML={{
          __html: writing.ad,
        }}
      />
    </Writing>
  );
};

export default AdsensePage;
