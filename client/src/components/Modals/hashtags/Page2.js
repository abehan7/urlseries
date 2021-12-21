import React from "react";
import { IoArrowBack } from "react-icons/io5";
import styled from "styled-components";
const Page2 = () => {
  const Page2Wrap = styled.div`
    .tagFolder-window {
      overflow: hidden;
    }
    .tagFolder-window > .folder-content {
      height: auto;
      overflow: auto;
    }
    .tagFolder-grid {
      display: grid;
      height: 100%;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 100px;
    }

    .tagFolder-grid > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
    }
  `;
  return (
    <>
      <Page2Wrap>
        <div className="modal-window tagFolder-window">
          <div className="header-Container">
            <div className="close-area" onClick={() => {}}>
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>TagFolder</h2>
            </div>
          </div>

          <div className="content folder-content">
            <div className="tagFolder-grid">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
              <div>11</div>
              <div>12</div>
            </div>
          </div>
        </div>
      </Page2Wrap>
    </>
  );
};

export default Page2;
