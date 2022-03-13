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
  return (
    <UrlContainerEl>
      {mode === constants.FOLDER && <FolderLeftBox />}
      {mode !== constants.FOLDER && <LeftBox />}
      <RightBox />
    </UrlContainerEl>
  );
};

export default UrlContainer;
