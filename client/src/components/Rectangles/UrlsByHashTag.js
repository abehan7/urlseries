import React, { useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

import whenIclickUrl from "./FuncTotalUrlMap";
import { useDispatch } from "react-redux";
import { actionCreators2 } from "../../store/reducers/filteredTags.js";
import styled from "styled-components";
import UrlRectWrapper from "../styled/UrlRectWrapper.styled";
import { modalHover } from "./TotalUrlMap";
import HoverModal from "../styled/HoverModal.styled";
// TODO: 12/29) UrlsByHashTag / filterdTags(리덕스) / AsiedTag
const UrlsByHashTagEl = styled(UrlRectWrapper)`
  position: relative;
`;

const UrlsByHashTag = ({
  realTotalUrls,
  setRealTotalUrls,
  BoxTags,
  editMode,
  deleteMode,
  setMyFav,
}) => {
  const [Height, setHeight] = useState(0);

  const dispatch = useDispatch();
  const addUrls2 = (url) => {
    dispatch(actionCreators2.addFiltered(url));
  };
  var showThisList = [];
  let onlyId = [];
  //해쉬태그는 여러개고 하나만 포함되어 있기만 하면 돼
  //filteredSpots = spots.filter((spot) => filtered.every((v) => spot.S_AMENITY.includes(v)));
  showThisList = realTotalUrls.filter((value) =>
    BoxTags.some((v) => value.url_hashTags.includes(v))
  );
  showThisList.forEach((val) => {
    onlyId.push(val._id);
  });

  useEffect(() => {
    // addUrls(onlyId);
    addUrls2(onlyId);
  }, [BoxTags]);

  return (
    <>
      {showThisList.map((value) => {
        return (
          <>
            <UrlsByHashTagEl
              className="T-url"
              key={value.id}
              onClick={() => {
                whenIclickUrl({
                  oneUrl: value,
                  deleteMode,
                  editMode,
                  setMyFav,
                  setGetUrls: setRealTotalUrls,
                  getUrls: realTotalUrls,
                  where: "UrlByHashTag",
                  dispatch,
                });
              }}
              onMouseOut={(e) => {
                modalHover.cancel();
                e.target.lastChild.classList.remove("hover-on");
              }}
              onMouseOver={(e) => {
                modalHover(e, setHeight, Height);
              }}
              onContextMenu={(e) => {
                console.log("우클릭");
                e.preventDefault();
              }}
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
              {/* <div className="valueId">{value.url_id}</div> */}
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
