import React from "react";
import { Link } from "react-router-dom";
import { VscAccount, VscLayers, VscChevronDown } from "react-icons/vsc";
import "./HeaderT.css";
import { useSelector } from "react-redux";
import axios from "axios";

function HeaderT() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#" className="avatar">
          <img src={user.avatar} alt="" />
          {user.user_id} <VscChevronDown />
        </Link>

        <ul className="dropdown">
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  const transForm = {
    transForm: isLogged ? "tranlateY(-5px)" : 0,
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">URurl</Link>
        </h1>
      </div>

      <ul style={transForm}>
        <li>
          <Link to="/">
            <VscLayers></VscLayers>about
          </Link>
        </li>

        {isLogged ? (
          userLink()
        ) : (
          <li>
            <Link to="/logintest">
              <VscAccount></VscAccount>sign in
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default HeaderT;
