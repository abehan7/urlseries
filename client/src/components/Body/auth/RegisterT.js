import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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

const initialState = {
  user_id: "",
  password: "",
  cf_password: "",
  email: "",
  err: "",
  success: "",
};
function RegisterT() {
  const [user, setUser] = useState(initialState);

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
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid emails.", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password did not match.", success: "" });
    try {
      const res = await axios.post("/user/register", {
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

  return (
    <div className="login_page">
      <h2>URurl Register page</h2>

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
          <label htmlFor="email">Email</label>

          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            value={email}
            name="email"
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

        <div>
          <label htmlFor="cf_password">ReEnter-password</label>

          <input
            type="password"
            placeholder="비밀번호를 확인해주세요"
            value={cf_password}
            name="cf_password"
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <button type="submit">회원가입</button>
        </div>
      </form>

      <p>
        이미 아이디가 있습니까?<Link to="/logintest">로그인</Link>
      </p>
    </div>
  );
}

export default RegisterT;
