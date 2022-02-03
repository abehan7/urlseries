import React, { useCallback } from "react";
import styled from "styled-components";
import BoxWrap from "../styled/BoxWrap.styled";
// import ItemLeftEl from "../styled/ItemLeftEl.styled";
import ModalContent from "../styled/ModalContent.styled";
// import SearchBar from "../styled/SearchBar.styled";

const ItemLeftEl = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  flex: 1;
`;

const Input = styled.input``;

const SearchBar = styled.div`
  padding: 11px;
  padding-top: 5px;
  padding-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  > input {
    padding: 0%;
    border: none;
  }
`;

const ItemLeft = ({
  searchBarInput,
  setSearchBarInput,
  filterdList,
  itemList,
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
    [itemList]
  );

  return (
    <ItemLeftEl>
      <SearchBar>
        <Input
          value={searchBarInput}
          placeholder="선택할 태그를 입력해주세요"
          onChange={onChange}
        />
      </SearchBar>
      <ModalContent>
        <BoxWrap>
          {searchBarInput.length === 0 ? (
            <>
              {itemList.map((val, i) => {
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
              {filterdList.map((val, i) => {
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
        </BoxWrap>
      </ModalContent>
    </ItemLeftEl>
  );
};

export default ItemLeft;
