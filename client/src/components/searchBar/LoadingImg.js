import React from "react";
import styled from "styled-components";

const LoadingImgEl = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  /* padding-bottom: 20px; */
`;
const Image = styled.img`
  width: 80px;
`;
const MentWrapper = styled.div`
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Ment = styled.div`
  padding: 2px;
`;

const LoadingImg = () => {
  return (
    <LoadingImgEl className="loadingImg">
      <Image src="./img/loadingSpin.gif" alt="로딩" />
      <MentWrapper className="loading-ment">
        <Ment className="ment1">검색중입니다</Ment>
        <Ment className="ment2">잠시만 기다려 주세요 :)</Ment>
      </MentWrapper>
    </LoadingImgEl>
  );
};

export default LoadingImg;
