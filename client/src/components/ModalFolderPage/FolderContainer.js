import { debounce } from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TiBackspaceOutline } from "react-icons/ti";
import { Provider } from "react-redux";
import styled from "styled-components";
import { KeywordNormalize, SearchNotByDB } from "../../Hooks/SearchHook";
import { MainStates } from "../../routers/MainPage";
import { FolderContext } from "./FolderModalWindow";
import ItemSelectContainer from "./ItemSelectContainer";
import Container from "./styled/Container.styled";
import Content from "./styled/Content.styled";
import ContentsWrapper from "./styled/ContentsWrapper.styled";
import Input from "./styled/Input.styled";
import InputWrapper from "./styled/InputWrapper.styled";
import Title from "./styled/Title.styled";

const FolderContainerEl = styled(Container)``;
const InputWrapperEl = styled(InputWrapper)`
  visibility: ${(props) => (props.clickedSearch ? "visible" : "hidden")};
  > input {
    font-weight: 200;
    height: ${(props) => (props.clickedSearch ? "30px" : "0")};
    padding: ${(props) => (props.clickedSearch ? "0.2rem 1rem" : "0")};
  }
`;
const TitleEl = styled(Title)`
  display: flex;
  column-gap: 0.41rem;
`;

const TitleName = styled.span`
  font-weight: 100;
  color: ${(props) => !props.isFolderContents && "orange"};
`;

const SubTitle = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SubTitleEl = styled.span`
  font-weight: 100;
  cursor: pointer;
`;

const Description = styled.div`
  display: flex;
  column-gap: 0.41rem;
  font-weight: 100;
`;

const DescTitle = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  max-width: 70px;
  font-weight: 100;
`;

const ContentEl = styled(Content)`
  height: ${(props) =>
    props.clickedSearch ? "calc(90% - 50px - 30px)" : "calc(90% - 50px)"};
`;

const doDebounce = debounce((fn) => {
  fn();
}, 300);

export const FolderContainerContext = createContext(null);

const FolderContainer = () => {
  const { realTotalUrls } = useContext(MainStates);
  const [isFolderContents, setIsFolderContents] = useState(true);
  const [scrollTarget, setScrollTarget] = useState(null);
  const [Items, setItems] = useState([]);
  const [filterdItems, setFilterdItems] = useState([]);
  const [keyword, setKeyword] = useState("");

  const initialState = {
    keyword,
    filterdItems,
  };

  const { clickedSearch, setClickedSearch, setSelectedFolder, selectedFolder } =
    useContext(FolderContext);

  // url클릭
  const handleClickUrl = (url) => {
    setItems((prev) => [...prev, url]);
  };

  // url클릭 해제
  const handleUnClickUrl = (url) => {
    setItems((prev) => prev.filter((item) => item._id !== url._id));
  };

  // 스크롤 초기화
  const handleScrollUp = () => {
    scrollTarget.scrollTop !== 0 && scrollTarget.scrollTo(0, 0);
  };

  // 우측 선택하기 버튼 클릭시
  const onClickSubTitle = () => {
    setIsFolderContents(!isFolderContents);
    handleScrollUp();
    setItems([]);
  };

  // 인풋 키워드
  const onChange = (e) => {
    setFilterdItems([]);
    setKeyword(e.target.value);
  };

  useEffect(() => {
    console.log(Items);
  }, [Items]);

  // 검색
  useEffect(() => {
    doDebounce.cancel();
    const processed = KeywordNormalize(keyword);
    const fn = () => {
      const filterd = SearchNotByDB(processed, realTotalUrls);
      setFilterdItems(filterd);
    };

    keyword.length > 0 && doDebounce(fn);
  }, [keyword]);

  return (
    <FolderContainerContext.Provider value={initialState}>
      <FolderContainerEl>
        <ContentsWrapper>
          <TitleEl>
            <TitleName isFolderContents={isFolderContents}>
              {isFolderContents
                ? selectedFolder?.folderName
                : "폴더에 추가할 url을 선택해주세요"}
            </TitleName>
            <SubTitle>
              <SubTitleEl onClick={onClickSubTitle}>
                {isFolderContents ? (
                  "url선택하기"
                ) : (
                  <Description>
                    <TiBackspaceOutline />
                    <DescTitle>{selectedFolder?.folderName}</DescTitle>
                  </Description>
                )}
              </SubTitleEl>
            </SubTitle>
          </TitleEl>
          <InputWrapperEl clickedSearch={clickedSearch}>
            <Input value={keyword} onChange={onChange} />
          </InputWrapperEl>
          <ContentEl clickedSearch={clickedSearch} ref={setScrollTarget}>
            {isFolderContents ? (
              // 폴더 url 선택
              <FolderItems
                realTotalUrls={realTotalUrls}
                handleClickUrl={handleClickUrl}
                handleUnClickUrl={handleUnClickUrl}
              />
            ) : (
              <UrlItems
                realTotalUrls={realTotalUrls}
                handleClickUrl={handleClickUrl}
                handleUnClickUrl={handleUnClickUrl}
              />
            )}
          </ContentEl>
        </ContentsWrapper>
      </FolderContainerEl>
    </FolderContainerContext.Provider>
  );
};

const FolderItems = ({ realTotalUrls, handleClickUrl, handleUnClickUrl }) => {
  return realTotalUrls.slice(0, 20).map((url, index) => {
    return (
      <ItemSelectContainer
        value={url}
        key={url._id}
        handleClickUrl={handleClickUrl}
        handleUnClickUrl={handleUnClickUrl}
      />
    );
  });
};

const UrlItems = ({ realTotalUrls, handleClickUrl, handleUnClickUrl }) => {
  const [contentsNum, setContentsNum] = useState(20);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { keyword, filterdItems } = useContext(FolderContainerContext);

  useEffect(() => {
    console.log("urlItems");
  }, [keyword]);

  // 무한스크롤
  const getNextItems = () => {
    setContentsNum((num) => num + 40);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      if (realTotalUrls.length === contentsNum) {
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
    <>
      {keyword.length === 0 &&
        realTotalUrls.slice(0, contentsNum).map((url, index) => {
          if (index === contentsNum - 5) {
            return <div ref={setTarget} key="thisIsTarget" />;
          }
          return (
            <ItemSelectContainer
              value={url}
              key={url._id}
              handleClickUrl={handleClickUrl}
              handleUnClickUrl={handleUnClickUrl}
            />
          );
        })}

      {keyword.length > 0 &&
        filterdItems.map((url, index) => {
          return (
            <ItemSelectContainer
              value={url}
              key={url._id}
              handleClickUrl={handleClickUrl}
              handleUnClickUrl={handleUnClickUrl}
            />
          );
        })}
    </>
  );
};

export default FolderContainer;
