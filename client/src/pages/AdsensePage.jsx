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
      <ItemContainer urls={urls} />
    </AdsensePageEl>
  );
};

export default AdsensePage;
