import React, { useCallback, useState, createContext, useMemo } from "react";
import { IoArrowBack } from "react-icons/io5";
import "./Page2.css";
import { AiFillStar, AiOutlineArrowUp, AiOutlineEdit } from "react-icons/ai";
import { TiBackspace, TiFolderDelete } from "react-icons/ti";
import { BsPatchCheck } from "react-icons/bs";
import { PopupDisable } from "../../../functions/stopScroll";
import Page2GridItem from "./Page2GridItem";
import { useDispatch, useSelector } from "react-redux";
import { Page3Actions } from "../../../store/reducers/editModalP3";
import { FiPlusSquare } from "react-icons/fi";
import { debounce } from "lodash";
import Colors from "../../../Colors";
import { AddFolder, DeleteFolderAPI, LikeConfirmPutAPI } from "../../Api";

const debounceSomethingFunc = debounce(() => {
  document.querySelector(".tempModal div").innerText =
    "폴더이름을 작성후 [+] 버튼을 클릭해주세요";
  document.querySelector(".tempModal").style.backgroundColor = "grey";
}, 1000);

// useContext공간
// 이걸로 여기부분만 useState관리하면 될 듯
export const Page2Context = createContext(null);

const Page2 = ({ setNowPage }) => {
  const [nowFolder, setNowFolder] = useState({});
  const [clickedP2Edit, setClickedP2Edit] = useState(false);
  const [DeleteM, setDeleteM] = useState(false);
  const [DList, setDList] = useState([]);
  const [LList, setLList] = useState([]);
  const [LikeM, setLikeM] = useState(false);

  // FIXME: 리덕스
  const {
    page3Storage: { folderItems, nowFolder2 },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const SetReduxNowFolder = (folder2) => {
    dispatch(Page3Actions.SetNowFolder(folder2));
  };

  const DeleteFolder = async () => {
    const NewFolderItem = folderItems.filter((val) => {
      return !DList.some((DItem) => DItem === val._id);
    });
    dispatch(Page3Actions.EditFolderItems(NewFolderItem));

    await DeleteFolderAPI(DList);
  };

  // 좋아요 추가하는 리덕스
  // 추가할때 뿐만 아니라 그냥 수정한거 통으로 넣는 action
  // 폴더 추가한거 folderItems에 넣기
  const addNewFolderItem = (Modified_Folder_Items) => {
    dispatch(Page3Actions.EditFolderItems(Modified_Folder_Items));
  };

  // FIXME: handler
  const ClickClose = useCallback(() => {
    document.querySelector(".hashtagModal-container").style.display = "none";
    setNowPage((val) => val - 1);
    SetReduxNowFolder({});
    PopupDisable();
  }, []);

  const ClickAddIcon = useCallback(
    (e) => {
      // >>>>>>>>
      // 현재 맨 처음[+] 닫는거
      e.target.classList.toggle("closed");
      // 뒤로가기 열기
      document.querySelector(".back").classList.toggle("open");
      // 추가버튼 열기 input있는거
      document.querySelector(".addItem").classList.toggle("open");
      // <<<<<<<<<
    },
    [nowFolder]
  );

  const ClickBackIcon = useCallback(
    (e) => {
      // 만약 현재 클릭한 폴더가 있는경우
      // back 누르면 폴더 비워지는거
      if (Object.keys(nowFolder).length !== 0) {
        setNowFolder({});
        SetReduxNowFolder({});
      }
      document.querySelector(".folder-name input").value = "";
      e.target?.classList?.toggle("open");
      document.querySelector(".addFolder-icon")?.classList?.toggle("closed");

      // 비어있을때만
      Object.keys(nowFolder).length === 0 &&
        document.querySelector(".addItem")?.classList?.toggle("open");
    },
    [nowFolder]
  );

  // 처음 Add는 맨 처음 나오는 아이콘 나올때
  // 여기는 첫번째 아이콘 누른 다음에 나오는 두번째 아이콘
  const ClickAddItem = useCallback(
    async (e) => {
      // +버튼 눌러야만 Axios보내는데 <input버튼> 아니면 위에 있는< 설명모달> 클릭하면 <axios보내>지니까 그런거 <방지>하는 기능
      if (
        e.target === document.querySelector(".tempModal") ||
        e.target === document.querySelector(".tempModal div") ||
        e.target === document.querySelector(".folder-name input")
      ) {
        return;
      }
      // 폴더이름
      let folder_name = document.querySelector(".folder-name input").value;
      // <폴더 추가하는 공간>

      // 폴더이름에 최소한 1글자라도 적어야 등록되도록 하기
      // 여기에 이벤트 넣기
      // 빨간색으로 click아니면 클릭이라고 한글로 넣기

      if (folder_name.length >= 1) {
        // 1자라도 넣은 경우

        const { data } = await AddFolder(folder_name);
        addNewFolderItem([data, ...folderItems]);

        document.querySelector(".folder-name input").value = "";
      } else {
        // 1자도 안넣은 경우
        console.log("@@폴더 이름을 작성해주세요@@");
        document.querySelector(".tempModal div").innerText =
          "@@폴더 이름을 작성해주세요@@";
        document.querySelector(".tempModal").style.backgroundColor = "#FF7276";

        // document.querySelector(".tempModal div").innerText =
        //   "폴더이름을 작성후 [+] 버튼을 클릭해주세요";
        debounceSomethingFunc();
      }
    },
    [folderItems]
  );

  // FIXME: 추가 수정 START
  const LikeConfirmList = () => {
    return folderItems.map((item) => {
      return LList.includes(item._id)
        ? { ...item, folder_liked: true }
        : { ...item, folder_liked: false };
    });
  };

  // 2P에디터모드일때 확인버튼 기능
  const ClickConfirm = () => {
    if (LikeM) {
      //  리덕스에 넣기
      addNewFolderItem(LikeConfirmList());
      // db에 넣기
      LikeConfirmPutAPI(LikeConfirmList());

      setLikeM(false);
      setLList([]);
    }
    if (DeleteM) {
      DeleteFolder();
      setDeleteM(false);
      setDList([]);
    }
  };

  const handleEditFolderBtn = () => {
    if (document.querySelector(".addFolder-icon")?.classList[1] === "closed") {
      // document.querySelector(".click-here").style.display = "flex";
      // 테스트용
      // 다른폴더 누르면 나가지는걸로
      document.querySelector(".addFolder-icon")?.classList?.toggle("closed");
      // 없애기 현재 input 추가기능
      document.querySelector(".addItem")?.classList?.toggle("open");
      // 뒤로가기 없애기
      document.querySelector(".back")?.classList?.toggle("open");
      return;
    }
    LikeM === true && setLikeM(false);
    DeleteM === true && setDeleteM(false);
    setClickedP2Edit((val) => !val);
    if (Object.keys(nowFolder).length !== 0) {
      setNowFolder({});
      SetReduxNowFolder({});
    }
  };

  // FIXME: 스타일

  const empty = {
    transform: "scale(0)",
  };
  const showUp = {
    transform: "scale(1)",
    transition: "300ms",
  };

  const ChangedColor = {
    backgroundColor: Colors.Peach,
    transition: "400ms",
  };

  const NomalColor = {
    transition: "400ms",
  };

  const DeleteMStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    transition: "200ms",
  };

  return (
    <>
      <Page2Context.Provider
        value={{
          DeleteM,
          setDeleteM,
          LikeM,
          setLikeM,
          DList,
          setDList,
          LList,
          setLList,
        }}
      >
        <div
          className="modal-window tagFolder-window"
          style={clickedP2Edit ? ChangedColor : NomalColor}
        >
          <div className="header-Container">
            <div className="close-area" onClick={ClickClose}>
              <IoArrowBack />
            </div>
            <div className="title page2-title">
              <h2>폴더</h2>
            </div>
            <div className="hash-btns">
              {/* 오른쪽에 2개 아이콘 */}
              <div className="editFolder-left-Icons">
                {/* 삭제 */}
                <div
                  className="editFolde-delete"
                  style={
                    clickedP2Edit ? (DeleteM ? DeleteMStyle : showUp) : empty
                  }
                  onClick={() => {
                    setDeleteM((val) => !val);
                    setDList([]);
                    setLList([]);
                    LikeM === true && setLikeM(false);
                  }}
                >
                  <div className="editFolder-one-icon">
                    <TiFolderDelete />
                  </div>
                  <div className="editFolder-one-ment">삭제</div>
                </div>
                {/* 좋아요 */}
                <div
                  className="editFolde-like"
                  style={
                    clickedP2Edit ? (LikeM ? DeleteMStyle : showUp) : empty
                  }
                  onClick={() => {
                    setLikeM((val) => !val);
                    DeleteM === true && setDeleteM(false);
                    LikeM && setLList([]);
                    setDList([]);
                  }}
                >
                  <div className="editFolder-one-icon">
                    <AiFillStar />
                  </div>
                  <div className="editFolder-one-ment">좋아요</div>
                </div>
              </div>
              {/* 편집모드 */}
              <div className="editFolder" onClick={handleEditFolderBtn}>
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
                    clickedP2Edit ? ClickConfirm() : ClickAddIcon(e);
                  }}
                >
                  <div style={{ pointerEvents: "none" }}>
                    {clickedP2Edit ? (
                      <BsPatchCheck style={{ pointerEvents: "none" }} />
                    ) : (
                      <FiPlusSquare />
                    )}
                  </div>

                  <div style={{ pointerEvents: "none" }}>
                    {clickedP2Edit ? "확인" : "추가하기"}
                  </div>
                </div>
              )}

              <div
                className={
                  Object.keys(nowFolder2).length === 0 ? "back" : "back open"
                }
                onClick={(e) => {
                  ClickBackIcon(e);
                }}
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
                  ClickAddItem(e);
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
                    clickedP2Edit={clickedP2Edit}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Page2Context.Provider>
    </>
  );
};

export default Page2;
