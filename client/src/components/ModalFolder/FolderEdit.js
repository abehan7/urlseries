import React, { useContext } from "react";
import styled from "styled-components";
import EditDeleteMode from "./FolderEditDeleteMode";
import EditLikeMode from "./FolderEditLikeMode";
import { ModalFolderContents } from "./ModalFolder";

const FolderEditEl = styled.div`
  pointer-events: none;
`;
const FolderEdit = ({ folder }) => {
  const { DeleteM, LikeM } = useContext(ModalFolderContents);

  return (
    <FolderEditEl>
      {DeleteM && <EditDeleteMode folder={folder} />}
      {LikeM && <EditLikeMode folder={folder} />}
    </FolderEditEl>
  );
};

export default FolderEdit;
