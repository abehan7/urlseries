import React, { useCallback } from "react";
import { memo } from "react";
import styled from "styled-components";
import BoxWrap from "../styled/BoxWrap.styled";
import ItemContainer from "../styled/ItemContainer.styled";
import "./ModalHashtag.css";

const ItemLeftEl = styled.div`
  width: 300px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  flex: 1;
`;

// const Input = styled.input``;

const ItemLeft = ({ keyword, setKeyword, filterdList, itemList, Item }) => {
  // FIXME: 검색창에서 사용할 onChange
  const onChange = useCallback((e) => setKeyword(e.target.value), [itemList]);

  return (
    <ItemLeftEl>
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder=" "
          name="name"
          id="name"
          required
          value={keyword}
          onChange={onChange}
          autoComplete="off"
        />
        <label htmlFor="name" className="form__label">
          hashtag 검색하기
        </label>
      </div>

      <ItemContainer>
        <BoxWrap>
          {keyword?.length === 0
            ? itemList?.map((item, index) => Item({ item, index }))
            : filterdList?.map((item, index) => Item({ item, index }))}
        </BoxWrap>
      </ItemContainer>
    </ItemLeftEl>
  );
};

export default memo(ItemLeft);
