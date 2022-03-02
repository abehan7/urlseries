import React from "react";
import { CgCloseR } from "react-icons/cg";
import styled from "styled-components";
import { API } from "../Api";

const RecentWrapper = styled.div`
  .url-and-delete {
    display: flex;
    height: auto;
    padding: 0.3rem 0;
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
  .recent-searched-Stuff > .Searched-url-Title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .urlFavicon {
    padding: 0.4rem;
  }
`;

const RecentSearched = ({ recentSearched, setRecentSearch, url }) => {
  return (
    <RecentWrapper key={url._id}>
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
          {/* <div className="Searched-url-Id">{url.url_id}</div> */}
          <div className="just-bar"> | </div>
          <div className="Searched-url-Title">{url.url_title}</div>
        </div>
        <div
          className="delete-url"
          onClick={async () => {
            setRecentSearch(
              recentSearched.filter((oneurl) => {
                return url !== oneurl;
              })
            );
            url.url_search.url_searchClicked = 0;
            // url.url_search.url_searchClicked
            await API.put("/searchedUrlBYE", {
              url: url,
            });
          }}
        >
          <CgCloseR />
        </div>
      </div>
    </RecentWrapper>
  );
};

export default RecentSearched;
