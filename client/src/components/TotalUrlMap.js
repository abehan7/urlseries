import React from "react";

const TotalUrlMap = ({ values }) => {
  return (
    <>
      {values.map((value) => {
        return (
          <div
            className="T-url"
            key={value.id}
            onClick={() => {
              window.open(value.url);
            }}
            onMouseEnter={() => {
              console.log(123);
            }}
          >
            {value.title}
          </div>
        );
      })}
    </>
  );
};

export default TotalUrlMap;
