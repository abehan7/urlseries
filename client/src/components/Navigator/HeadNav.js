import React, { useEffect, useMemo, useState } from "react";
import "./HeadNav.css";
import {
  CgProfile,
  CgMenuBoxed,
  CgUserlane,
  CgMenu,
  CgHeart,
  CgReorder,
} from "react-icons/cg";

const HeadNav = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <CgUserlane />
        <a href="">URurl</a>
        <ul className="navbar__menu">
          <li>
            <a href="">About Site</a>
          </li>
          <li>
            <a href="">고객센터</a>
          </li>
        </ul>
      </div>

      <div className="navbar__icons">
        <li>
          <CgProfile />
        </li>

        <li className="burger">
          <CgMenu />
        </li>
      </div>

      <a href="#" className="navbar__toogleBtn">
        <CgMenu />
      </a>
    </nav>
  );
};

export default HeadNav;
