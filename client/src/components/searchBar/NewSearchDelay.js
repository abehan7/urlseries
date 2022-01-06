import React, { useState } from "react";
import styled from "styled-components";

const NewSearchDelayEl = styled.input``;
const NewSearchDelay = ({ createModal2 }) => {
  const [text2, setText2] = useState("");

  return (
    <NewSearchDelayEl
      type="text"
      value={text2}
      onClick={createModal2}
      onChange={(e) => {
        setText2(e.target.value);
      }}
    />
  );
};

export default NewSearchDelay;
