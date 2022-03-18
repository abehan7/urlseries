import { memo } from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoaderWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Loader = ({ target, radius = "64px" }) => {
  return (
    <LoaderWrap ref={target}>
      <ReactLoading
        type="spin"
        color="#A593E0"
        width={radius}
        height={radius}
      />
    </LoaderWrap>
  );
};

export default memo(Loader);
