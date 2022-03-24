import { useEffect } from "react";
import styled from "styled-components";
import ItemContainer from "../components/UrlContainer/ItemContainer";
import urls from "../data/urls.json";

const AdsensePageEl = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-direction: column;
  padding: 1rem;
`;
const AdsensePage = () => {
  return (
    <AdsensePageEl>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3881602489337676"
        crossOrigin="anonymous"
      />
      <ItemContainer urls={urls} urlLength={100} />
    </AdsensePageEl>
  );
};

export default AdsensePage;
