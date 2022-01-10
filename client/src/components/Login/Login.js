import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import styled from "styled-components";
import { LoginApi } from "../Api";

const LoginEl = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Title = styled.h1`
  padding: 0;
  margin: 0;
`;

const GoogleLoginEl = styled.div`
  padding: 0 1rem;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 8px;
  /* width: var(--main-btn-size);
  height: var(--main-height); */

  transition: background-color 0.3s, box-shadow 0.3s;

  font-weight: 500;

  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 13px;

  button {
    color: #757575;
    font-size: 14px;
  }

  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #eeeeee;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
`;

export const LoginWrapper = styled.div`
  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #eeeeee;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
`;

const Login = ({ setLoginUser }) => {
  const [user, setUser] = useState({
    user_id: "",
    password: "",
  });

  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const history = useHistory();

  const clientId =
    "828263528533-ja90a5bpsr4tve8tqm3oceacq1otkcl5.apps.googleusercontent.com";

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  function handleClick(e) {
    window.location.href = "/signup";
  }

  // FIXME: 구글 로그인
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

  //   FIXME: APICALL

  const OnclickLogin = async () => {
    console.log(user);

    await LoginApi(user).then((response) => {
      console.log(response.data);
      const { message, user, loginSuccess, token } = response.data;

      if (loginSuccess) {
        setLoginUser(user);
        localStorage.setItem("accessToken", JSON.stringify(token));
        loginSuccess && history.push("/");
      } else {
        alert(message);
      }
    });
  };

  return (
    <LoginEl>
      <div className="login">
        <Title>URurl</Title>
        <input
          type="text"
          name="user_id"
          value={user.user_id}
          onChange={handleChange}
          placeholder="Enter your id"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your Password"
        />
        <LoginWrapper className="button" onClick={OnclickLogin}>
          <ItemWrapper>로그인</ItemWrapper>
        </LoginWrapper>
        <div className="g-signin2">
          {showLoginButton ? (
            <GoogleLogin
              render={(renderProps) => (
                <GoogleLoginEl>
                  <button
                    className="login-with-google-btn"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    구글계정으로 로그인
                  </button>
                </GoogleLoginEl>
              )}
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
        <div type="button" onClick={handleClick} style={{ cursor: "pointer" }}>
          회원가입
        </div>
      </div>
    </LoginEl>
  );
};

export default Login;
