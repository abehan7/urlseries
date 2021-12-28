import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import styled from "styled-components";
import { disable } from "../../../functions/stopScroll";
import Page2GridItem from "./Page2GridItem";
import { useDispatch, useSelector } from "react-redux";
import { Page3Actions } from "../../../store/reducers/editModalP3";
const Page2 = ({ setNowPage }) => {
  const [nowFolder, setNowFolder] = useState({});
  const {
    page3Storage: { folderItems },
  } = useSelector((state) => state);

  // const dispatch = useDispatch();
  // const SetNowFolder2 = (folder2) => {
  //   dispatch(Page3Actions.SetNowFolder(folder2));
  // };

  // useEffect(() => {
  //   SetNowFolder2(nowFolder);
  // }, [nowFolder]);

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
    }

    .tagFolder-grid > div path {
      // color: #fbb917;
    }

    .folder-clicked {
      color: #fbb917;
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
                disable();
              }}
            >
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>TagFolder</h2>
            </div>
            <div className="hash-btns">
              <div className="editFolder">
                <AiOutlineEdit />
              </div>
            </div>
          </div>

          <div className="content folder-content">
            <div className="tagFolder-grid">
              {folderItems.map((folder) => {
                return (
                  <Page2GridItem
                    folder={folder}
                    setNowFolder={setNowFolder}
                    nowFolder={nowFolder}
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
