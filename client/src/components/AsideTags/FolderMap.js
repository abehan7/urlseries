import React from "react";
import { AiOutlineFolder } from "react-icons/ai";
import styled from "styled-components";

const FolderMapEl = styled.span`
  opacity: ${(props) => (props.clicked ? "0.3" : "1")};
  transition: 100ms;
`;
const Icon = styled.div`
  pointer-events: "none";
  display: flex;
  padding-right: 3px;
`;

const FolderMap = ({ handleClickFolderTag, folder, clicked }) => {
  const onClick = () => {
    handleClickFolderTag(folder);
  };
  return (
    <>
      {folder.like && (
        <FolderMapEl
          className="tag folder-tag"
          onClick={onClick}
          clicked={clicked}
        >
          <Icon className="folder-tag-icon">
            <AiOutlineFolder />
          </Icon>
          {folder.folder_name}
        </FolderMapEl>
      )}
    </>
  );
};

export default FolderMap;
