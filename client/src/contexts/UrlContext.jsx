import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import {
  getAssignedtags,
  getGuestUrls,
  GetTotalUrls,
  getAbort,
  TotalAfter,
} from "../components/Api";
import { getToken } from "../redux/ReducersT/tokenReducer";
// import { getComments } from "../Api";

const UrlContext = createContext();

export const useUrl = () => useContext(UrlContext);

export const UrlProvider = ({ children }) => {
  // console.log("UrlProvider");

  const [url, setUrl] = useState({
    displayUrls: [],
    totalUrls: [],
    searchedUrls: [],
    recentClickedUrls: [],
    likedUrls: [],

    currentUrl: {
      url: "",
      urlId: "",
      memo: "",
      hashtag: "",
      urlTitle: "",
      url_likedUrl: "",
    },
  });

  // const [totalUrls, setTotalUrls] = useState([]);

  const [hashtag, setHashtag] = useState({
    totalHashtags: [],
    assignedHashtags: [],
    tmpTags: [],
  });

  const [loading, setLoading] = useState(true);
  const token = useSelector(getToken);

  const addAssignedTag = (tag) => {
    setHashtag({
      ...hashtag,
      assignedHashtags: [...hashtag.assignedHashtags, { ...tag, assigned: 1 }],
    });
  };

  const removeAssignedTag = (filterdTags) => {
    setHashtag({ ...hashtag, assignedHashtags: filterdTags });
  };

  const getTotalTags = () => {
    const _assignedTagNames = hashtag.assignedHashtags.map((tag) => tag.name);

    const _hashtags = url.totalUrls.map((url) => {
      return url?.url_hashTags;
    });
    const flatten = _hashtags.flat();
    const uniqueTags = [...new Set(flatten)];

    const processedTags = uniqueTags.map((name) => {
      return _assignedTagNames.includes(name)
        ? { name, assigned: 1, origin: 1 }
        : { name, assigned: 0, origin: 0 };
    });
    return processedTags;
  };

  const handleGetTotalTags = useCallback(() => {
    const fn = () => {
      const totalTags = getTotalTags();
      console.log("totalTags from getTotalTags: ", totalTags);
      setHashtag({ ...hashtag, totalHashtags: totalTags });
    };
    console.log(hashtag.totalHashtags.length);
    hashtag.totalHashtags.length === 0 && fn();
  }, [url.totalUrls, hashtag.totalHashtags]);

  // const setAssignedtagsName = () => {
  //   const _assignedTagNames = hashtag.assignedHashtags.map((tag) => tag.name);
  //   setHashtag({ ...hashtag, assignedTagNames: _assignedTagNames });
  // };

  const handleCloseEditModal = () => {
    // close modal
    document.querySelector(".hashtagModal-container").style.display = "none";

    // reset assigned hashtag
    const resetedAssignedTags = hashtag.totalHashtags.filter((tag) => {
      return tag.origin === 1;
    });

    // reset total hashtag
    const resetedTotalTags = hashtag.totalHashtags.map((tag) => {
      return { ...tag, assigned: tag.origin };
    });

    setHashtag({
      assignedHashtags: resetedAssignedTags,
      totalHashtags: resetedTotalTags,
    });
  };

  // 해쉬태그모달 수정버튼
  const handleEditModify = useCallback(async () => {
    // 전체태그 => origin을 assigned로 바꿈
    const processedTotal = hashtag?.totalHashtags.map((tag) => {
      return { ...tag, origin: tag.assigned };
    });
    // 선택된 태그 => assigned === 0인 것만 전체태그에서 제거
    const filterdAssigned = hashtag?.assignedHashtags.filter((tag) => {
      return tag.assigned === 1;
    });

    setHashtag({
      assignedHashtags: filterdAssigned,
      totalHashtags: processedTotal,
    });

    //api call
    const processed = hashtag?.assignedHashtags.map((tag) => {
      return tag.name;
    });
    //FIXME: 아직은 주석처리

    // await updateHashtag(processed);
  }, [hashtag]);

  const handleGetInfiniteScrollItems = (urls) => {
    setUrl({ ...url, displayUrls: urls });
  };

  // FIXME: 전체 url
  useEffect(() => {
    const fn = async () => {
      console.log("!23");
      const { data } = await TotalAfter();
      setUrl({ ...url, totalUrls: data.totalAfter });
      // console.log("totalUrls: ", data.totalAfter);
    };
    token && !loading && fn();
  }, [token, loading]);

  // FIXME: 초반 url
  useEffect(() => {
    const getMemberData = async () => {
      setLoading(true);
      await getAbort();
      const { data } = await GetTotalUrls();
      // console.log(data);

      setUrl({
        ...url,
        displayUrls: data.totalURL,
        searchedUrls: data.recentSearched,
        recentClickedUrls: data.rightURL,
        likedUrls: data.leftURL,
      });
      setLoading(false);
      // console.log(data);
    };

    const getGuestData = async () => {
      const { data } = await getGuestUrls();
      console.log(data);
      setUrl({
        ...url,
        displayUrls: data.totalUrl,
        searchedUrls: data.recentSearchedUrl,
        recentClickedUrls: data.rightUrl,
        likedUrls: data.leftUrl,
      });
    };

    token && url.displayUrls.length === 0 && getMemberData();
    !token && getGuestData();
  }, [token]);

  // FIXME: 해시태그
  useEffect(() => {
    const startfn = async () => {
      //get assignedTags
      const { data } = await getAssignedtags();
      const assignedHashtags = data.hashtag_assigned.map((tag) => {
        return { name: tag, origin: 1, assigned: 1 };
      });
      console.log("assignedHashtags: ", assignedHashtags);

      setHashtag({ ...hashtag, assignedHashtags });
      // console.log("data from urlContext", data.);
    };
    token && !loading && startfn();
  }, [token, loading]);

  // useEffect(() => {
  //   console.log("url:", url);
  // }, [url]);

  const value = {
    url,
    hashtag,
    addAssignedTag,
    removeAssignedTag,
    handleGetTotalTags,
    handleCloseEditModal,
    handleEditModify,
    handleGetInfiniteScrollItems,
  };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};
