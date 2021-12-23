import React from "react";
import { IoArrowBack } from "react-icons/io5";
import {
  AiOutlineEdit,
  AiOutlineFolder,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import styled from "styled-components";
const Page2 = () => {
  const Page2Wrap = styled.div`
    .tagFolder-window {
      overflow: hidden;
    }
    .tagFolder-window > .folder-content {
      height: auto;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .addFolder {
    }
    .header-Container {
      position: relative;
    }

    .hash-btns {
      position: absolute;
      display: flex;

      right: 15px;
      gap: 2px;
    }

    .hash-btns > div {
      display: flex;
      align-items: center;
      justify-contents: center;
    }
    .hash-btns > div > svg {
      font-size: 25px;
      padding-right: 5px;
      cursor: pointer;
    }

    .tagFolder-grid {
      display: grid;
      height: 100%;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 100px;
    }

    .tagFolder-grid > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      cursor: pointer;
      // border-right: 1px solid black;
      // border-bottom: 1px solid black;
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
            <div className="hash-btns">
              <div className="addFolder">
                <FiPlusSquare />
              </div>
              <div className="editFolder">
                <AiOutlineEdit />
              </div>
            </div>
          </div>

          <div className="content folder-content">
            <div className="tagFolder-grid">
              <div>
                <div>
                  <AiOutlineFolder />
                </div>
                <div
                  onClick={() => {
                    // 토글
                  }}
                >
                  노마드코더
                </div>
              </div>
              <div>
                <div>
                  <AiOutlineFolder />
                </div>
                페드로테크
              </div>
              <div>
                <div>
                  <AiOutlineFolder />
                </div>
                타입스크립트
              </div>
              <div>
                <div>
                  <AiOutlineFolder />
                </div>
                그래프QL
              </div>
              <div>
                <div>
                  <AiOutlineFolder />
                </div>
                리액트
              </div>
              <div>
                <div>
                  <AiOutlineFolder />
                </div>
                노드JS
              </div>
              <div>
                <div>
                  <AiOutlineFolder />
                </div>
                창업
              </div>
              <div>
                <div>
                  <AiOutlineFolder />
                </div>
                몽고
              </div>
              <div>
                <AiOutlineFolder />9
              </div>
              <div>
                <AiOutlineFolder />
                10
              </div>
              <div>
                <AiOutlineFolder />
                11
              </div>
              <div>
                <AiOutlineFolder />
                12
              </div>
            </div>
          </div>
        </div>
      </Page2Wrap>
    </>
  );
};

export default Page2;
