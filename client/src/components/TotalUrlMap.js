import React from "react";

const TotalUrlMap = ({ values }) => {
  const onMouseEnter = (e) => {
    console.log(e.target);
    // 시간지연같은거 두고싶은데
    // 3초 이상 누르고있으면 나오도록 하는거
    // const newDiv = document.createElement("div");
    // const newText = document.createTextNode("안녕하세요");
    // newDiv.className = "hello";
    // newDiv.appendChild(newText);
    // document.querySelector(".text-three-container").appendChild(newDiv);
  };

  const onMouseLeave = () => {
    if (document.querySelector(".hello")) {
      document.querySelectorAll(".hello").forEach((one) => {
        one.remove();
      });
    }
  };
  return (
    <>
      {values.map((value) => {
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
              onMouseLeave={onMouseLeave}
              onContextMenu={(e) => {
                console.log("우클릭");
                e.preventDefault();
              }}
            >
              <div className="valueTitle">{value.title}</div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default TotalUrlMap;