import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Join.css";
//-------------------------
import { GoogleLogin, GoogleLogout } from "react-google-login";

//구글로그인기능

export function Login() {
  const clientId = "";

  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const onLoginSuccess = (res) => {
    console.log("Login Success :", res.profileObj);
    setShowLoginButton(false);
    setShowLogoutButton(true);
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

  return (
    <>
      <div id="modal" className="modal-overlay">
        <div className="modal-window">
          <div>
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
          <Join />
        </div>
      </div>
    </>
  );
}

//간단회원가입 기능

export class Join extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      password: "",
      email: "",
    };
    this.changeUser_id = this.changeUser_id.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeUser_id(event) {
    this.setState({
      user_id: event.target.value,
    });
  }
  changePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const registered = {
      user_id: this.state.user_id,
      password: this.state.password,
      email: this.state.email,
    };

    axios
      .post("http://localhost:3001/signup", registered)
      .then((response) => console.log(response.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="form-div">
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="아이디를 입력해주세요"
                onChange={this.changeUser_id}
                value={this.state.user_id}
                className="form-control form-group"
              />

              <input
                type="text"
                placeholder="비밀번호를 입력해주세요"
                onChange={this.changePassword}
                value={this.state.password}
                className="form-control form-group"
              />

              <input
                type="text"
                placeholder="이메일을 입력해주세요"
                onChange={this.changeEmail}
                value={this.state.email}
                className="form-control form-group"
              />

              <input
                type="submit"
                className="btn btn-danger btn-block"
                value="회원가입"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
