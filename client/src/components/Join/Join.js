import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Join.css";
//-------------------------
import { GoogleLogin, GoogleLogout } from "react-google-login";

// 구글로그인기능;

export function Glogin() {
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

  return (
    <>
      <div id="modal" className="modal-overlay">
        <div id="modalWindow" className="modal-window">
          <div className="siteLogo">Ururl</div>
          <div className="googleButton">
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
      <center>
        <div id="content">
          <h1>URurl</h1>
          <div className="form-div">
            <form onSubmit={this.onSubmit}>
              <div>
                {/* <h3 class="join_title">
                    <label for="id">아이디</label>
                  </h3> */}
                {/* <span class="box int_id"> */}
                <input
                  type="text"
                  id="id"
                  class="int"
                  maxlength="20"
                  placeholder="아이디를 입력해주세요"
                  onChange={this.changeUser_id}
                  value={this.state.user_id}
                />
                {/* </span> */}
                {/* <span class="error_next_box"></span> */}
              </div>

              <div>
                {/* <h3 class="join_title">
                    <label for="pswd1">비밀번호</label>
                  </h3> */}
                {/* <span class="box int_pass"> */}
                <input
                  type="password"
                  id="pswd1"
                  class="int"
                  maxlength="20"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={this.changePassword}
                  value={this.state.password}
                />
                {/* </span> */}
                {/* <span class="error_next_box"></span> */}
              </div>

              <div>
                {/* <h3 class="join_title">
                    <label for="email">
                      이메일<span class="optional"></span>
                    </label>
                  </h3> */}
                {/* <span class="box int_email"> */}
                <input
                  type="text"
                  id="email"
                  class="int"
                  maxlength="100"
                  placeholder="이메일을 입력해주세요"
                  onChange={this.changeEmail}
                  value={this.state.email}
                />
                {/* </span> */}
                {/* <span class="error_next_box">
                    이메일 주소를 다시 확인해주세요.
                  </span> */}
              </div>

              <div className="btn_area">
                <input type="submit" id="btnJoin" value="가입하기" />
              </div>
            </form>
          </div>
        </div>
      </center>
    );
  }
}
