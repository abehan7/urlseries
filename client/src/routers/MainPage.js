import React, { createContext, useEffect, useState } from "react";
import "./MainPage.css";

// Functions
import { getTotalTags } from "../components/getTags";
import { clickOutSide } from "../functions/keepModalsShow";
// Rectangles
import TotalUrlMap from "../components/Rectangles/TotalUrlMap";
import FiveUrlsRight from "../components/Rectangles/FiveUrlsRight";
import FiveUrlsLeft from "../components/Rectangles/FiveUrlsLeft";
import UrlsByHashTag from "../components/Rectangles/UrlsByHashTag";
// Modals
import AddUrlModal from "../components/Modals/AddUrlModal";
import EditUrlModal from "../components/Modals/EditUrlModal";
import ShareUrlModal from "../components/Modals/ShareUrlModal";
import TopMore from "../components/Modals/TopMore";
import HashTagModal from "../components/Modals/hashtags/HashTagModal";
// TopIcons
import LeftIcons from "../components/TopIcons/LeftIcons";
import RightIcons from "../components/TopIcons/RightIcons";
// AsideTags
import AsideTag from "../components/AsideTags/AsideTag";
import GridHeader from "../components/GridHeader";
// SearchArea
import SearchBox from "../components/searchBar/SearchBox";
import Loader from "../components/searchBar/Loader";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Page3Actions } from "../store/reducers/editModalP3";
// API
import { GetTotalUrls, Get21Urls, TotalAfter } from "../components/Api";
import styled from "styled-components";
import { UrlDetailActions } from "../store/reducers/ClickedUrlDetails";

export const MainStates = createContext(null);

const MainEl = styled.div`
  transition: 400ms;
  background-color: ${(props) => (props.isDarkMode ? "#02064a" : "")};
  color: ${(props) => (props.isDarkMode ? "#fff" : "")};

  .RectColor {
    background-color: ${(props) => (props.isDarkMode ? "#130630" : "")};
    box-shadow: ${(props) =>
      props.isDarkMode ? " rgba(255, 255, 255, 0.7) 0px 1px 4px" : ""};
  }

  .Search-balloon,
  .modal-window {
    color: ${(props) => (props.isDarkMode ? "#fff" : "")};
    background-color: ${(props) => (props.isDarkMode ? "#130630" : "")};
    box-shadow: ${(props) =>
      props.isDarkMode ? "rgba(255, 255, 255, 0.7) 0px 1px 4px" : ""};
  }

  .url {
    color: ${(props) => (props.isDarkMode ? "#fff" : "")};
  }

  .text-three-container .T-url {
    border: ${(props) => (props.isDarkMode ? "0" : "")};
    box-shadow: ${(props) =>
      props.isDarkMode ? " rgba(255, 255, 255, 0.7) 0px 1px 4px" : ""};
  }
`;

