import React, { useRef } from "react";
import styled from "styled-components";
import { useTag } from "../../contexts/TagContext";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getFolders } from "../../store/reducers/Folders";
import { getIsClicked } from "../../store/reducers/Tags";
const IndicatorEl = styled.div`
  position: relative;
  height: fit-content;
  display: flex;
  width: 80%;
  height: 40px;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 0;
`;
const TagWrapper = styled.div`
  overflow-x: scroll;
  position: absolute;

  ::-webkit-scrollbar {
    display: none;
  }
  /* padding: 0 1.5rem; */
  display: flex;
  column-gap: 1.5rem;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
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
];
const Indicator = () => {
  // states
  const assignedHashtags = useTag().hashtag.assignedHashtags;
  const folders = useSelector(getFolders);
  const tagIsClicked = useSelector(getIsClicked);
  const scrollRef = useRef(null);

  // hooks
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

  const handleClickMetaTag = () => {};

  // const names = assignedHashtags.map((tag) => tag.name);
  return (
    <IndicatorEl>
      <LeftIcon onClick={onClickLeftArrow}>
        <MdOutlineKeyboardArrowLeft />
      </LeftIcon>
      <TagWrapper ref={scrollRef}>
        {assignedHashtags.map((tag, key) => {
          const clicked = false;
          return (
            <Tag
              tag={tag.name}
              key={tag.name}
              onClick={() => handleClickMetaTag(tag)}
              clicked={clicked}
            />
          );
        })}
        {folders.map((folder, key) => {
          const clicked = false;
          return (
            <Tag
              tag={folder.folder_name}
              key={folder._id}
              onClick={() => handleClickMetaTag(folder)}
              clicked={clicked}
            />
          );
        })}
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

const FolderTagEl = styled.div``;
const FolderTag = ({}) => {
  return <></>;
};
