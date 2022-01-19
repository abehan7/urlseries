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

const debounceSomethingFunc = debounce(async (e, AddUrls2Redux) => {
  console.log("디바운스");
  const ApiResult = await ApiGetSearchedList(e);
  AddUrls2Redux(ApiResult);
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

  const onDebounceChange = (e) => {
    debounceSomethingFunc.cancel();
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
