import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import RecentSearched from "./RecentSearched";
import SearchedStuff from "./SearchedStuff";
import Axios from "axios";
import { debounce } from "lodash";
import LoadingImg from "./LoadingImg";
import styled from "styled-components";

// FIXME: db에서 검색하주는 기능 // 이건 안쓸거같은데 일단 남겨두긴 하자
const ApiGetSearchedList = async (e) => {
  if (e.target.value.length === 0) {
    return;
  }

  const typedKeyword = e.target.value.toLowerCase().replace(/(\s*)/g, "");

  let results;
  console.log(typedKeyword);

  await Axios.post("http://localhost:3001/search", {
    typedKeyword: typedKeyword,
  }).then((response) => {
    const { data } = response;
    console.log("액시오스");
    // console.log(response.data);
    results = data;
  });
  return results;
};

// FIXME: 디바운스 기능 //TODO:
const debounceSomethingFunc = debounce(
  (setResultList, Filterd, setSearchState) => {
    if (Filterd.length === 0) {
      // nothingFound: false,
      // searchDone: false,
      setSearchState({ searchDone: true, nothingFound: true });
    } else {
      setSearchState({ searchDone: true, nothingFound: false });
    }
    setResultList(Filterd);
  },
  300
);

// FIXME: 스타일드 컴포넌트
const NotSearched = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding-bottom: 20px;
`;

// FIXME: react컴포넌트 내부
const SearchBox = ({
  createModal2,
  recentSearched,
  setRecentSearch,
  realTotalUrls,
}) => {
  const [text2, setText2] = useState("");
  const [resultList, setResultList] = useState([]);
  // TODO:
  const [searchState, setSearchState] = useState({
    nothingFound: false,
    searchDone: true,
  });

  // FIXME: 키워드 정규화
  const KeywordNormalize = (keyword) => {
    const proccecced = keyword.toLowerCase().replace(/(\s*)/g, "");
    return proccecced;
  };

  // FIXME: DB없이 검색하기

  // 타이틀필터
  const TitleFilter = (url, PKeyword) => {
    return KeywordNormalize(url.url_title).includes(PKeyword);
  };

  // 해쉬태그
  const HashTagFilter = (url, PKeyword) => {
    return url.url_hashTags.some((tag) => {
      return KeywordNormalize(tag).includes(PKeyword);
    });
  };

  // 메모필터
  const MemoFilter = (url, PKeyword) => {
    return KeywordNormalize(url.url_memo).includes(PKeyword);
  };

  // 전체 필터링
  const SearchNotByDB = (PKeyword) => {
    const Filterd = realTotalUrls.filter((url) => {
      return (
        HashTagFilter(url, PKeyword) ||
        TitleFilter(url, PKeyword) ||
        MemoFilter(url, PKeyword)
      );
    });

    console.log(Filterd);

    return Filterd;
  };

  // FIXME: onChange 함수
  const onDebounceChange = async (e) => {
    // 이전에 있던 기록 지워주는 기능
    resultList?.length >= 1 && setResultList([]);
    // 현재 검색중

    // TODO:
    setSearchState({ nothingFound: false, searchDone: false });

    setText2(e.target.value);

    // 맨 처음에 디바운스 된거 없애기
    debounceSomethingFunc.cancel();

    // 키워드 정규화
    const PKeyword = KeywordNormalize(e.target.value);

    // 작성한 키워드가 1자라도 있어야 검색되게
    if (PKeyword.length >= 1) {
      PKeyword.length >= 1 && SearchNotByDB(PKeyword);
      const Filterd = SearchNotByDB(PKeyword);
      debounceSomethingFunc(setResultList, Filterd, setSearchState);
    }
  };

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          value={text2}
          onClick={createModal2}
          onChange={onDebounceChange}
        />
        {/* <NewSearchBar /> */}
        <FaSearch />

        <div className="Search-balloon">
          <div className="Search-balloon-title">
            <div className="recent-serached-title">최근 검색 항목</div>
            <div className="delete-recent-searched">전체삭제</div>
          </div>

          <div className="Searched-Stuffs-Container">
            {/* none은 해도 상관없어 다만 어떤 구조로 하느냐가 중요해 */}
            {/* map 할때는 이렇게 작은 컴포넌트 밖에 해야돼 안에 넣으면 안돼 */}
            <div
              className="RecentSearched"
              style={
                text2.length >= 1 ? { display: "none" } : { display: "block" }
              }
            >
              {recentSearched.map((val) => {
                return (
                  <RecentSearched
                    url={val}
                    recentSearched={recentSearched}
                    setRecentSearch={setRecentSearch}
                  />
                );
              })}
            </div>

            {text2?.length > 0 &&
              resultList?.map((url) => {
                return <SearchedStuff val={url} key={url._id} />;
              })}
          </div>
          {text2?.length > 0 && searchState.nothingFound && (
            <NotSearched className="notSearched">
              검색어가 존재하지 않습니다...
            </NotSearched>
          )}
          {text2?.length > 0 && !searchState.searchDone && <LoadingImg />}
        </div>
      </div>
    </>
  );
};

export default SearchBox;
