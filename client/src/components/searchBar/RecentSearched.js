import React from "react";
import { CgCloseR } from "react-icons/cg";
import styled from "styled-components";
import Axios from "axios";

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
    min-height: 43px;
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
  .recent-searched-Stuff > .Searched-url-Title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const RecentSearched = ({ recentSearched, setRecentSearch, url, key }) => {
  return (
    <RecentWrapper key={key}>
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
};

export default RecentSearched;
