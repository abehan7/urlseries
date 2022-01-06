import React, { useState } from "react";
import { debounce } from "lodash";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { SetResults, SetTypingNow } from "../../store/reducers/SearchResults";

// =========== 해쉬태그 검색어 end ===========

// FIXME: APICALL
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

// FIXME:TODO:우선 리덕스에 넣는거까지는 완료
// 이제 이거를 검색창에 넣기

const debounceSomethingFunc = debounce(async (e, AddUrls2Redux) => {
  console.log("디바운스");
  const ApiResult = await ApiGetSearchedList(e);
  AddUrls2Redux(ApiResult);

  // TODO:로딩창 없애기
  // document.querySelector(".loadingImg").style.display = "none";
  //=========== 타이틀 검색어 start ===========
  // TODO:검색어 없음 띄우기
  // if (hashFilterd2.length + titleFilterd.length === 0) {
  //   console.log("검색어 없음");
  //   document.querySelector(".notSearched").style.display = "flex";
  // }
}, 400);
// FIXME:

const SearchDelay = ({ createModal2, recentSearched, setRecentSearch }) => {
  const [text2, setText2] = useState("");

  const dispatch = useDispatch();

  // 리덕스 디스패치
  const AddUrls2Redux = (results) => {
    dispatch(SetResults(results));
  };

  const SetTypingNow2 = (text) => {
    dispatch(SetTypingNow(text));
  };

  // FIXME: 최근 클릭한 url 기록으로 넣기
  const ClickInSearchBar = (recentSearched, setRecentSearch, val) => {
    let recentSearched_id = [];
    recentSearched.forEach((oneurl) => {
      recentSearched_id.push(oneurl._id);
    });
    if (recentSearched_id.includes(val._id)) {
      setRecentSearch(
        recentSearched.filter((value) => {
          return value._id !== val._id;
        })
      );
      setRecentSearch((value) => [val, ...value]);
    } else {
      setRecentSearch((value) => [val, ...value]);
    }
    Axios.put("http://localhost:3001/clickedSeachedURL", {
      url: val,
    });
  };

  // FIXME: debounceSomethingFunc분할

  // const HashFilterd = (e) => {
  //   const hashFilterdList = ApiGetSearchedList(e).filter((val) => {
  //     return val.url_hashTags.some((tag) => {
  //       return tag
  //         .toLowerCase()
  //         .replace(/(\s*)/g, "")
  //         .includes(e.target.value.toLowerCase().replace(/(\s*)/g, ""));
  //     });
  //   });
  //   return hashFilterdList;
  // };

  // const TitleFilterd = (e) => {
  //   const titleFilterdList = ApiGetSearchedList(e).filter((val) => {
  //     return val.url_title
  //       .toLowerCase()
  //       .replace(/(\s*)/g, "")
  //       .includes(e.target.value.toLowerCase().replace(/(\s*)/g, ""));
  //   });
  //   return titleFilterdList;
  // };

  const onDebounceChange = (e) => {
    debounceSomethingFunc.cancel();
    // TODO: 검색된 모든 목록 없애기
    // if (document.querySelector(".searched-Stuff")) {
    //   document.querySelectorAll(".searched-Stuff").forEach((val) => {
    //     val.remove();
    //   });
    // }\

    // TODO: notSearched 없애기
    // document.querySelector(".notSearched").style.display = "none";

    // TODO: 로딩 이미지 없애기
    // document.querySelector(".loadingImg").style.display = "flex";

    // TODO: 타이틀 없애기
    // document.querySelector(".Search-balloon-title").style.display = "none";

    // TODO: value 0 이면 다시 살리기
    // if (value.length === 0) {
    //   document.querySelector(".Search-balloon-title").style.display = "flex";

    //   document.querySelector(".loadingImg").style.display = "none";
    //   document.querySelector(".RecentSearched").style.display = "block";
    //   // setSearchingNow(false);
    // } else {

    // TODO: value 생기면 다시 없애기

    //   document.querySelector(".Search-balloon-title").style.display = "none";
    //   document.querySelector(".RecentSearched").style.display = "none";
    // TODO: setSearchingNow 만들기

    //   // setSearchingNow(true);
    // }
    // TODO: 디바운스 하기
    setText2(e.target.value);
    if (e.target.value.length <= 1) {
      SetTypingNow2(e.target.value);
    }

    debounceSomethingFunc(e, AddUrls2Redux);
  };

  return (
    <>
      <input
        type="text"
        value={text2}
        onClick={createModal2}
        onChange={onDebounceChange}
      />
    </>
  );
};

export default SearchDelay;
