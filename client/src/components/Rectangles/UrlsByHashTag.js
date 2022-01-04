import React, { useEffect, useMemo } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import {
  grabNowValue,
  getMouseLocation,
  onMouseLeave,
} from "./movingModalFuncs";
import whenIclickUrl from "./FuncTotalUrlMap";
import { useDispatch } from "react-redux";
import { actionCreators2 } from "../../store/reducers/filteredTags.js";
// TODO: 12/29) UrlsByHashTag / filterdTags(리덕스) / AsiedTag
const UrlsByHashTag = ({
  realTotalUrls,
  setRealTotalUrls,
  BoxTags,
  editMode,
  deleteMode,
  setMyFav,
}) => {
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
            <div
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
              onMouseEnter={() => {
                grabNowValue(value);
              }}
              onMouseMove={(e) => getMouseLocation(e)}
              onMouseLeave={onMouseLeave}
              onContextMenu={(e) => {
                console.log("우클릭");
                e.preventDefault();
              }}
            >
              {!editMode && deleteMode && (
                <>
                  <div className="select-box">
                    {value.clicked ? (
                      <MdCheckBox />
                    ) : (
                      <MdCheckBoxOutlineBlank />
                    )}
                  </div>
                </>
              )}
              <img
                className="urlFavicon"
                src={`http://www.google.com/s2/favicons?domain=${value.url}`}
                alt=""
              />
              {/* <div className="valueId">{value.url_id}</div> */}
              <div className="just-bar">|</div>
              <div className="valueTitle">{value.url_title}</div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default UrlsByHashTag;
