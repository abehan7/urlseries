import React from "react";
import styled from "styled-components";

const TextAreaEl = styled.textarea`
  transition: 1s;
`;
const TextArea = ({ memo, setMemo }) => {
  return (
    <TextAreaEl
      style={memo.length < 25 ? { height: "37px" } : { height: "160px" }}
      memo
      value={memo}
      placeholder="메모할 내용을 입력해주세요"
      onChange={(e) => {
        setMemo(e.target.value);
        // 25글자 넘어가면 바로 바꾸기
      }}
    />
  );
};

export default TextArea;
