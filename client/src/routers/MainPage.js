import React from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import urls from "../urls.json";
import { FaSearch } from "react-icons/fa";
import { BiPaperPlane } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";

const MainPage = () => {
  const values = urls.urls;

  return (
    <div>
      <div className="grid-container">
        <div className="search-box">
          <input />
          <FaSearch />
        </div>
        <div className="share-write">
          <Link to="/search">
            <BiPaperPlane />
          </Link>
          <FiPlusSquare />
        </div>
        <div className="Rectangle">
          <h3>내가 지정한 URL </h3>
          <div className="text-container">
            {values.slice(0, 5).map((value) => {
              return (
                <div
                  className="url"
                  onClick={() => {
                    window.open(value.url);
                  }}
                >
                  {value.title}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Rectangle">
          <h3>자주 이용하는 URL</h3>
          <div className="text-container">
            {values.slice(5, 10).map((value) => {
              return (
                <div
                  className="url"
                  onClick={() => {
                    window.open(value.url);
                  }}
                >
                  {value.title}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Big_Rect">
          <h3>전체 URL</h3>
          <div className="text-three-container">
            {values.map((value) => {
              return (
                <div
                  className="T-url"
                  key={value.id}
                  onClick={() => {
                    window.open(value.url);
                  }}
                >
                  {value.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
