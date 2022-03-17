import styled from "styled-components";
import Loader from "./Loader";

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: span 3;
  grid-row: span 3;
`;

const LoadingCenter = () => {
  return (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  );
};

export default LoadingCenter;
