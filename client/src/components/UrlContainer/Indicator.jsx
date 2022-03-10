import React, { useRef } from "react";
import styled from "styled-components";
// import ScrollHorizontal from "react-scroll-horizontal";
import { useTag } from "../../contexts/TagContext";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getFolders } from "../../store/reducers/Folders";
import { getIsClicked, getMetaTagItems } from "../../store/reducers/Tags";
import { AiOutlineFolder } from "react-icons/ai";
import { throttle } from "lodash";
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

// const FolderTagEl = styled(TagEl)``;

const FolderTagEl = styled(TagEl)`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isClicked }) => !isClicked && `opacity: 1;`}
  ${({ isClicked, clicked }) => isClicked && !clicked && `opacity: 0.3;`}
  ${({ isClicked, clicked }) => isClicked && clicked && `opacity: 1;`}
  transition: 100ms;
`;
const FolderIcon = styled.div`
  pointer-events: "none";
  display: flex;
  padding-right: 3px;
  font-weight: 100;
`;

const Indicator = () => {
  // states
  const assignedHashtags = useTag().hashtag.assignedHashtags;
  const folders = useSelector(getFolders);
  const tagIsClicked = useSelector(getIsClicked);
  const metaTagItems = useSelector(getMetaTagItems);
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

  const handleClickFolderTag = () => {};

  // 좌우 스크롤
  const throttled = useRef(
    throttle((isScrollUp) => {
      isScrollUp ? onClickRightArrow() : onClickLeftArrow();
    }, 500)
  );

  const onWheel = useCallback((e) => {
    // const isScrollUp = e.deltaY > 0;
    // throttled.current(isScrollUp);
    console.log(e);
    const getScrollUp = () => {
      const left = scrollRef.current.scrollLeft + 40;
      scrollToFn(left);
    };
    const getScrollDown = () => {
      const left = scrollRef.current.scrollLeft - 40;
      scrollToFn(left);
    };

    e.deltaY > 0 ? getScrollUp() : getScrollDown();
  }, []);

  const hashtagMap = () => {
    return assignedHashtags.map((tag, index) => {
      const clicked = metaTagItems.includes(tag.name);
      const key = Math.floor(Math.random() * 100000);
      return (
        <MetaTag
          tag={tag.name}
          key={key}
          onClick={() => handleClickMetaTag(tag)}
          clicked={clicked}
        />
      );
    });
  };

  const folderMap = () => {
    return folders.map((folder, key) => {
      const clicked = false;
      return (
        <FolderTag
          handleClickFolderTag={handleClickFolderTag}
          folder={folder}
          clicked={clicked}
        />
      );
    });
  };

  return (
    <IndicatorEl>
      <LeftIcon onClick={onClickLeftArrow}>
        <MdOutlineKeyboardArrowLeft />
      </LeftIcon>
      <TagWrapper ref={scrollRef} onWheel={onWheel}>
        {folderMap()}
        {hashtagMap()}
      </TagWrapper>
      <RightIcon onClick={onClickRightArrow}>
        <MdOutlineKeyboardArrowRight />
      </RightIcon>
    </IndicatorEl>
  );
};

export default Indicator;

const MetaTag = ({ tag }) => {
  return <TagEl>{tag}</TagEl>;
};

const FolderTag = ({ handleClickFolderTag, folder, clicked }) => {
  const onClick = () => handleClickFolderTag(folder);
  return (
    folder.like && (
      <FolderTagEl onClick={onClick} clicked={clicked}>
        <FolderIcon>
          <AiOutlineFolder />
        </FolderIcon>
        {folder.folder_name}
      </FolderTagEl>
    )
  );
};
