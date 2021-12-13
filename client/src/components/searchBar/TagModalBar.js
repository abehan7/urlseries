import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";

const TagModalBar = () => {
  const BarContainer = styled.div`
    .TagModalBar {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .search-box {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      height: 30px;
      background-color: #fff;
      //   border: 1px solid black;
      border-radius: 30px;
      transition: 0.4s;
      width: 30px;
    }
    .search-box:hover {
      border: 1px solid black;

      //   box-shadow: 0px 0px 0.5px 1px black;
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
      color: black;
    }
    .search-box:hover > .search-btn {
      background-color: #fff;
      display: none;
      transition: 0.4s;
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
      //   line-height: 30px;
      transition: 0.4s;
    }
    .search-box:hover > .search-txt {
      width: 240px;
      padding: 0 6px;
    }
  `;
  return (
    <BarContainer>
      <div className="TagModalBar">
        <div className="search-box">
          <input
            type="text"
            className="search-txt"
            name=""
            placeholder="Type to search"
          />
          <div className="search-btn">
            <div className="fas fa-search">
              <IoSearchOutline />
            </div>
          </div>
        </div>
      </div>
    </BarContainer>
  );
};

export default TagModalBar;
