import React, { createContext, useEffect, useState } from "react";
import "./MainPage.css";

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
  position: inherit;
  z-index: 1;
  height: calc(100vh - 100px);
  display: flex;
  /* background: linear-gradient(blue, pink); */
  /* background-color: linear-gradient(#c282ff, pink); ; */
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

export default MainPage;
