import React from "react";
import "./App.css";
import { FaSearch } from "react-icons/fa";

const App = () => {
  return (
    <>
      <div className="SearchPage">
        <div className="flex-container">
          <div className="searchBar">
            <FaSearch />
          </div>
          <div className="titleBox">
            <h3>제목박스 </h3>
          </div>
          <div className="HashBox">
            <h3>해쉬태그 </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
