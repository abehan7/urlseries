import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import urls from "../urls.json";
import { FaSearch } from "react-icons/fa";
import { BiPaperPlane } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import TotalUrlMap from "../components/TotalUrlMap";
import FiveUrls from "../components/FiveUrls";
import HashTagsUnique from "../components/HashTagsUnique";
import BoxTagControler from "../components/BoxTagControler";
import UrlsByHashTag from "../components/UrlsByHashTag";
import SearchDelay from "../components/SearchDelay";

const MainPage = () => {
  const [BoxTags, setBoxTags] = useState([]); // 오른쪽에 있는 색깔있는 해쉬태그 버튼이 클릭되면 리스트로 들어가는 공간

  const [BoxTags_First, setBoxTags_First] = useState(true);
  const [hashList, setHashList] = useState([]); // 현재 전체 url의 해쉬태그들
  const [clickedSearchInput, setClickedSearchInput] = useState(false);

  // 위에 useState 헷갈릴 경우 아래 콘솔로 테스트
  // console.log("BoxTags : ", BoxTags); // 오른쪽에 있는 색깔있는 해쉬태그 버튼이 클릭되면 리스트로 들어가는 공간
  // console.log("hashList : ", hashList); // 현재 전체 url의 해쉬태그들
  // console.log("totalUrls : ", totalUrls); // 전체 url들

  // 검색창 외에 바깥부분 클릭하면 모달 사라지는 onClick이벤트
  const clickOutSide = (e) => {
    var target = e.target;

    if (
      target === document.querySelector(".search-box").firstChild ||
      target === document.querySelector(".Search-balloon") ||
      target === document.querySelector(".Search-balloon-title")
    ) {
      return;
    }

    // =============== 모달 안에 검색어 클릭해도 모달 안사라지게 하는기능 start ===============
    var oneSearchedStuff;
    document.querySelectorAll(".searched-Stuff").forEach((val) => {
      if (target === val) {
        return (oneSearchedStuff = true);
      }
    });

    document.querySelectorAll(".Searched-url-Title").forEach((val) => {
      if (target === val) {
        return (oneSearchedStuff = true);
      }
    });

    if (oneSearchedStuff) {
      return;
    }
    // =============== 모달 안에 검색어 클릭해도 모달 안사라지게 하는 기능 end ===============

    // document.querySelectorAll(".searched-Stuffs").forEach((stuff) => {
    //   if (target === stuff) {
    //     return;
    //   }
    // });
    // console.log(target);

    document.querySelector(".search-box > svg").style.display = "block";

    if (clickedSearchInput) {
      document.querySelector(".Search-balloon").style.opacity = "0";
      // 위로 -10픽셀만큼 서서히 올라가는거
      document.querySelector(".Search-balloon").style.transform =
        "translateY(-20px)";

      setTimeout(() => {
        document.querySelector(".Search-balloon").style.display = "none";
        setClickedSearchInput(!clickedSearchInput);
        // console.log(clickedSearchInput);
      }, 100);
    }
  };

  // 여기는 생성하는 코드
  // 이거 쓰지 말고 flex랑 none으로 하는게 좀 더 안정정이다
  // 이 코드는 우선 남겨놓기 다른 곳에 사용될 수 있으니까
  const createModal = () => {
    if (!clickedSearchInput) {
      const newDiv = document.createElement("div");
      newDiv.className = "Search-balloon";
      document.querySelector(".search-box > svg").style.display = "none";

      document.querySelector(".search-box").appendChild(newDiv);
      setClickedSearchInput(!clickedSearchInput); // 이제 true
    }
  };

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
  //url.json파일에 있는 값들 불러온 값
  const values = urls.urls;

  // 드래그 방지
  window.document.onselectstart = (e) => {
    if (e.target !== document.querySelector(".search-box input")) {
      return false;
    }
  };

  // 우클릭 방지
  window.document.oncontextmenu = (e) => {
    if (e.target !== document.querySelector(".search-box input")) {
      return false;
    }
  };

  // document.querySelector(".search-box input").onselectstart = () => {
  //   return true;
  // };
  // document.querySelector(".search-box input").oncontextmenu = () => {
  //   return true;
  // };
  // 최초에 접속하면 여기 useEffect안에 있는 것들 실행시킴
  useEffect(() => {
    // HashTagsUnique기능 : url들에 hashTag들이 있는데 중복되는 해쉬태그들도 있으니까
    // 중복 없는 상태로 전체 해쉬태그들 뽑아주는 기능
    // 그렇게 중복 없이 뽑았으면 그 값을 SethashList를 통해서 hashList에 넣어줌
    setHashList(HashTagsUnique(values));
  }, []);

  return (
    <div className="MainPage" onMouseDown={clickOutSide}>
      {/* ======================================== 그리드 컨테이너  START  ========================================*/}
      {/* 그리드 컨테이너 설명 : 검색창 + 공유 수정 + 내가 지정한 URL + 자주 이용하는 URL  + 전체 URL 박스  5개 있는 곳 */}
      <div className="grid-container">
        <div className="search-box">
          <SearchDelay createModal2={createModal2} />
          <FaSearch />

          <div className="Search-balloon">
            <div className="Search-balloon-title">최근 검색 항목</div>
            <div className="Searched-Stuffs-Container"></div>
          </div>
        </div>
        <div className="share-write">
          {/* Link to="/search" : 클릭히면 /search 이 쪽 페이지로 넘어가게 해주는 기능  */}
          <Link to="/search">
            <BiPaperPlane />
          </Link>
          <FiPlusSquare />
        </div>
        {BoxTags_First ? (
          <>
            <div className="Rectangle left-top">
              <h3>내가 지정한 URL </h3>
              <div className="text-container">
                <FiveUrls values={values} num1={0} num2={5} />
              </div>
            </div>
            <div className="Rectangle right-top">
              <h3>자주 이용하는 URL</h3>
              <div className="text-container">
                <FiveUrls values={values} num1={5} num2={10} />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* minisize-tags 는 반응형으로 사이즈 줄이면 태그 나타나는 공간 */}
        <div className="minisize-tags aside-tags">
          {/* map함수 : 해쉬태그 전체 뿌려주는 기능 jsp에서 for문 돌려주는 느낌 */}
          {hashList.map((tag) => {
            return (
              <span
                className="tag"
                onClick={(e) => {
                  BoxTagControler(e, {
                    BoxTags_First,
                    setBoxTags_First,
                    BoxTags,
                    setBoxTags,
                  });
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <div className="Big_Rect">
          {/* BoxTags_First : 색깔있는 오른쪽 해쉬태그 박스 클릭 했는지 안했는지 알려주는 변수 */}
          {/* 값은 true false 이렇게 두가지인데  */}
          {/* 맨 처음에 한번 클릭하면 전체 오퍼시티 0.6으로 만들어주고   */}
          {/* 전체 URL이라는 h3가 HashTag라고 바뀜  */}
          {/* <h3>전체 URL</h3> : <h3>HashTag</h3> 여기서 true면 왼쪽 false면 오른쪽  */}
          {BoxTags_First ? <h3>전체 URL</h3> : <h3>HashTag</h3>}
          <div className="text-three-container">
            {BoxTags_First ? (
              // 전체 url을 map함수로 뿌려주는 component(이 부분을 따로 분리해서 component에 넣음. 안그러면 코드가 너무 길어져서. 모듈같은 느낌)
              <TotalUrlMap values={values} />
            ) : (
              // 여기는 선택된 색깔있는 해쉬태그들 (BoxTags)을 포함하는 url들만 선별해서 뿌려주는 컴포넌트
              <UrlsByHashTag values={values} BoxTags={BoxTags} />
            )}
          </div>
        </div>
      </div>
      {/* ======================================== 그리드 컨테이너  END  ========================================*/}
      {/* ======================================== 날개 START ========================================*/}{" "}
      {/* aside설명 : 여기는 오른쪽 색깔있는 해쉬태그 버튼들 공간 */}
      <div className="aside">
        <div className="aside-tags">
          {/* 전체 url들의 해쉬태그들 뿌려주는 공간*/}
          {hashList.map((tag) => {
            return (
              <span
                className="tag"
                onClick={(e) => {
                  BoxTagControler(e, {
                    BoxTags_First,
                    setBoxTags_First,
                    BoxTags,
                    setBoxTags,
                  });
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
        {/* <div className="aside-details"></div> */}
      </div>
      {/* ======================================== 날개 END ======================================== */}
    </div>
  );
};

export default MainPage;
