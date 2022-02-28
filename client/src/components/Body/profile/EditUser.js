import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  showSuccessMsg,
  showErrMsg,
} from "../../Utils/notification/Notification";

import "./Profile.css";
import { VscArrowLeft } from "react-icons/vsc";
import { API } from "../../Api";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState([]);

  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);

  const [checkAdmin, setCheckAdmin] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      navigate("/profile");
    }
  }, [users, id, navigate]);

  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await API.patch(
          `/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );

        setSuccess(res.data.msg);
        setNum(0);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const handleCheck = () => {
    setSuccess("");
    setErr("");
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  return (
    <div className="profile_page edit_user">
      <div className="row">
        <button onClick={() => navigate(-1)} className="go_back">
          <VscArrowLeft />
        </button>
      </div>

      <div className="col-left">
        <h2>Edit User</h2>

        <div className="form-group">
          <label htmlFor="user_id">user_id</label>
          <input
            type="text"
            name="user_id"
            defaultValue={editUser.user_id}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            disabled
          />
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            id="isAdmin"
            checked={checkAdmin}
            onChange={handleCheck}
          />
          <label htmlFor="isAdmin">isAdmin</label>
        </div>

        <button onClick={handleUpdate}>Update</button>

        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
    </div>
  );
}

export default EditUser;
