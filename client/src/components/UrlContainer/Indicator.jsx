import React from "react";
import styled from "styled-components";

const IndicatorEl = styled.div`
  height: 30px;
  padding: 0.5rem;
  display: flex;
  width: 100%;
`;
const TagWrapper = styled.div`
  padding: 0 1.5rem;
  display: flex;
  column-gap: 1.5rem;
  align-items: center;
  justify-content: flex-start;
`;
const TagEl = styled.span`
  color: gray;

  border-radius: 10px;
  padding: 0.5rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  :hover {
    background-color: #a597fe;
    color: #fff;
  }
`;

const hashtags = ["#해시태그", "#페드로테크", "#유튜브"];
const Indicator = () => {
  return (
    <IndicatorEl>
      <TagWrapper>
        {hashtags.map((tag, key) => (
          <Tag tag={tag} />
        ))}
      </TagWrapper>
    </IndicatorEl>
  );
};

export default Indicator;

const Tag = ({ tag }) => {
  return <TagEl>{tag}</TagEl>;
};
