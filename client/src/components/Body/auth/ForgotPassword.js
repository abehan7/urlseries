import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../Utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../Utils/notification/Notification";

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
    <div className="fg_pass">
      <h2>ForgotPassword?</h2>

      <div className="row">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <label htmlFor="user_id">아이디를 입력해주세요</label>
        <input
          type="user_id"
          name="user_id"
          id="user_id"
          value={user_id}
          onChange={handleChangeInput}
        />

        <label htmlFor="email">이메일주소를 입력해주세요</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChangeInput}
        />
        <button onClick={forgotPassword}>Verify your email</button>
      </div>
    </div>
  );
}

export default ForgotPassword;
