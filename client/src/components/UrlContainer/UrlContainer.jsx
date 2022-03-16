import React from "react";
import styled from "styled-components";
import { constants, useMode } from "../../contexts/ModeContext";
import FolderLeftBox from "../Folder/FolderLeftBox";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";

const UrlContainerEl = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  max-width: 100%;
`;
const UrlContainer = () => {
  const mode = useMode().mode;
  const FolderLeftBoxWhiteList = [
    constants.FOLDER_ADD,
    constants.FOLDER_EDIT,
    constants.FOLDER_EDIT_MODAL_UP,
    constants.FOLDER,
    constants.FOLDER_DELETE,
  ];
  // console.log(mode);
  return (
    <UrlContainerEl>
      {FolderLeftBoxWhiteList.includes(mode) && <FolderLeftBox />}
      {!FolderLeftBoxWhiteList.includes(mode) && <LeftBox />}
      <RightBox />
    </UrlContainerEl>
  );
};

export default UrlContainer;
