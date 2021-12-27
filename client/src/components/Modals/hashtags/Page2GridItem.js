import React from "react";
import { AiOutlineFolder } from "react-icons/ai";
import { useSelector } from "react-redux";

const Page2GridItem = ({ folder, setNowFolder, nowFolder }) => {
  return (
    <div
      className="Page2GridItem"
      onClick={() => {
        nowFolder === folder._id ? setNowFolder() : setNowFolder(folder._id);
        console.log(folder);
      }}
    >
      <div
        className={nowFolder === folder._id ? "folder-clicked" : "folder-Icon"}
      >
        <AiOutlineFolder />
      </div>
      <div>{folder.folder_name}</div>
    </div>
  );
};

export default Page2GridItem;
