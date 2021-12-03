import React from "react";

const UrlsByHashTag = ({ values, BoxTags }) => {
  // console.log(BoxTags);
  // console.log(totalUrls);

  var showThisList = [];
  //해쉬태그는 여러개고 하나만 포함되어 있기만 하면 돼
  //filteredSpots = spots.filter((spot) => filtered.every((v) => spot.S_AMENITY.includes(v)));
  showThisList = values.filter((value) =>
    BoxTags.some((v) => value.hashTags.includes(v))
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
                // console.log(value);
              }}
              onContextMenu={(e) => {
                console.log("우클릭");
                e.preventDefault();
              }}
            >
              <div className="valueId">{value.id}</div>
              <div className="just-bar">|</div>
              <div className="valueTitle">{value.title}</div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default UrlsByHashTag;
