import React from "react";
import styled from "styled-components";
import Colors from "../../Colors";

const HoverModalEl = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: none;
  pointer-events: none;
`;

const Wrapper = styled.div`
  z-index: 2;
  border-radius: 5px;
  height: auto;
  margin-top: ${(props) => `${props.Height}px`};
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 4px;
  border: 1px solid #ebebeb;
  background-color: ${(props) => (props.isDarkMode ? "#130630" : Colors.Gray)};
  padding: 6px;
`;

const Memo = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
const Hashtags = styled.div``;
const Content = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
`;
const HashtagContent = styled.span``;
const HoverModal = ({ value, Height }) => {
  return (
    <HoverModalEl key={value._id}>
      <Wrapper Height={Height} isDarkMode={false}>
        <Hashtags>
          {value.url_hashTags.map((tag) => {
            return <HashtagContent key={tag}>{tag + " "}</HashtagContent>;
          })}
        </Hashtags>
        {value.url_memo.length !== 0 && (
          <Memo key={value._id}>
            <Content>{value.url_memo}</Content>
          </Memo>
        )}
      </Wrapper>
    </HoverModalEl>
  );
};

export default HoverModal;