const MainPage = () => {
  const [BoxTags, setBoxTags] = useState([]); // 오른쪽에 있는 색깔있는 해쉬태그 버튼이 클릭되면 리스트로 들어가는 공간

  const [BoxTags_First, setBoxTags_First] = useState(true);
  const [clickedSearchInput, setClickedSearchInput] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [shareMode, setShareMode] = useState(true);
  const [getUrls, setGetUrls] = useState([]);
  const [mostClickedUrls, setMostClickedUrls] = useState([]);
  const [likedUrls, setLikedUrls] = useState([]);
  const [myFav, setMyFav] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [target, setTarget] = useState(null);
  const [assignedTags, setAssignedTags] = useState([]);
  const [recentSearched, setRecentSearch] = useState([]);
  const [totalTags, setTotalTags] = useState([]);
  const [realTotalUrls, setRealTotalUrls] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [topMoreWhat, setTopMoreWhat] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState(false);

  // FIXME: 리덕스

  const dispatch = useDispatch();

  const setFolderItemRedux = () => {
    dispatch(Page3Actions.GetFolderItems());
  };

  // url 클릭하면 그 디테일들 리덕스에 저장하는 기능
  const setUrlDetail = (detail) => {
    dispatch(UrlDetailActions.SetClickedUrl(detail));
  };

  useEffect(() => {
    setFolderItemRedux();
  }, []);

  // FIXME: 맨 처음 데이터 가져오기
  useEffect(() => {
    // HashTagsUnique기능 : url들에 hashTag들이 있는데 중복되는 해쉬태그들도 있으니까
    // 중복 없는 상태로 전체 해쉬태그들 뽑아주는 기능
    // 그렇게 중복 없이 뽑았으면 그 값을 SethashList를 통해서 hashList에 넣어줌
    GetTotalUrls().then(async (response) => {
      console.log(response);
      await setGetUrls(response.data.totalURL);
      await setMostClickedUrls(response.data.rightURL);
      await setLikedUrls(response.data.leftURL);
      await setRecentSearch(response.data.recentSearched);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    let preTags = [];
    TotalAfter().then((response) => {
      const {
        data: { totalAfter, initAssigned },
      } = response;
      setRealTotalUrls(totalAfter);

      // 전체 태그들 뽑는 기능
      setTotalTags(getTotalTags(totalAfter, initAssigned));

      // 선택한 태그들 json으로 만들기 // 근데 만들 필요가 있냐? 아니 굳이 그러지 않아도 될거같아

      initAssigned.forEach((tag) => {
        preTags.push({ name: tag, assigned: 1, origin: 1 });
      });

      setAssignedTags([...preTags]);
    });
  }, []);

  const {
    page3Storage: { nowFolder2, nowPage2, folderItems },
  } = useSelector((state) => state);

  useEffect(() => {
    setTotalTags(
      totalTags.map((val) => {
        nowFolder2?.folder_contents?.includes(val.name) //여기 표현식 써야할 듯
          ? (val.folderAssigned = 1)
          : (val.folderAssigned = 0);
        val.folderAssigned === 1 && console.log(val);
        return val;
      })
    );
  }, [nowPage2]);

  // totalurl 변하면 전체 tag 뽑은 다음에 users에 있는 totaltags수정하기 axios해서
  // FIXME: 문제의 원인이 여기였어
  //        이거 바꾸기 또 귀찮으니까 아니 이거를 수정 해볼려면 해보던지 아니면 useState하나 더 만들던지 알아서\
  //        애초에 useMemo쓸게 아니라 useEffect안에 넣는게 옳은 방향일 수도
  // useMemo(() => {
  //   setTotalTags(getTotalTags(realTotalUrls));
  // }, [realTotalUrls]);

  // ============================================= 여기는 Ininity Scroll START =============================================

  var realLastId = 0;
  var responseListLength = 1;
  const getNextItems = async () => {
    console.log("현재 스크롤");
    if (realLastId === 0) {
      realLastId = getUrls[getUrls.length - 1].url_id;
    }

    console.log(getUrls[getUrls.length - 1].url_id);

    setIsLoaded(true);

    await Get21Urls(realLastId).then(async (response) => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      responseListLength = response.data.length;
      if (responseListLength === 0) {
        return;
      }

      setGetUrls((val) => [...val, ...response.data]);
      realLastId = response.data[response.data.length - 1].url_id;
    });

    setIsLoaded(false);
    console.log(getUrls[getUrls.length - 1].url_id);
    console.log("무한스크롤입니다");
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      console.log(responseListLength);
      if (responseListLength === 0) {
        return;
      }
      await getNextItems();

      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    console.log(target);
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.2,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  // ============================================= Ininity Scroll END =============================================

  const createModal2 = () => {
    if (!clickedSearchInput) {
      document.querySelector(".Search-balloon").style.display = "flex";
      document.querySelector(".Search-balloon").style.opacity = "1";
      document.querySelector(".Search-balloon").style.transform =
        "translateY(0)";
      document.querySelector(".search-box > svg").style.display = "none";

      setClickedSearchInput(!clickedSearchInput); // 이제 true
      console.log(clickedSearchInput);
    }
  };

  // StopDrag();

  // editmode일 때 스타일 사각형에 색깔 변하게하기
  const bcTopRect = "#FFE4C4";
  const emptyStyle = {};
  const MkColorTopRect = {
    backgroundColor: bcTopRect,
  };

  // FIXME: useContext
  const InitialContents = {
    likedUrls,
    setLikedUrls,
    mostClickedUrls,
    setMostClickedUrls,
    realTotalUrls,
    setRealTotalUrls,
    setUrlDetail,
  };

  return (
    <>
      <MainStates.Provider value={InitialContents}>
        {/* <MainStates.Provider value={{ isDarkMode, setIsDarkMode }}> */}
        {/* {getUrls.length === 0 ? (
          <div className="firstLoading">yourURL</div>
        ) : ( */}
        <>
          <MainEl
            editMode={editMode}
            isDarkMode={isDarkMode}
            className="MainPage"
            onMouseDown={(e) =>
              clickOutSide(e, clickedSearchInput, setClickedSearchInput)
            }
          >
            {/* ======================================== 그리드 컨테이너  START  ========================================*/}
            {/* 그리드 컨테이너 설명 : 검색창 + 공유 수정 + 내가 지정한 URL + 자주 이용하는 URL  + 전체 URL 박스  5개 있는 곳 */}
            <div className="grid-container">
              <SearchBox
                createModal2={createModal2}
                recentSearched={recentSearched}
                setRecentSearch={setRecentSearch}
                realTotalUrls={realTotalUrls}
              />

              <div className="share-write">
                {/* Link to="/search" : 클릭히면 /search 이 쪽 페이지로 넘어가게 해주는 기능  */}
                <LeftIcons
                  editMode={editMode}
                  deleteMode={deleteMode}
                  setDeleteMode={setDeleteMode}
                  getUrls={getUrls}
                  setGetUrls={setGetUrls}
                  realTotalUrls={realTotalUrls}
                  setRealTotalUrls={setRealTotalUrls}
                  BoxTags_First={BoxTags_First}
                />
                <RightIcons
                  editMode={editMode}
                  shareMode={shareMode}
                  BoxTags_First={BoxTags_First}
                  setBoxTags_First={setBoxTags_First}
                  setBoxTags={setBoxTags}
                  setEditMode={setEditMode}
                  setDeleteMode={setDeleteMode}
                  deleteMode={deleteMode}
                />
              </div>
              {BoxTags_First ? (
                <>
                  <div
                    className="Rectangle left-top RectColor"
                    style={
                      BoxTags_First && !editMode ? MkColorTopRect : emptyStyle
                    }
                  >
                    <h3
                      onClick={() => {
                        setIsDarkMode(!isDarkMode);
                      }}
                    >
                      즐겨찾기{" "}
                    </h3>
                    <div
                      className="text-container"
                      style={
                        !editMode
                          ? { maxHeight: "205px", overflow: "auto" }
                          : {}
                      }
                    >
                      <FiveUrlsLeft
                        values={likedUrls}
                        editMode={editMode}
                        setMyFav={setMyFav}
                        setTopMoreWhat={setTopMoreWhat}
                      />
                    </div>
                  </div>
                  <div
                    className="Rectangle right-top RectColor"
                    style={
                      BoxTags_First && !editMode ? MkColorTopRect : emptyStyle
                    }
                  >
                    <h3>최근기록</h3>
                    <div
                      className="text-container"
                      style={
                        !editMode
                          ? { maxHeight: "205px", overflow: "auto" }
                          : {}
                      }
                    >
                      <FiveUrlsRight
                        values={mostClickedUrls}
                        editMode={editMode}
                        shareMode={shareMode}
                        setMyFav={setMyFav}
                        setTopMoreWhat={setTopMoreWhat}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {/* minisize-tags 는 반응형으로 사이즈 줄이면 태그 나타나는 공간 */}
              <div className="minisize-tags aside-tags">
                {/* map함수 : 해쉬태그 전체 뿌려주는 기능 jsp에서 for문 돌려주는 느낌 */}
                <AsideTag
                  editMode={editMode}
                  BoxTags_First={BoxTags_First}
                  setBoxTags_First={setBoxTags_First}
                  BoxTags={BoxTags}
                  setBoxTags={setBoxTags}
                  assignedTags={assignedTags}
                />
              </div>
              <div
                className="Big_Rect RectColor"
                style={!editMode ? MkColorTopRect : emptyStyle}
              >
                {/* BoxTags_First : 색깔있는 오른쪽 해쉬태그 박스 클릭 했는지 안했는지 알려주는 변수 */}
                {/* 값은 true false 이렇게 두가지인데  */}
                {/* 맨 처음에 한번 클릭하면 전체 오퍼시티 0.6으로 만들어주고   */}
                {/* 전체 URL이라는 h3가 HashTag라고 바뀜  */}
                {/* <h3>전체 URL</h3> : <h3>HashTag</h3> 여기서 true면 왼쪽 false면 오른쪽  */}
                {editMode ? (
                  BoxTags_First ? (
                    <GridHeader />
                  ) : (
                    <h3>HashTag</h3>
                  )
                ) : BoxTags_First ? (
                  <h3>에디터모드입니다</h3>
                ) : (
                  <h3>HashTag</h3>
                )}
                <div className="text-three-container">
                  {BoxTags_First ? (
                    // 전체 url을 map함수로 뿌려주는 component(이 부분을 따로 분리해서 component에 넣음. 안그러면 코드가 너무 길어져서. 모듈같은 느낌)
                    <>
                      <TotalUrlMap
                        getUrls={getUrls}
                        setGetUrls={setGetUrls}
                        editMode={editMode}
                        shareMode={shareMode}
                        setMyFav={setMyFav}
                        deleteMode={deleteMode}
                      />
                      {realTotalUrls.length > 42 && (
                        <div ref={setTarget} className="Target-Element">
                          {isLoaded && <Loader />}
                        </div>
                      )}
                    </>
                  ) : (
                    // 여기는 선택된 색깔있는 해쉬태그들 (BoxTags)을 포함하는 url들만 선별해서 뿌려주는 컴포넌트
                    <UrlsByHashTag
                      realTotalUrls={realTotalUrls}
                      setRealTotalUrls={setRealTotalUrls}
                      BoxTags={BoxTags}
                      editMode={editMode}
                      deleteMode={deleteMode}
                      setMyFav={setMyFav}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* ======================================== 그리드 컨테이너  END  ========================================*/}
            {/* ======================================== 날개 START ========================================*/}
            {/* aside설명 : 여기는 오른쪽 색깔있는 해쉬태그 버튼들 공간 */}
            {(folderItems?.length !== 0 || assignedTags?.length !== 0) && (
              <div className="aside">
                <div className="for-filling"></div>
                <div className="aside-tags">
                  {/* 전체 url들의 해쉬태그들 뿌려주는 공간*/}
                  <AsideTag
                    editMode={editMode}
                    BoxTags_First={BoxTags_First}
                    setBoxTags_First={setBoxTags_First}
                    BoxTags={BoxTags}
                    setBoxTags={setBoxTags}
                    assignedTags={assignedTags}
                  />
                </div>
              </div>
            )}

            {/* ======================================== 날개 END ======================================== */}
            {/* ======================================== 모달들 START ======================================== */}
            <div className="addUrl-container">
              <AddUrlModal getUrls={getUrls} setGetUrls={setGetUrls} />
            </div>
            <div className="editUrl-container">
              <EditUrlModal
                myFav={myFav}
                setMyFav={setMyFav}
                getUrls={getUrls}
                setGetUrls={setGetUrls}
                likedUrls={likedUrls}
                setLikedUrls={setLikedUrls}
                mostClickedUrls={mostClickedUrls}
                setMostClickedUrls={setMostClickedUrls}
                realTotalUrls={realTotalUrls}
                setRealTotalUrls={setRealTotalUrls}
              />
            </div>
            <div className="shareUrl-container">
              <ShareUrlModal
              // totalTags={totalTags}
              // setTotalTags={setTotalTags}
              // realTotalUrls={realTotalUrls}
              />
            </div>
            <div className="top-moreUrls-container">
              <TopMore
                likedUrls={likedUrls}
                mostClickedUrls={mostClickedUrls}
                topMoreWhat={topMoreWhat}
                setTopMoreWhat={setTopMoreWhat}
              />
            </div>
            <div className="hashtagModal-container">
              <HashTagModal
                assignedTags={assignedTags}
                setAssignedTags={setAssignedTags}
                totalTags={totalTags}
                setTotalTags={setTotalTags}
              />
            </div>
            {/* ======================================== 모달들 END ======================================== */}
          </MainEl>
        </>
        {/* )} */}
      </MainStates.Provider>
    </>
  );
};

export default MainPage;

// 여기는 생성하는 코드
// 이거 쓰지 말고 flex랑 none으로 하는게 좀 더 안정정이다
// 이 코드는 우선 남겨놓기 다른 곳에 사용될 수 있으니까
// const createModal = () => {
//   if (!clickedSearchInput) {
//     const newDiv = document.createElement("div");
//     newDiv.className = "Search-balloon";
//     document.querySelector(".search-box > svg").style.display = "none";

//     document.querySelector(".search-box").appendChild(newDiv);
//     setClickedSearchInput(!clickedSearchInput); // 이제 true
//   }
// };

// 드래그 방지
// window.document.onmousemove = (e) => {
//   if (e.target !== document.querySelector(".Big_Rect")) {
//     const circle = document.querySelector(".detail-container");
//     circle.style.display = "none";
//   }
// };

// [3]
// document.querySelector(".search-box input").onselectstart = () => {
//   return true;
// };
// document.querySelector(".search-box input").oncontextmenu = () => {
//   return true;
// };
