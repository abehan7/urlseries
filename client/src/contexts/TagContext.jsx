import React, { useEffect, useState, createContext } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { getAssignedtags, updateHashtag } from "../components/Api";
import { getToken } from "../redux/ReducersT/tokenReducer";
import { useUrl } from "./UrlContext";
// import { getComments } from "../Api";

const TagContext = createContext();

export const useTag = () => useContext(TagContext);

export const TagProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hashtag, setHashtag] = useState({
    totalHashtags: [],
    assignedHashtags: [],
    tmpTags: [],
  });

  const token = useSelector(getToken);

  const url = useUrl().url;
  const totalUrls = url.totalUrls;

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

    console.log("processed: ", processed);
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

  const value = {
    hashtag,
    loading,
    addAssignedTag,
    removeAssignedTag,
    handleGetTotalTags,
    handleCloseEditModal,
    handleEditModify,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
