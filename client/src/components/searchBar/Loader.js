import { memo } from "react";
import styled from "styled-components";

const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  img {
    width: 100px;
  }
`;

const Loader = () => {
  return (
    <LoaderWrap>
      {/* <ReactLoading type="spin" color="#A593E0" /> */}
      <img src="./img/loadingSpin.gif" alt="로딩" />
    </LoaderWrap>
  );
};

export default memo(Loader);
