import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutPage from "./components/AboutPage/AboutPage";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import HeadNav from "./components/Navigator/HeadNav";
import MainPage from "./routers/MainPage";
import NewLogin from "./components/Login/NewLogin";
import Register from "./components/Join/Register";

import HeaderT from "./components/HeaderT/HeaderT";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/Actions/authAction";

//-----------------수정본 코드----------------

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
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

// ------------------------------------------------------------수정전 코드------------------------------------
// export const UserContext = createContext(null);

// const App = () => {
//   // const [loginUser, setLoginUser] = useState({});

//   // const initialState = {
//   //   loginUser,
//   //   setLoginUser,
//   // };

//   const [user, setLoginUser] = useState({});

//   const initialState = {
//     user,
//     setLoginUser,
//   };

//   return (
//     <Router>
//       <UserContext.Provider value={initialState}>
//         <HeadNav />
//         <Routes>
//           <Route path="/about" element={<AboutPage />} />
//           <Route
//             path="/login"
//             element={<NewLogin setLoginUser={setLoginUser} />}
//           />
//           <Route path="/signup" element={<Register />} />

//           {/* <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Join />} /> */}
//           <Route path="/" exact={true} element={<MainPage />} />
//         </Routes>
//       </UserContext.Provider>
//     </Router>
//   );
// };

export default App;
