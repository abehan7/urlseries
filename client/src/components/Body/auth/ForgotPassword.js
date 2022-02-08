import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../Utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../Utils/notification/Notification";
import { Link, useNavigate } from "react-router-dom";
import { RiUser3Line, RiLockPasswordLine, RiMailLine } from "react-icons/ri";

const initialState = {
  user_id: "",
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { user_id, email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, err: "Invalid emails.", success: "" });

    try {
      const res = await axios.post("/user/forgot", { user_id, email });

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <center>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <div className="icon_field">
              <RiUser3Line className="icon" />
              <input
                type="text"
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
                placeholder="이메일을 입력해주세요"
                value={email}
                name="email"
                onChange={handleChangeInput}
              ></input>
            </div>

            <button onClick={forgotPassword}>이메일 확인받기</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>비밀번호를 잊으셨나요?</h1>
              <p>이메일 확인을 받은 후 재설정 해보세요!</p>
              <button className="ghost" id="signUp">
                <Link to="/logintest">로그인</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </center>

    // <div className="fg_pass">
    //   <h2>ForgotPassword?</h2>

    //   <div className="row">
    //     {err && showErrMsg(err)}
    //     {success && showSuccessMsg(success)}

    //     <label htmlFor="user_id">아이디를 입력해주세요</label>
    //     <input
    //       type="user_id"
    //       name="user_id"
    //       id="user_id"
    //       value={user_id}
    //       onChange={handleChangeInput}
    //     />

    //     <label htmlFor="email">이메일주소를 입력해주세요</label>
    //     <input
    //       type="email"
    //       name="email"
    //       id="email"
    //       value={email}
    //       onChange={handleChangeInput}
    //     />
    //     <button onClick={forgotPassword}>Verify your email</button>
    //   </div>
    // </div>
  );
}

export default ForgotPassword;
