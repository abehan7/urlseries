import { debounce } from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import { TiBackspaceOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { KeywordNormalize, SearchNotByDB } from "../../Hooks/SearchHook";
import { MainStates } from "../../routers/MainPage";
import { SET_IS_FOLDER_CONTENTS } from "../../store/reducers/FolderConditions";
import { SET_ITEMS } from "../../store/reducers/FolderItems";
import LoadingImg from "../SearchBar/LoadingImg";
import { FolderContext } from "./FolderModalWindow";
import ItemFolderContainer from "./ItemFolderContainer";
import ItemUrlContainer from "./ItemUrlContainer";
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

const TargetEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const doDebounce = debounce((fn) => {
  fn();
}, 200);

const FolderContainer = ({ handleGetId }) => {
  const { realTotalUrls } = useContext(MainStates);
  const [isFolderContents, setIsFolderContents] = useState(true);
  const [scrollTarget, setScrollTarget] = useState(null);

  const {
    clickedSearch,
    selectedFolder,
    setFilterdItems,
    keyword,
    setKeyword,
    setClickedSearch,
    isConfirmed,
    setIsConfirmed,
    setIsUrlEditing,
    setModalInfo,
    CheckChanges,
    setIsSearching,
    isSearching,
    setIsOnlyFolderContents,
    isOnlyFolderContents,
  } = useContext(FolderContext);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.folderItems.items);

  // url클릭
  const handleClickUrl = (url) => {
    const processed = [...items, url._id];
    dispatch(SET_ITEMS(processed));
  };

  // url클릭 해제
  const handleUnClickUrl = (url) => {
    const processed = items.filter((item) => item !== url._id);
    dispatch(SET_ITEMS(processed));
  };

  // 스크롤 초기화
  const handleScrollUp = () => {
    scrollTarget?.scrollTop !== 0 && scrollTarget?.scrollTo(0, 0);
  };

  // 초기화
  const getReset = () => {
    // 스크롤 올리기
    handleScrollUp();

    // 키워드 초기화
    setKeyword("");
    // 키워드 필터링 초기화
    setFilterdItems([]);
    // 검색창 없애기
    setClickedSearch(false);
  };

  // 우측 선택하기 버튼 클릭시
  const onClickSubTitle = () => {
    const isContentsSame = CheckChanges();
    const fn = () => {
      setIsFolderContents(!isFolderContents);
      handleGetId(selectedFolder.folder_contents);
      getReset();

      !isFolderContents &&
        !isContentsSame &&
        setModalInfo({
          message: "",
          type: "",
          handleClickConfirm: () => {},
          isOpen: false,
        });
    };
    isFolderContents && fn();

    !isFolderContents && isContentsSame && fn();

    !isFolderContents &&
      !isContentsSame &&
      setModalInfo({
        message: "변경을 취소하시겠습니까?",
        type: "click",
        handleClickConfirm: fn,
        isOpen: true,
      });
  };

  // 인풋 키워드
  const onChange = (e) => {
    setFilterdItems([]);
    setKeyword(e.target.value);
    setIsSearching(true);
    console.log("isSearcing from onChange", isSearching);
  };
  // 리덕스
  const handleSetCondition = (condition) => {
    dispatch(SET_IS_FOLDER_CONTENTS(condition));
  };

  useEffect(() => {
    handleSetCondition(isFolderContents);
  }, [isFolderContents]);

  // 검색
  useEffect(() => {
    doDebounce.cancel();
    const processed = KeywordNormalize(keyword);
    // 이쪽만 살짝 바꿔주면 될 듯한데...
    const FindTotalUrlsFn = () => {
      const filterd = SearchNotByDB(processed, realTotalUrls);
      setFilterdItems(filterd);
      setIsSearching(false);
      console.log("isSearcing from NotByDB", isSearching);
    };
    const FindFolderContentsFn = () => {
      const filterd = SearchNotByDB(processed, selectedFolder.folder_contents);
      setFilterdItems(filterd);
      setIsSearching(false);
      console.log("isSearcing from NotByDB", isSearching);
    };

    isFolderContents && keyword.length > 0 && doDebounce(FindFolderContentsFn);
    !isFolderContents && keyword.length > 0 && doDebounce(FindTotalUrlsFn);
  }, [keyword]);

  // 만약에 folderContents가 변동이 있을 경우
  // setIsFolderContents 가 true
  useEffect(() => {
    if (!isFolderContents && isConfirmed) {
      onClickSubTitle();
    } else {
      getReset();
    }
    setIsConfirmed(false);
  }, [isConfirmed]);

  // url수정 페이지로 이동하는 경우
  // 여기는 검색창 아래부분에 아이콘 나오게 하는 기능들
  useEffect(() => {
    !clickedSearch && setIsUrlEditing(false);
    isFolderContents && setIsUrlEditing(false);
    !isFolderContents && clickedSearch && setIsUrlEditing(true);
  }, [isFolderContents, clickedSearch]);

  useEffect(() => {
    isOnlyFolderContents && setIsOnlyFolderContents(false);
  }, [isFolderContents]);

  return (
    <FolderContainerEl>
      <ContentsWrapper>
        <TitleEl>
          <TitleName isFolderContents={isFolderContents}>
            {isFolderContents
              ? selectedFolder?.folder_name
              : "폴더에 추가할 url을 선택해주세요"}
          </TitleName>
          <SubTitle>
            <SubTitleEl onClick={onClickSubTitle}>
              {isFolderContents ? (
                "url선택하기"
              ) : (
                <Description>
                  <TiBackspaceOutline />
                  <DescTitle>{selectedFolder?.folder_name}</DescTitle>
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
              FolderContents={selectedFolder.folder_contents}
              handleClickUrl={handleClickUrl}
              handleUnClickUrl={handleUnClickUrl}
            />
          ) : (
            <UrlItems
              realTotalUrls={realTotalUrls}
              handleClickUrl={handleClickUrl}
              handleUnClickUrl={handleUnClickUrl}
              FolderContents={selectedFolder.folder_contents}
            />
          )}
        </ContentEl>
      </ContentsWrapper>
    </FolderContainerEl>
  );
};

