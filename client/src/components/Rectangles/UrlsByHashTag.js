import React, { useEffect, useMemo } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import {
  grabNowValue,
  getMouseLocation,
  onMouseLeave,
} from "./movingModalFuncs";
import { whenIclickUrl } from "./FuncTotalUrlMap";
import { connect } from "react-redux";
import { actionCreators } from "../../store";

const UrlsByHashTag = ({
  realTotalUrls,
  setRealTotalUrls,
  BoxTags,
  editMode,
  deleteMode,
  setMyFav,
  state,
  addUrls,
}) => {
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
    addUrls(onlyId);
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
              <div className="valueId">{value.url_id}</div>
              <div className="just-bar">|</div>
              <div className="valueTitle">{value.url_title}</div>
            </div>
          </>
        );
      })}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { state };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addUrls: (url) => dispatch(actionCreators.addToDo(url)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UrlsByHashTag);
