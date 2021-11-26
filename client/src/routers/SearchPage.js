import React from "react";
import "./SearchPage.css";
import { Route, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

const SearchPage = () => {
  return (
    <div>
      <div className="SearchPage">
        <div className="backIcon">
          <Link to="/">
            <BiArrowBack />
          </Link>
        </div>
        <div className="flex-container">
          <div className="searchBar">
            <input />
            <FaSearch />
          </div>
          <div className="titleBox">
            <h3>Title</h3>
            <div className="text-container">
              <div className="url">
                자바스크립트자바스크립트자바스크립트자바스크립트자바스크립트자바스크립트자바스크립트자바스크립트자바스크립트자바스크립트자바스크립트
              </div>
              <div className="url">자바스크립트 타임셋</div>
              <div className="url">자바스크립트 async</div>
              <div className="url">자바스크립트 es6</div>
              <div className="url">자바스크립트 async</div>
              <div className="url">자바스크립트</div>
              <div className="url">자바스크립트 타임셋</div>
              <div className="url">자바스크립트 async</div>
              <div className="url">자바스크립트 es6</div>
              <div className="url">자바스크립트 async</div>
            </div>
          </div>
          <div className="HashBox">
            <h3>HashTag</h3>
            <div className="text-container">
              <div className="url">자바스크립트</div>
              <div className="url">자바스크립트 타임셋</div>
              <div className="url">자바스크립트 async</div>
              <div className="url">자바스크립트 es6</div>
              <div className="url">자바스크립트 async</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
