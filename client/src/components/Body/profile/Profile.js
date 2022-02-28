import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../Utils/validation/Validation";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/Actions/usersAction";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../Utils/notification/Notification";

import "./Profile.css";

import { AiTwotoneCamera } from "react-icons/ai";
import {
  VscCheck,
  VscChromeClose,
  VscEdit,
  VscTrash,
  VscDeviceCamera,
} from "react-icons/vsc";
import { API } from "../../Api";

const initialState = {
  user_id: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const { user_id, password, cf_password, err, success } = data;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleUpdate = () => {
    if (user_id || avatar) updateInfor();
    if (password) updatePassword();
  };
  const updateInfor = () => {
    try {
      API.patch(
        "/user/update",
        {
          user_id: user_id ? user_id : user.user_id,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      API.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      )
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await API.post("/apitest/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm("정말 이 계정을 삭제하시겠습니까?")) {
          setLoading(true);
          await API.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading.....</h3>}
      </div>
      <div className="profile_page">
        <div className="col-left">
          <h2>{isAdmin ? "관리자 프로필" : "유저 프로필"}</h2>

          <div className="avatar">
            <img src={avatar ? avatar : user.avatar} alt="" />
            <span>
              <p>
                <VscDeviceCamera size="30" /> <br></br>프로필사진변경
              </p>
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={changeAvatar}
              />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="user_id">Userid</label>
            <input
              type="text"
              name="user_id"
              id="user_id"
              placeholder="당신의 아이디"
              defaultValue={user.user_id}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              placeholder="Your email address"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cf_password">Confirm New Password</label>
            <input
              type="password"
              name="cf_password"
              id="cf_password"
              placeholder="Confirm password"
              value={cf_password}
              onChange={handleChange}
            />
          </div>

          <div>
            <em style={{ color: "red" }}>
              * 구글아이디로 로그인한 경우 비밀번호 변경에 유의해주세요!
            </em>
          </div>

          <button disabled={loading} onClick={handleUpdate}>
            Update
          </button>
        </div>
        {isAdmin ? (
          <div className="col-right">
            <h2>{isAdmin ? "Users" : "MyOrders"}</h2>

            <div style={{ overFlowX: "auto" }}>
              <table className="customers">
                <thead>
                  <tr>
                    <th>USERNUM</th>
                    <th>USERID</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.user_id}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.role === 1 ? (
                          <VscCheck color="green" />
                        ) : (
                          <VscChromeClose color="red" />
                        )}
                      </td>
                      <td>
                        <Link to={`/edit_user/${user._id}`}>
                          <VscEdit color="black" size="20" />
                        </Link>
                        {/* <button
                        className="deleteBtn"
                        onClick={() => handleDelete(user._id)}
                      > */}
                        <VscTrash
                          className="deleteBtn"
                          cursor="pointer"
                          size="20"
                          onClick={() => handleDelete(user._id)}
                        />
                        {/* </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Profile;
