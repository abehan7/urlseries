import React, { useEffect, useState } from "react";
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
// TODO: 12/29) UrlsByHashTag / filterdTags(리덕스) / AsiedTag
const UrlsByHashTagEl = styled(UrlRectWrapper)`
  position: relative;
`;

const UrlsByHashTag = ({ realTotalUrls, editMode, deleteMode, setMyFav }) => {
  const [Height, setHeight] = useState(0);
  const [filterdUrls, setFilterdUrls] = useState([]);

  const folders = useSelector(getFolders);
  const folderTagItems = useSelector(getFolderTagItems);
  const metaTagItems = useSelector(getMetaTagItems);
  const isClicked = useSelector(getIsClicked);

  const onMouseOut = (e) => {
    modalHover.cancel();
    e.target.lastChild.classList.remove("hover-on");
  };

  const onMouseOver = (e) => {
    modalHover(e, setHeight, Height);
  };

  const getFilterMetaTag = () => {
    const filterd = realTotalUrls.filter((url) => {
      return metaTagItems.some((tag) => {
        return url.url_hashTags.includes(tag);
      });
    });

    return filterd;
  };

  const getFilterFoldersTag = () => {
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
    const combined = [...getFilterMetaTag(), ...getFilterFoldersTag()];
    const filterd = duplicateUrlChecker(combined);
    console.log("combined", filterd);
    setFilterdUrls(filterd);
    // return filterd;
  };

  const dispatch = useDispatch();

  const handleClickUrl = (url) => {
    window.open(url.url);
  };
  const handleEditClick = (url) => {};

  const handleDeleteClick = (url) => {};

  useEffect(() => {
    isClicked && getFilterFoldersTag();
  }, [folderTagItems]);

  useEffect(() => {
    isClicked && getFilterMetaTag();
  }, [metaTagItems]);

  useEffect(() => {
    isClicked && getCombinedItems();
  }, [metaTagItems, folderTagItems]);

  return (
    <>
      {filterdUrls.map((value) => {
        return (
          <>
            <UrlsByHashTagEl
              className="T-url"
              key={value.id}
              onClick={() => {}}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
            >
              {!editMode && deleteMode && (
                <>
                  <div className="select-box">
                    {value.clicked ? (
                      <MdCheckBox style={{ paddingLeft: "10px" }} />
                    ) : (
                      <MdCheckBoxOutlineBlank style={{ paddingLeft: "10px" }} />
                    )}
                  </div>
                </>
              )}
              <img
                style={{ pointerEvents: "none" }}
                className="urlFavicon"
                src={`http://www.google.com/s2/favicons?domain=${value.url}`}
                alt=""
              />
              <div className="just-bar" style={{ pointerEvents: "none" }}>
                |
              </div>
              <div className="valueTitle" style={{ pointerEvents: "none" }}>
                {value.url_title}
              </div>
              <HoverModal Height={Height} value={value} />
            </UrlsByHashTagEl>
          </>
        );
      })}
    </>
  );
};

export default UrlsByHashTag;
