import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { getAssignedtags, GetTotalUrls, TotalAfter } from "../components/Api";
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

  const getTotalTags = () => {
    const _hashtags = url.totalUrls.map((url) => {
      return url?.url_hashTags;
    });
    const flatten = _hashtags.flat();
    const uniqueTags = [...new Set(flatten)];

    const processedTags = uniqueTags.map((name) => {
      return { name, assigned: 0, origin: 0 };
    });
    // const isAssigned = hashtag.assignedHashtags.some(
    //   (tag) => name === tag.name
    // );
    // console.log(isAssigned);

    // console.log(processedTags);
    return processedTags;
  };

  const handleGetTotalTags = useCallback(() => {
    const fn = () => {
      const totalTags = getTotalTags();

      console.log("totalTags from getTotalTags", totalTags);
      setHashtag({ ...hashtag, totalHashtags: totalTags });
    };
    console.log(hashtag.totalHashtags.length);
    hashtag.totalHashtags.length === 0 && fn();
  }, [url.totalUrls, hashtag.totalHashtags]);

  const handleCloseEditModal = () => {
    // close modal
    document.querySelector(".hashtagModal-container").style.display = "none";

    // reset assigned hashtag
    const resetedAssignedTags = hashtag.assignedHashtags.map((tag) => {
      return { ...tag, assigned: 1 };
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
      // get total urls
      const {
        data: { totalAfter },
      } = await TotalAfter();
      console.log(totalAfter);
      setUrl({ ...url, totalUrls: totalAfter });
    };
    token && fn();
  }, [token]);

  useEffect(() => {
    url && setLoading(false);
  }, [url]);

  const value = {
    url,
    hashtag,
    loading,
    addAssignedTag,
    removeAssignedTag,
    handleGetTotalTags,
    handleCloseEditModal,
  };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};
