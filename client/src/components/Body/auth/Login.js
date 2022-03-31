import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../Api";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../Utils/notification/Notification";
import "./Auth.css";
import { dispatchLogin } from "../../../redux/Actions/authAction";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { RiUser3Line, RiLockPasswordLine } from "react-icons/ri";
import styled from "styled-components";

import LoginToast from "../../Utils/Toast/LoginToast";
const Center = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  text-decoration: none;
  :focus {
    text-decoration: none;
    outline: none;
  }

  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #fff inset;
    -webkit-text-fill-color: #000;
  }

  /* 인풋 초기화 */
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const initialState = {
  user_id: "",
  password: "",
  err: "",
  success: "",
};

const Button = styled.button`
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#ff4b2b")};
  border: ${({ disabled }) => (disabled ? "#ccc" : "#ff4b2b")};
`;

export const RegistalBtn = styled(Button)`
  background-color: #ff416c; ;
`;
function Login() {
  const [user, setUser] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user_id, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsOpen(true);
      // guest url들 초기화

      const res = await API.post("/user/login", { user_id, password });

      setUser({ ...user, err: "", success: res.data.msg });

      const loginSuccess = () => {
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
        localStorage.setItem("accessToken", res.data.access_token);
      };

      res.data.msg === "로그인 성공" && loginSuccess();
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      navigate("/");
      setIsOpen(false);
    } catch (err) {
      console.log(err);
      err.response.data.msg &&
        setUser({
          ...user,
          err: err.response.data.msg,
          success: "",
        });
    }
    setIsOpen(false);
  };

  const responseGoogle = async (response) => {
    console.log(response);

    try {
      setIsOpen(true);
      const res = await API.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      console.log(res);

      setUser({ ...user, err: "", success: res.data.msg });

      const loginSuccess = () => {
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
        localStorage.setItem("accessToken", res.data.access_token);
      };

      res.data.msg === "로그인 성공" && loginSuccess();
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      navigate("/");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
      setIsOpen(false);
    }
  };

  return (
    <Center>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1 className="auth_opening">로그인</h1>

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <div className="icon_field">
              <RiUser3Line className="icon" />
              <Input
                type="text"
                className="auth_input"
                placeholder="아이디를 입력해주세요"
                value={user_id}
                name="user_id"
                onChange={handleChangeInput}
                autoComplete="user-name"
              />
            </div>
            <div className="icon_field">
              <RiLockPasswordLine className="icon" />
              <Input
                type="password"
                className="auth_input"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                name="password"
                onChange={handleChangeInput}
                autoComplete="current-password"
              />
            </div>
            <Link to="/forgot_password">비밀번호를 잊으셨나요?</Link>
            <Button id="auth_btn" type="summit" disabled={isOpen}>
              로그인
            </Button>

            <div className="social">
              <GoogleLogin
                clientId="1019311478641-hbkcsm5rt488pl0d5dqoo1m8b5d9jerk.apps.googleusercontent.com"
                buttonText="Google 로그인"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
                disabled={isOpen}
              />
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="auth_opening">반갑습니다!</h1>
              <p className="auth_text">
                자신만의 개성있고 효율적인 URL 관리를 시작해보세요!
              </p>
              <Link to="/register">
                <RegistalBtn className="ghost" id="signUp" disabled={isOpen}>
                  회원가입
                </RegistalBtn>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <LoginToast isOpen={isOpen} />
    </Center>
  );
}

export default Login;
