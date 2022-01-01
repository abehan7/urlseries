import React, { useCallback, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import "./Page2.css";
import {
  AiOutlineArrowUp,
  AiOutlineEdit,
  AiOutlineFolder,
} from "react-icons/ai";
import { TiBackspace } from "react-icons/ti";
import styled from "styled-components";
import { disable } from "../../../functions/stopScroll";
import Page2GridItem from "./Page2GridItem";
import { useDispatch, useSelector } from "react-redux";
import { Page3Actions } from "../../../store/reducers/editModalP3";
import { FiPlusSquare } from "react-icons/fi";
import { debounce } from "lodash";
import Axios from "axios";

const debounceSomethingFunc = debounce(() => {
  document.querySelector(".tempModal div").innerText =
    "폴더이름을 작성후 [+] 버튼을 클릭해주세요";
  document.querySelector(".tempModal").style.backgroundColor = "grey";
}, 1000);

const Page2 = ({ setNowPage }) => {
  const [nowFolder, setNowFolder] = useState({});

  // ================== ONCLICK 공간 START ==================

  const ClickClose = useCallback(() => {
    document.querySelector(".hashtagModal-container").style.display = "none";
    setNowPage((val) => val - 1);
    SetReduxNowFolder({});
    disable();
  }, []);

  const ClickAddIcon = useCallback(
    (e) => {
      console.log(nowFolder2._id);

      // if (Object.keys(nowFolder2).length > 0) {
      //   return;
      // }

      // e.target.classList.toggle("closed");
      // document.querySelector(".back").classList.toggle("open");
      // document.querySelector(".addItem").classList.toggle("open");
      // console.log(nowFolder2);
      // nowFolder2 !== null && console.log(Object.keys(nowFolder2).length);
    },
    [nowFolder]
  );

  const ClickBackIcon = useCallback(
    (e) => {
      console.log(nowFolder);
      if (Object.keys(nowFolder).length !== 0) {
        setNowFolder({});
        SetReduxNowFolder({});
      }
      // document.querySelector(".folder-name input").value = "";
      // document.querySelector(".addFolder-icon")?.classList?.toggle("closed");
      // e.target?.classList?.toggle("open");
      // document.querySelector(".addItem")?.classList?.toggle("open");
    },
    [nowFolder]
  );

  // 처음 Add는 맨 처음 나오는 아이콘 나올때
  // 여기는 첫번째 아이콘 누른 다음에 나오는 두번째 아이콘
  const ClickAddItem = useCallback((e) => {
    // +버튼 눌러야만 Axios보내는데 <input버튼> 아니면 위에 있는< 설명모달> 클릭하면 <axios보내>지니까 그런거 <방지>하는 기능
    if (
      e.target === document.querySelector(".tempModal") ||
      e.target === document.querySelector(".tempModal div") ||
      e.target === document.querySelector(".folder-name input")
    ) {
      return;
    }
    // 폴더이름
    // let folder_name = document.querySelector(".folder-name input").value;
    // <폴더 추가하는 공간>

    // 폴더이름에 최소한 1개라도 적어야 등록되도록 하기
    // 여기에 이벤트 넣기
    // 빨간색으로 click아니면 클릭이라고 한글로 넣기

    // if (folder_name.length >= 1) {
    //   Axios.post("http://localhost:3001/addFolder", {
    //     folder: { folder_name },
    //   }).then((response) => {
    //     const { data } = response;
    //     addNewFolderItem([data, ...folderItems]);
    //   });
    //   document.querySelector(".folder-name input").value = "";
    // } else {
    //   console.log("@@폴더 이름을 작성해주세요@@");
    //   document.querySelector(".tempModal div").innerText =
    //     "@@폴더 이름을 작성해주세요@@";
    //   document.querySelector(".tempModal").style.backgroundColor = "#FF7276";

    //   debounceSomethingFunc();
    // }
  }, []);
  // ================== ONCLICK 공간 END ==================

  // ================== 리덕스 공간 START ==================

  const {
    page3Storage: { folderItems, nowFolder2 },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const SetReduxNowFolder = (folder2) => {
    dispatch(Page3Actions.SetNowFolder(folder2));
  };

  // 폴더 추가한거 folderItems에 넣기
  const addNewFolderItem = (folder) => {
    dispatch(Page3Actions.EditFolderItems(folder));
  };

  // ================== 리덕스 공간 END ==================
  // useEffect(() => {

  // }, [nowFolder2]);

  // ================== 스타일 공간 START ==================
  const backClicked = {
    display: "flex",
  };
  const backDefault = {};

  return (
    <>
      <div className="modal-window tagFolder-window">
        <div className="header-Container">
          <div
            className="close-area"
            onClick={() => {
              document.querySelector(".hashtagModal-container").style.display =
                "none";
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
            {/* 폴더 클릭 안했을때만 나오게하기 */}
            {/* 맨 처음 추가하기 START */}
            {Object.keys(nowFolder).length === 0 && (
              <div
                className="addFolder-icon"
                onClick={(e) => {
                  console.log(nowFolder2._id);

                  if (Object.keys(nowFolder2).length > 0) {
                    return;
                  }

                  e.target.classList.toggle("closed");
                  document.querySelector(".back").classList.toggle("open");
                  document.querySelector(".addItem").classList.toggle("open");
                  console.log(nowFolder2);
                  nowFolder2 !== null &&
                    console.log(Object.keys(nowFolder2).length);
                }}
              >
                <div style={{ pointerEvents: "none" }}>
                  <FiPlusSquare />
                </div>

                <div style={{ pointerEvents: "none" }}> 추가하기</div>
              </div>
            )}

            <div
              className={
                Object.keys(nowFolder2).length === 0 ? "back" : "back open"
              }
              onClick={(e) => {
                if (Object.keys(nowFolder2).length !== 0) {
                  setNowFolder({});
                  SetReduxNowFolder({});
                }
                document.querySelector(".folder-name input").value = "";
                document
                  .querySelector(".addFolder-icon")
                  ?.classList?.toggle("closed");
                e.target?.classList?.toggle("open");
                document.querySelector(".addItem")?.classList?.toggle("open");
              }}
              style={
                Object.keys(nowFolder).length !== 0 ? backClicked : backDefault
              }
            >
              <TiBackspace style={{ pointerEvents: "none" }} />
              <div
                className="click-here"
                style={{ display: "none", color: "#FF7276" }}
              >
                <AiOutlineArrowUp />
              </div>
            </div>
            <div
              className="addItem"
              onClick={(e) => {
                // +버튼 눌러야만 Axios보내는데 <input버튼> 아니면 위에 있는< 설명모달> 클릭하면 <axios보내>지니까 그런거 <방지>하는 기능
                if (
                  e.target === document.querySelector(".tempModal") ||
                  e.target === document.querySelector(".tempModal div") ||
                  e.target === document.querySelector(".folder-name input")
                ) {
                  return;
                }
                // 폴더이름
                let folder_name =
                  document.querySelector(".folder-name input").value;
                // <폴더 추가하는 공간>

                // 폴더이름에 최소한 1개라도 적어야 등록되도록 하기
                // 여기에 이벤트 넣기
                // 빨간색으로 click아니면 클릭이라고 한글로 넣기

                if (folder_name.length >= 1) {
                  Axios.post("http://localhost:3001/addFolder", {
                    folder: { folder_name },
                  }).then((response) => {
                    const { data } = response;
                    addNewFolderItem([data, ...folderItems]);
                  });
                  document.querySelector(".folder-name input").value = "";
                } else {
                  console.log("@@폴더 이름을 작성해주세요@@");
                  document.querySelector(".tempModal div").innerText =
                    "@@폴더 이름을 작성해주세요@@";
                  document.querySelector(".tempModal").style.backgroundColor =
                    "#FF7276";

                  // document.querySelector(".tempModal div").innerText =
                  //   "폴더이름을 작성후 [+] 버튼을 클릭해주세요";
                  debounceSomethingFunc();
                }
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
    </>
  );
};

export default React.memo(Page2);
