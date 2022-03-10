import React, { useRef } from "react";
import styled from "styled-components";
import { useTag } from "../../contexts/TagContext";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useCallback } from "react";
const IndicatorEl = styled.div`
  position: relative;
  height: fit-content;
  padding: 0.5rem;
  display: flex;
  width: 80%;
  align-items: center;
`;
const TagWrapper = styled.div`
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  /* padding: 0 1.5rem; */
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
  width: fit-content;
  min-width: fit-content;
  cursor: pointer;
  :hover {
    background-color: #a597fe;
    color: #fff;
  }
`;

const Icon = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  color: gray;
`;

const LeftIcon = styled(Icon)`
  left: -2rem;
`;
const RightIcon = styled(Icon)`
  right: -2rem;
`;

const IconWrapper = styled.div``;
const hashtags = [
  "#해시태그",
  "#페드로테크",
  "#유튜브",
  "#해시태1그",
  "#페드로테2크",
  "#유3튜브",
  "#해시태4그",
  "#페드로테크5",
  "#유6튜브",
];
const Indicator = () => {
  const scrollRef = useRef(null);
  // const
  // console.log("totalUrls", totalUrls);
  // scrollTarget?.scrollTop !== 0 && scrollTarget?.scrollTo(0, 0);
  // const option = { top: 0, left: 0, behavior: "smooth" };
  // scrollRef.current.scrollTo(option);

  // const onScroll = useCallback(
  //   (e) => throttled.current(e.target.scrollTop, scrollTop),
  //   [scrollTop]
  // );

  const scrollToFn = (left) => {
    const option = scrollRef.current.scrollTo({
      left,
      behavior: "smooth",
    });
    scrollRef.current.scrollTo(option);
  };
  const onClickLeftArrow = () => {
    const left = scrollRef.current.scrollLeft - 300;
    scrollToFn(left);
  };
  const onClickRightArrow = () => {
    const left = scrollRef.current.scrollLeft + 300;
    scrollToFn(left);
  };

  const assignedHashtags = useTag().hashtag.assignedHashtags;
  // const names = assignedHashtags.map((tag) => tag.name);
  return (
    <IndicatorEl>
      <LeftIcon onClick={onClickLeftArrow}>
        <MdOutlineKeyboardArrowLeft />
      </LeftIcon>
      <TagWrapper ref={scrollRef}>
        {assignedHashtags.map((tag, key) => (
          <Tag tag={tag.name} key={tag.name} />
        ))}
      </TagWrapper>
      <RightIcon onClick={onClickRightArrow}>
        <MdOutlineKeyboardArrowRight />
      </RightIcon>
    </IndicatorEl>
  );
};

export default Indicator;

const Tag = ({ tag }) => {
  return <TagEl>{tag}</TagEl>;
};
