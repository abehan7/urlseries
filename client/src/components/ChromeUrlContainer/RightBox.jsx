import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
// import { getgetChromeBookmark } from "../../IndexedDb";
import { useLocalStorage } from "../../LocalStorage";
import ItemContainer from "../UrlContainer/ItemContainer";
import Marker from "../UrlContainer/Marker";
import NoUrl from "../UrlContainer/NoUrl";
import { FlexContainer, RightBoxEl } from "../UrlContainer/RightBox";
import { Title } from "../UrlContainer/styled/Title.styled";
import { TitleWrapper } from "../UrlContainer/styled/TitleWrapper.styled";
import LoadingCenter from "../Utils/Loader/LoaderCenter";
import { GetScrollUpMarker } from "../Utils/Scroll/GetThrottled";

const RightBox = () => {
  // const [getChromeBookmark, setgetChromeBookmark] = useState([]);
  const { getChromeBookmark } = useLocalStorage();
  const [isScroll, setIsScroll] = useState(false);
  const scrollRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const { onScroll, handleScrollUp } = GetScrollUpMarker({
    setIsScroll,
    scrollRef,
  });

  // useEffect(() => getgetChromeBookmark(setgetChromeBookmark), []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  });

  const TotalUrlMap = () => (
    <ItemContainer urls={getChromeBookmark} urlType="chrome-extension" />
  );

  //검색창에 북마크 없을 때
  const TotalNoUrl = () => getChromeBookmark.length === 0 && <NoUrl />;

  return (
    <RightBoxEl>
      <TitleWrapper>
        <Title>크롬북마크</Title>
      </TitleWrapper>
      <FlexContainer onScroll={onScroll} ref={scrollRef}>
        {!loading && TotalUrlMap()}
        {/* 로딩창 */}
        {loading && <LoadingCenter />}
        {/* url없을 때  */}
        {!loading && TotalNoUrl()}
        <Marker isScroll={isScroll} onClick={handleScrollUp} />
      </FlexContainer>
    </RightBoxEl>
  );
};

export default RightBox;
