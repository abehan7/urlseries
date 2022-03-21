import React from "react";
import { useEffect } from "react";

import styled from "styled-components";
import { getAbort } from "../components/Api";
const ChromeExtensionPageEl = styled.div`
  width: 100%;
`;
const ChromeExtensionPage = () => {
  useEffect(() => {
    const fn = () => {
      window.onmessage = async (e) => {
        await getAbort();
        const oldBookmark = JSON.parse(localStorage.getItem("bookmarks"));
        const newBookmark = JSON.parse(e.data);

        console.log("old bookmarks: ", oldBookmark);
        console.log("newBookmark: ", newBookmark);

        if (!oldBookmark)
          return localStorage.setItem(
            newBookmark?.key,
            JSON.stringify([newBookmark.data])
          );

        // old bookmark가 있을 때

        const isDuplicated = oldBookmark?.some(
          (bookmark) => bookmark.url === newBookmark.data.url
        );
        console.log("isDuplicated: ", isDuplicated);

        if (isDuplicated) return;

        const combinedBookmark = JSON.stringify([
          ...oldBookmark,
          newBookmark.data,
        ]);
        console.log("yo! this from combinedBookmark: ", combinedBookmark);

        localStorage.setItem(newBookmark?.key, combinedBookmark);
      };
    };
    fn();
  }, []);
  return <ChromeExtensionPageEl>ChromeExtensionPage</ChromeExtensionPageEl>;
};

export default ChromeExtensionPage;
