import React from "react";
import FolderContext from "./FolderContext";
import { UrlProvider } from "./UrlContext";

const Context = ({ children }) => {
  return (
    <UrlProvider>
      <FolderContext>{children}</FolderContext>
    </UrlProvider>
  );
};

export default Context;
