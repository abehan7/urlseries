import React from "react";

const FiveUrls = ({ values, num1, num2 }) => {
  return (
    <>
      {values.slice(num1, num2).map((value) => {
        return (
          <div
            className="url"
            onClick={() => {
              window.open(value.url);
            }}
            onMouseEnter={() => {
              // console.log(123);
            }}
            onContextMenu={(e) => {
              console.log("우클릭");
              e.preventDefault();
            }}
            key={value.id}
          >
            {value.title}
          </div>
        );
      })}
    </>
  );
};

export default FiveUrls;
