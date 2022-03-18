import React, { useRef } from "react";
import styled from "styled-components";
import ScrollHorizontal from "react-scroll-horizontal";
import { useTag } from "../../contexts/TagContext";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolders } from "../../store/reducers/Folders";
import {
  getFolderTagItems,
  getIsClicked,
  getMetaTagItems,
  REMOVE_FOLDER_TAGS,
  REMOVE_META_TAGS,
  SET_CLICKED,
  SET_FOLDER_TAGS,
  SET_META_TAGS,
} from "../../store/reducers/Tags";
import { AiOutlineFolder } from "react-icons/ai";
import { throttle } from "lodash";
import { useEffect } from "react";
const IndicatorEl = styled.div`
  position: relative;
  height: fit-content;
  display: flex;
  width: 80%;
  height: 50px;
  align-items: center;
  justify-content: flex-start;
  /* padding: 0.5rem 0; */
`;
const TagWrapper = styled.div`
  overflow-x: scroll;
  position: absolute;

  ::-webkit-scrollbar {
    display: none;
  }
  padding: 1rem 0;

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
  ${({ clicked }) =>
    clicked &&
    `
  background-color: #a597fe; 
  color: #fff; 
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  `};
`;

const MetaTagEl = styled(TagEl)`
  ${({ clicked }) =>
    clicked &&
    `
  background-color: #a597fe; 
  color: #fff; 
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  `};
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
  const folderTagItems = useSelector(getFolderTagItems);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  // hooks
  // FIXME: Scroll side
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

  // FIXME: 글자 태그 클릭
  const handleClickMetaTag = (metaTag) => {
    console.log("handleClickMetaTag", metaTag);
    const clickedOnceFn = () => {
      dispatch(SET_META_TAGS(metaTag));
    };
    const clickedSecondFn = () => {
      dispatch(REMOVE_META_TAGS(metaTag));
    };
    // console.log(metaTag);
    !metaTagItems.includes(metaTag) && clickedOnceFn();
    metaTagItems.includes(metaTag) && clickedSecondFn();
  };

  //FIXME: 폴더 태그 클릭
  const handleClickFolderTag = (folder) => {
    const clickedOnceFn = () => {
      dispatch(SET_FOLDER_TAGS(folder._id));
    };
    const clickedSecondFn = () => {
      dispatch(REMOVE_FOLDER_TAGS(folder._id));
    };
    !folderTagItems.includes(folder?._id) && clickedOnceFn();
    folderTagItems.includes(folder?._id) && clickedSecondFn();
  };

  // FIXME: 태그 하나라도 클릭했는 지 알려줌
  const handleSetClicked = (boolean) => {
    dispatch(SET_CLICKED(boolean));
  };

  useEffect(() => {
    metaTagItems.length === 0 &&
      folderTagItems.length === 0 &&
      handleSetClicked(false);

    (metaTagItems.length !== 0 || folderTagItems.length !== 0) &&
      handleSetClicked(true);
  }, [metaTagItems, folderTagItems]);

  // FIXME: 맵핑
  const hashtagMap = () => {
    return assignedHashtags.map((tag, index) => {
      const clicked = metaTagItems.includes(tag);
      const key = index;
      return (
        <MetaTag
          tag={tag}
          key={key}
          onClick={() => handleClickMetaTag(tag)}
          clicked={clicked}
        />
      );
    });
  };

  const folderMap = () => {
    return folders.map((folder, key) => {
      const clicked = folderTagItems.includes(folder._id);
      return (
        <FolderTag
          handleClickFolderTag={handleClickFolderTag}
          folder={folder}
          clicked={clicked}
          key={folder._id}
        />
      );
    });
  };

  return (
    <IndicatorEl>
      <LeftIcon onClick={onClickLeftArrow}>
        <MdOutlineKeyboardArrowLeft />
      </LeftIcon>
      <TagWrapper ref={scrollRef}>
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

const MetaTag = ({ tag, onClick, clicked }) => {
  return (
    <MetaTagEl onClick={onClick} clicked={clicked}>
      {tag.toUpperCase()}
    </MetaTagEl>
  );
};

const FolderTag = ({ handleClickFolderTag, folder, clicked }) => {
  const onClick = () => handleClickFolderTag(folder);
  return (
    folder.like && (
      <FolderTagEl onClick={onClick} clicked={clicked}>
        <FolderIcon>
          <AiOutlineFolder />
        </FolderIcon>
        {folder.folder_name.toUpperCase()}
      </FolderTagEl>
    )
  );
};
