import React, { useEffect } from "react";

import styled from "styled-components";
import FolderModalWindow from "../components/ModalFolderPage/FolderModalWindow";

const ModalPageEl = styled.div``;
const ModalPage = ({ match }) => {
  const data = match?.params;

  useEffect(() => {
    console.log("ModalPage");
    console.log(data);
  }, [data]);

  return (
    <ModalPageEl>
      <div className="folderModal-container">
        <FolderModalWindow />
      </div>
    </ModalPageEl>
  );
};

export default ModalPage;
