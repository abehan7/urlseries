import React from "react";

const LeftItem = ({
  tagSearch,
  setTagSearch,
  filterd,
  totalTags,
  toggleFunc,
}) => {
  return (
    <div className="LeftItem">
      <div className="searchTags-Container">
        <input
          value={tagSearch}
          className="tag-searchBar"
          placeholder="선택할 태그를 입력해주세요"
          onChange={(e) => {
            console.log(e.target.value);
            setTagSearch(e.target.value);
            console.log(filterd);
          }}
        />
      </div>
      <div className="content hashtag-content">
        <div className="flexWrapBox">
          {tagSearch.length === 0 ? (
            <>
              {totalTags.map((val, i) => {
                return (
                  <div
                    key={i}
                    className={
                      val.assigned === 1
                        ? "oneHash total-oneHash clicked"
                        : "oneHash total-oneHash"
                    }
                    onClick={(e) => {
                      toggleFunc(e, val);
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
                    className={
                      val.assigned === 1
                        ? "oneHash total-oneHash clicked"
                        : "oneHash total-oneHash"
                    }
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

export default LeftItem;
