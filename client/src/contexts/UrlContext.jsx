import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssignedtags,
  getGuestUrls,
  getAbort,
  addUrl,
  deleteUrls,
  getTotalUrls,
  updateUrlLike,
  api_updateUrl,
} from "../components/Api";
import { duplicateUrlChecker } from "../components/Utils/Urls/checkDuplicate";
import { getToken } from "../redux/ReducersT/tokenReducer";
import { SET_FOLDERS } from "../store/reducers/Folders";
// import { getComments } from "../Api";

const UrlContext = createContext();

export const useUrl = () => useContext(UrlContext);

// const debounceFn = debounce((fn) => fn(), 500);

export const UrlProvider = ({ children }) => {
  // console.log("UrlProvider");

  const [url, setUrl] = useState({
    displayUrls: [],
    totalUrls: [],
    searchedUrls: [],
    recentClickedUrls: [],
    likedUrls: [],
    deleteUrls: [],
    filterdUrls: [],
  });

  const [currentUrl, setCurrentUrl] = useState({
    url: "",
    urlId: "",
    memo: "",
    hashtag: "",
    urlTitle: "",
    url_likedUrl: "",
  });

  const [editUrl, setEditUrl] = useState({
    url: "",
    urlId: "",
    memo: "",
    hashtag: "",
    urlTitle: "",
    url_likedUrl: "",
  });

  // const [urlIds, setUrlIds] = useState({ deleteUrlIds: [] });

  // const [totalUrls, setTotalUrls] = useState([]);

  const [hashtag, setHashtag] = useState({
    totalHashtags: [],
    assignedHashtags: [],
    tmpTags: [],
  });

  const [loading, setLoading] = useState({
    isTotalUrl: true,
    isLikedUrl: true,
  });
  const token = useSelector(getToken);
  const dispatch = useDispatch();

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

  const handleCloseEditModal = () => {
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
  // FIXME: 무한스크롤
  const handleGetInfiniteScrollItems = (urls) => {
    setUrl({ ...url, displayUrls: urls });
  };

  //url 수정하기
  const handleEditUrl = async (urlId, newUrl) => {
    console.log("urlId", urlId);
    // console.log("newUrl", newUrl);
    await api_updateUrl(urlId, newUrl);
    const _updateUrl = (urls) => {
      return urls.map((_url) => (_url._id === urlId ? newUrl : _url));
    };
    const newTotalUrls = _updateUrl(url.totalUrls);
    const newLikedUrls = _updateUrl(url.likedUrls);
    const update = { ...url, totalUrls: newTotalUrls, likedUrls: newLikedUrls };
    setUrl(update);
    // api call
  };

  const handleAddUrl = async (_url) => {
    // api call
    const { data } = await addUrl(_url);
    const update = [data, ...url.totalUrls];
    setUrl({ ...url, totalUrls: update });
    console.log(data);
  };

  // FIXME: 좋아요 기능
  const handleClickStar = async (urlId) => {
    const newUrl = url.totalUrls.find((_url) => _url._id === urlId);
    // totalUrls displayUrls
    await updateUrlLike(urlId);

    const update =
      newUrl.url_likedUrl === 0
        ? { ...newUrl, url_likedUrl: 1 }
        : { ...newUrl, url_likedUrl: 0 };

    const updateUrl = (urls) => {
      return urls.map((_url) => (_url._id === urlId ? update : _url));
    };

    const totalUrls = updateUrl(url.totalUrls);
    const displayUrls = updateUrl(url.displayUrls);
    // const searchedUrls = updateUrl(url.searchedUrls);
    // likedUrls
    const isLiked = update.url_likedUrl === 1;
    const addLike = [update, ...url.likedUrls];
    const filterLike = url.likedUrls.filter((_url) => _url._id !== urlId);
    const likedUrls = isLiked ? addLike : filterLike;
    // const updateUrlState = { ...url, totalUrls, displayUrls };
    setUrl({ ...url, displayUrls, totalUrls, likedUrls });
    // api call
  };

  //FIXME: 가장 최신에 클릭한 URL
  const handleSetCurrentUrl = (url) => setCurrentUrl(url);

  // FIXME: 삭제탭 기능
  const handleAddDeleteUrl = (_url) => {
    // console.log("url?.deleteUrls: ", url);

    setUrl({ ...url, deleteUrls: [_url, ...url?.deleteUrls] });
  };

  const getResetCurrentUrl = () =>
    setCurrentUrl({
      url: "",
      urlId: "",
      memo: "",
      hashtag: "",
      urlTitle: "",
      url_likedUrl: "",
    });

  const handleAddDeleteUrlList = (newUrls) => {
    const duplicatedList = [...newUrls, ...url.deleteUrls];
    const filterd = duplicateUrlChecker(duplicatedList);
    getResetCurrentUrl();
    setUrl({ ...url, deleteUrls: filterd });
  };

  const handleRemoveDeleteUrl = (urlId) => {
    const newDeleteUrls = url.deleteUrls.filter((_url) => _url._id !== urlId);
    setUrl({ ...url, deleteUrls: newDeleteUrls });
  };

  const handleResetDeleteUrl = () => {
    setUrl({ ...url, deleteUrls: [] });
    getResetCurrentUrl();
  };

  const handleOnClickDeleteUrl = async () => {
    // await deleteUrls(url.deleteUrls);
    const newTotalUrls = url.totalUrls.filter(
      (_url) => !url.deleteUrls.some((url) => url._id === _url._id)
    );
    const newLikedUrls = url.likedUrls.filter(
      (_url) => !url.deleteUrls.some((url) => url._id === _url._id)
    );

    await deleteUrls(url?.deleteUrls);

    const update = {
      ...url,
      totalUrls: newTotalUrls,
      likedUrls: newLikedUrls,
      deleteUrls: [],
    };

    setUrl(update);
  };

  // FIXME: BOX들에 보여질 filterd
  const handleSetFilterdUrls = (filterdUrls) => setUrl({ ...url, filterdUrls });

  const handleResetAllUrl = () =>
    setUrl({
      totalUrls: [],
      displayUrls: [],
      searchedUrls: [],
      recentClickedUrls: [],
      likedUrls: [],
    });

  const handleSetEditUrl = (_url) => setEditUrl(_url);

  // const handleResetFilterdUrls

  // FIXME: 초반 url
  useEffect(() => {
    const getMemberData = async () => {
      console.log("getMemberData");
      await getAbort();
      setLoading({ ...loading, isLikedUrl: true, isTotalUrl: true });
      const { data } = await getTotalUrls();
      // console.log(data);

      setUrl({ ...url, likedUrls: data.likedUrls, totalUrls: data.totalUrls });
      setLoading({ ...loading, isLikedUrl: false, isTotalUrl: false });
      dispatch(SET_FOLDERS());
      // console.log(data);
    };

    const getGuestData = async () => {
      setLoading({ ...loading, isLikedUrl: true });
      const { data } = await getGuestUrls();
      console.log(data);
      console.log("getGuestData");

      setUrl({
        ...url,
        totalUrls: data.totalUrl,
        displayUrls: data.totalUrl,
        searchedUrls: data.recentSearchedUrl,
        recentClickedUrls: data.rightUrl,
        likedUrls: data.leftUrl,
      });
      setLoading({ ...loading, isLikedUrl: false });
    };

    // let timer;

    token && getMemberData();
    // !token && (timer = setTimeout(getGuestData, 1000));
    // return () => clearTimeout(timer);
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
  }, [token, loading.isLikedUrl]);

  const value = {
    url,
    hashtag,
    currentUrl,
    editUrl,
    addAssignedTag,
    removeAssignedTag,
    handleGetTotalTags,
    handleCloseEditModal,
    handleEditModify,
    handleGetInfiniteScrollItems,
    handleEditUrl,
    handleAddUrl,
    handleClickStar,
    handleSetCurrentUrl,
    handleAddDeleteUrl,
    handleRemoveDeleteUrl,
    handleResetDeleteUrl,
    handleAddDeleteUrlList,
    handleSetFilterdUrls,
    handleResetAllUrl,
    handleSetEditUrl,
    handleOnClickDeleteUrl,
    getResetCurrentUrl,
    loading,
  };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};
