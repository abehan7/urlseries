import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const BalloonWrapper = styled.div`
  .circle {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ee6c4d;
    transform: translate(-50%, -50%);
  }
`;
const MovingBalloon = () => {
  return (
    <div className="MovingBalloon">
      <BalloonWrapper>
        <div className="circle"></div>
      </BalloonWrapper>
    </div>
  );
};

export default MovingBalloon;
