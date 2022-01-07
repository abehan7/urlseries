// export default React.memo(RecentSearched);
// styled components를 밖에 꺼내놔야 무한 렌더링이 안돼
// 그리고 프롭스 전달시킨 다음에 그 프롭스 값이 변화하면 렌더링되더라
// 아~ 그게 아니였구나
// 그냥 useState가 변화하면 원래 전체적으로 렌더링되니까
// return 위에 있던것들이 전체적으로 다시 한번 실행되니까
// styled 컴포넌트가 다시 실행되서 계속 렌더링된듯
// 아무튼 styled compoenets는 밖에 꺼내놓는다

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

const RecentSearched = ({ recentSearched, setRecentSearch, url }) => {
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

export default React.memo(RecentSearched);
