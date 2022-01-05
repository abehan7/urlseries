import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const Login = ({ setLoginUser }) => {
  const history = useHistory();

  const [user, setUser] = useState({
    user_id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("http://localhost:3001/login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
      history.push("/");
    });
  };

  const clientId =
    "828263528533-ja90a5bpsr4tve8tqm3oceacq1otkcl5.apps.googleusercontent.com";

  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const onLoginSuccess = (res) => {
    console.log("Login Success :", res.profileObj);
    setShowLoginButton(false);
    setShowLogoutButton(true);
    window.location = "/";
  };

  const onFailureSuccess = (res) => {
    console.log("Login Failed :", res);
  };

  const onSignoutSuccess = () => {
    alert("You have been signed out successfully");
    setShowLoginButton(true);
    setShowLogoutButton(false);
    console.clear();
  };

  function handleClick(e) {
    window.location.href = "/signup";
  }

  return (
    <>
      <center>
        <div className="login">
          <h1>URurl</h1>
          <input
            type="text"
            name="user_id"
            value={user.user_id}
            onChange={handleChange}
            placeholder="Enter your id"
          ></input>
          <br></br>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your Password"
          ></input>
          <div className="button" onClick={login}>
            로그인
          </div>
          <div className="g-signin2">
            {showLoginButton ? (
              <GoogleLogin
                clientId={clientId}
                buttonText="구글계정으로 로그인"
                onSuccess={onLoginSuccess}
                onFailure={onFailureSuccess}
                cookiePolicy={"single_host_origin"}
              />
            ) : null}

            {showLogoutButton ? (
              <GoogleLogout
                clientId={clientId}
                buttonText="구글계정 로그아웃"
                onLogoutSuccess={onSignoutSuccess}
              />
            ) : null}
          </div>
          <br></br>
          <div type="button" onClick={handleClick}>
            회원가입
          </div>
        </div>
      </center>
    </>
  );
};

export default Login;
