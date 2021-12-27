import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const BalloonWrapper = styled.div`
  .MovingBalloon {
  }
  .detail-container {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    max-width: 250px;
    height: auto;
    max-height: 150px;
    padding: 10px;
    border-radius: 20px;
    // border: 1px solid black;
    background-color: #fff;
    transform: translate(-50%, -50%);
    box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.25);
  }
  .detail-container > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .detail-hashTag {
    // border-top: 1px solid #e2e2e2;
    border-top: 1px solid black;
    width: 100%;
    max-height: 60px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .detail-memo {
    padding-bottom: 5px;
  }

  .memoContent {
    border-top: 1px solid black;

    width: 100%;
    max-width: 250px;
    overflow-y: hidden;
    overflow-x: hidden;
    max-height: 100px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const MovingBalloon = () => {
  return (
    <div className="MovingBalloon">
      <BalloonWrapper>
        <div className="detail-container">
          <div className="detail-memo">
            <div className="memoTitle">MEMO</div>
            <div className="memoContent">
              50개만 뽑으려고 하는 기능 여기에 있는 듯 함
            </div>
          </div>
          <div className="detail-hashTag">
            <div className="tagContent">#몽고db#쿼리문#연산자#find</div>
          </div>
        </div>
      </BalloonWrapper>
    </div>
  );
};

export default MovingBalloon;
