import React, { createContext, useCallback, useEffect, useState } from "react";
import "./MainPage.css";
import loadable from "@loadable/component";
// Functions
import { getTotalTags } from "../components/getTags";
import { clickOutSide } from "../Hooks/keepModalsShow";

// Header
import Header from "../components/Header/Header";
// Rectangles
import TotalUrlMap from "../components/Rectangles/TotalUrlMap";
import FiveUrlsRight from "../components/Rectangles/FiveUrlsRight";
import FiveUrlsLeft from "../components/Rectangles/FiveUrlsLeft";
import UrlsByHashTag from "../components/Rectangles/UrlsByHashTag";
// Modals
// TopIcons
import LeftIcons from "../components/TopIcons/LeftIcons";
import RightIcons from "../components/TopIcons/RightIcons";
// AsideTags
import AsideTag from "../components/AsideTags/AsideTag";
import GridHeader from "../components/GridHeader";
// SearchArea
import Loader from "../components/SearchBar/Loader";

// REDUX
import { useDispatch, useSelector } from "react-redux";
// API
import {
  deleteUrls,
  getGuestUrls,
  GetTotalUrls,
  TotalAfter,
  updateFolderContents,
} from "../components/Api";
import styled from "styled-components";
import { UrlDetailActions } from "../store/reducers/ClickedUrlDetails";
// import ModalHashtag from "../components/ModalHashtag/ModalHashtag";
// import FolderModalWindow from "../components/ModalFolderPage/FolderModalWindow";
import {
  getFolders,
  SET_FOLDERS,
  SET_FOLDER_CONTENTS,
} from "../store/reducers/Folders";
import { getIsClicked } from "../store/reducers/Tags";
import { getToken } from "../redux/ReducersT/tokenReducer";
import { getTagFilterdItems } from "../store/reducers/urls";
// loadable components

const AddUrlModal = loadable(() => import("../components/Modals/AddUrlModal"));
const EditUrlModal = loadable(() =>
  import("../components/Modals/EditUrlModal")
);
const TopMore = loadable(() => import("../components/Modals/TopMore"));
const FolderModalWindow = loadable(() =>
  import("../components/ModalFolderPage/FolderModalWindow")
);
const ModalHashtag = loadable(() =>
  import("../components/ModalHashtag/ModalHashtag")
);

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

const TitleEl = styled.h3``;

const TitleWrapper = styled.div`
  padding: 10px 0;
`;

