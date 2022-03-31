import { useState, useEffect } from "react";

export const useLocalStorage = () => {
  const [getChromeBookmark, setChromeBookmark] = useState([]);
  const [getSearchHistory, setSearchHistory] = useState([]);
  const [getBookmark, setBookmark] = useState([]);

  const getInfo = (array) =>
    array.map((item) => {
      return {
        url: item.url,
        _id: item.id,
        url_title: item.title,
        date: item.lastVisitTime,
      };
    });

  const getChromeBookmarkInfo = (array) =>
    array.map((item) => {
      return {
        url: item.url,
        _id: item.id,
        url_title: item.title,
        date: item.dateAdded,
      };
    });

  const sorted = (array) =>
    array.sort((a, b) => new Date(b.date) - new Date(a.date));

  const getOrganize = (array) => sorted(getInfo(JSON.parse(array)));

  const getOrganizeBookmark = (array) =>
    sorted(getChromeBookmarkInfo(JSON.parse(array)));

  useEffect(() => {
    const chromeBookmark = localStorage.getItem("chromeBookmarks");
    const searchHistory = localStorage.getItem("allSearchHistory");
    const bookmark = localStorage.getItem("bookmark");

    chromeBookmark && setChromeBookmark(getOrganizeBookmark(chromeBookmark));
    searchHistory && setSearchHistory(getOrganize(searchHistory));
    bookmark && setBookmark(JSON.parse(bookmark));
  }, []);

  useEffect(() => {
    console.log("getChromeBookmark:", getChromeBookmark);
    console.log("getSearchHistory:", getSearchHistory);
    console.log("getBookmark:", getBookmark);
  }, [getChromeBookmark, getSearchHistory, getBookmark]);

  return { getChromeBookmark, getSearchHistory, getBookmark };
};
