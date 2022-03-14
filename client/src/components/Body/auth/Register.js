import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../Utils/notification/Notification";
import "./Auth.css";
import {
  isEmpty,
  isEmail,
  isMatch,
  isLength,
} from "../../Utils/validation/Validation";

import { RiUser3Line, RiLockPasswordLine, RiMailLine } from "react-icons/ri";
import { API } from "../../Api";

const initialState = {
  user_id: "",
  password: "",
  cf_password: "",
  email: "",
  err: "",
  success: "",
};
function Register() {
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const { user_id, password, cf_password, email, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(user_id) || isEmpty(password))
      return setUser({
        ...user,
        err: '"입력사항을 모두 입력해주세요"',
        success: "",
      });

    if (!isEmail(email))
      return setUser({
        ...user,
        err: '"이메일 형식을 확인해주세요"',
        success: "",
      });

    if (isLength(password))
      return setUser({
        ...user,
        err: '"6자리 이상으로 비밀번호를 설정해주세요"',
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({
        ...user,
        err: '"비밀번호가 일치하지 않습니다"',
        success: "",
      });
    try {
      const res = await API.post("/user/register", {
        user_id,
        email,
        password,
      });

      setUser({ ...user, err: "", success: res.data.msg });
      // const res = await axios.post("/user/logintest", { user_id, password });
      // setUser({ ...user, err: "", success: res.data.msg });
      // localStorage.setItem("firstLogin", true);
      // dispatch(dispatchLogin());
      // navigate("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({
          ...user,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  const goSignUp = () => {
    navigate("/logintest");
  };

  return (
    <center>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1 className="auth_opening">회원가입 </h1>

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <div className="icon_field">
              <RiUser3Line className="icon" />
              <input
                type="text"
                className="auth_input"
                placeholder="아이디를 입력해주세요"
                value={user_id}
                name="user_id"
                onChange={handleChangeInput}
              ></input>
            </div>
            <div className="icon_field">
              <RiMailLine className="icon" />
              <input
                type="text"
                className="auth_input"
                placeholder="이메일을 입력해주세요"
                value={email}
                name="email"
                onChange={handleChangeInput}
              ></input>
            </div>

            <div className="icon_field">
              <RiLockPasswordLine className="icon" />
              <input
                type="password"
                className="auth_input"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                name="password"
                onChange={handleChangeInput}
              ></input>
            </div>

            <div className="icon_field">
              <RiLockPasswordLine className="icon" />
              <input
                type="password"
                className="auth_input"
                placeholder="비밀번호를 확인해주세요"
                value={cf_password}
                name="cf_password"
                onChange={handleChangeInput}
              ></input>
            </div>

            <button id="auth_btn" type="submit">
              회원가입
            </button>
            <button className="response_register" onClick={goSignUp}>
              로그인
            </button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="auth_opening">환영합니다!</h1>
              <p className="auth_text">기존 아이디가 있다면 로그인해주세요!</p>
              <button className="ghost" id="signUp">
                <Link to="/logintest">로그인</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
}

export default Register;
