import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FaSearch } from "react-icons/fa";

const AppWrap = styled.div`
  .search-box2 {
    transform: translate(-50%, -50%);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    padding: 10px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #51e3d4;
    border-radius: 30px;
    transition: 0.4s;
    width: 30px;
  }
  .search-box2:hover {
    box-shadow: 0px 0px 0.5px 1px #51e3d4;
    width: 282px;
  }
  .search-btn {
    text-decoration: none;
    float: right;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #51e3d4;
  }
  .search-box2:hover > .search-btn {
    background-color: #fff;
  }
  .search-txt {
    display: flex;
    padding: 0;
    width: 0px;
    border: none;
    background: none;
    outline: none;
    float: left;
    font-size: 1rem;
    line-height: 30px;
    transition: 0.4s;
  }
  .search-box2:hover > .search-txt {
    width: 240px;
    padding: 0 6px;
  }
`;
// #51e3d4
const NewSearchBar = () => {
  return (
    <div className="NewSearchBar">
      <AppWrap>
        <div className="search-box2">
          <input
            type="text"
            className="search-txt"
            placeholder="검색어를 입력해주세요!"
          />
          <div className="search-btn" href="#">
            <FaSearch />
          </div>
        </div>
      </AppWrap>
    </div>
  );
};

export default NewSearchBar;
