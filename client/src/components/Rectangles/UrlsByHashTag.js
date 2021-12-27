import React from "react";
import {
  grabNowValue,
  getMouseLocation,
  onMouseLeave,
} from "./movingModalFuncs";

const UrlsByHashTag = ({ values, BoxTags }) => {
  // console.log(BoxTags);
  // console.log(totalUrls);

  var showThisList = [];
  //해쉬태그는 여러개고 하나만 포함되어 있기만 하면 돼
  //filteredSpots = spots.filter((spot) => filtered.every((v) => spot.S_AMENITY.includes(v)));
  showThisList = values.filter((value) =>
    BoxTags.some((v) => value.url_hashTags.includes(v))
  );

  // console.log(showThisList);

  return (
    <>
      {showThisList.map((value) => {
        return (
          <>
            <div
              className="T-url"
              key={value.id}
              onClick={() => {
                window.open(value.url);
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

export default UrlsByHashTag;
