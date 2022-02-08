import React from "react";
import { AiOutlineFolder } from "react-icons/ai";
import styled from "styled-components";
import Colors from "../../Colors";

const FolderGridItemEl = styled.div`
  > svg {
    /* #fbb917 */
    font-size: 1.4rem;
    color: ${(props) =>
      props.clickedFolderId === props.folderId ? Colors.Yellow : "inherit"};
  }
`;

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

const FolderGridItem = ({ folder, key, onClick, clickedFolder }) => {
  return (
    <FolderGridItemEl
      className="FolderGridItem"
      key={key}
      onClick={() => onClick(folder)}
      clickedFolderId={clickedFolder?._id}
      folderId={folder._id}
    >
      <AiOutlineFolder />
      <div style={{ pointerEvents: "none" }}>{folder?.folderName}</div>
    </FolderGridItemEl>
  );
};

export default FolderGridItem;
