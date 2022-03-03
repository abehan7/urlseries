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

const initialState = {
  user_id: "",
  password: "",
  err: "",
  success: "",
};
function LoginT() {
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
      const res = await API.post("/user/logintest", { user_id, password });
      console.log("firstLogin", res.data);

      setUser({ ...user, err: "", success: res.data.msg });

      res.data.msg === "로그인 성공" &&
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });

      res.data.msg === "로그인 성공" &&
        localStorage.setItem("accessToken", res.data.access_token);

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      navigate("/");
    } catch (err) {
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

      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      navigate("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const goSignUp = () => {
    navigate("/registertest");
  };

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
            <Link to="/forgot_password">비밀번호를 잊으셨나요?</Link>
            <button className="response_register" onClick={goSignUp}>
              회원가입
            </button>
            <button id="auth_btn" type="summit">
              로그인
            </button>
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
              <button className="ghost" id="signUp">
                <Link to="/registertest">회원가입</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </center>

    // <div className="login_page">
    //   <h2>Login</h2>

    //  {err && showErrMsg(err)}
    //  {success && showSuccessMsg(success)}

    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="user_id">ID</label>
    //      <input
    //          type="text"
    //         placeholder="아이디를 입력해주세요"
    // value={user_id}
    //         name="user_id"
    //         onChange={handleChangeInput}
    //      ></input>
    //    </div>

    //     <div>
    //       <label htmlFor="password">password</label>

    //  <input
    //    type="password"
    //    placeholder="비밀번호를 입력해주세요"
    //    value={password}
    //    name="password"
    //    onChange={handleChangeInput}
    //  ></input>
    //     </div>

    //     <div className="row">
    //       <button type="submit">로그인</button>
    //       <Link to="/forgot_password">비밀번호를 잊으셨나요?</Link>
    //     </div>
    //   </form>

    //   <div className="hr">Or Login with </div>

    //  <div className="social">
    //    <GoogleLogin
    //      clientId="828263528533-ja90a5bpsr4tve8tqm3oceacq1otkcl5.apps.googleusercontent.com"
    //      buttonText="구글계정으로 로그인하기"
    //      onSuccess={responseGoogle}
    //      cookiePolicy={"single_host_origin"}
    //    />
    //  </div>

    //   <p>
    //     새로운 계정을 만드시겠습니까?<Link to="/registertest">회원가입</Link>
    //   </p>
    // </div>
  );
}

export default LoginT;
