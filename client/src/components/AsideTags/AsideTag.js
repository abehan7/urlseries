import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
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
import { GET_CLEAR_TAG_FILTERD_ITEMS } from "../../store/reducers/urls";
import FolderTag from "./FolderTag";

const Tag = styled.span`
  ${({ isClicked }) => !isClicked && `opacity: 1;`}
  ${({ isClicked, clicked }) => isClicked && !clicked && `opacity: 0.3;`}
  ${({ isClicked, clicked }) => isClicked && clicked && `opacity: 1;`}

  transition: 100ms;
`;

const AsideTag = ({ assignedTags }) => {
  // const [isClicked, setisClicked] = useState(false);
  // FIXME: set redux

  const folders = useSelector(getFolders);
  const folderTagItems = useSelector(getFolderTagItems);
  const metaTagItems = useSelector(getMetaTagItems);
  const isClicked = useSelector(getIsClicked);

  const dispatch = useDispatch();

  const tagIsClicked = useSelector(getIsClicked);

  // FIXME: functions

  const handleClickFolderTag = (folder) => {
    const clickedOnceFn = () => {
      dispatch(SET_FOLDER_TAGS(folder._id));
    };
    const clickedSecondFn = () => {
      dispatch(REMOVE_FOLDER_TAGS(folder._id));
    };
    // console.log(folder);
    !folderTagItems.includes(folder?._id) && clickedOnceFn();
    folderTagItems.includes(folder?._id) && clickedSecondFn();
  };

  const handleClickMetaTag = (metaTag) => {
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

  useEffect(() => {
    dispatch(GET_CLEAR_TAG_FILTERD_ITEMS());
  }, [tagIsClicked]);

  return (
    <>
      {/* 태그 공간 */}
      {assignedTags.map((tag) => {
        const clicked = metaTagItems.includes(tag.name);
        return (
          <Tag
            className="tag"
            onClick={() => handleClickMetaTag(tag.name)}
            key={tag.name}
            clicked={clicked}
            isClicked={isClicked}
          >
            {tag.name}
          </Tag>
        );
      })}

      {/* 폴더 공간 */}
      {folders?.map((folder) => {
        const clicked = folderTagItems.includes(folder._id);
        return (
          <FolderTag
            handleClickFolderTag={handleClickFolderTag}
            folder={folder}
            clicked={clicked}
            key={folder._id}
            isClicked={isClicked}
          />
        );
      })}
    </>
  );
};

export default AsideTag;
