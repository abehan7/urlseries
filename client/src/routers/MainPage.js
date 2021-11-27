import React from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import urls from "../urls.json";
import { FaSearch } from "react-icons/fa";
import { BiPaperPlane } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import TotalUrlMap from "../components/TotalUrlMap";
import FiveUrls from "../components/FiveUrls";

const MainPage = () => {
  const values = urls.urls;
  window.document.onselectstart = new Function("return false");

  return (
    <div className="MainPage">
      <div className="grid-container">
        <div className="search-box">
          <input
            onClick={() => {
              document.querySelector(".search-box > svg").style.display =
                "none";
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
        <div className="Big_Rect">
          <h3>전체 URL</h3>
          <div className="text-three-container">
            <TotalUrlMap values={values} />
          </div>
        </div>
      </div>

      <div className="aside">어사이드</div>
    </div>
  );
};

export default MainPage;
