import React, { useState } from "react";
import "./NewLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../Api";
import { UserContext } from "../../App";
import styled from "styled-components";

const JoinEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const NewLogin = ({ setLoginUser }) => {
  const history = useNavigate();

  //   const { setLoginUser } = useContext(UserContext);

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

  const login = async () => {
    console.log(user);

    await LoginApi(user).then((response) => {
      console.log(response.data);
      const { message, user, loginSuccess, token } = response.data;

      if (loginSuccess) {
        setLoginUser(user);
        localStorage.setItem("accessToken", JSON.stringify(token));
        loginSuccess && history("/");
      } else {
        alert(message);
      }
    });
  };

  //   const login = () => {
  //     axios.post("http://localhost:3001/login", user).then((res) => {
  //       alert(res.data.message);
  //       setLoginUser(res.data.user);
  //       history("/");
  //     });
  //   };

  const onClickTitle = () => {
    history("/");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <JoinEl>
      <div className="login">
        <h1 onClick={onClickTitle} style={{ cursor: "pointer" }}>
          URurl
        </h1>
        <input
          type="text"
          name="user_id"
          value={user.user_id}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요"
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요"
          onKeyPress={onKeyPress}
        ></input>
        <div className="button" onClick={login}>
          로그인하기
        </div>
        <div className="button" onClick={() => history("/signup")}>
          회원가입
        </div>
      </div>
    </JoinEl>
  );
};

export default NewLogin;
