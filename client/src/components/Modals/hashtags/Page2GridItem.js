import React, { useEffect } from "react";
import { AiOutlineFolder } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Page3Actions } from "../../../store/reducers/editModalP3";

const Page2GridItem = ({ folder, setNowFolder, nowFolder }) => {
  // const dispatch = useDispatch();
  // const SetNowFolder = (folder2) => {
  //   dispatch(Page3Actions.SetNowFolder(folder2));
  // };

  const {
    page3Storage: { nowFolder2 },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const SetReduxNowFolder = (folder2) => {
    dispatch(Page3Actions.SetNowFolder(folder2));
  };
  return (
    <div
      className="Page2GridItem"
      onClick={() => {
        if (nowFolder2?._id === folder._id) {
          // setNowFolder({});
          SetReduxNowFolder({});
        } else {
          // setNowFolder({ ...folder });
          SetReduxNowFolder({ ...folder });
        }

        console.log(folder);
      }}
    >
      <div>
        <AiOutlineFolder
          className={
            nowFolder2?._id === folder._id ? "folder-clicked" : "folder-Icon"
          }
        />
      </div>
      <div>{folder?.folder_name}</div>
    </div>
  );
};

export default React.memo(Page2GridItem);
