import React from "react";
import { memo } from "react";
import { FolderProvider } from "./FolderContext";
import { ModeProvider } from "./ModeContext";
import { UrlProvider } from "./UrlContext";

const Context = ({ children }) => {
  return (
    <UrlProvider>
      <ModeProvider>
        <FolderProvider>{children}</FolderProvider>
      </ModeProvider>
    </UrlProvider>
  );
};

export default memo(Context);