const MainPage = () => {
  // const [BoxTags, setBoxTags] = useState([]); // 오른쪽에 있는 색깔있는 해쉬태그 버튼이 클릭되면 리스트로 들어가는 공간

  // const [BoxTags_First, setBoxTags_First] = useState(true);
  const [clickedSearchInput, setClickedSearchInput] = useState(false);
  const [editMode, setEditMode] = useState(true);
  // const [shareMode, setShareMode] = useState(true);
  const [getUrls, setGetUrls] = useState([]);
  const [mostClickedUrls, setMostClickedUrls] = useState([]);
  const [likedUrls, setLikedUrls] = useState([]);
  const [myFav, setMyFav] = useState(false);
  const [assignedTags, setAssignedTags] = useState([]);
  const [recentSearched, setRecentSearch] = useState([]);
  const [totalTags, setTotalTags] = useState([]);
  const [realTotalUrls, setRealTotalUrls] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [topMoreWhat, setTopMoreWhat] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
  const token = useSelector(getToken);

  // FIXME: 맨 처음 데이터 가져오기

  useEffect(() => {
    tagIsClicked && setItemNum(40);
  }, [tagIsClicked]);

  useEffect(() => {
    const getMemberData = async () => {
      GetTotalUrls().then(async (res) => {
        // console.log(res);
        await setGetUrls(res.data.totalURL);
        await setMostClickedUrls(res.data.rightURL);
        await setLikedUrls(res.data.leftURL);
        await setRecentSearch(res.data.recentSearched);
        // console.log(response.data);
      });
      dispatch(SET_FOLDERS());
    };
    const getGuestData = async () => {
      const { data } = await getGuestUrls();
      setGetUrls(data.totalUrl);
      setMostClickedUrls(data.leftUrl);
      setLikedUrls(data.rightUrl);
      setRecentSearch(data?.recentSearchedUrl);
    };

    token && getMemberData();
    !token && getGuestData();
  }, [token]);

  useEffect(() => {
    // 이거 로직 바꿔야돼
    if (token) {
      let preTags = [];
      TotalAfter().then(async (response) => {
        const {
          data: { totalAfter, hashtag_assigned },
        } = response;

        await setRealTotalUrls(totalAfter);
        // 전체 태그들 뽑는 기능
        await setTotalTags(getTotalTags(totalAfter, hashtag_assigned));
        // 선택한 태그들 json으로 만들기 // 근데 만들 필요가 있냐? 아니 굳이 그러지 않아도 될거같아

        const tags = hashtag_assigned.map((tag) => {
          return { name: tag, assigned: 1, origin: 1 };
        });

        await setAssignedTags([...tags]);
      });
    }
  }, [token]);

  // FIXME: 삭제하기 LeftIcons에서 사용할 예정

  const getEmpty = useCallback(
    (urls, setUrls) => {
      const filterd = urls.filter((url) => {
        return !tagFilterdItems.includes(url._id);
      });
      setUrls(filterd);
    },
    [tagFilterdItems]
  );

  const getEmptyFolderUrls = async () => {
    // console.log(folders);
    folders.forEach(async (folder) => {
      const filterd = folder.folder_contents.filter((url) => {
        return !tagFilterdItems.includes(url._id);
      });
      // console.log(filterd);
      dispatch(SET_FOLDER_CONTENTS({ folderId: folder._id, urls: filterd }));
      await updateFolderContents(folder._id, filterd);
    });
  };

  const handleGetEmptyUrls = async () => {
    getEmpty(getUrls, setGetUrls);
    getEmpty(realTotalUrls, setRealTotalUrls);
    getEmpty(likedUrls, setLikedUrls);
    getEmpty(mostClickedUrls, setMostClickedUrls);
    getEmpty(recentSearched, setRecentSearch);
    await getEmptyFolderUrls();
    // 폴더 안에 있는 것들도 업데이트 해줘야 함
    await deleteUrls(tagFilterdItems);

    // 폴더 비우기
  };

  // FIXME:  Ininity Scroll
  const getNextItems = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1));
    setItemNum(itemNum + 100);
    setIsLoaded(false);
  };

  useEffect(() => {
    const data = realTotalUrls.slice(0, itemNum);
    setGetUrls(data);
  }, [itemNum]);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);

      if (realTotalUrls.length === getUrls.length) {
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
  }, [target, getUrls]);

  // FIXME: 모달

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

  // FIXME: styles

  // editmode일 때 스타일 사각형에 색깔 변하게하기
  const bcTopRect = "#E0E8E7";
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
    editMode,
    deleteMode,
    setGetUrls,
    getUrls,
    handleGetEmptyUrls,
  };

  return (
    <>
      <MainStates.Provider value={InitialContents}>
        <MainEl
          editMode={editMode}
          isDarkMode={isDarkMode}
          className="MainPage"
          onMouseDown={(e) => {
            clickOutSide(e, clickedSearchInput, setClickedSearchInput);
          }}
        >
          {/* ======================================== 그리드 컨테이너  START  ========================================*/}
          {/* 그리드 컨테이너 설명 : 검색창 + 공유 수정 + 내가 지정한 URL + 자주 이용하는 URL  + 전체 URL 박스  5개 있는 곳 */}
          <div className="grid-container">
            {/* <HeaderNavWrapper /> */}

            <Header
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
              />
              <RightIcons
                editMode={editMode}
                setEditMode={setEditMode}
                setDeleteMode={setDeleteMode}
                deleteMode={deleteMode}
              />
            </div>
            {!tagIsClicked && (
              <>
                <div
                  className="Rectangle left-top RectColor"
                  style={
                    !tagIsClicked && !editMode ? MkColorTopRect : emptyStyle
                  }
                >
                  <h3
                    onClick={() => {
                      setIsDarkMode(!isDarkMode);
                    }}
                  >
                    즐겨찾기
                  </h3>
                  <div
                    className="text-container"
                    style={
                      !editMode ? { maxHeight: "205px", overflow: "auto" } : {}
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
                    !tagIsClicked && !editMode ? MkColorTopRect : emptyStyle
                  }
                >
                  <h3>최근기록</h3>
                  <div
                    className="text-container"
                    style={
                      !editMode ? { maxHeight: "205px", overflow: "auto" } : {}
                    }
                  >
                    <FiveUrlsRight
                      values={mostClickedUrls}
                      editMode={editMode}
                      setMyFav={setMyFav}
                      setTopMoreWhat={setTopMoreWhat}
                    />
                  </div>
                </div>
              </>
            )}

            {/* minisize-tags 는 반응형으로 사이즈 줄이면 태그 나타나는 공간 */}
            <div className="minisize-tags aside-tags">
              {/* map함수 : 해쉬태그 전체 뿌려주는 기능 jsp에서 for문 돌려주는 느낌 */}
              <AsideTag assignedTags={assignedTags} />
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
              <CardHeader tagIsClicked={tagIsClicked} editMode={editMode} />
              <div className="text-three-container">
                {!tagIsClicked && (
                  // 전체 url을 map함수로 뿌려주는 component(이 부분을 따로 분리해서 component에 넣음. 안그러면 코드가 너무 길어져서. 모듈같은 느낌)
                  <>
                    <TotalUrlMap
                      getUrls={getUrls}
                      setGetUrls={setGetUrls}
                      editMode={editMode}
                      setMyFav={setMyFav}
                      deleteMode={deleteMode}
                    />
                    {realTotalUrls.length > 40 && (
                      <div ref={setTarget} className="Target-Element">
                        {isLoaded && <Loader />}
                      </div>
                    )}
                  </>
                )}

                {tagIsClicked && (
                  // 여기는 선택된 색깔있는 해쉬태그들 (BoxTags)을 포함하는 url들만 선별해서 뿌려주는 컴포넌트
                  <UrlsByHashTag
                    realTotalUrls={realTotalUrls}
                    setMyFav={setMyFav}
                  />
                )}
              </div>
            </div>
          </div>
          {/* ======================================== 그리드 컨테이너  END  ========================================*/}
          {/* ======================================== 날개 START ========================================*/}
          {/* aside설명 : 여기는 오른쪽 색깔있는 해쉬태그 버튼들 공간 */}
          {assignedTags?.length !== 0 && (
            <div className="aside">
              <div className="for-filling"></div>
              <div className="aside-tags">
                {/* 전체 url들의 해쉬태그들 매핑하는 공간*/}
                <AsideTag assignedTags={assignedTags} />
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
          <div className="top-moreUrls-container">
            <TopMore
              likedUrls={likedUrls}
              mostClickedUrls={mostClickedUrls}
              topMoreWhat={topMoreWhat}
              setTopMoreWhat={setTopMoreWhat}
            />
          </div>
          <div className="hashtagModal-container">
            <ModalHashtag
              assignedTags={assignedTags}
              setAssignedTags={setAssignedTags}
              totalTags={totalTags}
              setTotalTags={setTotalTags}
            />
          </div>
          <div className="folderModal-container">
            <FolderModalWindow />
          </div>
          {/* ======================================== 모달들 END ======================================== */}
        </MainEl>
      </MainStates.Provider>
    </>
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

export default MainPage;
