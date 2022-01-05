import React from "react";
import styled from "styled-components";
import Colors from "../../Colors";

const HoverModalEl = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  flex-direction: column;
  display: ${(props) => (props.hover ? "flex" : "none")};
  pointer-events: none;
`;

const Wrapper = styled.div`
  z-index: 1;
  border-radius: 5px;
  height: auto;
  margin-top: ${(props) => props.Height + "px"};
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 4px;
  border: 1px solid #ebebeb;
  background-color: ${Colors.Gray};
  padding: 6px;
  transition: 1s;
`;

const Memo = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
const Hashtags = styled.div``;
const Content = styled.span``;
const HoverModal = ({ value, Height }) => {
  return (
    <HoverModalEl hover={value.url_hover}>
      <Wrapper Height={Height}>
        <Hashtags>
          {value.url_hashTags.map((tag) => {
            return <Content>{tag + " "}</Content>;
          })}
        </Hashtags>
        {value.url_memo.length !== 0 && (
          <Memo>
            <Content>{value.url_memo}</Content>
          </Memo>
        )}
      </Wrapper>
    </HoverModalEl>
  );
};

export default HoverModal;
