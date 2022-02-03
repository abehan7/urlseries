import React, { useContext } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styled from "styled-components";
import { Icon } from "../styled/Icon.styled";
import { ModalFolderContents } from "./ModalFolder";

const EditDeleteModeEl = styled.div``;

const EditDeleteMode = ({ folder }) => {
  const { DList } = useContext(ModalFolderContents);
  return (
    <EditDeleteModeEl>
      <Icon>
        {DList.includes(folder._id) ? (
          <MdCheckBox />
        ) : (
          <MdCheckBoxOutlineBlank />
        )}
      </Icon>
    </EditDeleteModeEl>
  );
};

export default EditDeleteMode;
