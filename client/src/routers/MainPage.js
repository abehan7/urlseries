import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import urls from "../urls.json";
import { FaSearch } from "react-icons/fa";
import { BiPaperPlane } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import TotalUrlMap from "../components/TotalUrlMap";
import FiveUrls from "../components/FiveUrls";
import HashTagsUnique from "../components/HashTagsUnique";
import BoxTagControler from "../components/BoxTagControler";
import UrlsByHashTag from "../components/UrlsByHashTag";

const MainPage = () => {
  const [BoxTags, setBoxTags] = useState([]);
  const [BoxTags_First, setBoxTags_First] = useState(true);
  const [hashList, setHashList] = useState([]);
  const [totalUrls, setTotalUrls] = useState(["123"]);

  const clickOutSide = (e) => {
    var target = e.target;

    if (target == document.querySelector(".search-box").firstChild) {
      return;
    }
    document.querySelector(".search-box > svg").style.display = "block";
  };

  const values = urls.urls;
  window.document.onselectstart = () => {
    return false;
  };
  window.document.oncontextmenu = () => {
    return false;
  };

  useEffect(() => {
    setHashList(HashTagsUnique(values));
    //url들 넣는 리스트만들기
    var TotalUrls_title = [];
    values.forEach((tag) => TotalUrls_title.push(tag.title));
    setTotalUrls(TotalUrls_title);
  }, []);

  return (
    <div className="MainPage" onClick={clickOutSide}>
      <div className="grid-container">
        <div className="search-box">
          <input
            onClick={() => {
              document.querySelector(".search-box > svg").style.display =
                "none";
              console.log(totalUrls);
            }}
          />
          <FaSearch />
        </div>
        <div className="share-write">
          <Link to="/search">
            <BiPaperPlane />
          </Link>
          <FiPlusSquare />
        </div>
        <div className="Rectangle left-top">
          <h3>내가 지정한 URL </h3>
          <div className="text-container">
            <FiveUrls values={values} num1={0} num2={5} />
          </div>
        </div>
        <div className="Rectangle right-top">
          <h3>자주 이용하는 URL</h3>
          <div className="text-container">
            <FiveUrls values={values} num1={5} num2={10} />
          </div>
        </div>

        <div className="minisize-tags aside-tags">
          {hashList.map((tag) => {
            return (
              <span
                className="tag"
                onClick={(e) => {
                  BoxTagControler(e, {
                    BoxTags_First,
                    setBoxTags_First,
                    BoxTags,
                    setBoxTags,
                  });
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <div className="Big_Rect">
          {BoxTags_First ? <h3>전체 URL</h3> : <h3>HashTag</h3>}
          <div className="text-three-container">
            {BoxTags_First ? (
              <TotalUrlMap values={values} />
            ) : (
              <UrlsByHashTag
                values={values}
                BoxTags={BoxTags}
                totalUrls={totalUrls}
              />
            )}
          </div>
        </div>
      </div>

      <div className="aside">
        <div className="aside-tags">
          {hashList.map((tag) => {
            return (
              <span
                className="tag"
                onClick={(e) => {
                  BoxTagControler(e, {
                    BoxTags_First,
                    setBoxTags_First,
                    BoxTags,
                    setBoxTags,
                  });
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
        {/* <div className="aside-details"></div> */}
      </div>
    </div>
  );
};

export default MainPage;
