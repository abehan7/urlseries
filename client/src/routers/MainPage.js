import React, { createContext, useEffect, useState } from "react";
import "./MainPage.css";

// Rectangles
import FiveUrlsRight from "../components/Rectangles/FiveUrlsRight";
import FiveUrlsLeft from "../components/Rectangles/FiveUrlsLeft";
// Modals
import GridHeader from "../components/GridHeader";
// SearchArea

// REDUX
import { useDispatch, useSelector } from "react-redux";
// API
import styled from "styled-components";
import { UrlDetailActions } from "../store/reducers/ClickedUrlDetails";
// import ModalHashtag from "../components/ModalHashtag/ModalHashtag";
// import FolderModalWindow from "../components/ModalFolderPage/FolderModalWindow";
import { getFolders } from "../store/reducers/Folders";
import { getIsClicked } from "../store/reducers/Tags";
import { getTagFilterdItems } from "../store/reducers/urls";
import { useUrl } from "../contexts/UrlContext";
import SideBar from "../components/SideBar/SideBar";
import UrlContainer from "../components/UrlContainer/UrlContainer";

export const MainStates = createContext(null);

const MainEl = styled.div`
  height: calc(100vh - 100px);
  display: flex;
`;

const TitleEl = styled.h3``;

const TitleWrapper = styled.div`
  padding: 10px 0;
`;

const MainWrapper = styled.div`
  height: calc(100vh - 100px);
  overflow-y: scroll;
`;

const MainPage = () => {
  const { hashtag } = useUrl();

  const { url } = useUrl();
  const totalUrls = useUrl().url.totalUrls;
  const displayUrls = useUrl().url.displayUrls;
  const handleGetInfiniteScrollItems = useUrl().handleGetInfiniteScrollItems;

  // 무한스크롤
  const [itemNum, setItemNum] = useState(40);
  const [isLoaded, setIsLoaded] = useState(false);
  const [target, setTarget] = useState(null);

  const dispatch = useDispatch();
  const tagFilterdItems = useSelector(getTagFilterdItems);
  // url 클릭하면 그 디테일들 리덕스에 저장하는 기능
  const setUrlDetail = (detail) => {
    dispatch(UrlDetailActions.SetClickedUrl(detail));
  };

  const tagIsClicked = useSelector(getIsClicked);
  const folders = useSelector(getFolders);
  // FIXME: 토큰 있으면 데이터 가져오기

  // FIXME: 맨 처음 데이터 가져오기

  useEffect(() => {
    tagIsClicked && setItemNum(40);
  }, [tagIsClicked]);

  // FIXME:  Ininity Scroll
  const getNextItems = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1));
    setItemNum(itemNum + 100);
    setIsLoaded(false);
  };

  useEffect(() => {
    const data = totalUrls.slice(0, itemNum);
    handleGetInfiniteScrollItems(data);
  }, [itemNum]);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);

      if (totalUrls.length === displayUrls.length) {
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
        threshold: 0.5,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <MainEl>
      {/* 사이드바 */}
      <SideBar />
      {/* 그리드 컨테이너 */}
      <UrlContainer />
      {/* 태그 */}
      {/* 모달 */}
    </MainEl>
  );
};

const CardHeader = ({ tagIsClicked, editMode }) => {
  return (
    <>
      {editMode && !tagIsClicked && <GridHeader />}
      {editMode && tagIsClicked && <Title>HashTag</Title>}
      {!editMode && !tagIsClicked && <Title>에디터모드입니다</Title>}
      {!editMode && tagIsClicked && <Title>HashTag</Title>}
    </>
  );
};

const Title = ({ children }) => {
  return (
    <TitleWrapper>
      <TitleEl>{children}</TitleEl>
    </TitleWrapper>
  );
};

const TopLeftBox = () => {
  return (
    <div className="Rectangle left-top RectColor">
      <h3>즐겨찾기</h3>
      <div className="text-container">
        <FiveUrlsLeft />
      </div>
    </div>
  );
};

const TopRightBox = () => {
  return (
    <div className="Rectangle right-top RectColor">
      <h3>최근기록</h3>
      <div className="text-container">
        <FiveUrlsRight />
      </div>
    </div>
  );
};

export default MainPage;
