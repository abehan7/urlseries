import React, { useState } from "react";
import "./Join.css";
//-------------------------
import styled from "styled-components";
import { ItemWrapper, LoginWrapper } from "../Login/Login";
import { SignUp } from "../Api";
import { useHistory } from "react-router-dom";
//간단회원가입 기능

const JoinEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const JoinWrapper = styled(LoginWrapper)`
  margin-top: 0.3rem;
  border: 1px solid #2d2e30;
  border-radius: var(--main-border-radius);
  outline: none;
  cursor: pointer;
  width: var(--main-btn-width);
  height: var(--main-btn-height);
  padding: 0 1rem;

  transition: background-color 0.3s, box-shadow 0.3s;

  border: none;
  border-radius: 8px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

  color: #757575;
  font-size: 14px;
  font-weight: 500;

  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Join = () => {
  const [user, setUser] = useState({
    user_id: "",
    password: "",
    email: "",
  });

  const history = useHistory();

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);

    const { data } = await SignUp(user);

    data?.token &&
      localStorage.setItem("accessToken", JSON.stringify(data.token));
    data?.token && history.push("/");
    //     window.location = "/";
    //   }
  };

  return (
    <JoinEl>
      <div id="content">
        <h1>URurl</h1>
        <div className="form-div">
          <Form onSubmit={onSubmit}>
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

            <JoinWrapper className="button" onClick={onSubmit}>
              <ItemWrapper>가입하기</ItemWrapper>
            </JoinWrapper>
          </Form>
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
