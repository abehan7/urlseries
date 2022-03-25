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

const Input = styled.input`
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
  cursor: pointer;
`;
function Login() {
  const [user, setUser] = useState(initialState);
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
    } catch (err) {
      console.log(err);
      err.response.data.msg &&
        setUser({
          ...user,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  const responseGoogle = async (response) => {
    console.log(response);
    try {
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
    } catch (err) {
      console.error(err);
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const goSignUp = () => navigate("/register");

  return (
    <center>
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
              />
            </div>
            <Link to="/forgot_password">비밀번호를 잊으셨나요?</Link>
            <button className="response_register" onClick={goSignUp}>
              회원가입
            </button>
            <Button id="auth_btn" type="summit">
              로그인
            </Button>
            {/*  */}

            <div className="social">
              <GoogleLogin
                clientId="1019311478641-hbkcsm5rt488pl0d5dqoo1m8b5d9jerk.apps.googleusercontent.com"
                buttonText="Google 로그인"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
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
                <Button className="ghost" id="signUp">
                  회원가입
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
}

export default Login;
