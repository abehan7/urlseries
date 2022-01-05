import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Glogin, Join } from "./components/Join/Join";
import Login from "./components/Login/login";
import MainPage from "./routers/MainPage";
import SharePage from "./routers/SharePage";
import { useState } from "react";

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user && user._id ? <MainPage /> : <Login />}
            <MainPage />
          </Route>
          <Route path="/Login">
            <Login setLoginUser={setLoginUser} />
          </Route>
          <Route path="/signup">
            <Join />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

// const App = () => {
//   return (
//     // 이름 ururl유알유알엘
//     <Router>
//       <Switch>
//         <Route path="/login">
//           <Login />
//         </Route>
//         <Route path="/signup">
//           <Join />
//         </Route>
//         <Route path="/">
//           <MainPage />
//         </Route>
//       </Switch>
//     </Router>
//   );
// };

export default App;
