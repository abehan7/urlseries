import React, { useState } from "react";
import "./Footer.css";
import {
  RiWhatsappLine,
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
        <div class="projects">
          <button class="dropbtn">
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

        <div class="projects">
          <button class="dropbtn">
            Email
            <RiArrowDropDownLine className="icon" />
          </button>
          <ul>
            <p>
              <RiMailLine className="icon_detail" />
              pomno3@gmail.com
            </p>
          </ul>
        </div>

        <div class="projects">
          <button class="dropbtn">
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

        {/* <div class="dropup">
          <button class="dropbtn">
            Phone
            <RiArrowDropDownLine className="icon" />
          </button>
          <div class="dropup-content">
            <p>
              <RiPhoneLine className="icon_detail" />
              (82)010-3901-9369
            </p>
          </div>
        </div>

        <div class="dropup">
          <button class="dropbtn">
            Email
            <RiArrowDropDownLine className="icon" />
          </button>
          <div class="dropup-content">
            <p>
              <RiMailLine className="icon_detail" />
              pomno3@gmail.com
            </p>
          </div>
        </div>

        <div class="dropup">
          <button class="dropbtn">
            Address
            <RiArrowDropDownLine className="icon" />
          </button>
          <div class="dropup-content">
            <p>
              <RiMapPinLine className="icon_detail" />
              광주광역시 북구 용봉동
            </p>
          </div>
        </div>
 */}
        {/* <div className="icon_footer">
          <div type="button" className="content_field">
            Phone
            <RiArrowDropDownLine className="icon" />
          </div>
        </div>
        <div className="icon_footer">
          <div className="content_field">
            Email
            <RiArrowDropDownLine className="icon" />
          </div>
        </div>
        <div className="icon_footer">
          <div className="content_field">
            Address
            <RiArrowDropDownLine className="icon" />
          </div>
        </div> */}
      </div>
      <p>
        Copyright &copy; <span>{thisYear()}</span> URurl. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
