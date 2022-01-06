import React from "react";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import { CgCloseR } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import Axios from "axios";

const RecentSearched = ({ recentSearched, setRecentSearch }) => {
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
      {recentSearched.map((url) => {
        return (
          <RecentWrapper key={url.url_id}>
            <div className="url-and-delete">
              <div
                className="recent-searched-Stuff"
                onClick={() => {
                  window.open(url.url);
                }}
              >
                <img
                  className="urlFavicon"
                  src={`http://www.google.com/s2/favicons?domain=${url.url}`}
                  alt=""
                />
                {/* <div class="Searched-url-Id">{url.url_id}</div> */}
                <div class="just-bar"> | </div>
                <div class="Searched-url-Title">{url.url_title}</div>
              </div>
              <div
                className="delete-url"
                onClick={async (e) => {
                  setRecentSearch(
                    recentSearched.filter((oneurl) => {
                      return url !== oneurl;
                    })
                  );
                  url.url_search.url_searchClicked = 0;
                  // url.url_search.url_searchClicked
                  await Axios.put("http://localhost:3001/searchedUrlBYE", {
                    url: url,
                  });
                }}
              >
                <CgCloseR />
              </div>
            </div>
          </RecentWrapper>
        );
      })}
    </div>
  );
};

export default React.memo(RecentSearched);
