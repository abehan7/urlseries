import React from "react";
import { AiOutlineFolder } from "react-icons/ai";
import styled from "styled-components";

const FolderTagEl = styled.span`
  ${({ isClicked }) => !isClicked && `opacity: 1;`}
  ${({ isClicked, clicked }) => isClicked && !clicked && `opacity: 0.3;`}
  ${({ isClicked, clicked }) => isClicked && clicked && `opacity: 1;`}

  transition: 100ms;
`;
const Icon = styled.div`
  pointer-events: "none";
  display: flex;
  padding-right: 3px;
  font-weight: 100;
`;

const FolderTag = ({ handleClickFolderTag, folder, clicked, isClicked }) => {
  const onClick = () => {
    handleClickFolderTag(folder);
  };
  return (
    <>
      {folder.like && (
        <FolderTagEl
          className="tag folder-tag"
          onClick={onClick}
          clicked={clicked}
          isClicked={isClicked}
        >
          <Icon className="folder-tag-icon">
            <AiOutlineFolder />
          </Icon>
          {folder.folder_name}
        </FolderTagEl>
      )}
    </>
  );
};

export default FolderTag;
