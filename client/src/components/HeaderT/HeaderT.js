import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { VscAccount, VscLayers, VscChevronDown } from "react-icons/vsc";
import "./HeaderT.css";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

const DropdownBtn = styled.div`
  background-color: transparent;
`;

const HeaderEl = styled.header`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 3;
  position: inherit;
  h1 p {
    font-family: "Sansita Swashed", cursive;
    font-weight: 600;
  }
  img {
    padding-right: 0.7rem;
  }
`;

const DropDownContent = styled.div`
  @keyframes slideDown {
    0% {
      transform: translateY(-30px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-30px);
    }
  }

  /* Dropdown Content (Hidden by Default) */
  ${(props) =>
    props.isOpen
      ? css`
          visibility: visible;
          animation: slideDown 0.1s;
          opacity: 1;
        `
      : css`
          visibility: hidden;
          animation: slideUp 0.1s;
          transition: 0.1s;
          opacity: 0;
        `}

  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  font-size: 15px;
  right: 0;

  /* Links inside the dropdown */
  a {
    color: black;
    padding: 8px 12px;
    text-decoration: none;
    display: block;
    text-align: center;
    transition: all 0.1s ease-in-out;
  }

  /* Change color of dropdown links on hover */
  a:hover {
    background-color: #f1f1f1;
    border-radius: 10px;
  }
`;

function HeaderT() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;
  const [isOpen, setIsOpen] = useState(false);

  const onClickDropDown = () => {
    console.log("clicked");
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      // await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("accessToken");

      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <div className="dropdown">
        <DropdownBtn onClick={onClickDropDown} className="dropbtn">
          <img className="profileImage" src={user.avatar} alt="" />
          {user.user_id} <VscChevronDown />
        </DropdownBtn>

        <DropDownContent
          id="myDropdown"
          className="dropdown-content"
          isOpen={isOpen}
        >
          <Link to="profile">Profile</Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </DropDownContent>
      </div>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    <HeaderEl>
      <div className="logo">
        <h1>
          <Link to="/">
            {/* <img
              className="logoImage"
              src="img/logotest2.png"
              alt="logoImage"
            /> */}
            <p>Urlseries</p>
          </Link>
        </h1>
      </div>

      <ul style={transForm}>
        <li>
          <Link to="/about">
            <VscLayers className="icon_page" size="20"></VscLayers>ABOUT
          </Link>
        </li>

        {isLogged ? (
          userLink()
        ) : (
          <li>
            <Link to="/logintest">
              <VscAccount className="icon_page" size="20"></VscAccount>로그인
            </Link>
          </li>
        )}
      </ul>
    </HeaderEl>
  );
}

export default HeaderT;
