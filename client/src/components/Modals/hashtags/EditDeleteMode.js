import React, { useContext } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styled from "styled-components";
import { Icon } from "../../styled/Icon.styled";
import { Page2Context } from "./Page2";

const EditDeleteModeEl = styled.div``;

const EditDeleteMode = ({ folder }) => {
  const { DList } = useContext(Page2Context);
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
