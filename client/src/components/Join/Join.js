import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Join.css";
//-------------------------
import styled from "styled-components";

//간단회원가입 기능

const JoinEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Join = () => {
  const [user, setUser] = useState({
    user_id: "",
    password: "",
    email: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <JoinEl>
      <div id="content">
        <h1>URurl</h1>
        <div className="form-div">
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                id="id"
                name="user_id"
                class="int"
                maxlength="20"
                placeholder="아이디를 입력해주세요"
                onChange={onChange}
                value={user.user_id}
              />
            </div>

            <div>
              <input
                type="password"
                id="pswd1"
                class="int"
                name="password"
                maxlength="20"
                placeholder="비밀번호를 입력해주세요"
                onChange={onChange}
                value={user.password}
              />
            </div>

            <div>
              <input
                type="text"
                id="email"
                name="email"
                class="int"
                maxlength="100"
                placeholder="이메일을 입력해주세요"
                onChange={onChange}
                value={user.email}
              />
            </div>

            <div className="btn_area">
              <input type="submit" id="btnJoin" value="가입하기" />
            </div>
          </form>
        </div>
      </div>
    </JoinEl>
  );
};
export default Join;

//   onSubmit(event) {
//     event.preventDefault();

//     const registered = {
//       user_id: this.state.user_id,
//       password: this.state.password,
//       email: this.state.email,
//     };

//     axios
//       .post("http://localhost:3001/signup", registered)
//       .then((response) => console.log(response.data));

//     window.location = "/";
//   }
