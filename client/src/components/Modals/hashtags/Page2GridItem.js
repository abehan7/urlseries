import React, { useEffect } from "react";
import { AiOutlineFolder } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Page3Actions } from "../../../store/reducers/editModalP3";
import { debounce } from "lodash";

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
  // const dispatch = useDispatch();
  // const SetNowFolder = (folder2) => {
  //   dispatch(Page3Actions.SetNowFolder(folder2));
  // };

  const dispatch = useDispatch();
  // const setFolderItemRedux = () => {
  //   dispatch(Page3Actions.GetFolderItems());
  // };

  // useEffect(() => {
  //   setFolderItemRedux();
  // }, []);

  const {
    page3Storage: { nowFolder2 },
  } = useSelector((state) => state);

  const SetReduxNowFolder = (folder2) => {
    dispatch(Page3Actions.SetNowFolder(folder2));
  };
  return (
    <div
      className="Page2GridItem"
      onClick={async (e) => {
        if (
          document.querySelector(".addFolder-icon")?.classList[1] === "closed"
        ) {
          document.querySelector(".click-here").style.display = "flex";
          await debounceSomethingFunc();
          return;
        }

        // console.log(document.querySelector(".addFolder-icon").classList);
        if (nowFolder2?._id === folder._id) {
          setNowFolder({});
          SetReduxNowFolder({});
        } else {
          setNowFolder({ ...folder });
          SetReduxNowFolder({ ...folder });
        }
        console.log(folder);
      }}
    >
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
