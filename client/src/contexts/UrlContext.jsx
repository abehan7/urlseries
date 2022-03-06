import React, { useContext, useEffect, useState, createContext } from "react";
import { useSelector } from "react-redux";
import { getAssignedtags } from "../components/Api";
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

  useEffect(() => {
    const startfn = async () => {
      const { data } = await getAssignedtags();
      const assignedHashtags = data.hashtag_assigned.map((tag) => {
        return { name: tag, origin: 1, assigned: 1 };
      });
      console.log("assignedHashtags: ", assignedHashtags);

      setHashtag({ ...hashtag, assignedHashtags });
      // console.log("data from urlContext", data.);
    };
    token && startfn();
  }, [token]);

  useEffect(() => {
    url && setLoading(false);
  }, [url]);

  const value = { url, hashtag, loading, addAssignedTag, removeAssignedTag };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};
