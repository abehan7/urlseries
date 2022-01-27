import React, { useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
import { Icon } from "../../styled/Icon.styled";
import { Page2Context } from "./Page2";

const EditLikeModeEl = styled.div``;
const EditLikeMode = ({ folder }) => {
  const { LList } = useContext(Page2Context);
  return (
    <EditLikeModeEl>
      <Icon>
        {LList.includes(folder._id) ? <AiFillStar /> : <AiOutlineStar />}
      </Icon>
    </EditLikeModeEl>
  );
};

export default EditLikeMode;
