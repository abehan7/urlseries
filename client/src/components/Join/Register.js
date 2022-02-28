import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { API, SignUp } from "../Api";
import styled from "styled-components";

const JoinEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Register = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    user_id: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    const { user_id, email, password, reEnterPassword } = user;
    // const { data } = await SignUp(user);

    console.log(password);
    console.log(reEnterPassword);
    if (user_id && email) {
      if (password === reEnterPassword) {
        // data?.token &&
        //   localStorage.setItem("accessToken", JSON.stringify(data.token));
        // data?.token && history("/");
        API.post("http://localhost:3001/signup", user).then((res) => {
          console.log(res);
          alert(res.data.message);
          history("/login");
        });
      } else {
        alert("비밀번호가 일치하지 않습니다");
      }
    }
    // if (user_id && email && password && password === reEnterPassword) {
    //   //   data?.token &&
    //   //     localStorage.setItem("accessToken", JSON.stringify(data.token));
    //   //   data?.token && history("/");
    //   axios.post("http://localhost:3001/signup", user).then((res) => {
    //     alert(res.data.message);
    //     history("/login");
    //   });
    // } else {
    //   alert("invlid input");
    // }
  };

  const onClickTitle = () => {
    history("/");
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      register();
    }
  };

  return (
    <JoinEl>
      <div className="register">
        {console.log("User", user)}
        <h1 onClick={onClickTitle} style={{ cursor: "pointer" }}>
          URurl
        </h1>
        <input
          type="text"
          name="user_id"
          value={user.user_id}
          placeholder="ID를 입력해주세요"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="email을 입력해주세요"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="reEnterPassword"
          value={user.reEnterPassword}
          placeholder="비밀번호를 확인해주세요"
          onChange={handleChange}
          onKeyPress={onKeyPress}
        ></input>
        <div className="button" onClick={register}>
          가입하기{" "}
        </div>

        <div className="button" onClick={() => history("/login")}>
          로그인
        </div>
      </div>
    </JoinEl>
  );
};

export default Register;
