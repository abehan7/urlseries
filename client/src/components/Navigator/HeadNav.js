import React, { useState } from "react";
import "./HeadNav.css";
import { CgProfile, CgUserlane } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginSign from "./LoginSign";

const Button = styled.div`
  cursor: pointer;
`;

const ProfileBtn = styled(Button)`
  height: calc(100%);
  position: relative;
  > svg {
    color: ${(props) => props.isClickedProfile && "orangered"};
  }
`;

const ProfileWrapper = styled.div`
  right: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: tomato;
  height: 100%;
  width: 100px;
`;

const HeadNav = () => {
  const [isClickedProfile, setIsClickedProfile] = useState(false);

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

  const onClickProfile = (e) => {
    setIsClickedProfile((val) => !val);
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

      <ProfileBtn className="navbar__icons" isClickedProfile={isClickedProfile}>
        <CgProfile onClick={onClickProfile} />
        {/* {isClickedProfile && ( */}
        <LoginSign
          setIsClickedProfile={setIsClickedProfile}
          isClickedProfile={isClickedProfile}
        />
        {/* )} */}
      </ProfileBtn>
    </nav>
  );
};

export default HeadNav;