const FolderItems = ({ FolderContents }) => {
  const [contentsNum, setContentsNum] = useState(20);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { keyword, filterdItems, isSearching } = useContext(FolderContext);
  const folderItems = useSelector((state) => state.folderItems);

  // 무한스크롤
  const getNextItems = () => {
    setContentsNum((num) => num + 40);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      if (FolderContents.length === contentsNum) {
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

  useEffect(() => {
    contentsNum !== 20 && setContentsNum(20);
  }, [filterdItems]);

  return (
    <>
      {keyword.length === 0 &&
        FolderContents?.slice(0, contentsNum).map((url, index) => {
          if (index === contentsNum - 1) {
            return (
              <TargetEl ref={setTarget} key="thisIsTarget">
                🙂🙂로딩중입니다🙂🙂
              </TargetEl>
            );
          }
          return (
            <ItemFolderContainer
              key={url._id}
              value={url}
              items={folderItems.items}
            />
          );
        })}

      {keyword.length > 0 &&
        filterdItems.map((url, index) => {
          return (
            <ItemFolderContainer
              key={url._id}
              value={url}
              items={folderItems.items}
            />
          );
        })}

      {keyword.length > 0 && filterdItems.length === 0 && !isSearching && (
        <SearchMessage message="검색결과가 존재하지 않습니다..." />
      )}

      {keyword.length > 0 && filterdItems.length === 0 && isSearching && (
        <LoadingImg />
      )}
    </>
  );
};

const UrlItems = ({
  realTotalUrls,
  handleClickUrl,
  handleUnClickUrl,
  FolderContents,
}) => {
  const [contentsNum, setContentsNum] = useState(20);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { keyword, filterdItems, isSearching, isOnlyFolderContents } =
    useContext(FolderContext);
  const folderItems = useSelector((state) => state.folderItems);

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

  useEffect(() => {
    contentsNum !== 20 && setContentsNum(20);
  }, [filterdItems, isOnlyFolderContents]);

  return (
    <>
      {keyword.length === 0 &&
        !isOnlyFolderContents &&
        realTotalUrls.slice(0, contentsNum).map((url, index) => {
          if (index === contentsNum - 1) {
            return (
              <TargetEl ref={setTarget} key="thisIsTarget">
                🙂🙂로딩중입니다🙂🙂
              </TargetEl>
            );
          }
          return (
            <ItemUrlContainer
              key={url._id}
              value={url}
              handleClickUrl={handleClickUrl}
              handleUnClickUrl={handleUnClickUrl}
              items={folderItems.items}
            />
          );
        })}

      {keyword.length === 0 &&
        isOnlyFolderContents &&
        FolderContents.map((url, index) => {
          return (
            <ItemUrlContainer
              key={url._id}
              value={url}
              handleClickUrl={handleClickUrl}
              handleUnClickUrl={handleUnClickUrl}
              items={folderItems.items}
            />
          );
        })}

      {keyword.length > 0 &&
        filterdItems.map((url, index) => {
          return (
            <ItemUrlContainer
              key={url._id}
              value={url}
              handleClickUrl={handleClickUrl}
              handleUnClickUrl={handleUnClickUrl}
              items={folderItems.items}
            />
          );
        })}

      {keyword.length > 0 && filterdItems.length === 0 && !isSearching && (
        <SearchMessage message="검색결과가 존재하지 않습니다..." />
      )}

      {keyword.length > 0 && filterdItems.length === 0 && isSearching && (
        <LoadingImg />
      )}
    </>
  );
};

const SearchMessageEl = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
`;

const SearchMessage = ({ message }) => {
  return <SearchMessageEl>{message}</SearchMessageEl>;
};

export default FolderContainer;
