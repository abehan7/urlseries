import React from "react";
import { useSelector } from "react-redux";

const ItemLeft = ({
  searchedTag,
  setSearchedTag,
  filterd,
  totalTags,
  toggleFunc,
}) => {
  // ==================== 리덕스 START ====================
  const {
    page3Storage: { nowPage2 },
  } = useSelector((state) => state);
  // ==================== 리덕스 END ====================

  // ========================== 색깔 칠하는 className START==========================
  const totalMapColor = ({ val }) => {
    switch (nowPage2) {
      case 1:
        return val.assigned === 1
          ? "oneHash total-oneHash clicked"
          : "oneHash total-oneHash";
      case 3:
        return val.folderAssigned === 1
          ? "oneHash total-oneHash clicked"
          : "oneHash total-oneHash";
      default:
        return "oneHash total-oneHash";
    }
    // if (nowPage2 === 1) {
    //   return val.assigned === 1
    //     ? "oneHash total-oneHash clicked"
    //     : "oneHash total-oneHash";
    // }
  };
  // ========================== 색깔 칠하는 className END==========================

  return (
    <div className="LeftItem">
      <div className="searchedTags-Container">
        <input
          value={searchedTag}
          className="tag-searchBar"
          placeholder="선택할 태그를 입력해주세요"
          onChange={(e) => {
            console.log(e.target.value);
            setSearchedTag(e.target.value);
            console.log(filterd);
          }}
        />
      </div>
      <div className="content hashtag-content">
        <div className="flexWrapBox">
          {searchedTag.length === 0 ? (
            <>
              {totalTags.map((val, i) => {
                return (
                  <div
                    key={i}
                    className={totalMapColor({ val })}
                    onClick={(e) => {
                      toggleFunc(e, val);
                      console.log(val);
                    }}
                  >
                    {val.name}
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {filterd.map((val, i) => {
                return (
                  <div
                    key={i}
                    className={totalMapColor({ val })}
                    onClick={(e) => {
                      toggleFunc(e, val);
                    }}
                  >
                    {val.name}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemLeft;
