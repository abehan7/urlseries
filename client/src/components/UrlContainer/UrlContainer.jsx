import React from "react";
import styled from "styled-components";
import { constants, useMode } from "../../contexts/ModeContext";
import FolderLeftBox from "../Folder/FolderLeftBox";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";

const UrlContainerEl = styled.div`
  width: 80%;
  height: 100%;
  /* min-height: 500px; */

  flex: 1;
  display: flex;
<<<<<<< HEAD
  @media screen and (max-width: 1018px) {
    height: 100%;
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    height: 100%;
    padding: 6px;
  }
=======
  max-width: 100%;
>>>>>>> future/mainPage-design-change
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
