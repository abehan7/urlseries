import React from "react";
import "./SearchPage.css";
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
  return (
    <div>
      <div className="SearchPage">
        <div className="flex-container">
          <div className="searchBar">
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
