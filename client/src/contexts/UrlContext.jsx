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
  GetTotalUrls,
  TotalAfter,
  updateHashtag,
} from "../components/Api";
import { getToken } from "../redux/ReducersT/tokenReducer";
// import { getComments } from "../Api";

const UrlContext = createContext();

export const useUrl = () => useContext(UrlContext);

export const UrlProvider = ({ children }) => {
  const [url, setUrl] = useState({
    displayUrls: [],
    totalUrls: [],
    currentUrl: {
      url: "",
      urlId: "",
      memo: "",
      hashtag: "",
      urlTitle: "",
      url_likedUrl: "",
    },
    searchedUrls: [],
    recentClickedUrls: [],
    likedUrls: [],
  });

  const [hashtag, setHashtag] = useState({
    totalHashtags: [],
    assignedHashtags: [],
    assignedTagNames: [],
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

    const _resetedAssignedTags = hashtag.assignedHashtags.filter((tag) => {
      return tag.origin === 1;
    });

    const resetedAssignedTags = _resetedAssignedTags.map((tag) => {
      return { ...tag, assigned: 1 };
    });

    console.log("resetedAssignedTags: ", resetedAssignedTags);

    // const resetedAssignedTags = hashtag.assignedHashtags.map((tag) => {
    //   return { ...tag, assigned: tag.origin };
    // });

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

    await updateHashtag(processed);
  }, [hashtag]);

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
    token && hashtag.assignedHashtags.length === 0 && startfn();
  }, [token]);

  useEffect(() => {
    const fn = async () => {
      const { data } = await TotalAfter();
      setUrl({ ...url, totalUrls: data.totalAfter });
    };
    token && fn();
  }, [token]);

  useEffect(() => {
    url && setLoading(false);
  }, [url]);

  // useEffect(() => {
  //   const processed = hashtag.assignedHashtags.map((tag) => tag.name);
  //   // console.log(processed);
  //   setHashtag({ ...hashtag, assignedTagNames: processed });
  // }, []);

  const value = {
    url,
    hashtag,
    loading,
    addAssignedTag,
    removeAssignedTag,
    handleGetTotalTags,
    handleCloseEditModal,
    handleEditModify,
  };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};
