import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled, { createGlobalStyle } from "styled-components";

const RecentSearched = ({ values }) => {
  const RecentWrapper = styled.div`
    .recent-searched-Stuff {
      display: flex;
      align-items: center;
      justify-content: start;
      min-height: 40px;
      height: auto;
      width: 100%;
      padding: 0;
      margin: 0;
    }
    .recent-searched-Stuff:hover {
      background: #e9ecef57;
      cursor: pointer;
    }

    .recent-searched-Stuff > div {
      display: flex;
      width: auto;
      height: auto;
      z-index: 1;
    }
  `;

  return (
    <div className="RecentSearched">
      {values.map((url) => {
        return (
          <RecentWrapper>
            <div className=""></div>
            <div
              className="recent-searched-Stuff"
              onClick={() => {
                window.open(url.url);
              }}
            >
              <div class="Searched-url-Id">{url.url_id}</div>
              <div class="just-bar"> | </div>
              <div class="Searched-url-Title">{url.url_title}</div>
            </div>
            <div className="delete-url">
              <AiOutlineClose />
            </div>
          </RecentWrapper>
        );
      })}
    </div>
  );
};

export default RecentSearched;
