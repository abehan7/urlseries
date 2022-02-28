import ACTIONS from "./index";
import { API } from "../../components/Api";

export const fetchAllUsers = async (token) => {
  const res = await API.get("/user/all_infor", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetAllUsers = (res) => {
  return {
    type: ACTIONS.GET_ALL_USERS,
    payload: res.data,
  };
};
