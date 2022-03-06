import React, { useCallback } from "react";
import styled from "styled-components";
import BoxWrap from "../styled/BoxWrap.styled";
import InputContainer from "../styled/InputContainer.styled";
import ItemContainer from "../styled/ItemContainer.styled";
import "./ModalHashtag.css";

const ItemLeftEl = styled.div`
  width: 300px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  flex: 1;
`;

const Input = styled.input``;

const ItemLeft = ({
  keyword,
  setKeyword,
  filterdList,
  itemList,
  Item,
  placeholder,
}) => {
  // FIXME: 검색창에서 사용할 onChange
  const onChange = useCallback((e) => setKeyword(e.target.value), [itemList]);

  return (
    <>
      <ItemLeftEl>
        <div class="form__group field">
          <input
            type="input"
            class="form__field"
            placeholder=" "
            name="name"
            id="name"
            required
            value={keyword}
            onChange={onChange}
          />
          <label for="name" class="form__label">
            hashtag 검색하기
          </label>
        </div>
        {/* <InputContainer>
          <Input
            value={keyword}
            placeholder={placeholder}
            onChange={onChange}
          />
        </InputContainer> */}
        <ItemContainer>
          <BoxWrap>
            {keyword?.length === 0 ? (
              <>
                {itemList?.map((item, index) => {
                  return Item({ item, index });
                })}
              </>
            ) : (
              <>
                {filterdList?.map((item, index) => {
                  return Item({ item, index });
                })}
              </>
            )}
          </BoxWrap>
        </ItemContainer>
      </ItemLeftEl>
    </>
  );
};

export default ItemLeft;
