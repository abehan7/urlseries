import React from "react";
import "./HeadNav.css";
import { CgProfile, CgUserlane } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginSign from "../header/LoginSign";

const Button = styled.div`
  cursor: pointer;
`;

const ProfileBtn = styled(Button)`
  position: relative;
`;

const HeadNav = () => {
  const navigate = useNavigate();
  const onClickTitle = () => {
    navigate("/");
  };
  const onClickAbout = () => {
    navigate("/about");
  };

  const onClickCS = () => {
    navigate("/CS");
  };
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <CgUserlane />
        <Button className="navbar__btn" onClick={onClickTitle}>
          URurl
        </Button>
        <ul className="navbar__menu">
          <li>
            <Button className="navbar__btn" onClick={onClickAbout}>
              About Site
            </Button>
          </li>
          <li>
            <Button className="navbar__btn" onClick={onClickCS}>
              고객센터
            </Button>
          </li>
        </ul>
      </div>

      <ProfileBtn className="navbar__icons">
        <CgProfile />
        <LoginSign />
      </ProfileBtn>

      <div className="navbar__toogleBtn">
        <CgProfile />
      </div>
    </nav>
  );
};

export default HeadNav;
