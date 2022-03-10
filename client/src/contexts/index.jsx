import React from "react";
import { memo } from "react";
import { FolderProvider } from "./FolderContext";
import { ModeProvider } from "./ModeContext";
import { TagProvider } from "./TagContext";
import { UrlProvider } from "./UrlContext";

const Context = ({ children }) => {
  return (
    <UrlProvider>
      <TagProvider>
        <ModeProvider>
          <FolderProvider>{children}</FolderProvider>
        </ModeProvider>
      </TagProvider>
    </UrlProvider>
  );
};

export default memo(Context);
