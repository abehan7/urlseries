import React, { useContext, useEffect, useState, createContext } from "react";
// import { getComments } from "../Api";

const UrlContext = createContext();

export const useUrl = () => useContext(UrlContext);

export const UrlProvider = ({ children }) => {
  const [url, setUrl] = useState({
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
    currentHashtag: [],
    assignedHashtags: [],
  });

  const [loading, setLoading] = useState(true);

  //   const addComment = (comment) => {
  //     setComments([comment, ...comments]);
  //   };

  useEffect(() => {
    const fn = async () => {
      //   const data = await getComments();
      // console.log(data);
      //   setComments(data);
    };
    fn();
  }, []);

  useEffect(() => {
    url && setLoading(false);
  }, [url]);

  const value = { url, hashtag, loading };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};
