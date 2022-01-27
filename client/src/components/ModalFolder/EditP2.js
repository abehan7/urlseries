import React, { useContext } from "react";
import styled from "styled-components";
import EditDeleteMode from "./EditDeleteMode";
import EditLikeMode from "./EditLikeMode";
import { Page2Context } from "./Page2";

const EditP2El = styled.div`
  pointer-events: none;
`;
const EditP2 = ({ folder }) => {
  const { DeleteM, LikeM } = useContext(Page2Context);

  return (
    <EditP2El>
      {DeleteM && <EditDeleteMode folder={folder} />}
      {LikeM && <EditLikeMode folder={folder} />}
    </EditP2El>
  );
};

export default EditP2;
