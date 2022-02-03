import React, { useCallback } from "react";
import styled from "styled-components";
import BoxWrap from "../styled/BoxWrap.styled";
// import ItemLeftEl from "../styled/ItemLeftEl.styled";
import ModalContent from "../styled/ModalContent.styled";
import SearchBar from "../styled/SearchBar.styled";

const ItemLeftEl = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  flex: 1;
`;

const Input = styled.input``;

const Item = styled.div``;

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
    <ItemLeftEl>
      <SearchBar>
        <Input
          value={searchBarInput}
          className="tag-searchBar"
          placeholder="선택할 태그를 입력해주세요"
          onChange={onChange}
        />
      </SearchBar>
      <ModalContent>
        <BoxWrap>
          {searchBarInput.length === 0 ? (
            <>
              {totalTags.map((val, i) => {
                return (
                  <Item
                    key={i}
                    className={totalMapColor(val)}
                    onClick={(e) => handleToggle(e, val)}
                  >
                    {val.name}
                  </Item>
                );
              })}
            </>
          ) : (
            <>
              {filterdTags.map((val, i) => {
                return (
                  <Item
                    key={i}
                    className={totalMapColor(val)}
                    onClick={(e) => handleToggle(e, val)}
                  >
                    {val.name}
                  </Item>
                );
              })}
            </>
          )}
        </BoxWrap>
      </ModalContent>
    </ItemLeftEl>
  );
};

export default ItemLeft;
