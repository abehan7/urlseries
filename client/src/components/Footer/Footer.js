import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine,
  RiArrowDropDownLine,
} from "react-icons/ri";

function Footer() {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  return (
    <div id="main-footer">
      <div className="footerContent">
        <div className="projects">
          <button className="dropbtn_footer">
            Phone
            <RiArrowDropDownLine className="icon" />
          </button>
          <ul>
            <p>
              <RiPhoneLine className="icon_detail" />
              (82)010-3901-9369
            </p>
          </ul>
        </div>

        <div className="projects">
          <button className="dropbtn_footer">
            Email
            <RiArrowDropDownLine className="icon" />
          </button>
          <ul>
            <p>
              <RiMailLine className="icon_detail" />
              urlseries5548@gmail.com
            </p>
          </ul>
        </div>

        <div className="projects">
          <button className="dropbtn_footer">
            Address
            <RiArrowDropDownLine className="icon" />
          </button>
          <ul>
            <p>
              <RiMapPinLine className="icon_detail" />
              광주광역시 북구 용봉동
            </p>
          </ul>
        </div>

        <div className="projects">
          <button className="dropbtn_footer">
            <Link to="/userauth">개인정보 처리방침</Link>
            <RiArrowDropDownLine className="icon" />
          </button>
        </div>
      </div>
      <p>
        Copyright &copy; <span>{thisYear()}</span> URurl. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
