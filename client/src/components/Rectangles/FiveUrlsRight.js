import React from "react";

const FiveUrlsRight = ({ values, editMode }) => {
  return (
    <>
      {values.map((value) => {
        return (
          <div
            className="url"
            onClick={() => {
              if (!editMode) {
                console.log("에디터모드입니다");
              } else {
                window.open(value.url);
              }
            }}
            onMouseEnter={() => {
              // console.log(123);
            }}
            onContextMenu={(e) => {
              console.log("우클릭");
              e.preventDefault();
            }}
            key={value.url_id}
          >
            <div className="valueId">{value.url_id}</div>
            <div className="just-bar">|</div>
            <div className="valueTitle">{value.url_title}</div>
          </div>
        );
      })}
    </>
  );
};

export default FiveUrlsRight;
