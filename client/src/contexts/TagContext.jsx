import React, { useEffect, useState, createContext } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import {
  getAssignedtags,
  updateaAssignedHashtag,
  updateHashtag,
} from "../components/Api";
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

  const totalUrls = useUrl().url.totalUrls;

  const handleSetAssignedHashtags = async (newTags) => {
    setHashtag({ ...hashtag, assignedHashtags: newTags });
    await updateaAssignedHashtag(newTags);
  };

  const getTotalTags = () => {
    const _hashtags = totalUrls.map((url) => url?.url_hashTags);
    const flatten = _hashtags.flat();
    const uniqueTags = [...new Set(flatten)];
    return uniqueTags;
  };

  const handleGetTotalTags = useCallback(() => {
    const fn = () => {
      const totalTags = getTotalTags();
      // console.log("totalTags from getTotalTags: ", totalTags);
      setHashtag({ ...hashtag, totalHashtags: totalTags });
    };
    // console.log(hashtag.totalHashtags.length);
    hashtag.totalHashtags.length === 0 && fn();
  }, [totalUrls, hashtag.totalHashtags]);

  useEffect(() => {
    const startfn = async () => {
      //get assignedTags
      const { data } = await getAssignedtags();
      setHashtag({ ...hashtag, assignedHashtags: data.hashtag_assigned });
    };
    token && hashtag.assignedHashtags.length === 0 && startfn();
  }, [token]);

  const value = {
    hashtag,
    loading,
    handleGetTotalTags,
    handleSetAssignedHashtags,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
