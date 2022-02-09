import { debounce } from "lodash";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { KeywordNormalize, SearchNotByDB } from "../../Hooks/SearchHook";
import { MainStates } from "../../routers/MainPage";
import SearchedStuff from "./SearchedStuff";
import ButtonWrapper from "../styled/ButtonWrapper.styled";
import ModalWindowEl from "../styled/ModalWindowEl.styled";
import HeaderContainer from "./HeaderContainer.styled";
import { useSelector, useDispatch } from "react-redux";
import { ModalFolderContents } from "./ModalFolder";
import { actions } from "../../store/reducers/Folders";

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
  const { clickedFolder } = useContext(ModalFolderContents);

  const [filterdList, setFilterdList] = useState([]);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [conetentsNum, setconetentsNum] = useState(20);

  const dispatch = useDispatch();

  const folders = useSelector((state) => state.folders);

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

  const handleClickUrl = (url) => {
    dispatch(
      actions.AddContent({ folderId: clickedFolder._id, urlId: url._id })
    );
  };

  const handleUnClickUrl = (url) => {
    dispatch(
      actions.RemoveContent({ folderId: clickedFolder._id, urlId: url._id })
    );
  };

  // FIXME: 무한스크롤

  const getNextItems = () => {
    setconetentsNum((num) => num + 40);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      if (realTotalUrls.length === conetentsNum) {
        return;
      }
      await getNextItems();

      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <ModalWindowUrlEl>
      <HeaderContainerUrl className="header-Container">
        <h2>{clickedFolder?.folderName}</h2>
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
            ? realTotalUrls.slice(0, conetentsNum).map((url, index) => {
                if (index === conetentsNum - 3) {
                  return <div ref={setTarget} key="target" />;
                } else {
                  return (
                    <SearchedStuff
                      value={url}
                      key={url._id}
                      handleClickUrl={handleClickUrl}
                      handleUnClickUrl={handleUnClickUrl}
                    />
                  );
                }
              })
            : filterdList?.map((url) => {
                return (
                  <SearchedStuff
                    value={url}
                    key={url._id}
                    handleClickUrl={handleClickUrl}
                    handleUnClickUrl={handleUnClickUrl}
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
