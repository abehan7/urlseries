import React from "react";
import styled from "styled-components";

const TextAreaEl = styled.textarea`
  padding: 16px 24px;
  border: none;
  background-color: white;
  width: 250px;
  color: #363636;
  font-size: 16px;
  line-height: 24px;
  outline: none;
  border-radius: 10px;
  /* overflow: hidden; */
  resize: none;
`;
const TextArea = ({ memo, setMemo }) => {
  return (
    <TextAreaEl
      style={
        memo.length < 25
          ? {
              height: "20px",
              padding: "16px 24px",
              paddingTop: "0.6rem",
            }
          : { height: "160px" }
      }
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
