import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import RecentSearched from "./RecentSearched";
import SearchedStuff from "./SearchedStuff";
import Axios from "axios";
import { debounce } from "lodash";

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
    console.log(response.data);
    results = data;
  });
  return results;
};

const debounceSomethingFunc = debounce(async (e, setResultList) => {
  console.log("디바운스");
  const ApiResult = await ApiGetSearchedList(e);
  setResultList(ApiResult);
}, 1000);

const SearchBox = ({ createModal2, recentSearched, setRecentSearch }) => {
  const [text2, setText2] = useState("");
  const [resultList, setResultList] = useState([]);

  const onDebounceChange = async (e) => {
    resultList?.length >= 1 && setResultList([]);

    setText2(e.target.value);
    debounceSomethingFunc.cancel();
    debounceSomethingFunc(e, setResultList);
  };

  useEffect(() => {
    console.log(resultList);
  }, [resultList]);

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
            <div
              className="RecentSearched"
              style={
                text2.length >= 1 ? { display: "none" } : { display: "block" }
              }
            >
              {recentSearched.map((val) => {
                return (
                  <RecentSearched
                    val={val}
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
          <div className="notSearched">검색어가 존재하지 않습니다...</div>
          <div className="loadingImg">
            <img src="./img/loadingSpin.gif" alt="로딩" />
            <div className="loading-ment">
              <div className="ment1">검색중입니다</div>
              <div className="ment2">잠시만 기다려 주세요 :)</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
