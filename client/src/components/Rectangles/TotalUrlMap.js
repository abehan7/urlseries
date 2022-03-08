import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import HoverModal from "../styled/HoverModal.styled";
import styled from "styled-components";
import UrlRectWrapper from "../styled/UrlRectWrapper.styled";
import { debounce } from "lodash";
import { handleClickUrl, handleEditClick } from "../../Hooks/clickUrl";
import {
  ADD_TAG_FILTERD_ITEMS,
  getTagFilterdItems,
  REMOVE_TAG_FILTERD_ITEMS,
} from "../../store/reducers/urls";
import { useUrl } from "../../contexts/UrlContext";

export const modalHover = debounce((e, setHeight, Height) => {
  e.target.lastChild.classList.add("hover-on");
  Height !== e.target.offsetHeight && setHeight(e.target.offsetHeight);
}, 500);

const BoxEl = styled.div`
  display: flex;
  > svg {
    padding-left: 1rem;
    padding: 0 0.5rem;
  }
`;

const TotalUrlMapEl = styled(UrlRectWrapper)`
  position: relative;
  .just-bar,
  .valueTitle,
  > img {
    pointer-events: none;
  }
`;

const faviconUrl = (url) => `http://www.google.com/s2/favicons?domain=${url}`;

const TotalUrlMap = () => {
  const displayUrls = useUrl().url.displayUrls;
  const [Height, setHeight] = useState(0);
  const dispatch = useDispatch();
  const tagFilterdItems = useSelector(getTagFilterdItems);
  const onMouseOut = (e) => {
    modalHover.cancel();
    e.target.lastChild.classList.remove("hover-on");
  };

  const onMouseOver = (e) => {
    modalHover(e, setHeight, Height);
  };

  const onContextMenu = (e) => {
    console.log("우클릭");
    e.preventDefault();
  };

  const handleDeleteClick = (url) => {
    // 한번클릭
    !tagFilterdItems.includes(url._id) &&
      dispatch(ADD_TAG_FILTERD_ITEMS([url._id]));
    // 더블클릭
    tagFilterdItems.includes(url._id) &&
      dispatch(REMOVE_TAG_FILTERD_ITEMS(url._id));
  };

  const onClick = (url) => {
    // TODO: 여기는 다시 복귀시켜야함
    // editMode && handleClickUrl(url);
    // !editMode && !deleteMode && handleEditClick(url);
    // !editMode && deleteMode && handleDeleteClick(url);

    console.log("onClick");
  };

  return (
    <>
      {displayUrls.map((url) => {
        const clicked = tagFilterdItems.includes(url._id);
        return (
          <TotalUrlMapEl
            className="T-url"
            key={url._id}
            onClick={() => onClick(url)}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
            onContextMenu={onContextMenu}
          >
            {/* {!editMode && deleteMode && <Box clicked={clicked} />} */}

            <img className="urlFavicon" src={faviconUrl(url.url)} alt="" />
            {/* <div>{value.url_id}</div> */}
            <div className="just-bar">|</div>
            <div className="valueTitle">{url.url_title}</div>
            <HoverModal Height={Height} value={url} />
          </TotalUrlMapEl>
        );
      })}
    </>
  );
};

const Box = ({ clicked }) => {
  return (
    <BoxEl className="select-box">
      {clicked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
    </BoxEl>
  );
};

export default TotalUrlMap;
