import React from "react";
import { AiOutlineFolder } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Page3Actions } from "../../../store/reducers/editModalP3";
import { debounce } from "lodash";
import "./Page2.css";

const debounceSomethingFunc = debounce(() => {
  document.querySelector(".click-here").style.display = "none";
  setTimeout(() => {
    document.querySelector(".click-here").style.display = "flex";
  }, 300);
  setTimeout(() => {
    document.querySelector(".click-here").style.display = "none";
  }, 600);
}, 300);

const Page2GridItem = ({ folder, setNowFolder, nowFolder }) => {
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
  const dispatch = useDispatch();

  const SetReduxNowFolder = (folder2) => {
    dispatch(Page3Actions.SetNowFolder(folder2));
  };
  return (
    <div className="Page2GridItem" onClick={FolderClick}>
      <div>
        <AiOutlineFolder
          className={
            nowFolder?._id === folder._id ? "folder-clicked" : "folder-Icon"
          }
        />
      </div>
      <div>{folder?.folder_name}</div>
    </div>
  );
};

export default React.memo(Page2GridItem);
