import React, { useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
import { Icon } from "../styled/Icon.styled";
import { ModalFolderContents } from "./ModalFolder";

const EditLikeModeEl = styled.div``;
const EditLikeMode = ({ folder }) => {
  const { LList } = useContext(ModalFolderContents);
  return (
    <EditLikeModeEl>
      <Icon>
        {LList.includes(folder._id) ? <AiFillStar /> : <AiOutlineStar />}
      </Icon>
    </EditLikeModeEl>
  );
};

export default EditLikeMode;
