import React from "react";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import { CgCloseR } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import styled, { createGlobalStyle } from "styled-components";

const RecentSearched = ({ values }) => {
  const RecentWrapper = styled.div`
    .url-and-delete {
      display: flex;
    }
    .delete-url {
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
    .url-and-delete:hover {
      background: #e9ecef57;
      cursor: pointer;
    }

    .recent-searched-Stuff > div {
      display: flex;
      width: auto;
      height: auto;
      z-index: 1;
    }
    .delete-url {
      padding-right: 15px;
      font-size: 17px;
    }
  `;

  return (
    <div className="RecentSearched">
      {values.map((url) => {
        return (
          <RecentWrapper>
            <div className="url-and-delete">
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
              <div className="delete-url" onClick={(e) => {}}>
                <CgCloseR />
              </div>
            </div>
          </RecentWrapper>
        );
      })}
    </div>
  );
};

export default RecentSearched;