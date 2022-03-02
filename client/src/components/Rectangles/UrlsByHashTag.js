import React, { useContext, useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import UrlRectWrapper from "../styled/UrlRectWrapper.styled";
import { modalHover } from "./TotalUrlMap";
import HoverModal from "../styled/HoverModal.styled";
import { getFolders } from "../../store/reducers/Folders";
import {
  getFolderTagItems,
  getIsClicked,
  getMetaTagItems,
} from "../../store/reducers/Tags";
import { duplicateUrlChecker } from "../../Hooks/getDuplicateCheck";
import { MainStates } from "../../routers/MainPage";
import {
  ADD_TAG_FILTERD_ITEMS,
  getTagFilterdItems,
  REMOVE_TAG_FILTERD_ITEMS,
  SET_TAG_TOTAL_ITEMS,
} from "../../store/reducers/urls";
import { handleClickUrl, handleEditClick } from "../../Hooks/clickUrl";
// TODO: 12/29) UrlsByHashTag / filterdTags(리덕스) / AsiedTag
const UrlsByHashTagEl = styled(UrlRectWrapper)`
  position: relative;
`;
const faviconUrl = (url) => `http://www.google.com/s2/favicons?domain=${url}`;

const UrlsByHashTag = ({ realTotalUrls, setMyFav }) => {
  const [Height, setHeight] = useState(0);
  const [filterdUrls, setFilterdUrls] = useState([]);

  const folders = useSelector(getFolders);
  const folderTagItems = useSelector(getFolderTagItems);
  const metaTagItems = useSelector(getMetaTagItems);
  const isClicked = useSelector(getIsClicked);

  const { editMode, deleteMode } = useContext(MainStates);

  const dispatch = useDispatch();

  const tagFilterdItems = useSelector(getTagFilterdItems);

  const getMetaTagUrls = () => {
    const filterd = realTotalUrls.filter((url) => {
      return metaTagItems.some((tag) => {
        return url.url_hashTags.includes(tag);
      });
    });

    return filterd;
  };

  const getFoldersTagUrls = () => {
    const getFolders = folders.filter((folder) =>
      folderTagItems.includes(folder._id)
    );

    const getFolderContents = getFolders.map((folder) => {
      return folder.folder_contents;
    });

    const flatten = getFolderContents.flat();

    const filterd = duplicateUrlChecker(flatten);

    console.log("filterd", filterd);

    return filterd;
  };

  const getCombinedItems = () => {
    const combined = [...getMetaTagUrls(), ...getFoldersTagUrls()];
    const filterd = duplicateUrlChecker(combined);
    console.log("combined", filterd);

    setFilterdUrls(filterd);

    // 여기는 lefticons에서 사용될 것들
    const onlyIds = filterd.map((url) => {
      return url._id;
    });
    dispatch(SET_TAG_TOTAL_ITEMS(onlyIds));
  };

  const handleDeleteClick = (url) => {
    // 한번클릭
    !tagFilterdItems.includes(url._id) &&
      dispatch(ADD_TAG_FILTERD_ITEMS([url._id]));
    // 더블클릭
    tagFilterdItems.includes(url._id) &&
      dispatch(REMOVE_TAG_FILTERD_ITEMS(url._id));
  };

  const onMouseOut = (e) => {
    modalHover.cancel();
    e.target.lastChild.classList.remove("hover-on");
  };

  const onMouseOver = (e) => {
    modalHover(e, setHeight, Height);
  };

  const onClick = (url) => {
    editMode && handleClickUrl(url);
    !editMode && !deleteMode && handleEditClick(url);
    !editMode && deleteMode && handleDeleteClick(url);
  };

  useEffect(() => {
    isClicked && getCombinedItems();
  }, [metaTagItems, folderTagItems, folders]);

  useEffect(() => {
    console.log("tagFilterdItems: ", tagFilterdItems);
  }, [tagFilterdItems]);

  return (
    <>
      {filterdUrls.map((value) => {
        const clicked = tagFilterdItems.includes(value._id);
        return (
          <>
            <UrlsByHashTagEl
              className="T-url"
              key={value.id}
              onClick={() => onClick(value)}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
            >
              {!editMode && deleteMode && <Box clicked={clicked} />}

              {!deleteMode && (
                <img
                  style={{ pointerEvents: "none" }}
                  className="urlFavicon"
                  src={faviconUrl(value.url)}
                  alt=""
                />
              )}

              <div className="just-bar" style={{ pointerEvents: "none" }}>
                |
              </div>
              <div className="valueTitle" style={{ pointerEvents: "none" }}>
                {value.url_title}
              </div>
              <HoverModal Height={Height} value={value} key={value._id} />
            </UrlsByHashTagEl>
          </>
        );
      })}
    </>
  );
};

const BoxEl = styled.div`
  display: flex;
  > svg {
    padding-left: 1rem;
    padding: 0 0.5rem;
  }
`;

const Box = ({ clicked }) => {
  return (
    <BoxEl className="select-box">
      {clicked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
    </BoxEl>
  );
};

export default UrlsByHashTag;
