import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { AiOutlineFolder } from "react-icons/ai";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Page3Actions } from "../../../store/reducers/editModalP3";
import "./Page2.css";
import Colors from "../../../Colors";
import EditP2 from "./EditP2";
import { Page2Context } from "./Page2";

const Input = styled.input`
  width: 4.8rem;
  height: 1.4rem;
  border: 0;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  text-align: center;
  border: 1px solid ${Colors.Gray};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Page2GridItem = ({ folder, setNowFolder, nowFolder, clickedP2Edit }) => {
  // ========================== 온클릭 공간  START ==========================
  const FolderClick = async () => {
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
    // useState라서 클릭하면 렝더링되서 스크롤 처음으로 돌아가니까
    // 그거 방지하려고

    // console.log(document.querySelector(".addFolder-icon").classList);
    if (nowFolder?._id === folder._id) {
      setNowFolder({});
      SetReduxNowFolder({});
    } else {
      setNowFolder({ ...folder });
      SetReduxNowFolder({ ...folder });
    }
    console.log(folder);
  };

  // 에디터모드 클릭
  const EditFolderClick = () => {
    // 삭제모드
    if (DeleteM) {
      DList.includes(folder._id)
        ? setDList(
            DList.filter((val) => {
              return val !== folder._id;
            })
          )
        : setDList([...DList, folder._id]);

      console.log(DList);
    }

    // 좋아요 모드
    if (LikeM) {
      LList.includes(folder._id)
        ? setLList(
            LList.filter((val) => {
              return val !== folder._id;
            })
          )
        : setLList([...LList, folder._id]);

      console.log(LList);
    }
    console.log("에딧모드");
  };

  // ========================== 온클릭 공간  END ==========================

  const dispatch = useDispatch();

  const SetReduxNowFolder = (folder2) => {
    dispatch(Page3Actions.SetNowFolder(folder2));
  };

  // useContext
  const { DeleteM, LikeM, DList, setDList, LList, setLList } =
    useContext(Page2Context);

  // 맨 처음 folder_liked가 true인거 LList에 넣기
  useEffect(() => {
    LikeM && folder.folder_liked && setLList((val) => [...val, folder._id]);
    // LikeM && folder.folder_liked && console.log("👏👏👏👏👏");
    // folder.folder_liked && console.log(folder);
  }, [LikeM]);

  return (
    <div
      className="Page2GridItem"
      onClick={(e) => {
        clickedP2Edit ? EditFolderClick(e) : FolderClick();
      }}
    >
      <>
        {DeleteM || LikeM ? (
          <EditP2 folder={folder} />
        ) : (
          <AiOutlineFolder
            className={
              nowFolder?._id === folder._id ? "folder-clicked" : "folder-Icon"
            }
          />
        )}
      </>
      <div style={{ pointerEvents: "none" }}>{folder?.folder_name}</div>
    </div>
  );
};

export default React.memo(Page2GridItem);
