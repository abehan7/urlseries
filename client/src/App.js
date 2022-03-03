import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import loadable from "@loadable/component";

import HeaderT from "./components/HeaderT/HeaderT";
import Body from "./components/Body/Body";
// import Footer from "./components/Footer/Footer";

import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/Actions/authAction";
import { API } from "./components/Api";

// const HeaderT = loadable(() => import("./components/HeaderT/HeaderT"));
// const Body = loadable(() => import("./components/Body/Body"));
const Footer = loadable(() => import("./components/Footer/Footer"));
//-----------------수정본 코드----------------

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
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          console.log("getUser", res);
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <Router>
      <div className="App">
        <HeaderT />
        <Body />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
