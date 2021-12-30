import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineEdit, AiOutlineFolder } from "react-icons/ai";
import { TiBackspace } from "react-icons/ti";
import styled from "styled-components";
import { disable } from "../../../functions/stopScroll";
import Page2GridItem from "./Page2GridItem";
import { useDispatch, useSelector } from "react-redux";
import { Page3Actions } from "../../../store/reducers/editModalP3";
import { FiPlusSquare } from "react-icons/fi";
const Page2 = ({ setNowPage }) => {
  const [nowFolder, setNowFolder] = useState({});

  const {
    page3Storage: { folderItems, nowFolder2 },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const SetReduxNowFolder = (folder2) => {
    dispatch(Page3Actions.SetNowFolder(folder2));
  };

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
      position: relative;
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
    }

    .tagFolder-grid .addItem {
      display: none;
    }

    .tempModal {
      position: absolute;
      transition: 1s;

      cursor: default;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: grey;
      color: #fff;
      top: 0;
      width: 90%;
      left: 5%;
      border-radius: 6px;
    }
    .tagFolder-grid > div path {
    }

    .folder-clicked {
      color: #fbb917;
    }
    .tagFolder-grid .closed {
      display: none;
    }

    .tagFolder-grid .back {
      display: none;
      transition: 200ms;
    }
    .tagFolder-grid .open {
      display: flex;
      transition: 200ms;
    }
  `;

  return (
    <>
      <Page2Wrap>
        <div className="modal-window tagFolder-window">
          <div className="header-Container">
            <div
              className="close-area"
              onClick={() => {
                document.querySelector(
                  ".hashtagModal-container"
                ).style.display = "none";
                setNowPage((val) => val - 1);
                SetReduxNowFolder({});
                disable();
              }}
            >
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>폴더</h2>
            </div>
            <div className="hash-btns">
              <div className="editFolder">
                <AiOutlineEdit />
              </div>
            </div>
          </div>

          <div className="content folder-content">
            <div className="tagFolder-grid">
              <div
                className="addFolder-icon"
                onClick={(e) => {
                  if (Object.keys(nowFolder2).length !== 0) {
                    return;
                  }
                  e.target.classList.toggle("closed");
                  document.querySelector(".back").classList.toggle("open");
                  document.querySelector(".addItem").classList.toggle("open");
                  console.log(Object.keys(nowFolder2).length);
                }}
              >
                <div style={{ pointerEvents: "none" }}>
                  <FiPlusSquare />
                </div>

                <div style={{ pointerEvents: "none" }}> 추가하기</div>
              </div>
              <div
                className="back"
                onClick={(e) => {
                  document.querySelector(".folder-name input").value = "";
                  document
                    .querySelector(".addFolder-icon")
                    .classList.toggle("closed");
                  e.target.classList.toggle("open");
                  document.querySelector(".addItem").classList.toggle("open");
                }}
              >
                <TiBackspace style={{ pointerEvents: "none" }} />
              </div>
              <div
                className="addItem"
                onClick={(e) => {
                  if (
                    e.target === document.querySelector(".tempModal") ||
                    e.target === document.querySelector(".tempModal div") ||
                    e.target === document.querySelector(".folder-name input")
                  ) {
                    return;
                  }
                  document.querySelector(".folder-name input").value = "";
                }}
              >
                <div className="tempModal">
                  <div>폴더이름을 작성후 [+] 버튼을 클릭해주세요</div>
                </div>
                <div className="addFolder-Icon-moved ">
                  <FiPlusSquare />
                </div>
                <div className="folder-name">
                  <input
                    placeholder="@폴더이름@"
                    style={{
                      border: "none",
                      padding: "0",
                      textAlign: "center",
                      fontSize: "15px",
                    }}
                  />
                </div>
              </div>

              {folderItems.map((folder) => {
                return (
                  <Page2GridItem
                    folder={folder}
                    setNowFolder={setNowFolder}
                    nowFolder={nowFolder}
                    key={folder._id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Page2Wrap>
    </>
  );
};

export default React.memo(Page2);
