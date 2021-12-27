import React from "react";
import { useSelector } from "react-redux";

const RightItem = ({ assignedTags, removeToggle }) => {
  const {
    page3Storage: { nowPage2 },
  } = useSelector((state) => state);

  // const mapList = () => {
  //   assignedTags.map((val, i) => {
  //     return (
  //       <div
  //         key={i}
  //         className="oneHash"
  //         onClick={() => {
  //           removeToggle(val);
  //         }}
  //       >
  //         {val.name}
  //       </div>
  //     );
  //   });
  // };

  return (
    <div className="RightItem">
      <div className="title chosen-title">
        <h3>Chosen Ones</h3>
      </div>
      <div className="content hashtag-content">
        <div className="flexWrapBox flexWrap-right">
          {(nowPage2 === 1
            ? assignedTags
            : [{ name: "안녕" }, { name: "지금은" }, { name: "테스트" }]
          )?.map((val, i) => {
            return (
              <div
                key={i}
                className="oneHash"
                onClick={() => {
                  nowPage2 === 1 && removeToggle(val);
                }}
              >
                {val.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightItem;
