import { debounce } from "lodash";
import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { KeywordNormalize, SearchNotByDB } from "../../Hooks/SearchHook";
import { MainStates } from "../../routers/MainPage";
import SearchedStuff from "./SearchedStuff";
import ButtonWrapper from "../styled/ButtonWrapper.styled";
import ModalWindowEl from "../styled/ModalWindowEl.styled";
import HeaderContainer from "./HeaderContainer.styled";
import { useSelector, useDispatch } from "react-redux";

const HeaderContainerUrl = styled(HeaderContainer)`
  position: relative;
`;

const DebounceSomthingFn = debounce((fn) => {
  fn();
}, 300);

const ModalWindowUrlEl = styled(ModalWindowEl)`
  color: black;
  height: 500px;
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ButtonWrap = styled(ButtonWrapper)``;

const InputContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;

  > input {
    padding: 0 0.6rem;
    margin: 0;

    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const Contents = styled.div`
  flex: 1;
  max-height: calc(500px - 65px - 32px - 40px);
  height: calc(500px - 65px - 32px - 40px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const BtnSelectAll = styled.div`
  display: flex;
  cursor: pointer;
  position: absolute;
  right: 1rem;
`;

const ModalWindowUrl = () => {
  const [keyword, setKeyword] = useState("");
  const { realTotalUrls } = useContext(MainStates);

  const [filterdList, setFilterdList] = useState([]);

  const folders = useSelector((state) => state);

  const onChange = useCallback(
    (e) => {
      setFilterdList([]);
      DebounceSomthingFn.cancel();
      setKeyword(e.target.value);

      const fn = () => {
        const PKeyword = KeywordNormalize(e.target.value);
        const filterd = SearchNotByDB(PKeyword, realTotalUrls);
        setFilterdList(filterd);
      };

      DebounceSomthingFn(fn);
    },
    [realTotalUrls]
  );

  const handleClickUrl = () => {
    console.log("123");
    console.log(folders);
  };

  return (
    <ModalWindowUrlEl>
      <HeaderContainerUrl className="header-Container">
        <h2>url</h2>
        <BtnSelectAll>전체선택</BtnSelectAll>
      </HeaderContainerUrl>
      <ItemContainer>
        <InputContainer>
          <input
            value={keyword}
            placeholder="선택할 url을 입력해주세요"
            onChange={onChange}
          />
        </InputContainer>
        <Contents>
          {keyword.length === 0
            ? realTotalUrls.slice(0, 10).map((url) => {
                return (
                  <SearchedStuff
                    value={url}
                    key={url._id}
                    onClick={handleClickUrl}
                  />
                );
              })
            : filterdList?.map((url) => {
                return (
                  <SearchedStuff
                    value={url}
                    key={url._id}
                    onClick={handleClickUrl}
                  />
                );
              })}
        </Contents>
      </ItemContainer>
      <ButtonWrap className="editHash-btn">
        <button>수정하기</button>
      </ButtonWrap>
    </ModalWindowUrlEl>
  );
};

export default ModalWindowUrl;
