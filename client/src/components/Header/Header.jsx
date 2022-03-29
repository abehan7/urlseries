import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount, VscLayers, VscChevronDown } from "react-icons/vsc";
import "./Header.css";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
// import { useUrl } from "../../contexts/UrlContext";
import { AiOutlineChrome } from "react-icons/ai";
import { useEffect } from "react";
import { constants, useMode } from "../../contexts/ModeContext";
import { getToken } from "../../redux/ReducersT/tokenReducer";
import { media } from "../../assets/Themes";

const DropdownBtn = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserId = styled.span``;

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
  @media (max-width: 1018px) {
    li:first-child {
      display: none;
    }
  }
  @media (max-width: 500px) {
    ${UserId} {
      display: none;
    }
  }
  ${media.mobile} {
    width: 100%;
    min-height: 70px;
    height: 70px;
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

const Tap = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const TapText = styled.span``;
const TapIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  padding-right: 0.2rem;
`;
const TapWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.mobile} {
    padding: 0;
    margin: 0;
  }
`;
const ProfileImg = styled.img``;

const LogoWrapper = styled.div`
  max-height: 100px;
  ${media.mobile} {
    display: none;
  }
`;

const Hamberger = styled.div``;

const HambergerStick = styled.div``;

const HamburgerWrapper = styled.div`
  display: none;
  padding-left: 1rem;
  ${media.mobile} {
    display: flex;
  }

  ${Hamberger} {
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 0.25s linear;
    width: clamp(1.5rem, 2vw + 1.1rem, 6rem);
    height: clamp(2rem, 1.4vw + 1.7rem, 5rem);
    display: flex;
    align-items: center;
  }

  ${Hamberger}:hover {
    opacity: 1;
  }

  ${Hamberger} div,
  ${Hamberger} div:after,
  ${Hamberger} div:before {
    background-color: black;
    border-radius: 10px;
    width: clamp(1.5rem, 2vw + 1.1rem, 6rem);
    height: clamp(0.2rem, 0.3vw + 0.1rem, 0.8rem);
    transition: all 0.15s linear;
  }

  ${Hamberger} div:before,
  ${Hamberger} div:after {
    content: "";
    position: absolute;
  }

  ${Hamberger} div:before {
    transform: translateY(-200%);
  }

  ${Hamberger} div:after {
    transform: translateY(200%);
  }

  ${Hamberger}.open div {
    background: transparent;
  }

  ${Hamberger}.open div:before {
    transform: rotate(45deg);
  }

  ${Hamberger}.open div:after {
    transform: rotate(-45deg);
  }
`;
function Header() {
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const [isOpen, setIsOpen] = useState(false);
  const [isChrome, setIsChrome] = useState(false);
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const ref = useRef();
  const setMode = useMode().setMode;
  const navigate = useNavigate();
  const token = useSelector(getToken);
  const isSidebarOpen = useMode().isSidebarOpen;
  const setIsSidebarOpen = useMode().setIsSidebarOpen;

  const onClickDropDown = () => setIsOpen(!isOpen);
  const handleFoldUpDropDown = () => setIsOpen(false);

  const handleLogout = async () => {
    handleFoldUpDropDown();
    try {
      // await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("accessToken");

      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  // const handleResetAllUrl = useUrl().handleResetAllUrl;
  const onClickLogin = () => {};

  const windowClick = (e) => {
    if (!isOpen) return;
    if (ref.current.contains(e.target)) return;
    setIsOpen(false);
    // if (e.target.id !== "dropdown-btn") {
    // }
  };

  const onClickLogo = () => setMode(constants.NORMAL);

  const onClickHamburger = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    window.addEventListener("click", windowClick);
    return () => window.removeEventListener("click", windowClick);
  }, [isOpen]);

  useEffect(() => {
    const agent = navigator.userAgent.toLowerCase();
    agent.indexOf("chrome") !== -1 && setIsChrome(true);
  }, []);

  const userLink = () => {
    return (
      <div className="dropdown" ref={ref}>
        <DropdownBtn onClick={onClickDropDown} className="dropbtn">
          <ProfileImg className="profileImage" src={user.avatar} alt="" />
          <UserId>{user.user_id}</UserId> <VscChevronDown />
        </DropdownBtn>

        <DropDownContent
          id="myDropdown"
          className="dropdown-content"
          isOpen={isOpen}
        >
          <Link to="profile" onClick={handleFoldUpDropDown}>
            Profile
          </Link>
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
      <LogoWrapper className="logo">
        <h1>
          <Link to="/" onClick={onClickLogo}>
            <p>Urlseries</p>
          </Link>
        </h1>
      </LogoWrapper>
      <HamburgerWrapper>
        <Hamberger
          onClick={onClickHamburger}
          className={isSidebarOpen && "open"}
        >
          <HambergerStick />
        </Hamberger>
      </HamburgerWrapper>

      <TapWrapper>
        {token && (
          <Tap
            onClick={() => navigate("/chrome-extension")}
            className="header--chrome--tap"
          >
            <TapIcon>
              <AiOutlineChrome />
            </TapIcon>
            <TapText>Chrome</TapText>
          </Tap>
        )}
        <Tap>
          <Link to="/about">
            <VscLayers className="icon_page" size="20"></VscLayers>ABOUT
          </Link>
        </Tap>

        {isLogged ? (
          userLink()
        ) : (
          <Tap>
            <Link to="/login" onClick={onClickLogin}>
              <VscAccount className="icon_page" size="20"></VscAccount>로그인
            </Link>
          </Tap>
        )}
      </TapWrapper>
    </HeaderEl>
  );
}

export default Header;
