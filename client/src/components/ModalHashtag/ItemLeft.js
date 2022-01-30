import React, { useCallback } from "react";
import styled from "styled-components";

const Input = styled.input``;

const SearchBar = styled.div``;

const ItemLeft = ({
  searchBarInput,
  setSearchBarInput,
  filterdTags,
  totalTags,
  handleToggle,
}) => {
  // FIXME: #1 className === clicked면 색깔 노랑
  const totalMapColor = useCallback((val) => {
    return val.assigned === 1
      ? "oneHash total-oneHash clicked"
      : "oneHash total-oneHash";
  }, []);

  // FIXME: 검색창에서 사용할 onChange
  const onChange = useCallback(
    (e) => setSearchBarInput(e.target.value),
    [totalTags]
  );

  return (
    <div className="LeftItem">
      <SearchBar className="searchTags-Container">
        <Input
          value={searchBarInput}
          className="tag-searchBar"
          placeholder="선택할 태그를 입력해주세요"
          onChange={onChange}
        />
      </SearchBar>
      <div className="content hashtag-content">
        <div className="flexWrapBox">
          {searchBarInput.length === 0 ? (
            <>
              {totalTags.map((val, i) => {
                return (
                  <div
                    key={i}
                    className={totalMapColor(val)}
                    onClick={(e) => handleToggle(e, val)}
                  >
                    {val.name}
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {filterdTags.map((val, i) => {
                return (
                  <div
                    key={i}
                    className={totalMapColor(val)}
                    onClick={(e) => handleToggle(e, val)}
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
