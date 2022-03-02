import React, { useState } from "react";
import { API } from "../../Api";
import { useParams } from "react-router-dom";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../Utils/notification/Notification";
import { isLength, isMatch } from "../../Utils/validation/Validation";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const navigate = useNavigate();

  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      const res = await API.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const goSignUp = () => {
    navigate("/logintest");
  };

  return (
    <center>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

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
            <button id="auth_btn" onClick={handleResetPass}>
              재설정
            </button>
            <button className="response_register" onClick={goSignUp}>
              로그인
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="auth_opening">비밀번호를 재설정 하세요!</h1>
              <p className="auth_text">비밀번호 변경 후 로그인 하세요!</p>
              <button className="ghost" id="signUp">
                <Link to="/logintest">로그인</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </center>

    // <div className="fg_pass">
    //   <h2>비밀번호 재설정</h2>

    //   <div className="row">
    //     {err && showErrMsg(err)}
    //     {success && showSuccessMsg(success)}

    //     <label htmlFor="password">비밀번호</label>
    //     <input
    //       type="password"
    //       name="password"
    //       id="password"
    //       value={password}
    //       onChange={handleChangeInput}
    //     />

    //     <label htmlFor="cf_password">비밀번호확인</label>
    //     <input
    //       type="password"
    //       name="cf_password"
    //       id="cf_password"
    //       value={cf_password}
    //       onChange={handleChangeInput}
    //     />

    //     <button onClick={handleResetPass}>Reset Password</button>
    //   </div>
    // </div>
  );
}

export default ResetPassword;
