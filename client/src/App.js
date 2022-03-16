import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";

import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/Actions/authAction";
import { API } from "./components/Api";
import styled from "styled-components";

//-----------------수정본 코드----------------
const AppEl = styled.div`
  position: relative;
  overflow: hidden;
`;

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      // console.log(token);
      const getToken = async () => {
        axios.defaults.withCredentials = true; // 이걸로 cookie설정하는거 됐던거같은데 또 heroku에서는 안되네
        const res = await API.post("/user/refresh_token", null, {
          withCredentials: true,
        });

        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
        localStorage.setItem("accessToken", res.data.access_token);
      };
      !token && getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          // console.log("getUser", res);
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <Router>
      <AppEl className="App">
        <Header />
        <Body />
      </AppEl>
    </Router>
  );
}

export default App;
