import React from "react";
import { Link } from "react-router-dom";
import { VscAccount, VscLayers, VscChevronDown } from "react-icons/vsc";
import "./HeaderT.css";
import { useSelector } from "react-redux";

function HeaderT() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

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

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  const userLink = () => {
    return (
      <div className="dropdown">
        <button onClick={myFunction} className="dropbtn">
          <img className="profileImage" src={user.avatar} alt="" />
          {user.user_id} <VscChevronDown />
        </button>
        <div id="myDropdown" className="dropdown-content">
          <Link to="profile">Profile</Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">
            <img
              className="logoImage"
              src="img/logotest2.png"
              alt="logoImage"
            />
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
    </header>
  );
}

export default HeaderT;
