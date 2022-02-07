import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../Utils/notification/Notification";
import "./Auth.css";
import { dispatchLogin } from "../../../redux/Actions/authAction";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

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
      const res = await axios.post("/user/logintest", { user_id, password });
      setUser({ ...user, err: "", success: res.data.msg });

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
      const res = await axios.post("/user/google_login", {
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

  return (
    <div className="login_page">
      <h2>URurl login page</h2>

      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user_id">ID</label>

          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={user_id}
            name="user_id"
            onChange={handleChangeInput}
          ></input>
        </div>

        <div>
          <label htmlFor="password">password</label>

          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            name="password"
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <button type="submit">로그인</button>
          <Link to="/forgot_password">비밀번호를 잊으셨나요?</Link>
        </div>
      </form>

      <div className="hr">Or Login with </div>

      <div className="social">
        <GoogleLogin
          clientId="828263528533-ja90a5bpsr4tve8tqm3oceacq1otkcl5.apps.googleusercontent.com"
          buttonText="구글계정으로 로그인하기"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>

      <p>
        새로운 계정을 만드시겠습니까?<Link to="/registertest">회원가입</Link>
      </p>
    </div>
  );
}

export default LoginT;
