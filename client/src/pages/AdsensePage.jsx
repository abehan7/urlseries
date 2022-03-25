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

const Writing = styled.div``;
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
      <h3>{writing.title}</h3>
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
